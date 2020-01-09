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
const backArrow = document.querySelector('.backArrow');
const date = document.getElementById('calendar');
const today = document.getElementById('calendar');
let bank = null;
const category = document.getElementById('category');
const title = document.getElementById('title');
const amount = document.getElementById('amount');
const okButton = document.getElementById('ok');
const newDate = new Date(date);
const transfer = document.querySelector('.transfer');
const ul = document.querySelector('ul');
let input = document.querySelector('.input')
const bankSelectWraper = document.querySelector('.bankSelectWraper');
const mbankIcon = document.getElementById('mbankIcon');
const pkoIcon = document.getElementById('pkoIcon');
const list = document.querySelector('.list');

bankSelectWraper.addEventListener('click', e =>{
  if(e.target.tagName === 'IMG' && e.target.id === 'mbankIcon'){
    e.target.classList.toggle('bankClicked');
    pkoIcon.classList.remove('bankClicked');
    bank = 'mBank';
  }
  else if(e.target.tagName === 'IMG' && e.target.id === 'pkoIcon'){
    e.target.classList.toggle('bankClicked');
    mbankIcon.classList.remove('bankClicked');
    bank = 'PKO';
  }
})

addButon.addEventListener('click', e =>{
  popup.style.display = 'block';
  list.classList.add('listHide');
  today.valueAsDate = new Date; //aktualna data w input date
  console.log(list);
})
cancel.addEventListener('click', e =>{
  popup.style.display = 'none';
  list.classList.remove('listHide');
})
backArrow.addEventListener('click', e=>{
  popup.style.display = 'none';
  list.classList.remove('listHide');

})

