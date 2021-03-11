export default function createButton(tipLabel, className, click){
  const wrapper = document.createElement('div');
  const button = document.createElement('button');
  const tip = document.createElement('div');

  wrapper.className = 'toolButtonWrapper';

  button.className = 'toolButton ' + className;
  button.addEventListener('click', click);
  button.type = 'button';

  tip.textContent = tipLabel;
  tip.className = 'toolButtonTip';

  wrapper.appendChild(button);
  wrapper.appendChild(tip);

  return wrapper;
}
