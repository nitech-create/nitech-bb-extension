import {promiseWrapper} from 'Lib';

export async function getStoredBulletin(){
  const data = await promiseWrapper.storage.local.get('pinnedBulletin');
  const bulletinList = (data && data.pinnedBulletin) ? data.pinnedBulletin : [];

  return bulletinList;
}

export async function storeBulletin(bulletin){
  const bulletinList = await getStoredBulletin();

  const index = bulletinList.findIndex((b) => b.idDate === bulletin.idDate && b.idIndex === bulletin.idIndex);

  if(index !== -1){
    // すでに存在する要素を消去
    // 一番最初に移動する形になる
    bulletinList.splice(index, 1);
  }

  await promiseWrapper.storage.local.set({pinnedBulletin: [bulletin, ...bulletinList]});
}

export async function removeBulletin(idDate, idIndex){
  const bulletinList = await getStoredBulletin();

  const newBulletinList = bulletinList.filter((bulletin) => bulletin.idDate !== idDate && bulletin.idIndex !== idIndex);

  await promiseWrapper.storage.local.set({pinnedBulletin: newBulletinList});
}
