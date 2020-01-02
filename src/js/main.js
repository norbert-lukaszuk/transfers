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
const ul = document.querySelector('ul');
let input = document.querySelector('.input')

let keys = localStorage.getItem('keys');
if(keys===null){
  keys =[];
  localStorage.setItem('keys',JSON.stringify(keys));
}
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
  let bankArray = JSON.parse(localStorage.getItem('bankArray'));
  if(bankArray===null){
    bankArray = [];
  }
  console.log(bankArray.value);
  bankObject.bank = bank.value;
  bankObject.category = category.value;
  bankObject.date = date.value;
  bankObject.title = title.value;
  bankObject.key = new Date(bankObject.date).getTime();//tworzy klucz na podstwie 
  bankArray.push(bankObject);
  const local = localStorage.getItem('keys')
  let keys = JSON.parse(local);
  // keys.push(new Date(bankObject.date).getTime());
  localStorage.setItem('bankArray', JSON.stringify(bankArray));
  // localStorage.setItem('keys',JSON.stringify(keys));
  // localStorage.setItem(bankObject.key,JSON.stringify(bankObject));
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

  popup.style.display = 'none';
  
})
/* TU SKOŃCZYŁEM  */
const keysArray = JSON.parse(localStorage.getItem('bankArray'));//pobieranie array z kluczami 
keysArray.sort((a,b)=> b.key - a.key);//sortuje od największej do najmniejszej   
// keysArray.reverse();//odwraca na od najmniejszej do największej 

for(let i=0; i<keysArray.length;i++){  //pętla iterujące przez localStorage
  //   /* get data from localStorage */
    
    const local = localStorage.getItem(keysArray[i]);//pobranie z localStorage elementu o danym w pętli kluczu
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
  console.log(keysArray[i]);
  const trasferDay = new Date(keysArray[i].date);
  const timeLeft = Math.ceil( (trasferDay-today)/1000/60/60/24);
  if(timeLeft<=1){
    statusCircle.style.backgroundColor = 'crimson';
  }
  else if(timeLeft < 3){
    statusCircle.style.backgroundColor = 'orange';
  }
  
  if(keysArray[i].bank === 'mBank'){

    dateOutput.innerText = keysArray[i].date;
    strip.setAttribute('class', 'strip__mbank');
    image.setAttribute('src','assets/img/mbank 30x30.png');
    categoryOutput.innerText = keysArray[i].category;
    titleOutput.innerText = keysArray[i].title;
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
  else if(keysArray[i].bank === 'PKO'){
    dateOutput.innerText = keysArray[i].date;
    strip.setAttribute('class', 'strip__pko');
    image.setAttribute('src','assets/img/pkobp 467x485.png');
    categoryOutput.innerText = keysArray[i].category;
    titleOutput.innerText = keysArray[i].title;
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