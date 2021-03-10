export function getFilterStr(){
  let filterStr = sessionStorage.getItem('filter');
  if(!(typeof filterStr === 'string')){
    // フィルター未設定
    filterStr = 'all';
    setFilterStr(filterStr);
  }
  return filterStr;
}

export function setFilterStr(filterStr){
  if(typeof filterStr === 'string'){
    sessionStorage.setItem('filter', filterStr);
  }
}

export function getFilter(){
  return getFilterStr().split(',');
}

export function setFilter(filter){
  if(Array.isArray(filter)){
    setFilterStr(filter.join(','));
  }
}
