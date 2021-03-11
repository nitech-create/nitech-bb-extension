import removeTextNodes from './removeTextNodes.js';
import forEachTr from './forEachTr.js';
import {readControl, flagControl} from './ajax.js';
import {modifyTable} from './modifyTable.js';
import {showProgress, hideProgress} from './progressView.js';
import createButton from './createButton.js';

export function modifyHeader(){
  // 検索領域(ヘッダになる部分)のTextNodeを削除
  // どうしてもCSSで解決できなかった
  const div= document.querySelector('form > div:nth-of-type(2)');
  removeTextNodes(div);

  // 検索領域にアイコン用のdivを追加
  const iconDiv = document.createElement('div');
  iconDiv.classList.add('icon');
  div.appendChild(iconDiv);

  // ツールアイコンを追加
  const toolsDiv = document.createElement('div');
  toolsDiv.classList.add('tools');
  toolsDiv.appendChild(toolMakeRead());
  toolsDiv.appendChild(toolMakeUnread());
  toolsDiv.appendChild(toolMakeHigilighted());
  toolsDiv.appendChild(toolMakeUnhighlighted());
  div.appendChild(toolsDiv);

  updateHeader();
}

export function updateHeader(){
  const toolsDiv = document.querySelector('form > div:nth-of-type(2) div.tools');
  const someTrSelected = Array.from(document.body.querySelectorAll('tr+tr')).some((tr) => {
    const idDate  = tr.querySelector('input[name="id_date"]').value;
    const idIndex = tr.querySelector('input[name="id_index"]').value;
    const selected = document.getElementById(`${idDate}+${idIndex}+select`).checked;

    return selected;
  });

  if(someTrSelected){
    toolsDiv.classList.remove('unavailable');
  }else{
    toolsDiv.classList.add('unavailable');
  }
}

function makeButton(click, name, tooltip){
  return createButton(tooltip, name, click);
}

function deselectAll(){
  document.body.querySelectorAll('tr+tr').forEach((tr) => {
    const idDate  = tr.querySelector('input[name="id_date"]').value;
    const idIndex = tr.querySelector('input[name="id_index"]').value;
    document.getElementById(`${idDate}+${idIndex}+select`).checked = false;
  });
}

function toolMakeRead(){
  return makeButton(() => {
    showProgress();

    const idList = [];
    forEachTr((read, highlighted, selected, idDate, idIndex) => {
      if(selected && !read){
        idList.push({idDate, idIndex});
      }
    });

    const promiseList = idList.map(({idDate, idIndex}) => readControl(idDate, idIndex, true));
    Promise.all(promiseList).then((result) => {
      idList.forEach(({idDate, idIndex}, i) => {
        const id = `${idDate}+${idIndex}+check_mk`;
        document.getElementById(id).checked = (result[i] === 'true');
      });
      deselectAll();
      modifyTable();
      updateHeader();
      hideProgress();
    });
  }, 'makeRead', '既読にする');
}

function toolMakeUnread(){
  return makeButton(() => {
    showProgress();

    const idList = [];
    forEachTr((read, highlighted, selected, idDate, idIndex) => {
      if(selected && read){
        idList.push({idDate, idIndex});
      }
    });

    const promiseList = idList.map(({idDate, idIndex}) => readControl(idDate, idIndex, false));
    Promise.all(promiseList).then((result) => {
      idList.forEach(({idDate, idIndex}, i) => {
        const id = `${idDate}+${idIndex}+check_mk`;
        document.getElementById(id).checked = (result[i] === 'true');
      });
      deselectAll();
      modifyTable();
      updateHeader();
      hideProgress();
    });
  }, 'makeUnread', '未読にする');
}

function toolMakeHigilighted(){
  return makeButton(() => {
    showProgress();

    const idList = [];
    forEachTr((read, highlighted, selected, idDate, idIndex) => {
      if(selected && !highlighted){
        idList.push({idDate, idIndex});
      }
    });

    const promiseList = idList.map(({idDate, idIndex}) => flagControl(idDate, idIndex, true));
    Promise.all(promiseList).then((result) => {
      idList.forEach(({idDate, idIndex}, i) => {
        const id = `${idDate}+${idIndex}+check_flag`;
        document.getElementById(id).checked = (result[i] === 'true');
      });
      deselectAll();
      modifyTable();
      updateHeader();
      hideProgress();
    });
  }, 'toolMakeHigilighted', '強調する');
}

function toolMakeUnhighlighted(){
  return makeButton(() => {
    showProgress();

    const idList = [];
    forEachTr((read, highlighted, selected, idDate, idIndex) => {
      if(selected && highlighted){
        idList.push({idDate, idIndex});
      }
    });

    const promiseList = idList.map(({idDate, idIndex}) => flagControl(idDate, idIndex, false));
    Promise.all(promiseList).then((result) => {
      idList.forEach(({idDate, idIndex}, i) => {
        const id = `${idDate}+${idIndex}+check_flag`;
        document.getElementById(id).checked = (result[i] === 'true');
      });
      deselectAll();
      modifyTable();
      updateHeader();
      hideProgress();
    });
  }, 'makeUnhighlighted', '強調を消す');
}
