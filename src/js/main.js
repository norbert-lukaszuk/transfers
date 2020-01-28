"use strict";

import { type } from "os";

// service worker registration - remove if you're not going to use it

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('serviceworker.js').then(function (registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function (err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('.navigation');
const addButon = document.querySelector('.button__add');
const popup = document.querySelector('.popup');
const cancel = document.getElementById('cancel');
const backArrow = document.querySelector('.backArrow');
const date = document.getElementById('calendar');
const today = document.getElementById('calendar');
let bank__clicked = null;
const calendarPopup = document.querySelector('.calendar__popup');
const category = document.getElementById('category');
const title = document.getElementById('title');
const amount = document.getElementById('amount');
const okButton = document.getElementById('ok');
const calendarButton = document.querySelector('.button__calendar');
const calendarBackArow = document.querySelector('.calendar__backArow');
const calendarWraper = document.querySelector('.calendar__wraper');
const newDate = new Date(date);
const transfer = document.querySelector('.transfer');
const ul = document.querySelector('.list__transfers');
let input = document.querySelector('.input')
const bankSelectWraper = document.querySelector('.bankSelectWraper');
const mbankIcon = document.getElementById('mbankIcon');
const pkoIcon = document.getElementById('pkoIcon');
const list = document.querySelector('.list');

hamburger.addEventListener('click', e=>{
  hamburger.classList.toggle('hamburger__active');
  navigation.classList.toggle('navigation--active');
  
})
bankSelectWraper.addEventListener('click', e => {
  if (e.target.tagName === 'IMG' && e.target.id === 'mbankIcon') {
    e.target.classList.toggle('bankClicked');
    pkoIcon.classList.remove('bankClicked');
    bank__clicked = 'mBank';
  }
  else if (e.target.tagName === 'IMG' && e.target.id === 'pkoIcon') {
    e.target.classList.toggle('bankClicked');
    mbankIcon.classList.remove('bankClicked');
    bank__clicked = 'PKO';
  }
})
/****Otwieranie popupa  */
addButon.addEventListener('click', e => {
  popup.style.display = 'block';
  list.classList.add('listHide');
  today.valueAsDate = new Date(); //aktualna data w input date
})

/****** włączanie widoku kalendarza******/
calendarButton.addEventListener('click', e => {
  calendarPopup.classList.toggle('calendar__popup--show');
  const today = new Date();
  for (let i = 0; i < 12; i++) {
    const calendarWraper = document.getElementById(i.toString());
    // let daysInMonth = new Date(2020,i+1,0).getDate()//number of days in month
    // const month = today.getMonth();
    for (let j = 1; j <= 42; j++) {
      calendarWraper.innerHTML += `<div class="day"></div>`;
    }
    // ułożenie prawidłowe dni w miesiącu
    const days = calendarWraper.querySelectorAll('.day');
    const firstDay = monthFirstDay(1, i, 2020) - 1;

    for (let k = firstDay; k < (firstDay + daysInMonth(i)); k++) {
      days[k].innerHTML += `<span class="day__number">${(k - firstDay) + 1}</span><span class="day__name">${dayOfWeek((k - firstDay) + 1, i, 2020)}</span>`//wypisuje dzień miesiąca i dzień tygodnia w komórce kalendarza 
      if (days[k].lastElementChild.innerText === 'Sun') {
        days[k].classList.add('day--sunday');
      }
    }
    const allDays = calendarWraper.querySelectorAll('.day');

    allDays.forEach(e => {
      if (e.innerHTML === '' && window.innerWidth <= 360) {
        e.classList.add('day__mobile--hide');
      }
      else if (e.innerHTML === '') { e.classList.remove('day') }

    })
  }
  const allDaysOrder = document.querySelectorAll('.day');
  allDaysOrder.forEach(e => {
    if (parseInt(e.firstElementChild.innerText) === today.getDate() && parseInt(e.parentElement.getAttribute('id'))===today.getMonth()){
      e.firstElementChild.classList.add('day__number--today')
    }
  })

  const bankArray = JSON.parse(localStorage.getItem('bankArray'));
  bankArray.forEach(e => {
    let bankArrayDate = new Date(e.date);
    let month = bankArrayDate.getMonth().toString();
    let calendar__wraper = document.getElementById(month);
    let day = bankArrayDate.getDate();
    const daysInMonth = calendar__wraper.querySelectorAll('.day');
    daysInMonth[day].innerHTML += `<span class="day__category">${e.category}</span>`;

  })


})

calendarBackArow.addEventListener('click', e => {
  calendarPopup.classList.remove('calendar__popup--show');
  const allDays = document.querySelectorAll('.day');
  allDays.forEach(e => {
    e.remove();
  })

})
cancel.addEventListener('click', e => {
  popup.style.display = 'none';
  list.classList.remove('listHide');
})
backArrow.addEventListener('click', e => {
  popup.style.display = 'none';
  list.classList.remove('listHide');

})

/******** add new transfer ********/
okButton.addEventListener('click', e => {
  let bankObject = {};
  let bankArray = JSON.parse(localStorage.getItem('bankArray'));
  if (bankArray === null) {
    bankArray = [];
  }
  const category = document.getElementById('category');
  if (bank__clicked != null) {//warunek wykonania pętli 

    bankObject.bank = bank__clicked;
    bankObject.category = category.value;
    bankObject.date = date.value;
    bankObject.title = title.value;
    bankObject.amount = amount.value;
    bankObject.status = '';
    bankObject.id = new Date().getTime();
    bankArray.push(bankObject);
    localStorage.setItem('bankArray', JSON.stringify(bankArray));
    
    const{bank, category:cat, date:dat, title:tit, amount:amun, status:stat, id:idNum} = bankObject;
    console.log(tit);
    if(bank==='mBank'){
      const mbank_container = `<div class="container" id="${idNum}">
        <div class="strip__mbank">${dat}</div>
        <div class="logoWraper">
          <img class="image" src="assets/img/mbank 30x30.png">
          <div class="category">${cat}</div>
          <div class="statusCircle ${statusCircle(daysLeft(dat))}"></div>
        </div>
        <div class="timeLeft">${daysLeft(dat)} d.</div> 
        <div class="amount">${amun} zł</div> 
        <p class="title">${tit}</p>
        <div class="close">
        <button class="buttonClose">Cancel</button>
        <button class ="buttonDone">Done</button>
        </div>          
        </div`;
        ul.innerHTML += mbank_container;
    }
    if(bank==='PKO'){
      const pko_container = `<div class="container id="${idNum}">
      <div class="strip__pko">${dat}</div>
      <div class="logoWraper">
        <img class="image" src="assets/img/pkobp 467x485.png">
        <div class="category">${cat}</div>
        <div class="statusCircle ${statusCircle(daysLeft(dat))}"></div>
      </div>
      <div class="timeLeft">${daysLeft(dat)} d.</div> 
      <div class="amount">${amun}</div> 
      <p class="title">${tit}</p>
      <div class="close">
      <button class="buttonClose">Cancel</button>
      <button class ="buttonDone">Done</button>
      </div>          
    </div`;
        ul.innerHTML += pko_container;
    }  
    transfer.reset();// reset() resetuje tylko form
  //   const container = `<div class="container">
  //   <div class="strip"></div>
  //   <div class="logoWraper">
  //     <img class="image" src="">
  //     <div class="category"></div>
  //     <div class="statusCircle"></div>
  //   </div>
  //   <div class="timeLeft"></div> 
  //   <div class="amount"></div> 
  //   <p class="title"></p>
  //   <div class="close">
  //   <button class="buttonClose">Cancel</button>
  //   <button class ="buttonDone">Done</button>
  //   </div>          
  // </div`;
  //   ul.insertAdjacentHTML('afterbegin', container);
  //   const containerId = document.querySelector('.container');
  //   const image = document.querySelector('.image');
  //   const strip = document.querySelector('.strip');
  //   const categoryOutput = document.querySelector('.category');
  //   const dateOutput = document.querySelector('.strip');
  //   const titleOutput = document.querySelector('.title');
  //   const daysLeft = document.querySelector('.timeLeft');
  //   const amountOutput = document.querySelector('.amount');
  //   const statusCircle = document.querySelector('.statusCircle');
  //   const today = new Date();
  //   const trasferDay = new Date(bankObject.date);
  //   const timeLeft = Math.ceil((trasferDay - today) / 1000 / 60 / 60 / 24);
  //   containerId.setAttribute('id', today.getTime());
  //   bankObject.id = containerId.getAttribute('id');
  //   /* Tu skończyłem dodawanie id dla container i zapisanie go w bankObject */
  //   /* trzeba ogarnąć array.find() */
  //   bankObject.containerClass = containerId.classList.value;
  //   bankObject.statusCircleClass = statusCircle.classList.value;
  //   bankObject.timeLeftClass = daysLeft.classList.value;
    
  //   localStorage.setItem('bankArray', JSON.stringify(bankArray));
  //   if (timeLeft <= 1) {
  //     statusCircle.style.backgroundColor = 'crimson';
  //   }
  //   else if (timeLeft < 3) {
  //     statusCircle.style.backgroundColor = 'orange';
  //   }
  //   if (bankObject.bank === 'mBank') {
  //     dateOutput.innerText = bankObject.date;
  //     strip.setAttribute('class', 'strip__mbank');
  //     image.setAttribute('src', 'assets/img/mbank 30x30.png');
  //     categoryOutput.innerText = bankObject.category;
  //     titleOutput.innerText = bankObject.title;
  //     amountOutput.innerText = `${bankObject.amount} zł`;
  //     if (timeLeft > 0) {
  //       daysLeft.innerText = `${timeLeft} d.`;
  //     }
  //     else if (timeLeft === 0) {
  //       daysLeft.innerText = 'today'
  //     }
  //     else if (timeLeft < 0) {
  //       daysLeft.innerText = `passed`
  //     }
  //   }
  //   else if (bankObject.bank === 'PKO') {
  //     dateOutput.innerText = bankObject.date;
  //     strip.setAttribute('class', 'strip__pko');
  //     image.setAttribute('src', 'assets/img/pkobp 467x485.png');
  //     categoryOutput.innerText = bankObject.category;
  //     titleOutput.innerText = bankObject.title;
  //     amountOutput.innerText = `${bankObject.amount} zł`;
  //     if (timeLeft > 0) {
  //       daysLeft.innerText = `${timeLeft} d.`;
  //     }
  //     else if (timeLeft === 0) {
  //       daysLeft.innerText = 'today'
  //     }
  //     else if (timeLeft < 0) {
  //       daysLeft.innerText = `passed`
  //     }
  //   }

    popup.style.display = 'none';
    list.classList.remove('listHide');

  }
  else {
    alert('Select the bank')//jeśli nie wybiorę banku
  }
}
)


  /******* REFRESSH ***********/
  const daysLeft = (date)=>{
    const days =  Math.ceil((new Date(date) - new Date())/1000/60/60/24);
  if(days>30){
    return `${Math.ceil(days/30)}`
  }
  else{return `${days}`}
  }
  
  const statusCircle = (timeLeft) =>{
  if(timeLeft>=3){
    return 'statusCircle--green'
  }
  else if(timeLeft==2){
    return 'statusCircle--yellow'
  }
  else if(timeLeft<=1){
    return 'statusCircle--crimson'
  }
  }
  const bankArray = JSON.parse(localStorage.getItem('bankArray'));
  bankArray.forEach(e => {
      const keys = Object.keys(e);
      const{bank, category, date, title, amount, status, id, containerClass, statusCircleClass, timeLeftClass}=e;
      const mbank_container = `<div class="container" id="${id}">
      <div class="strip__mbank">${date}</div>
      <div class="logoWraper">
        <img class="image" src="assets/img/mbank 30x30.png">
        <div class="category">${category}</div>
        <div class="statusCircle ${statusCircle(daysLeft(date))}"></div>
      </div>
      <div class="timeLeft">${daysLeft(date)} d.</div> 
      <div class="amount">${amount} zł</div> 
      <p class="title">${title}</p>
      <div class="close">
      <button class="buttonClose">Cancel</button>
      <button class ="buttonDone">Done</button>
      </div>          
    </div`;
      const pko_container = `<div class="container" id="${id}">
      <div class="strip__pko">${date}</div>
      <div class="logoWraper">
        <img class="image" src="assets/img/pkobp 467x485.png">
        <div class="category">${category}</div>
        <div class="statusCircle ${statusCircle(daysLeft(date))}"></div>
      </div>
      <div class="timeLeft">${daysLeft(date)} d.</div> 
      <div class="amount">${amount}</div> 
      <p class="title">${title}</p>
      <div class="close">
      <button class="buttonClose">Cancel</button>
      <button class ="buttonDone">Done</button>
      </div>          
    </div`;
      const done_container = `<div class="container">
      <div class="strip__done">${date}</div>
      <div class="logoWraper">
        
        <div class="category">${category}</div>
        <div class="statusCircle statusCircleDone"></div>
      </div>
      <div class="timeLeft timeLeftDone"></div> 
      <div class="amount">${amount}</div> 
      <p class="title">${title}</p>
      <div class="close close--done">
      <img class="image__trashBin" src="assets/img/delete 30x30.png">
      <img src="assets/img/checked 64x64.png">
      </div>          
    </div`;
    if(status ==='done'){
      ul.innerHTML += done_container;
    }
    if(bank==='mBank'){
        ul.innerHTML += mbank_container;
    }
    if(bank === 'PKO'){
        ul.innerHTML += pko_container;
    }
  })

ul.addEventListener('click', e => {

  if (e.target.tagName === 'DIV' && e.target.classList.contains('close')) {
    e.target.firstElementChild.classList.add('buttonClose--show');
    e.target.lastElementChild.classList.add('buttonDone--show');
  }
  if(e.target.tagName === 'BUTTON' && e.target.classList.contains('buttonDone')) {
    let bankArray = JSON.parse(localStorage.getItem('bankArray'));
    const containerId = parseInt(e.target.parentNode.parentNode.getAttribute('id'));
   
    bankArray.forEach(f=>{
      console.log(containerId, f.id);
       if(containerId ===f.id){
         f.status = 'done'
          const {date, category, amount, title} = f;
         const swap__container = document.getElementById(JSON.stringify(containerId));
         swap__container.innerHTML = `<div class="strip__done">${date}</div>
         <div class="logoWraper">
           <img class="image__trashBin" src="assets/img/delete 30x30.png">
           <div class="category">${category}</div>
           <div class="statusCircle statusCircleDone"></div>
         </div>
         <div class="timeLeft timeLeftDone"></div> 
         <div class="amount">${amount}</div> 
         <p class="title">${title}</p>
        //  <div class="close close--done">
         <img src="assets/img/checked 64x64.png">
         </div>`        
       }
    })
    const local = JSON.stringify(bankArray);
    localStorage.setItem('bankArray',local);
    // e.target.parentNode.parentNode.classList.add('containerDone');
    
    // const timeLeft = e.target.parentNode.parentNode.querySelector('.timeLeft');

    // const trashBin = '<img class="trashBin" src="assets/img/delete 30x30.png" alt="trashBin icon">';
    // timeLeft.innerHTML += trashBin;
    // timeLeft.classList.add('timeLeftDone');



    // e.target.parentNode.parentNode.children.item(2).classList.add('timeLeftDone');//time left div
    // e.target.parentNode.parentNode.children.item(1).lastElementChild.classList.add('statusCircleDone');//status circle


    /* for (let i = 0; i < bankArray.length; i++) {
      const objectValues = Object.values(bankArray[i]);
      const includes = objectValues.includes(containerId);

      if (includes === true) {
        bankArray[i].containerClass = e.target.parentNode.parentNode.classList.value;
        bankArray[i].timeLeftClass = e.target.parentNode.parentNode.children.item(2).classList.value;
        bankArray[i].statusCircleClass = e.target.parentNode.parentNode.children.item(1).lastElementChild.classList.value;
        bankArray[i].status = 'done';
        console.log(bankArray[i].containerClass);
        const local = JSON.stringify(bankArray);
        localStorage.setItem('bankArray', local);
      }

    } */
    e.target.parentNode.remove();
  }
  if (e.target.classList.contains('buttonClose')) {//tu trzeba poprawić !!
    e.target.classList.remove('buttonClose--show');
    e.target.parentElement.children.item(1).classList.remove('buttonDone--show');
  }
  if (e.target.tagName ==='IMG' && e.target.classList.contains('image__trashBin')) {//usuwanie elementu z listy 
    console.log(e.target);
    // const containerId = e.target.parentElement.parentElement.getAttribute('id');
    
    // e.target.parentElement.parentElement.remove();

    for (let i = 0; i < bankArray.length; i++) {//usuwanie elementu z localStorage
      const objectValues = Object.values(bankArray[i]);
      const includes = objectValues.includes(containerId);
      if (includes === true) {
        bankArray.splice(i, 1);
        const local = JSON.stringify(bankArray);
        localStorage.setItem('bankArray', local);
      }
    }
  }
})
/*********Funkcje*********/
const daysInMonth = (month) => {
  return new Date(2020, month + 1, 0).getDate()
}
const dayOfWeek = (day, month, year) => {
  const dayNumber = new Date(year, month, day).getDay();

  switch (dayNumber) {
    case 0:
      return 'Sun';
      break;
    case 1:
      return 'Mon';
      break;
    case 2:
      return 'Tue';
      break;
    case 3:
      return 'Wen';
      break;
    case 4:
      return 'Thu';
      break;
    case 5:
      return 'Fri';
      break;
    case 6:
      return 'Sat';
      break;
  }
}
const monthFirstDay = (day, month, year) => {
  const startDay = new Date(year, month, day).getDay();
  if (startDay === 0) {
    return 7
  }
  else { return startDay }
}