/******** add new transfer ********/
okButton.addEventListener('click', e =>{
  let bankObject ={};
  let bankArray = JSON.parse(localStorage.getItem('bankArray'));
  if(bankArray===null){
    bankArray = [];
  }
  if(bank != null){//warunek wykonania pętli 
    
  
  bankObject.bank = bank;
  bankObject.category = category.value;
  bankObject.date = date.value;
  bankObject.title = title.value;
  bankObject.amount = amount.value;
  // bankObject.key = new Date(bankObject.date).getTime();//tworzy klucz na podstwie 
  bankObject.status = '';
  const local = localStorage.getItem('keys')
  let keys = JSON.parse(local);
  // keys.push(new Date(bankObject.date).getTime());
  
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
    <div class="amount"></div> 
    <p class="title"></p>
    <div class="close">
    <button class="buttonClose">Cancel</button>
    <button class ="buttonDone">Done</button>
    </div>          
  </div`;
  ul.insertAdjacentHTML('afterbegin',container);
  const containerId = document.querySelector('.container');
  const image = document.querySelector('.image');
  const strip = document.querySelector('.strip');
  const categoryOutput = document.querySelector('.category');
  const dateOutput = document.querySelector('.strip');
  const titleOutput = document.querySelector('.title');
  const daysLeft = document.querySelector('.timeLeft');
  const amountOutput = document.querySelector('.amount');
  const statusCircle = document.querySelector('.statusCircle');
  const today = new Date();
  const trasferDay = new Date(bankObject.date);
  const timeLeft = Math.ceil( (trasferDay-today)/1000/60/60/24);
  containerId.setAttribute('id',today.getTime());
  bankObject.id = containerId.getAttribute('id');
  /* Tu skończyłem dodawanie id dla container i zapisanie go w bankObject */
  /* trzeba ogarnąć array.find() */
  bankObject.containerClass = containerId.classList.value;
  bankObject.statusCircleClass = statusCircle.classList.value;
  bankObject.timeLeftClass = daysLeft.classList.value;
  bankArray.push(bankObject);
  localStorage.setItem('bankArray', JSON.stringify(bankArray));
  if(timeLeft<=1){
    statusCircle.style.backgroundColor = 'crimson';
  }
  else if(timeLeft < 3){
    statusCircle.style.backgroundColor = 'orange';
  }
  if(bankObject.bank === 'mBank'){
    dateOutput.innerText = bankObject.date;
    strip.setAttribute('class', 'strip__mbank');
    image.setAttribute('src','assets/img/mbank 30x30.png');
    categoryOutput.innerText = bankObject.category;
    titleOutput.innerText = bankObject.title;
    amountOutput.innerText = `${bankObject.amount} zł`;
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
    amountOutput.innerText = `${bankObject.amount} zł`;
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

  popup.style.display = 'none';
  list.classList.remove('listHide');
  
}
    else{
    alert('Select the bank')//jeśli nie wybiorę banku
    }
}
)

const bankArray = JSON.parse(localStorage.getItem('bankArray'));//pobieranie array z kluczami 
if(bankArray != null){bankArray.sort((a,b)=> b.key - a.key);/* sortuje od największej do najmniejszej */

bankArray.reverse();//odwraca na od najmniejszej do największej 

/******* REFRESSH ***********/
for(let i=0; i<bankArray.length;i++){  //pętla iterujące przez localStorage
  //   /* get data from localStorage */
    
    const local = localStorage.getItem(bankArray[i]);//pobranie z localStorage elementu o danym w pętli kluczu
    const bankObject = JSON.parse(local);//parsowanie do obiektu
    const container = `<div class="container">
    <div class="strip"></div>
    <div class="logoWraper">
      <img class="image" src="">
      <div class="category"></div>
      <div class="statusCircle"></div>
    </div>
    <div class="timeLeft"></div> 
    <div class="amount"></div> 
    <p class="title"></p>
    <div class="close">
        <button class="buttonClose">Cancel</button>
        <button class ="buttonDone">Done</button>
    </div>          
  </div`;
  ul.insertAdjacentHTML('afterbegin',container);
  const close = document.querySelector('.close');
  const containerId = document.querySelector('.container');
  const image = document.querySelector('.image');
  const strip = document.querySelector('.strip');
  const categoryOutput = document.querySelector('.category');
  const dateOutput = document.querySelector('.strip');
  const titleOutput = document.querySelector('.title');
  const daysLeft = document.querySelector('.timeLeft');
  const amountOutput = document.querySelector('.amount');
  const statusCircle = document.querySelector('.statusCircle');
  const today = new Date();
  const trasferDay = new Date(bankArray[i].date);
  const timeLeft = Math.ceil( (trasferDay-today)/1000/60/60/24);
  containerId.setAttribute('id', bankArray[i].id);
  const containerClass = bankArray[i].containerClass.split(' ');
  containerId.classList.add(...containerClass);
  const statusCircleClass = bankArray[i].statusCircleClass.split(' ');
  statusCircle.classList.add(...statusCircleClass);
  const timeLeftClass = bankArray[i].timeLeftClass.split(' ');
  daysLeft.classList.add(...timeLeftClass);
  const trashBin = '<img class="trashBin" src="assets/img/delete 30x30.png" alt="trashBin icon">';
  const status =  bankArray[i].status;
  if(bankArray[i].status === 'done'){
      close.remove();
      
     
      daysLeft.classList.remove('timeLeftDone');
  }
   if(timeLeft<=1 && bankArray[i].status!='done'){
    statusCircle.style.backgroundColor = 'crimson';
  }
  else if(timeLeft < 3 && bankArray[i].status!='done'){
    statusCircle.style.backgroundColor = 'orange';
  }
  /* mBank template */
  if(bankArray[i].bank === 'mBank'){

    dateOutput.innerText = bankArray[i].date;
    strip.setAttribute('class', 'strip__mbank');
    image.setAttribute('src','assets/img/mbank 30x30.png');
    categoryOutput.innerText = bankArray[i].category;
    titleOutput.innerText = bankArray[i].title;
    amountOutput.innerText = `${bankArray[i].amount} zł`;
    if(status === 'done'){
      daysLeft.innerHTML = trashBin;
    }
    else if(timeLeft>0){
      daysLeft.innerText = `${timeLeft} d.`;
    }
    else if(timeLeft===0){
      daysLeft.innerText = 'today'
    }
    else if(timeLeft<0){
      daysLeft.innerText = `passed`
    }

  }
  /* PKO tamplate */
  else if(bankArray[i].bank === 'PKO'){
    dateOutput.innerText = bankArray[i].date;
    strip.setAttribute('class', 'strip__pko');
    image.setAttribute('src','assets/img/pkobp 467x485.png');
    categoryOutput.innerText = bankArray[i].category;
    titleOutput.innerText = bankArray[i].title;
    amountOutput.innerText = `${bankArray[i].amount} zł`;
    if(status === 'done'){
      daysLeft.innerHTML = trashBin;
    }
    else if(timeLeft>0){
      daysLeft.innerText = `${timeLeft} d.`;
    }
    else if(timeLeft===0){
      daysLeft.innerText = 'today'
    }
    else if(timeLeft<0){
      daysLeft.innerText = `passed`
    }
  }
  }
}
ul.addEventListener('click', e =>{
   
  if(e.target.tagName === 'DIV' && e.target.classList.contains('close')){
    e.target.children.item(0).classList.add('buttonClose--show');
    e.target.children.item(1).classList.add('buttonDone--show');
  }
  if(e.target.tagName ==='BUTTON' && e.target.classList.contains('buttonDone')){
    let bankArray = JSON.parse(localStorage.getItem('bankArray'));
    e.target.parentNode.parentNode.classList.add('containerDone');
    const containerId = e.target.parentNode.parentNode.getAttribute('id');
    const timeLeft = e.target.parentNode.parentNode.querySelector('.timeLeft');
    
    const trashBin = '<img class="trashBin" src="assets/img/delete 30x30.png" alt="trashBin icon">';
    timeLeft.innerHTML += trashBin;
    timeLeft.classList.add('timeLeftDone');
    
    
   
      e.target.parentNode.parentNode.children.item(2).classList.add('timeLeftDone');//time left div
      e.target.parentNode.parentNode.children.item(1).lastElementChild.classList.add('statusCircleDone');//status circle

     
    for(let i=0; i<bankArray.length; i++){
      const objectValues = Object.values(bankArray[i]);
      const includes = objectValues.includes(containerId);
      
      if(includes===true){
        bankArray[i].containerClass = e.target.parentNode.parentNode.classList.value;
        bankArray[i].timeLeftClass = e.target.parentNode.parentNode.children.item(2).classList.value;
        bankArray[i].statusCircleClass = e.target.parentNode.parentNode.children.item(1).lastElementChild.classList.value;
        bankArray[i].status = 'done';
        console.log(bankArray[i].containerClass);
        const local = JSON.stringify(bankArray);
        localStorage.setItem('bankArray',local);
      }
      
    }
    e.target.parentNode.remove();
  }
  if(e.target.classList.contains('buttonClose')){//tu trzeba poprawić !!
    e.target.classList.remove('buttonClose--show');
    e.target.parentElement.children.item(1).classList.remove('buttonDone--show');
  }
  if(e.target.classList.contains('trashBin')){//usuwanie elementu z listy 
    const containerId = e.target.parentElement.parentElement.getAttribute('id');
    e.target.parentElement.parentElement.remove();

    for(let i=0; i<bankArray.length; i++){//usuwanie elementu z localStorage
      const objectValues = Object.values(bankArray[i]);
      const includes = objectValues.includes(containerId);
      
      if(includes===true){
        bankArray.splice(i,1);
        const local = JSON.stringify(bankArray);
        localStorage.setItem('bankArray',local);
      }
      
    }
    
  }
  })