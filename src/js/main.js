"use strict";

import { type } from "os";

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
let input = document.querySelector('.input')
let taskObject={
  taskName: '',
  key: '',
  taskClass:  [],
  containerClass: [],
  timeStamp: null,
}


input.addEventListener('submit', e =>{
    e.preventDefault();
    taskObject.taskName = input.form.value;
    taskObject.key = taskObject.taskName;
    input.reset();
    taskObject.containerClass = ['container'];
    taskObject.taskClass = '';
    const container = document.createElement('div');
    ul.prepend(container);
    container.classList.add(taskObject.containerClass);
    const taskName = document.createElement('span');
    container.appendChild(taskName);
    taskName.classList.add('item');
    taskName.innerText = taskObject.taskName;
    taskObject.taskClass = ['item'];
    const delButton = document.createElement('span');
    container.appendChild(delButton);
    delButton.classList.add('delete');
    delButton.innerText = 'X';
    const timeStamp = new Date();
    taskObject.timeStamp = timeStamp.getTime();
    const stringify = JSON.stringify(taskObject);
    localStorage.setItem(taskObject.key, stringify);
})
// const addButon = document.querySelector('.button');

 for(let i=0; i<localStorage.length;i++){  //pętla iterujące przez localStorage
  const local = localStorage.getItem(localStorage.key(i));//pobranie z localStorage elementu o danym w pętli kluczu
  const taskObject = JSON.parse(local);//parsowanie do obiektu
  console.log(taskObject);
  const container = document.createElement('div');
  ul.prepend(container);
  const containerClass = taskObject.containerClass;
  container.classList.add(...containerClass);
  let now = new Date();
  console.log(typeof now);
  let timeStamp = taskObject.timeStamp;
  console.log(typeof timeStamp);
  let timeDiff = now.getTime() - timeStamp;
  console.log(Math.round( timeDiff/1000/60));
  const timeCount = document.createElement('span');
  container.appendChild(timeCount);
  timeCount.classList.add('clock');
  timeCount.innerText = `${Math.round(timeDiff/1000/60)} min. ago`;
  const taskName = document.createElement('span');
  container.appendChild(taskName);
  taskName.innerText = taskObject.taskName;
  const taskClass = taskObject.taskClass;

  taskName.classList.add(...taskClass);
  
  const delButton = document.createElement('span');
  container.appendChild(delButton);
  delButton.classList.add('delete');
  delButton.innerText = 'X';
  

  

  // if(object.status === 'done'){
  //   container.classList.add('done');
  //   item.classList.add('lineTrough');
  // }
}

/* addButon.addEventListener('click',(e)=>{
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
  object.itemClass[0] = 'item';
  object.containerClass[0] = 'container';
  item.textContent = object.item;
  
  ul.prepend(container);
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
  
}) */

ul.addEventListener('click', e=>{
  const key = e.target.textContent;
  const local = localStorage.getItem(key);
  let taskObject = JSON.parse(local);

if(e.target.tagName === 'SPAN' && e.target.classList.contains('delete')){
  let key = e.target.previousElementSibling.textContent;//element obok, przed tym
  localStorage.removeItem(key);
  e.target.parentElement.remove();
}

if(e.target.tagName === 'SPAN' && e.target.classList.contains('item')){
  
  e.target.classList.toggle('itemDone');
  let taskClass = e.target.classList.value;
  taskObject.taskClass = taskClass.split(' ');
  e.target.parentElement.classList.toggle('containerDone');
  let containerClass = e.target.parentElement.classList.value;
  taskObject.containerClass = containerClass.split(' ');
  // console.log(typeof classes, classes);
  // console.log(classes.value);
  let stringify = JSON.stringify(taskObject);
  localStorage.setItem(key, stringify);
  // console.log(stringify);
  
  
  // console.log(taskObject);
  // object.itemClass[1] = e.target.classList[1];
  
  // object.containerClass[1] = e.target.parentElement.classList[1];
  // localStorage.setItem(key,JSON.stringify(object));
  // // const spanAtr = e.target.removeAttribute('class');
 
}
if(e.target.tagName === 'DIV' && e.target.classList.contains('container') || e.target.classList.contains('containerDone') ){
  e.target.classList.toggle('containerDone');
  let containerClass = e.target.classList.value;
  e.target.firstChild.classList.toggle('itemDone');
  let taskClass = e.target.firstChild.classList.value;
  // console.log(e.target.firstChild.classList.value);
  taskObject.taskClass = taskClass.split(' ');
  console.log(taskClass);
  let stringify = JSON.stringify(taskObject);
  localStorage.setItem(key, stringify);
  

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

// ul.addEventListener('dblclick',(e)=>{
//   if(e.target.tagName === 'DIV'){
//     e.target.remove();
    
//   }
//   const name = e.target.innerText;
//     console.log(name);
//     localStorage.removeItem(name);
// })