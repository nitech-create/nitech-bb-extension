/*
export default function(){
  const firstLoaded = sessionStorage.getItem('loaded') !== 'true';
  if(firstLoaded) sessionStorage.setItem('loaded', 'true');
  return firstLoaded;
}
*/

export function firstLoaded(){
  return location.search === '?uri=loginTest&dummy=aaaa'
}

export function sessionExpired(){
  try{
    return document.querySelectorAll('td')[1].textContent.replace(/\s/g, '') === 'セッションがタイムアウトしました。'
  }catch{
    return false;
  }
}
