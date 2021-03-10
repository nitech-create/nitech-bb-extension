export function readControl(id_date, id_index, state){
  return new Promise((resolve, reject) => {
    if(typeof state !== 'boolean') reject(`Invalid state: ${state}`);

    const actionUri = document.querySelector('form').action;
    const uri = `${actionUri}?uri=readcontrol&id_date=${id_date}&id_index=${id_index}&checked=${state}`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', uri);
    xhr.onreadystatechange = function () {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          resolve(xhr.responseText);
        }else{
          reject(`read control failed: ${xhr.status}`);
        }
      }
    }
    xhr.send();
  });
}

export function flagControl(id_date, id_index, state){
  return new Promise((resolve, reject) => {
    if(typeof state !== 'boolean') reject(`Invalid state: ${state}`);

    const actionUri = document.querySelector('form').action;
    const uri = `${actionUri}?uri=flagcontrol&id_date=${id_date}&id_index=${id_index}&checked=${state}`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', uri);
    xhr.onreadystatechange = function () {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          resolve(xhr.responseText);
        }else{
          reject(`read control failed: ${xhr.status}`);
        }
      }
    }
    xhr.send();
  });
}

export function getContent(id_date, id_index){
  return new Promise((resolve, reject) => {
    const actionUri = document.querySelector('form').action;
    const uri = document.querySelector('input[name="uri"]').value;
    const uriToOpen = `${actionUri}?uri=${uri}&next_uri=detail&id_date=${id_date}&id_index=${id_index}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', uriToOpen);
    xhr.onreadystatechange = function () {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          resolve(xhr.responseText);
        }else{
          reject(`content obtain failed: ${xhr.status}`);
        }
      }
    }
    xhr.send();
  });
}
