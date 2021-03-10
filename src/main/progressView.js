export function initProgressView(){
  const div = document.createElement('div');
  div.id = 'progressView';
  div.classList.add('hidden');
  div.textContent = '処理中...'

  document.body.appendChild(div);
}

export function showProgress(){
  document.getElementById('progressView').classList.remove('hidden');
}

export function hideProgress(){
  document.getElementById('progressView').classList.add('hidden');
}
