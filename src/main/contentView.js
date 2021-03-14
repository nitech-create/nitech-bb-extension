import {getContent} from './ajax.js';
import {storeBulletin} from '../storage.js';
import createButton from './createButton.js';

export function initContentView(){
  const wrapper = document.createElement('div');
  const div = document.createElement('div');
  const div2 = document.createElement('div');
  wrapper.id = 'contentView';
  wrapper.classList.add('hidden');
  div2.classList.add('content');

  const button = document.createElement('button');
  button.classList.add('close');

  wrapper.addEventListener('click', () => { wrapper.classList.add('hidden') });
  div.addEventListener('click', (e) => { e.stopPropagation() });

  div.appendChild(div2);
  wrapper.appendChild(button);
  wrapper.appendChild(div);
  document.body.appendChild(wrapper);
}

export function contentView(idDate, idIndex){
  getContent(idDate, idIndex).then((contentStr) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(contentStr, 'text/html');
    const table = doc.querySelector('table');
    const tdList = Array.from(table.querySelectorAll('tr')).map((tr) => tr.querySelectorAll('td'));

    const bulletin = {
      title:        tdList[0][1].textContent.trim(),
      sender:       tdList[1][1].textContent.trim(),
      enforceStart: tdList[2][1].textContent.trim(),
      enforceEnd:   tdList[2][3].textContent.trim(),
      displayStart: tdList[3][1].textContent.trim(),
      displayEnd:   tdList[3][3].textContent.trim(),
      content:      tdList[4][0].innerHTML.trim(),
      idDate:  idDate,
      idIndex: idIndex
    }

    const el = document.querySelector('#contentView div div');
    el.innerHTML = `
    <h1>${bulletin.title}</h1>
    <section class="sender">${bulletin.sender}</section>
    <section class="displayTime">
      <span>掲示期間</span>
      <time>${bulletin.displayStart}</time>
      <span>-</span>
      <time>${bulletin.displayEnd}</time>
    </section>
    <section class="enforceTime">
      <span>実施期間</span>
      ` + (
        (bulletin.enforceStart || bulletin.enforceEnd) ?
        `<time>${bulletin.enforceStart}</time>
        <span>-</span>
        <time>${bulletin.enforceEnd}</time>`
        : 'なし'
      ) + `
    </section>
    <section class="content">${bulletin.content}</section>
    `;

    // ピン留めボタン
    document.querySelector('#contentView div div h1').appendChild(createButton('ピン留めする', '', () => {
      storeBulletin(bulletin);
    }));

    document.getElementById('contentView').classList.remove('hidden');
  });
}
