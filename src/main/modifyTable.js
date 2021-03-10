import {getFilter} from './sessionStorage.js';
import removeTextNodes from './removeTextNodes.js';
import {updateHeader} from './modifyHeader.js';
import forEachTr from './forEachTr.js';
import {setToToggle} from './sessionStorage.js';
import {readControl} from './ajax.js';
import {contentView} from './contentView.js';
import {showProgress, hideProgress} from './progressView.js';

function modifyTableHead(){
  const tr = document.body.querySelector('tr');
  const tdList = tr.querySelectorAll('td');

  // すべて既読にするボタン
  const td = document.createElement('td');
  const button = document.createElement('button');
  button.type = 'button';

  button.addEventListener('click', () => {
    showProgress();

    const idList = [];
    forEachTr((read, highlighted, selected, idDate, idIndex) => {
      if(!read){
        idList.push({idDate, idIndex});
      }
    });

    const promiseList = idList.map(({idDate, idIndex}) => readControl(idDate, idIndex, true));
    Promise.all(promiseList).then((result) => {
      idList.forEach(({idDate, idIndex}, i) => {
        const id = `${idDate}+${idIndex}+check_mk`;
        document.getElementById(id).checked = (result[i] === 'true');
      });
      modifyTable();
      hideProgress();
    });
  });

  td.appendChild(button);
  tr.appendChild(td);
}

export function init(){
  modifyTableHead();

  Array.from(document.body.querySelectorAll('tr+tr')).forEach((tr) => {
    const read = tr.querySelector('input[name="check_mk"]').checked;
    const highlighted = tr.querySelector('input[name="check_flag"]').checked;

    if(tr.dataset.modified !== 'true'){
      // 一度のみ実行
      tr.dataset.modified = 'true'

      const tdList = tr.querySelectorAll('td');
      const a = tdList[6].querySelector('a');

      // チェックボックスにidを付与
      const id_date  = tr.querySelector('input[name="id_date"]').value;
      const id_index = tr.querySelector('input[name="id_index"]').value;
      tr.querySelector('input[name="check_mk"]').id = `${id_date}+${id_index}+check_mk`;
      tr.querySelector('input[name="check_flag"]').id = `${id_date}+${id_index}+check_flag`;

      // 装飾用ラベルを追加
      const labelCheckFlag = document.createElement('label');
      labelCheckFlag.htmlFor = `${id_date}+${id_index}+check_flag`;
      tdList[1].appendChild(labelCheckFlag);

      // nbspを削除
      removeTextNodes(tdList[1]);

      // リンク領域を拡張
      tr.addEventListener('click', () => {
        // 掲示を開く
        contentView(id_date, id_index);
        readControl(id_date, id_index, true).then((result) => {
          document.getElementById(`${id_date}+${id_index}+check_mk`).checked = (result === 'true');
          modifyTable();
        });
      });
      tdList[0].addEventListener('click', (e) => e.stopPropagation());
      tdList[1].addEventListener('click', (e) => e.stopPropagation());

      // 選択用チェックボックス追加
      (() => {
        const td = document.createElement('td');

        // クリックで掲示を開くのを抑制
        td.addEventListener('click', (e) => e.stopPropagation());

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = `${id_date}+${id_index}+select`;
        input.addEventListener('change', updateHeader);

        const label = document.createElement('label');
        label.htmlFor = input.id;

        td.appendChild(input);
        td.appendChild(label);
        tr.appendChild(td);
      })();

      // モーダルで開くよう変更
    }
  });
}

export function modifyTable(){
  const filter = getFilter();

  Array.from(document.body.querySelectorAll('tr+tr')).forEach((tr) => {
    const read = tr.querySelector('input[name="check_mk"]').checked;
    const highlighted = tr.querySelector('input[name="check_flag"]').checked;

    // 既読クラスを付与
    if(read){
      tr.classList.add('read');
    }else{
      tr.classList.remove('read');
    }

    // 強調クラスを付与
    if(highlighted){
      tr.classList.add('highlighted');
    }else{
      tr.classList.remove('highlighted');
    }

    // 行頭を調整
    const topCharList = ['「', '（', '【', '『', '［', '〈', '《', '〔', '｛'];
    ((td) => {
      if(topCharList.includes(td.textContent.replace(/^\s+/, '')[0])){
        tr.classList.add('blankHead');
      }else{
        tr.classList.remove('blankHead');
      }
    })(tr.querySelector('td:nth-child(7)'));

    // フィルターによる切り替え
    if(Array.isArray(filter)){
      tr.classList.add('hidden');

      if(filter.includes('all')){
        tr.classList.remove('hidden');
      }
      if(filter.includes('unread') && !read){
        tr.classList.remove('hidden');
      }
      if(filter.includes('highlighted') && highlighted){
        tr.classList.remove('hidden');
      }
    }
  });
}
