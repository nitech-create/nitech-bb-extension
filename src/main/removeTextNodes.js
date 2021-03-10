export default function(el){
  el.childNodes.forEach((node) => {
    if(node.nodeName === '#text') el.removeChild(node);
  });
}
