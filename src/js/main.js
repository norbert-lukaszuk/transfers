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
const addButon = document.querySelector('button.button');
const popup = document.querySelector('.popup');
const cancel = document.getElementById('cancel');
const date = document.getElementById('calendar');
const bank = document.getElementById('bank');
const category = document.getElementById('category');
const title = document.getElementById('title');
const okButton = document.getElementById('ok');
const newDate = new Date(date);
const transfer = document.querySelector('.transfer');

console.log(JSON.stringify(bank.value), typeof bank);
const ul = document.querySelector('ul');
let input = document.querySelector('.input')

addButon.addEventListener('click', e =>{
  popup.style.display = 'block';
  input.style.display = 'none';
})
cancel.addEventListener('click', e =>{
  popup.style.display = 'none';
  input.style.display = 'block';
})
okButton.addEventListener('click', e =>{
  let bankObject ={};
  bankObject.bank = bank.value;
  bankObject.category = category.value;
  bankObject.date = date.value;
  bankObject.title = title.value;
  bankObject.key = `${bankObject.title} ${bankObject.bank}`;
  localStorage.setItem(bankObject.key,JSON.stringify(bankObject));
  transfer.reset();// reset() resetuje tylko form
  const container = `<div class="container">
    <div class="strip"></div>
    <div class="logoWraper">
      <img class="image" src="">
      <div class="category"></div>
      <div class="statusCircle"></div>
    </div>
    <div class="timeLeft"></div>  
    <p class="title"></p>
    <div class="close">
    <button class ="buttonDone">Done</button>
    </div>          
  </div`;
  ul.insertAdjacentHTML('afterbegin',container);
  const image = document.querySelector('.image');
  const strip = document.querySelector('.strip');
  const categoryOutput = document.querySelector('.category');
  const dateOutput = document.querySelector('.strip');
  const titleOutput = document.querySelector('.title');
  const daysLeft = document.querySelector('.timeLeft');
  const statusCircle = document.querySelector('.statusCircle');
  const today = new Date();
  const trasferDay = new Date(bankObject.date);
  const timeLeft = Math.ceil( (trasferDay-today)/1000/60/60/24);
  if(timeLeft<=1){
    statusCircle.style.backgroundColor = 'crimson';
  }
  else if(timeLeft < 3){
    statusCircle.style.backgroundColor = 'orange';
  }
  console.log(timeLeft);
  console.log(category);
  if(bankObject.bank === 'mBank'){
    dateOutput.innerText = bankObject.date;
    strip.setAttribute('class', 'strip__mbank');
    image.setAttribute('src','assets/img/mbank 30x30.png');
    categoryOutput.innerText = bankObject.category;
    titleOutput.innerText = bankObject.title;
    daysLeft.innerText = `${timeLeft} d.`;
    
    
    
  }
  else if(bankObject.bank === 'PKO'){
    dateOutput.innerText = bankObject.date;
    strip.setAttribute('class', 'strip__pko');
    image.setAttribute('src','assets/img/pkobp 467x485.png');
    categoryOutput.innerText = bankObject.category;
    titleOutput.innerText = bankObject.title;
    daysLeft.innerText = `${timeLeft} d.`;
  }

  /* const container = document.createElement('div');
  ul.prepend(container);
  container.classList.add('container');
  const dateSpan = document.createElement('span');
  container.prepend(date);
  dateSpan.innerText = bankObject.date.valueAsDate; */
  popup.style.display = 'none';
  
})
for(let i=0; i<localStorage.length;i++){  //pętla iterujące przez localStorage
  //   /* get data from localStorage */
    const local = localStorage.getItem(localStorage.key(i));//pobranie z localStorage elementu o danym w pętli kluczu
    const bankObject = JSON.parse(local);//parsowanie do obiektu
    const container = `<div class="container">
    <div class="strip"></div>
    <div class="logoWraper">
      <img class="image" src="">
      <div class="category"></div>
      <div class="statusCircle"></div>
    </div>
    <div class="timeLeft"></div>  
    <p class="title"></p>
    <div class="close">
        <button class="buttonClose">Cancel</button>
        <button class ="buttonDone">Done</button>
    </div>          
  </div`;
  ul.insertAdjacentHTML('afterbegin',container);
  const image = document.querySelector('.image');
  const strip = document.querySelector('.strip');
  const categoryOutput = document.querySelector('.category');
  const dateOutput = document.querySelector('.strip');
  const titleOutput = document.querySelector('.title');
  const daysLeft = document.querySelector('.timeLeft');
  const statusCircle = document.querySelector('.statusCircle');
  const today = new Date();
  const trasferDay = new Date(bankObject.date);
  const timeLeft = Math.ceil( (trasferDay-today)/1000/60/60/24);
  if(timeLeft<=1){
    statusCircle.style.backgroundColor = 'crimson';
  }
  else if(timeLeft < 3){
    statusCircle.style.backgroundColor = 'orange';
  }
  console.log(timeLeft);
  console.log(category);
  if(bankObject.bank === 'mBank'){
    dateOutput.innerText = bankObject.date;
    strip.setAttribute('class', 'strip__mbank');
    image.setAttribute('src','assets/img/mbank 30x30.png');
    categoryOutput.innerText = bankObject.category;
    titleOutput.innerText = bankObject.title;
    if(timeLeft>0){
      daysLeft.innerText = `${timeLeft} d.`;
    }
    else if(timeLeft===0){
      daysLeft.innerText = 'today'
    }
    else if(timeLeft<0){
      daysLeft.innerText = `passed`
    }

  }
  else if(bankObject.bank === 'PKO'){
    dateOutput.innerText = bankObject.date;
    strip.setAttribute('class', 'strip__pko');
    image.setAttribute('src','assets/img/pkobp 467x485.png');
    categoryOutput.innerText = bankObject.category;
    titleOutput.innerText = bankObject.title;
    daysLeft.innerText = `${timeLeft} d.`;
  }
}
ul.addEventListener('click', e =>{
  
  if(e.target.tagName === 'DIV' /* && e.target.classList.contains('container') */){
    console.log(e.target.children.item(4));
    e.target.children.item(4).style.display = 'flex';//pozwala dostać się do konkretnego dziecka
  }
  if(e.target.tagName ==='BUTTON' && e.target.classList.contains('buttonDone')){
    console.log(e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.style.backgroundColor = 'rgba(128, 128, 128, 0.39)';
    e.target.parentElement.style.display = 'none';
    e.target.style.display = 'none';
    e.target.parentElement.children.item(0).style.display = 'none';
    e.target.parentNode.parentNode.children.item(2).style.color = 'transparent';
    e.target.parentNode.parentNode.children.item(1).lastElementChild.style.backgroundColor = 'transparent';
    
  }
  if(e.target.classList.contains('buttonClose')){
    e.target.parentElement.style.display = 'none';
  }
})
// const buttonDone = document.querySelector('.buttonDone');
  // console.log(buttonDone);
  // buttonDone.parentElement.style.backgroundColor = 'gray';

// /* const button__done = document.getElementById('buttonDone');
// console.log(button__done);
// button__done.addEventListener('click', e=>{
//   e.target.parentElement.remove();
// }) */
// input.addEventListener('submit', e =>{
//     e.preventDefault();
//     const container = `<div class="container">
//     <div class="strip__pko"></div>
//     <div class="logoWraper">
//       <img src="..assets/img/pkobp 467x485.jpg">
//       <div class="category"></div>
//       <div class="statusCircle"></div>
//     </div>
//     <div class="timeLeft"></div>  
//     <p class="title"></p>          
// </div`;
//   ul.insertAdjacentHTML('afterbegin',container);
//   const strip = document.querySelector('div.strip__pko');
//   console.log(strip);
//   strip.innerHTML = '31.12.2019';
//   const category = document.querySelector('.category');
//   category.innerHTML = 'Prąd';
  

    
//     /* taskObject.taskName = input.form.value;
//     taskObject.key = taskObject.taskName;
//     input.reset();
//     taskObject.containerClass = ['container'];
//     taskObject.taskClass = '';
//     const container = document.createElement('div');
//     ul.prepend(container);
//     container.classList.add(taskObject.containerClass);
//     const timeStamp = new Date();
//     taskObject.timeStamp = timeStamp.getTime();
//     const now = new Date();
//     const timeDiff = now - timeStamp;
//     const timeCount = document.createElement('span');
//     container.appendChild(timeCount);
//     timeCount.classList.add('clock');
//     let clockClass = timeCount.classList.value.split(' ');
//     taskObject.clockClass = clockClass;
  
//     timeCount.innerText = `${Math.round(timeDiff/1000)+1} s.ago`;
//     const taskWraper = document.createElement('div');
//     container.appendChild(taskWraper);
//     taskWraper.classList.add('taskWraper');
//     const taskName = document.createElement('span');
//     taskWraper.appendChild(taskName);
//     taskName.classList.add('item');
//     taskName.innerText = taskObject.taskName;
//     taskObject.taskClass = ['item'];
//     const delButton = document.createElement('span');
//     taskWraper.appendChild(delButton);
//     delButton.classList.add('delete');
//     delButton.innerText = 'X';
    
//     const stringify = JSON.stringify(taskObject);
//     localStorage.setItem(taskObject.key, stringify); */
// })


//  for(let i=0; i<localStorage.length;i++){  //pętla iterujące przez localStorage
//   /* get data from localStorage */
//   const local = localStorage.getItem(localStorage.key(i));//pobranie z localStorage elementu o danym w pętli kluczu
//   const taskObject = JSON.parse(local);//parsowanie do obiektu
//   /* container create */
//   const container = document.createElement('div');
//   ul.prepend(container);
//   const containerClass = taskObject.containerClass;
//   container.classList.add(...containerClass);
//   /* time stamp */
//   let now = new Date();
//   let timeStamp = taskObject.timeStamp;
//   let timeDiff = now.getTime() - timeStamp;
//   const timeCount = document.createElement('span');
//   container.appendChild(timeCount);
//   timeCount.classList.add(...taskObject.clockClass);
//   // const clockClass = taskObject.clockClass;
//   // timeCount.classList.add(...clockClass);//tu skończyłem dodawanie klas zegara z taskObject
//   // timeCount.classList.add('clock');
//   // timeCount.setAttribute('id',timeStamp);
//   // condition statments to cunt hours & days
//   if((timeDiff/1000)<60){
//     timeCount.innerText = `${Math.round(timeDiff/1000)} s.ago`
//   }
//   else if((timeDiff/1000/60)<59 /* && (timeDiff/1000/60/60/24) < 1  */){
//     timeCount.innerText = `${Math.round(timeDiff/1000/60)} m.ago`;
//     console.log(Math.round(timeDiff/1000/60), 'minuts');
//   }
//   else if((timeDiff/1000/60)>59 && (timeDiff/1000/60/60/24) < 1 ){
//     console.log(Math.round(timeDiff/1000/60/60), 'hours');
//     timeCount.innerText = `${Math.round(timeDiff/1000/60/60)} h. ago`;
//   }
//   else if((timeDiff/1000/60/60/24)>0){
//     console.log(Math.round(timeDiff/1000/60/60/24), 'days');
//     timeCount.innerText = `${Math.round(timeDiff/1000/60/60/24)} d. ago`;
//   }
  
//   /*  task & delete wraper create **/
//   const taskWraper = document.createElement('div');
//   container.appendChild(taskWraper);
//   taskWraper.setAttribute('class','taskWraper');
//   /*  task create */
//   const taskName = document.createElement('span');
//   taskWraper.appendChild(taskName);
//   taskName.innerText = taskObject.taskName;
//   const taskClass = taskObject.taskClass;
//   taskName.classList.add(...taskClass);
//   /* del button create */
//   const delButton = document.createElement('span');
//   taskWraper.appendChild(delButton);
//   delButton.classList.add('delete');
//   delButton.innerText = 'X';
  
// }


// ul.addEventListener('click', e=>{
//   const key = e.target.textContent;
//   const local = localStorage.getItem(key);
//   let taskObject = JSON.parse(local);
 
// if(e.target.tagName === 'SPAN' && e.target.classList.contains('delete')){
//   let key = e.target.previousElementSibling.textContent;//element obok, przed tym
//   localStorage.removeItem(key);
//   e.target.parentNode.parentElement.remove();
// }

// if(e.target.tagName === 'SPAN' && e.target.classList.contains('item')){
//   e.target.parentNode.parentNode.classList.toggle('containerDone');
//   console.log(taskObject);
//   e.target.classList.toggle('itemDone');
//   let taskClass = e.target.classList.value;
//   taskObject.taskClass = taskClass.split(' ');
//   // e.target.parentElement.classList.toggle('containerDone');
//   e.target.parentNode.parentNode.firstChild.classList.toggle('clockHide');
//   let containerClass = e.target.parentNode.parentNode.classList.value;
//   taskObject.containerClass = containerClass.split(' ');
//   e.target.parentNode.classList.add('taskWraperDone');
//   let stringify = JSON.stringify(taskObject);
//   localStorage.setItem(key, stringify);
  
// }

// if(e.target.tagName === 'DIV' && e.target.classList.contains('taskWraper') || e.target.classList.contains('taskWraperDone')){
//   const key = e.target.firstChild.textContent;
//   const local = localStorage.getItem(key);
//   taskObject = JSON.parse(local);
//   e.target.classList.toggle('taskWraperDone');
//   taskObject.taskWraperClass = e.target.classList.value.split(' ');
//   e.target.parentElement.classList.toggle('containerDone');
//   taskObject.containerClass = e.target.parentElement.classList.value.split(' ');
//   e.target.firstChild.classList.toggle('itemDone');
//   taskObject.taskClass = e.target.firstChild.classList.value.split(' ');
//   e.target.parentNode.firstChild.classList.toggle('clockHide');
//   taskObject.clockClass = e.target.parentNode.firstChild.classList.value.split(' ');
//   let stringify = JSON.stringify(taskObject);
//   localStorage.setItem(key, stringify);
// }

// /* if(e.target.tagName === 'DIV' && e.target.classList.contains('container') || e.target.classList.contains('containerDone') ){
//   e.target.classList.toggle('containerDone');
//   let containerClass = e.target.classList.value;
//   e.target.firstChild.classList.toggle('itemDone');
//   let taskClass = e.target.firstChild.classList.value;
//   // console.log(e.target.firstChild.classList.value);
//   e.target.firstChild.classList.toggle('taskWraperDone')
//   taskObject.taskClass = taskClass.split(' ');
//   console.log(taskClass);
//   let stringify = JSON.stringify(taskObject);
//   localStorage.setItem(key, stringify);
// } */
// })