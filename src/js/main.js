"use strict";

// service worker registration - remove if you're not going to use it

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

const ul = document.querySelector('ul');

const addButon = document.querySelector('.button');

/* for(let i=0; i<localStorage.length;i++){  
  const div = document.createElement('div');
  const local = localStorage.getItem(localStorage.key(i));
  const object = JSON.parse(local);
  
  let task = object.task;
  div.textContent = task;
  div.setAttribute('class',object.class);
  ul.prepend(div);
} */

addButon.addEventListener('click',(e)=>{
  const li = document.createElement('li');
  const container = document.createElement('div');
  const del = document.createElement('span');
  const item = document.createElement('div');
  const form = document.getElementById('toList');
  const key = form.value;
  let object={
    class: '',
    task: '',
  }
  object.task = form.value;
  object.class = 'notDone';
  const stringify = JSON.stringify(object);
  console.log(`Stringify -> ${stringify}`);
  localStorage.setItem(key,stringify);
  const parse = JSON.parse(stringify);
  item.textContent=form.value;
  // container.setAttribute('class', object.class);
  ul.prepend(container);
  // li.appendChild(container);
  container.appendChild(item);
  container.appendChild(del);
  // del.classList.add('delete');
  // li.classList.add('notDone');
  del.textContent = 'x';
  form.value = '';
})


ul.addEventListener('click', e=>{
if(e.target.tagName === 'SPAN'){
  // e.target.parentElement.removeAttribute('class');
  // const spanAtr = e.target.removeAttribute('class');
  e.target.parentElement.remove();
  
}
if(e.target.tagName === 'DIV'){
  const attr = e.target.getAttribute('class'); 
  const name = e.target.innerText;
  const clas = localStorage.getItem(name);
  let object = JSON.parse(clas);
  
  
  
  if(attr === 'notDone'){
  e.target.setAttribute('class','lineTrough');
  object.class = 'lineTrough';
  // e.target.setAttribute('style','width: 200px;');
  // localStorage.setItem(name,JSON.stringify(object));
  console.log(object.class);

}
 if(attr === 'lineTrough'){
  // e.target.removeAttribute('class');
  e.target.setAttribute('class','notDone');
  object.class = 'notDone';
  console.log(object.class);

} 

localStorage.setItem(name,JSON.stringify(object));
  // localStorage.setItem('atr',attr);
  // console.log(attr);
  // alert(attr);
}
})

ul.addEventListener('dblclick',(e)=>{
  if(e.target.tagName === 'DIV'){
    e.target.remove();
    
  }
  const name = e.target.innerText;
    console.log(name);
    localStorage.removeItem(name);
})