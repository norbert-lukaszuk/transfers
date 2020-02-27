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
const add__transfer = document.getElementById('add__transfer');
const addButon = document.getElementById('addButton');
const backArrow = document.getElementById('backArrow');
const calendarBackArrow = document.getElementById('calendarBackArrow');
const calendarButton = document.getElementById('calendarButton');
const calendarWraper = document.querySelector('.calendar__wraper');
const monthName__navigation = document.getElementById('monthNav')
const show__done = document.getElementById('show__done');
const transfers__submit = document.getElementById('transfers__submit');
const ul = document.getElementById('list__transfers');

const navigation = document.querySelector('.navigation');
const popup = document.querySelector('.popup');
const date = document.getElementById('calendar');
const today = document.getElementById('calendar');
let bank__clicked = null;
const calendarPopup = document.querySelector('.calendar__popup');
const category = document.getElementById('category');
const title = document.getElementById('title');
const amount = document.getElementById('amount');
const calendarBackArow = document.querySelector('.calendar__backArow');
const newDate = new Date(date);
const transfers = document.querySelector('.transfer');

let input = document.querySelector('.input')
const bankSelectWraper = document.querySelector('.bankSelectWraper');
const mbankIcon = document.getElementById('mbankIcon');
const pkoIcon = document.getElementById('pkoIcon');
const list = document.querySelector('.list');
// Get transfer info from form
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
const monthName = (month) =>{
  switch (month) {
    case 0:
      return 'January';
      break;
    
    case 1:
      return 'February';
      break;
    case 2:
      return 'March';
      break;
    case 3:
      return 'April';
      break;
    case 4:
      return 'May';
      break;
    case 5:
      return 'June';
      break;
    case 6:
      return 'July';
      break;
    case 7:
      return 'August';
      break;
    case 8:
      return 'September';
      break;
    case 9:
      return 'October';
      break;
    case 10:
      return 'November';
      break;
    case 11:
      return 'December';
      break;
    
  }
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

const dayOfWeekConvert = (day)=>{
  if(day=== 0){
    day=6;
    return day;
  }
  else{return day-1}
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
const calendarReset = ()=>{
  const calendar = calendarWraper.querySelectorAll('.day:not(.day--empty)');
  
  calendar.forEach(e=>{
    e.innerHTML = null;
    e.classList.add('day--empty');
  })
}
const deleteTransfer = (id)=>{

  const containers =  document.querySelectorAll('.container');
  containers.forEach(e=>{ 
    if(e.getAttribute('data-id') === id){
      db.collection('bankTransfers').doc(id).delete()
      .then(console.log('transfer deleted from firebase'))
      .catch(err => console.log(err))
    }

})

}

const printCalendar = (today) =>{

  const list = document.querySelectorAll('.container:not(.container__done)');
  const firstDayOfMonth = dayOfWeekConvert(dateFns.startOfMonth(today).getDay());
  const month = monthName(today.getMonth());
  let monthNumber = (today.getMonth()+1).toString();
  let year = today.getFullYear().toString();
  const monthHeader = document.querySelector('.monthName__header');
  const yearHeader = document.getElementById('year__header');
  monthHeader.innerText = month;
  yearHeader.innerText = year;
  const daysInMonth = dateFns.getDaysInMonth(today);
  const lastDayInArray = daysInMonth + firstDayOfMonth-1;
  const daysInCalendar = calendarWraper.querySelectorAll('.day');
  let dayInArray = new Date(`${year}-${monthNumber}-1`);

  for(let i = firstDayOfMonth; i<=lastDayInArray; i++){

    daysInCalendar[i].classList.remove('day--empty');
    daysInCalendar[i].innerHTML = `<p class="dayInMonth">${dayInArray.getDate()} ${dayInArray.toString().slice(0,3)}</p>`
    dayInArray = dateFns.addDays(dayInArray,1);
  }

  list.forEach(e=>{
    
    const category = e.children.item(1).children.item(1).innerText;
    const transferDay = dateFns.getDate(new Date(e.children.item(0).innerText));
    const transferMonth = dateFns.getMonth(new Date(e.children.item(0).innerText))+1;
    
    if(transferMonth === +monthNumber){
      const calendarInPosition = (transferDay+firstDayOfMonth)-1;
      daysInCalendar[calendarInPosition].innerHTML += `<p class="day__category">${category}</p>`
      
    }
  })

}

db.collection('bankTransfers').onSnapshot(snapshot=>{
  snapshot.docChanges().forEach(e=>{
    const doc = e.doc;
    console.log("TCL: doc", doc)
    console.log(e.type);
    if(e.type === 'added'){
      const li = document.createElement('li');
    li.setAttribute('data-id', doc.id);
    li.setAttribute('class', 'container');
    const data = doc.data();
    const dayDifference = dateFns.differenceInDays(new Date(data.date), new Date());
    const {amount, bank, category, date, status, title} = data;
    if(status === 'done'){
      li.classList.add('container__done', 'container__done--hide')
    }
    li.innerHTML = addTransfer(amount, bank, category, date, status, title); 
    ul.append(li);
    }
    if(e.type === 'modified'){
      const li = document.createElement('li');
    li.setAttribute('data-id', doc.id);
    li.setAttribute('class', 'container');
    li.classList.add('container__done');
    const data = doc.data();
    const dayDifference = dateFns.differenceInDays(new Date(data.date), new Date());
    const {amount, bank, category, date, status, title} = data;
    
    li.innerHTML = addTransfer(amount, bank, category, date, status, title); 
    ul.append(li);
    }
  } )
})

backArrow.addEventListener('click', e=>{
  add__transfer.classList.remove('add__transfer--show')
})

ul.addEventListener("click", e => {
  if (e.target.tagName === "I" && e.target.classList.contains("arrow")) {
    e.target.parentElement.children
      .item(3)
      .classList.toggle("container__bar--hide");
    e.target.parentElement.children.item(4).classList.toggle("fa-rotate-180");
  }
  if (e.target.tagName === "I" && e.target.classList.contains("icon__delete")) {
    let id = e.target.parentElement.parentElement.parentElement.getAttribute(
      "data-id"
    );
    const containers = document.querySelectorAll(".container");
    containers.forEach(e => {
      if (e.getAttribute("data-id") === id) {
        db.collection("bankTransfers")
          .doc(id)
          .delete()
          .then(console.log("transfer deleted from firebase"))
          .catch(err => console.log(err));
        e.remove();
      }
    });
  }
  if(e.target.tagName === "I" && e.target.classList.contains('icon__checked')){
    console.log(e.target.parentElement.parentElement.parentElement);
    const id = e.target.parentElement.parentElement.parentElement.getAttribute('data-id')
    console.log(id);
    db.collection('bankTransfers').doc(id).update({status: 'done'})
    .then(console.log("transfer edited in firebase"))
    .catch(err => console.log(err));
    e.target.parentElement.parentElement.parentElement.remove();
  }
});

addButon.addEventListener('click', e=>{
  add__transfer.classList.toggle('add__transfer--show')
})
// Calendar view open
calendarButton.addEventListener('click', e=> {
  calendarPopup.classList.toggle('calendar__popup--show');
  let today = new Date();
  printCalendar(today);
//  month arrow listener
  monthName__navigation.addEventListener('click', e=>{
    if(e.target.getAttribute('id') === 'nextMonth'){
      today = dateFns.addMonths(today, 1);
      calendarReset();
      printCalendar(today);
    }
    if(e.target.getAttribute('id') === 'prevMonth'){
      today = dateFns.subMonths(today, 1);
      calendarReset();
      printCalendar(today);
    }
})
  
})

calendarBackArrow.addEventListener('click', e=>{
  calendarPopup.classList.toggle('calendar__popup--show');
  calendarReset();
  i=i;
})
show__done.addEventListener('click', e=>{
   const containers = ul.querySelectorAll('.container__done');
   containers.forEach(e=>{
     console.log(e);
     e.classList.toggle('container__done--hide')
   })
})

transfers__submit.addEventListener('click', e=>{
  e.preventDefault();
  const category = document.getElementById('category');
  const bank =  document.querySelector('input[name=bank]:checked').value;
  const bankObject = Transfer(transfers.amount.value, bank, transfers.category.value, transfers.date.value, '',transfers.title.value);
    
    db.collection('bankTransfers').add(bankObject).then(()=>{
      console.log('transfer added to firebase')
    })
    transfers.reset();
    add__transfer.classList.toggle('add__transfer--show');
})
