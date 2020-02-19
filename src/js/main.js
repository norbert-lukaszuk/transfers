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
const checkbox = document.getElementById('show__done');

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
const transfers = document.querySelector('.transfer');
const ul = document.querySelector('.list__transfers');
let input = document.querySelector('.input')
const bankSelectWraper = document.querySelector('.bankSelectWraper');
const mbankIcon = document.getElementById('mbankIcon');
const pkoIcon = document.getElementById('pkoIcon');
const list = document.querySelector('.list');
const Transfer = (amount, bank, category, date, status, title) =>{
    const transfer ={
      amount: amount,
      bank: bank,
      category: category,
      date: date,
      status: status,
      title: title,
      
    }
    return transfer
  }


const daysLeft = (date) => {//funkcja zwraca liczbe dni miedzy datą a dziś
  return Math.ceil((new Date(date) - new Date()) / 1000 / 60 / 60 / 24);
}

const statusCircle = (timeLeft) => {//kolor kółka zależnie od ilości pozostałych dni
  if (timeLeft >= 3) {
    return 'statusCircle--green'
  }
  else if (timeLeft == 2) {
    return 'statusCircle--yellow'
  }
  else if (timeLeft <= 1) {
    return 'statusCircle--crimson'
  }
}

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

const addTransfer = (amount, bank, category, date, status, title)=>{
  const dayDifference = dateFns.differenceInDays(new Date(date), new Date());

  if (status === "done") {
    const html = `
    <div class="strip__done">${date}</div>
    <div class="logoWraper">
      <div class="category">${category}</div>
    </div>
    <div class="timeLeft timeLeftDone"></div> 
    <div class="container__bar container__bar--hide">
        <div class="amount">${amount} zł</div> 
        <p class="title">${title}</p>
            <div class="containerBar__icons containerBar__icons--done">
            <i class="icon__delete far fa-trash-alt"></i>
            </div>
        </div>
    <i class="arrow fas fa-chevron-down"></i>
  </div>`;
    return html;
  } else {
    const html = `
    <div class="strip__${bank}">${date}</div>
    <div class="logoWraper">
      <img class="image" src="assets/img/${bank} 30x30.png">
      <div class="category">${category}</div>
      <div class="statusCircle ${statusCircle(dayDifference)}"></div>
    </div>
    <div class="timeLeft">${dateFns.differenceInDays(
      new Date(date),
      new Date()
    )} d.</div> 
    <div class="container__bar container__bar--hide">
        <div class="amount">${amount} zł</div> 
        <p class="title">${title}</p>
            <div class="containerBar__icons">
            <i class="icon__checked far fa-check-square"></i>
            <i class="icon__edit far fa-edit"></i>
            <i class="icon__delete far fa-trash-alt"></i>
            </div>
        </div>
    <i class="arrow fas fa-chevron-down"></i>
    </div>`;
    return html;
  }
  
}

db.collection('bankTransfers').get()
.then(snapshot=>{
  snapshot.docs.forEach(doc=>{
    const li = document.createElement('li');
    li.setAttribute('data-id', doc.id);
    li.setAttribute('class', 'container');
    const data = doc.data();
    const dayDifference = dateFns.differenceInDays(new Date(data.date), new Date());
    const {amount, bank, category, date, status, title} = data;
    
    li.innerHTML = addTransfer(amount, bank, category, date, status, title); 
    ul.append(li);
  }
    
  )
})
ul.addEventListener('click', e=>{
  console.log(e.target.parentElement.parentElement.parentElement.getAttribute('data-id'));
  if(e.target.tagName === 'I' && e.target.classList.contains('arrow')){
  e.target.parentElement.children.item(3).classList.toggle('container__bar--hide');
  e.target.parentElement.children.item(4).classList.toggle('fa-rotate-180');
  }
  if(e.target.tagName === 'I' && e.target.classList.contains('icon__delete')){
    let id = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
    const list = document.querySelectorAll('li');
    console.log('my console log: list', list)
    }
})
hamburger.addEventListener('click', e => {
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
  navigation.classList.remove('navigation--active');
  hamburger.classList.remove('hamburger__active');
  today.valueAsDate = new Date(); //aktualna data w input date
})

