import {getFilterStr, setFilterStr} from './sessionStorage.js';
import {modifyTable} from './modifyTable.js';

export default function createMenu(){
  const menu = document.createElement('ul');
  menu.id = 'menu';

  const filterItems = [
    createFilterItem('すべて', 'all'),
    createFilterItem('未読のみ', 'unread'),
    createFilterItem('強調のみ', 'highlighted'),
    createFilterItem('未読と強調のみ', 'unread,highlighted')
  ];
  filterItems.forEach((item) => {
    menu.appendChild(item.element);
  });

  menu.addEventListener('click', () => {
    filterItems.forEach((item) => {
      item.update();
    });
    modifyTable();
  });

  return menu;
}

function createFilterItem(label, filterStr){
  const item = document.createElement('li');
  item.textContent = label;

  const update = () => {
    if(getFilterStr() === filterStr){
      item.classList.add('selected');
    }else{
      item.classList.remove('selected');
    }
  }
  update();

  item.addEventListener('click', (e) => {
    setFilterStr(filterStr);
  });

  return {
    element: item,
    update: update
  };
}
