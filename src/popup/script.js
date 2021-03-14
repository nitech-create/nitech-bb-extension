import {getStoredBulletin, removeBulletin} from '../storage.js';
import './style.scss';

async function init(){
  const bulletinList = await getStoredBulletin();

  const elList = document.querySelector('#pinned ul');

  bulletinList.forEach((bulletin) => {
    const li = document.createElement('li');
    li.classList.add('collapsed');
    li.addEventListener('click', () => {
      li.classList.toggle('collapsed');
    })

    li.innerHTML = `
    <h1>
      ${bulletin.title}
      <button>
        <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve">
        <g>
        	<path class="st0" d="M88.594,464.731C90.958,491.486,113.368,512,140.234,512h231.523c26.858,0,49.276-20.514,51.641-47.269
        		l25.642-335.928H62.952L88.594,464.731z M329.183,221.836c0.357-5.876,5.4-10.349,11.277-9.992
        		c5.877,0.357,10.342,5.409,9.993,11.277l-10.129,202.234c-0.357,5.876-5.4,10.342-11.278,9.984
        		c-5.876-0.349-10.349-5.4-9.992-11.269L329.183,221.836z M245.344,222.474c0-5.885,4.772-10.648,10.657-10.648
        		c5.885,0,10.656,4.763,10.656,10.648v202.242c0,5.885-4.771,10.648-10.656,10.648c-5.885,0-10.657-4.763-10.657-10.648V222.474z
        		 M171.531,211.844c5.876-0.357,10.92,4.116,11.278,9.992l10.137,202.234c0.357,5.869-4.116,10.92-9.992,11.269
        		c-5.869,0.357-10.921-4.108-11.278-9.984l-10.137-202.234C161.182,217.253,165.654,212.201,171.531,211.844z" style="fill: rgb(75, 75, 75);"></path>
        	<path class="st0" d="M439.115,64.517c0,0-34.078-5.664-43.34-8.479c-8.301-2.526-80.795-13.566-80.795-13.566l-2.722-19.297
        		C310.388,9.857,299.484,0,286.642,0h-30.651H225.34c-12.825,0-23.728,9.857-25.616,23.175l-2.721,19.297
        		c0,0-72.469,11.039-80.778,13.566c-9.261,2.815-43.357,8.479-43.357,8.479C62.544,67.365,55.332,77.172,55.332,88.38v21.926h200.66
        		h200.676V88.38C456.668,77.172,449.456,67.365,439.115,64.517z M276.318,38.824h-40.636c-3.606,0-6.532-2.925-6.532-6.532
        		s2.926-6.532,6.532-6.532h40.636c3.606,0,6.532,2.925,6.532,6.532S279.924,38.824,276.318,38.824z" style="fill: rgb(75, 75, 75);"></path>
        </g>
        </svg>
      </button>
    </h1>
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

    li.querySelector('h1 button').addEventListener('click', (e) => {
      e.stopPropagation();
      removeBulletin(bulletin.idDate, bulletin.idIndex);
      li.classList.add('deleted');
    });

    elList.appendChild(li);
  });
}

window.addEventListener('load', init);
