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
const cancelButton = document.getElementById('cancelButton');
const okButton = document.getElementById('okButton');
const show__done = document.getElementById('show__done');
const transfers__submit = document.getElementById('transfers__submit');
const ul = document.getElementById('list__transfers');

const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('.navigation');
const popup = document.querySelector('.popup');
// const backArrow = document.querySelector('.backArrow');
const date = document.getElementById('calendar');
const today = document.getElementById('calendar');
let bank__clicked = null;
const calendarPopup = document.querySelector('.calendar__popup');
const category = document.getElementById('category');
const title = document.getElementById('title');
const amount = document.getElementById('amount');
const calendarBackArow = document.querySelector('.calendar__backArow');
const calendarWraper = document.querySelector('.calendar__wraper');
const newDate = new Date(date);
const transfers = document.querySelector('.transfer');

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

// Checking witch bank is selected

const bankSelected = (bankSelection)=>{
  const bank = '';
  bankSelection.forEach(e=>{
    if(e.checked){
    bank = e.value;
    }
    
  })
  return bank;
}
db.collection('bankTransfers').onSnapshot(snapshot=>{
  snapshot.docChanges().forEach(e=>{
    const doc = e.doc;
    console.log(e.type);
    if(e.type === 'added'){
      const li = document.createElement('li');
    li.setAttribute('data-id', doc.id);
    li.setAttribute('class', 'container');
    const data = doc.data();
    const dayDifference = dateFns.differenceInDays(new Date(data.date), new Date());
    const {amount, bank, category, date, status, title} = data;
    if(status === 'done'){
      li.classList.add('container__done--hide')
    }
    li.innerHTML = addTransfer(amount, bank, category, date, status, title); 
    ul.append(li);
    }
    if(e.type === 'modified'){
      const li = document.createElement('li');
    li.setAttribute('data-id', doc.id);
    li.setAttribute('class', 'container');
    li.classList.add('container__done--hide');
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


bankSelectWraper.addEventListener('click', e => {
  if (e.target.tagName === 'IMG' && e.target.id === 'mbankIcon') {
    e.target.classList.toggle('bankClicked');
    pkoIcon.classList.remove('bankClicked');
    bank__clicked = 'mbank';
  }
  else if (e.target.tagName === 'IMG' && e.target.id === 'pkoIcon') {
    e.target.classList.toggle('bankClicked');
    mbankIcon.classList.remove('bankClicked');
    bank__clicked = 'pkobp';
  }
})

addButon.addEventListener('click', e=>{
  add__transfer.classList.toggle('add__transfer--show')
})

calendarButton.addEventListener('click', e=> {
  calendarPopup.classList.toggle('calendar__popup--show');

})
calendarBackArrow.addEventListener('click', e=>{
  calendarPopup.classList.toggle('calendar__popup--show');
})
show__done.addEventListener('click', e=>{
   const containers = ul.querySelectorAll('.container');
   containers.forEach(e=>{
     console.log(e);
     e.classList.toggle('container__done--hide')
   })
})

transfers__submit.addEventListener('click', e=>{
  e.preventDefault();
  const category = document.getElementById('category');
  const bankSelection =  document.getElementsByName('bank');
  const bankSelected = bankSelected(bankSelection);
  const bankObject = Transfer(transfers.amount.value, bank.value, transfers.category.value, transfers.date.value, '',transfers.title.value);
    
    db.collection('bankTransfers').add(bankObject).then(()=>{
      console.log('transfer added to firebase')
    })
    transfers.reset();
    add__transfer.classList.toggle('add__transfer--show');
})


cancelButton.addEventListener('click', e => {
  add__transfer.classList.toggle('add__transfer--show');
  transfers.reset();
})


/******** add new transfer ********/
okButton.addEventListener('click', e => {
    const category = document.getElementById('category');
    const bankObject = Transfer(transfers.amount.value, bank__clicked, transfers.category.value, transfers.date.value, '',transfers.title.value);
    
    db.collection('bankTransfers').add(bankObject).then(()=>{
      console.log('transfer added to firebase')
    })
    

    transfers.reset();// reset() resetuje tylko form
    //

    popup.style.display = 'none';
    list.classList.remove('listHide');
}
)



