import './style.scss';
import createMenu from './menu.js';
import {firstLoaded, sessionExpired} from './pageState.js';
import {init as modifyTableInit, modifyTable} from './modifyTable.js';
import {modifyHeader} from './modifyHeader.js';
import {setToToggle, getToToggle} from './sessionStorage.js';
import {initContentView} from './contentView.js';
import {initProgressView} from './progressView.js'

const debug = true;
const log = (...args) => {if(debug) console.log(...args)}

function pageStart(){
  log('started');

  if(firstLoaded()){
    // 初回読み込み時
    log('first');

    // 「既読非表示」を解除
    const elHideRead = document.querySelector('input[name="check_no_read"]');
    if(elHideRead.checked){
      elHideRead.click();
    }
  }

  if(sessionExpired()){
    // セッションタイムアウト時
    // リロード
    window.open('https://rpxkeijiban3.ict.nitech.ac.jp/keijiban/app?uri=loginTest&dummy=aaaa', '_self');
  }

  // 掲示板の調整
  modifyTableInit();
  modifyTable();

  // インラインCSS削除
  document.body.querySelectorAll('*').forEach((el) => el.style = undefined);

  // ヘッダ(検索領域を変形してヘッダにしている)の調整
  modifyHeader();

  // メニューを生成
  document.querySelector('form').appendChild(createMenu());

  // 掲示表示を追加
  initContentView();

  // 処理中表示を追加
  initProgressView();
}

window.addEventListener('load', pageStart);
