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

 for(let i=0; i<localStorage.length;i++){  //pętla iterujące przez localStorage
  const local = localStorage.getItem(localStorage.key(i));//pobranie z localStorage elementu o danym w pętli kluczu
  const object = JSON.parse(local);//parsowanie do obiektu
  const container = document.createElement('div');
  const del = document.createElement('span');
  const item = document.createElement('span');
  ul.prepend(container);
  container.appendChild(item);
  container.appendChild(del);
  item.textContent = object.item;
  container.classList = JSON.parse(object.itemClass);
  // container.classList.add('container');
  del.classList.add('delete');
  del.textContent = 'X';

  // if(object.status === 'done'){
  //   container.classList.add('done');
  //   item.classList.add('lineTrough');
  // }
}

addButon.addEventListener('click',(e)=>{
  const container = document.createElement('div');
  const del = document.createElement('span');
  const item = document.createElement('span');
  const form = document.getElementById('toList');
  const key = form.value;
  let object={
    class: '',
    item: '',
    status: 'notDone',
    containerClass: [],
    itemClass: [],

  }
  object.item = form.value;
  // object.class = 'item';
  object.itemClass[0] = 'item';
  
  
  item.textContent = object.item;
  
  ul.prepend(container);
  // li.appendChild(container);
  container.appendChild(item);
  container.appendChild(del);
  container.classList.add('container');
  del.classList.add('delete');
  item.classList.add(...object.itemClass);
  // item.classList.add(object.class);
  const stringify = JSON.stringify(object);
  localStorage.setItem(key,stringify);
  del.textContent = 'X';
  
  form.value = '';
  
})

ul.addEventListener('click', e=>{
  const key = e.target.textContent;
  const local = localStorage.getItem(key);
  let object = JSON.parse(local);

if(e.target.tagName === 'SPAN' && e.target.classList.contains('delete')){
  let key = e.target.previousElementSibling.textContent;//element obok, przed tym
  localStorage.removeItem(key);
  e.target.parentElement.remove();
}

if(e.target.tagName === 'SPAN' && e.target.classList.contains('item')){
  e.target.classList.toggle('lineTrough');
  e.target.parentElement.classList.toggle('done');
  object.itemClass = JSON.stringify(e.target.classList);
  localStorage.setItem(key,JSON.stringify(object));
  // const spanAtr = e.target.removeAttribute('class');
 
}
if(e.target.tagName === 'DIV' && e.target.classList.contains('container')){
  
  e.target.classList.toggle('done');
  e.target.firstChild.classList.toggle('lineTrough');
  if(e.target.classList.contains('done')){
    object.containerClass = 'done';
  }
  
  
  
 /*  if(attr === 'notDone'){
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

}  */

// localStorage.setItem(name,JSON.stringify(object));
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