/****** włączanie widoku kalendarza******/
calendarButton.addEventListener('click', e => {
  calendarPopup.classList.toggle('calendar__popup--show');
  navigation.classList.remove('navigation--active');
  hamburger.classList.remove('hamburger__active');
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
    const allDays = calendarWraper.querySelectorAll('div');
    allDays.forEach(e => {
      if (e.innerHTML === '' && window.innerWidth <= 360) {
        e.classList.add('day__mobile--hide');
      }
      else if (e.innerHTML === '') { e.classList.remove('day') }

    })
  }
  const allDaysOrder = document.querySelectorAll('.day');
  allDaysOrder.forEach(e => {
    if (e.firstElementChild != null && parseInt(e.firstElementChild.innerText) === today.getDate() && parseInt(e.parentElement.getAttribute('id')) === today.getMonth()) {
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
  // let bankObject = {};
  // let bankArray = JSON.parse(localStorage.getItem('bankArray'));
  // if (bankArray === null) {
  //   bankArray = [];
  // }
  const category = document.getElementById('category');
  if (bank__clicked != null) {//warunek wykonania pętli
   const bankObject = Transfer(transfers.amount.value, bank__clicked, transfers.category.value, transfers.date.value, '',transfers.title.value);
    
    db.collection('bankTransfers').add(bankObject).then(()=>{
      console.log('transfer added to firebase')
    })
    

    transfers.reset();// reset() resetuje tylko form
    //

    popup.style.display = 'none';
    list.classList.remove('listHide');

  }
  else {
    alert('Select the bank')//jeśli nie wybiorę banku
  }
}
)

checkbox.onchange = () => {
  const container__done = document.querySelectorAll('.container__done');
  if (checkbox.checked) {

    container__done.forEach(e => {
      e.classList.remove('container__done--hide');
    })
  }
  else { container__done.forEach(e => e.classList.add('container__done--hide')) }
}

/******* REFRESSH ***********/

// const bankArray = JSON.parse(localStorage.getItem('bankArray'));
// bankArray.forEach(e => {
//   const keys = Object.keys(e);
//   const { bank, category, date, title, amount, status, id, containerClass, statusCircleClass, timeLeftClass } = e;
//   const mbank_container = `<div class="container" id="${id}">
//       <div class="strip__mbank">${date}</div>
//       <div class="logoWraper">
//         <img class="image" src="assets/img/mbank 30x30.png">
//         <div class="category">${category}</div>
//         <div class="statusCircle ${statusCircle(daysLeft(date))}"></div>
//       </div>
//       <div class="timeLeft">${daysLeft(date)} d.</div> 
//       <div class="amount">${amount} zł</div> 
//       <p class="title">${title}</p>
//       <div class="close">
//       <button class="buttonClose">Cancel</button>
//       <button class ="buttonDone">Done</button>
//       </div>          
//     </div>`;
//   const pko_container = `<div class="container" id="${id}">
//       <div class="strip__pko">${date}</div>
//       <div class="logoWraper">
//         <img class="image" src="assets/img/pkobp 467x485.png">
//         <div class="category">${category}</div>
//         <div class="statusCircle ${statusCircle(daysLeft(date))}"></div>
//       </div>
//       <div class="timeLeft">${daysLeft(date)} d.</div> 
//       <div class="amount">${amount}</div> 
//       <p class="title">${title}</p>
//       <div class="close">
//       <button class="buttonClose">Cancel</button>
//       <button class ="buttonDone">Done</button>
//       </div>          
//     </div>`;
//   const done_container = `<div class="container container__done container__done--hide" id=${id}>
//       <div class="strip__done">${date}</div>
//       <div class="logoWraper">
//       <img class="image__trashBin" src="assets/img/delete 30x30.png">
//         <div class="category">${category}</div>
//         <img src="assets/img/checked 64x64.png">
//       </div>
//       <div class="timeLeft timeLeftDone"></div> 
//       <div class="amount">${amount}</div> 
//       <p class="title">${title}</p>
//     </div>`;
//   if (status === 'done') {
//     ul.innerHTML += done_container;
//   }
//   if (bank === 'mBank' && status != 'done') {
//     ul.innerHTML += mbank_container;
//   }
//   if (bank === 'PKO' && status != 'done') {
//     ul.innerHTML += pko_container;
//   }
// })

ul.addEventListener('click', e => {
  console.log(e.target);
  if(e.target.tagName === 'I' /* && e.target.classList.contains('arrow') */){
    console.log(e.target.tagName);
  }

  if (e.target.tagName === 'DIV' && e.target.classList.contains('close')) {
    e.target.firstElementChild.classList.add('buttonClose--show');
    e.target.lastElementChild.classList.add('buttonDone--show');
  }
  if (e.target.tagName === 'BUTTON' && e.target.classList.contains('buttonDone')) {
    let bankArray = JSON.parse(localStorage.getItem('bankArray'));
    const containerId = parseInt(e.target.parentNode.parentNode.getAttribute('id'));
    e.target.parentNode.parentNode.classList.add('container__done', 'container__done--hide');
    bankArray.forEach(f => {
      if (containerId === f.id) {
        f.status = 'done'
        const { date, category, amount, title } = f;
        const swap__container = document.getElementById(JSON.stringify(containerId));
        swap__container.innerHTML = `<div class="strip__done">${date}</div>
         <div class="logoWraper">
         <img class="image__trashBin" src="assets/img/delete 30x30.png">
           <div class="category">${category}</div>
           <img src="assets/img/checked 64x64.png">
         </div>
         <div class="timeLeft timeLeftDone"></div> 
         <div class="amount">${amount}</div> 
         <p class="title">${title}</p>`;
      }
    })
    const local = JSON.stringify(bankArray);
    localStorage.setItem('bankArray', local);
    e.target.parentNode.remove();
  }
  if (e.target.classList.contains('buttonClose')) {//tu trzeba poprawić !!
    e.target.classList.remove('buttonClose--show');
    e.target.parentElement.children.item(1).classList.remove('buttonDone--show');
  }
  if (e.target.tagName === 'IMG' && e.target.classList.contains('image__trashBin')) {//usuwanie elementu z listy 
    const containerId = parseInt(e.target.parentElement.parentElement.getAttribute('id'));
    const bankArray = JSON.parse(localStorage.getItem('bankArray'));
    let indexDel = null;
    const indexFun = (elemenent, index) => {
      if (elemenent.id === containerId) {
        indexDel = index
      }

    }
    bankArray.forEach(indexFun);
    console.log(indexDel);
    bankArray.splice(indexDel, 1);
    const local = JSON.stringify(bankArray);
    localStorage.setItem('bankArray', local);
    e.target.parentElement.parentElement.remove();

  }
})
