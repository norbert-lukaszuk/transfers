!function(n){var t={};function c(e){if(t[e])return t[e].exports;var l=t[e]={i:e,l:!1,exports:{}};return n[e].call(l.exports,l,l.exports,c),l.l=!0,l.exports}c.m=n,c.c=t,c.d=function(n,t,e){c.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:e})},c.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},c.t=function(n,t){if(1&t&&(n=c(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var e=Object.create(null);if(c.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var l in n)c.d(e,l,function(t){return n[t]}.bind(null,l));return e},c.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return c.d(t,"a",t),t},c.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},c.p="",c(c.s=0)}([function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);\n/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\n\r\n\r\n// service worker registration - remove if you're not going to use it\r\n\r\nif ('serviceWorker' in navigator) {\r\n  window.addEventListener('load', function() {\r\n    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {\r\n      // Registration was successful\r\n      console.log('ServiceWorker registration successful with scope: ', registration.scope);\r\n    }, function(err) {\r\n      // registration failed :(\r\n      console.log('ServiceWorker registration failed: ', err);\r\n    });\r\n  });\r\n}\r\nconst addButon = document.querySelector('button.button');\r\nconst popup = document.querySelector('.popup');\r\nconst cancel = document.getElementById('cancel');\r\nconst date = document.getElementById('calendar');\r\nlet bank = null;\r\nconst category = document.getElementById('category');\r\nconst title = document.getElementById('title');\r\nconst amount = document.getElementById('amount');\r\nconst okButton = document.getElementById('ok');\r\nconst newDate = new Date(date);\r\nconst transfer = document.querySelector('.transfer');\r\nconst ul = document.querySelector('ul');\r\nlet input = document.querySelector('.input')\r\nconst bankSelectWraper = document.querySelector('.bankSelectWraper');\r\nconst mbankIcon = document.getElementById('mbankIcon');\r\nconst pkoIcon = document.getElementById('pkoIcon');\r\nconst list = document.querySelector('.list');\r\nbankSelectWraper.addEventListener('click', e =>{\r\n  if(e.target.tagName === 'IMG' && e.target.id === 'mbankIcon'){\r\n    e.target.classList.toggle('bankClicked');\r\n    pkoIcon.classList.remove('bankClicked');\r\n    bank = 'mBank';\r\n  }\r\n  else if(e.target.tagName === 'IMG' && e.target.id === 'pkoIcon'){\r\n    e.target.classList.toggle('bankClicked');\r\n    mbankIcon.classList.remove('bankClicked');\r\n    bank = 'PKO';\r\n  }\r\n})\r\n\r\naddButon.addEventListener('click', e =>{\r\n  popup.style.display = 'block';\r\n  list.classList.add('listHide');\r\n  console.log(list);\r\n})\r\ncancel.addEventListener('click', e =>{\r\n  popup.style.display = 'none';\r\n  list.classList.remove('listHide');\r\n})\r\n\r\n/******** add new transfer ********/\r\nokButton.addEventListener('click', e =>{\r\n  let bankObject ={};\r\n  let bankArray = JSON.parse(localStorage.getItem('bankArray'));\r\n  if(bankArray===null){\r\n    bankArray = [];\r\n  }\r\n  console.log(bankArray.value);\r\n  // bankObject.bank = bank.value;\r\n  bankObject.bank = bank;\r\n  bankObject.category = category.value;\r\n  bankObject.date = date.value;\r\n  bankObject.title = title.value;\r\n  bankObject.amount = amount.value;\r\n  // bankObject.key = new Date(bankObject.date).getTime();//tworzy klucz na podstwie \r\n  bankObject.status = '';\r\n  const local = localStorage.getItem('keys')\r\n  let keys = JSON.parse(local);\r\n  // keys.push(new Date(bankObject.date).getTime());\r\n  \r\n  // localStorage.setItem('keys',JSON.stringify(keys));\r\n  // localStorage.setItem(bankObject.key,JSON.stringify(bankObject));\r\n  transfer.reset();// reset() resetuje tylko form\r\n  const container = `<div class=\"container\">\r\n    <div class=\"strip\"></div>\r\n    <div class=\"logoWraper\">\r\n      <img class=\"image\" src=\"\">\r\n      <div class=\"category\"></div>\r\n      <div class=\"statusCircle\"></div>\r\n    </div>\r\n    <div class=\"timeLeft\"></div> \r\n    <div class=\"amount\"></div> \r\n    <p class=\"title\"></p>\r\n    <div class=\"close\">\r\n    <button class=\"buttonClose\">Cancel</button>\r\n    <button class =\"buttonDone\">Done</button>\r\n    </div>          \r\n  </div`;\r\n  ul.insertAdjacentHTML('afterbegin',container);\r\n  const containerId = document.querySelector('.container');\r\n  const image = document.querySelector('.image');\r\n  const strip = document.querySelector('.strip');\r\n  const categoryOutput = document.querySelector('.category');\r\n  const dateOutput = document.querySelector('.strip');\r\n  const titleOutput = document.querySelector('.title');\r\n  const daysLeft = document.querySelector('.timeLeft');\r\n  const amountOutput = document.querySelector('.amount');\r\n  const statusCircle = document.querySelector('.statusCircle');\r\n  const today = new Date();\r\n  const trasferDay = new Date(bankObject.date);\r\n  const timeLeft = Math.ceil( (trasferDay-today)/1000/60/60/24);\r\n  containerId.setAttribute('id',today.getTime());\r\n  bankObject.id = containerId.getAttribute('id');\r\n  /* Tu skończyłem dodawanie id dla container i zapisanie go w bankObject */\r\n  /* trzeba ogarnąć array.find() */\r\n  bankObject.containerClass = containerId.classList.value;\r\n  bankObject.statusCircleClass = statusCircle.classList.value;\r\n  bankObject.timeLeftClass = daysLeft.classList.value;\r\n  bankArray.push(bankObject);\r\n  localStorage.setItem('bankArray', JSON.stringify(bankArray));\r\n  if(timeLeft<=1){\r\n    statusCircle.style.backgroundColor = 'crimson';\r\n  }\r\n  else if(timeLeft < 3){\r\n    statusCircle.style.backgroundColor = 'orange';\r\n  }\r\n  console.log(timeLeft);\r\n  console.log(category);\r\n  if(bankObject.bank === 'mBank'){\r\n    dateOutput.innerText = bankObject.date;\r\n    strip.setAttribute('class', 'strip__mbank');\r\n    image.setAttribute('src','assets/img/mbank 30x30.png');\r\n    categoryOutput.innerText = bankObject.category;\r\n    titleOutput.innerText = bankObject.title;\r\n    amountOutput.innerText = `${bankObject.amount} zł`;\r\n    if(timeLeft>0){\r\n      daysLeft.innerText = `${timeLeft} d.`;\r\n    }\r\n    else if(timeLeft===0){\r\n      daysLeft.innerText = 'today'\r\n    }\r\n    else if(timeLeft<0){\r\n      daysLeft.innerText = `passed`\r\n    }\r\n    \r\n    \r\n    \r\n  }\r\n  else if(bankObject.bank === 'PKO'){\r\n    dateOutput.innerText = bankObject.date;\r\n    strip.setAttribute('class', 'strip__pko');\r\n    image.setAttribute('src','assets/img/pkobp 467x485.png');\r\n    categoryOutput.innerText = bankObject.category;\r\n    titleOutput.innerText = bankObject.title;\r\n    amountOutput.innerText = `${bankObject.amount} zł`;\r\n    if(timeLeft>0){\r\n      daysLeft.innerText = `${timeLeft} d.`;\r\n    }\r\n    else if(timeLeft===0){\r\n      daysLeft.innerText = 'today'\r\n    }\r\n    else if(timeLeft<0){\r\n      daysLeft.innerText = `passed`\r\n    }\r\n  }\r\n\r\n  popup.style.display = 'none';\r\n  list.classList.remove('listHide');\r\n  \r\n})\r\n\r\nconst bankArray = JSON.parse(localStorage.getItem('bankArray'));//pobieranie array z kluczami \r\nif(bankArray != null){bankArray.sort((a,b)=> b.key - a.key);/* sortuje od największej do najmniejszej */\r\n\r\n// bankArray.reverse();//odwraca na od najmniejszej do największej \r\n\r\n/******* REFRESSH ***********/\r\nfor(let i=0; i<bankArray.length;i++){  //pętla iterujące przez localStorage\r\n  //   /* get data from localStorage */\r\n    \r\n    const local = localStorage.getItem(bankArray[i]);//pobranie z localStorage elementu o danym w pętli kluczu\r\n    const bankObject = JSON.parse(local);//parsowanie do obiektu\r\n    const container = `<div class=\"container\">\r\n    <div class=\"strip\"></div>\r\n    <div class=\"logoWraper\">\r\n      <img class=\"image\" src=\"\">\r\n      <div class=\"category\"></div>\r\n      <div class=\"statusCircle\"></div>\r\n    </div>\r\n    <div class=\"timeLeft\"></div> \r\n    <div class=\"amount\"></div> \r\n    <p class=\"title\"></p>\r\n    <div class=\"close\">\r\n        <button class=\"buttonClose\">Cancel</button>\r\n        <button class =\"buttonDone\">Done</button>\r\n    </div>          \r\n  </div`;\r\n  ul.insertAdjacentHTML('afterbegin',container);\r\n  const close = document.querySelector('.close');\r\n  const containerId = document.querySelector('.container');\r\n  const image = document.querySelector('.image');\r\n  const strip = document.querySelector('.strip');\r\n  const categoryOutput = document.querySelector('.category');\r\n  const dateOutput = document.querySelector('.strip');\r\n  const titleOutput = document.querySelector('.title');\r\n  const daysLeft = document.querySelector('.timeLeft');\r\n  const amountOutput = document.querySelector('.amount');\r\n  const statusCircle = document.querySelector('.statusCircle');\r\n  const today = new Date();\r\n  const trasferDay = new Date(bankArray[i].date);\r\n  const timeLeft = Math.ceil( (trasferDay-today)/1000/60/60/24);\r\n  containerId.setAttribute('id', bankArray[i].id);\r\n  const containerClass = bankArray[i].containerClass.split(' ');\r\n  containerId.classList.add(...containerClass);\r\n  const statusCircleClass = bankArray[i].statusCircleClass.split(' ');\r\n  statusCircle.classList.add(...statusCircleClass);\r\n  const timeLeftClass = bankArray[i].timeLeftClass.split(' ');\r\n  daysLeft.classList.add(...timeLeftClass);\r\n  if(bankArray[i].status === 'done'){\r\n      close.remove();\r\n  }\r\n  if(timeLeft<=1 && bankArray[i].status!='done'){\r\n    statusCircle.style.backgroundColor = 'crimson';\r\n  }\r\n  else if(timeLeft < 3 && bankArray[i].status!='done'){\r\n    statusCircle.style.backgroundColor = 'orange';\r\n  }\r\n  /* mBank template */\r\n  if(bankArray[i].bank === 'mBank'){\r\n\r\n    dateOutput.innerText = bankArray[i].date;\r\n    strip.setAttribute('class', 'strip__mbank');\r\n    image.setAttribute('src','assets/img/mbank 30x30.png');\r\n    categoryOutput.innerText = bankArray[i].category;\r\n    titleOutput.innerText = bankArray[i].title;\r\n    amountOutput.innerText = `${bankArray[i].amount} zł`;\r\n    if(timeLeft>0){\r\n      daysLeft.innerText = `${timeLeft} d.`;\r\n    }\r\n    else if(timeLeft===0){\r\n      daysLeft.innerText = 'today'\r\n    }\r\n    else if(timeLeft<0){\r\n      daysLeft.innerText = `passed`\r\n    }\r\n\r\n  }\r\n  /* PKO tamplate */\r\n  else if(bankArray[i].bank === 'PKO'){\r\n    dateOutput.innerText = bankArray[i].date;\r\n    strip.setAttribute('class', 'strip__pko');\r\n    image.setAttribute('src','assets/img/pkobp 467x485.png');\r\n    categoryOutput.innerText = bankArray[i].category;\r\n    titleOutput.innerText = bankArray[i].title;\r\n    amountOutput.innerText = `${bankArray[i].amount} zł`;\r\n    if(timeLeft>0){\r\n      daysLeft.innerText = `${timeLeft} d.`;\r\n    }\r\n    else if(timeLeft===0){\r\n      daysLeft.innerText = 'today'\r\n    }\r\n    else if(timeLeft<0){\r\n      daysLeft.innerText = `passed`\r\n    }\r\n  }\r\n  }\r\n}\r\nul.addEventListener('click', e =>{\r\n  \r\n  if(e.target.tagName === 'DIV' && e.target.classList.contains('close')){\r\n    console.log(e.target.children.item(1));\r\n    e.target.children.item(0).classList.add('buttonClose--show');\r\n    e.target.children.item(1).classList.add('buttonDone--show');\r\n    // e.target.children.item(4).style.display = 'flex';//pozwala dostać się do konkretnego dziecka\r\n  }\r\n  if(e.target.tagName ==='BUTTON' && e.target.classList.contains('buttonDone')){\r\n    let bankArray = JSON.parse(localStorage.getItem('bankArray'));\r\n    e.target.parentNode.parentNode.classList.add('containerDone');\r\n    console.log(e.target.parentNode);\r\n    console.log(e.target.parentNode.parentNode.getAttribute('id'));\r\n    const containerId = e.target.parentNode.parentNode.getAttribute('id');\r\n    console.log(containerId);\r\n    \r\n    // e.target.parentElement.style.display = 'none';//close div \r\n    \r\n    // e.target.style.display = 'none';//done button\r\n    // e.target.parentElement.children.item(0).remove();//cancel button\r\n    // e.target.parentElement.children.item(0).style.display = 'none';//cancel button\r\n   \r\n      e.target.parentNode.parentNode.children.item(2).classList.add('timeLeftDone');//time left div\r\n      e.target.parentNode.parentNode.children.item(1).lastElementChild.classList.add('statusCircleDone');//status circle\r\n     \r\n    for(let i=0; i<bankArray.length; i++){\r\n      const objectValues = Object.values(bankArray[i]);\r\n      console.log(objectValues, typeof objectValues);\r\n      const includes = objectValues.includes(containerId);\r\n      \r\n      if(includes===true){\r\n        bankArray[i].containerClass = e.target.parentNode.parentNode.classList.value;\r\n        bankArray[i].timeLeftClass = e.target.parentNode.parentNode.children.item(2).classList.value;\r\n        bankArray[i].statusCircleClass = e.target.parentNode.parentNode.children.item(1).lastElementChild.classList.value;\r\n        bankArray[i].status = 'done';\r\n        console.log(bankArray[i].containerClass);\r\n        const local = JSON.stringify(bankArray);\r\n        localStorage.setItem('bankArray',local);\r\n      }\r\n      \r\n    }\r\n    // let classList = localStorage.getItem('containerClass').split(' ');\r\n    \r\n    // localStorage.setItem('containerClass',e.target.parentNode.parentNode.classList.value);\r\n    \r\n    e.target.parentNode.remove();\r\n  }\r\n  if(e.target.classList.contains('buttonClose')){//tu trzeba poprawić !!\r\n    e.target.classList.remove('buttonClose--show');\r\n    e.target.parentElement.children.item(1).classList.remove('buttonDone--show');\r\n    console.log(e.target.parentElement);\r\n  }\r\n  })//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcz85MjkxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFhOztBQUVhOztBQUUxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxrQkFBa0I7QUFDbEQ7QUFDQSw4QkFBOEIsU0FBUztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGtCQUFrQjtBQUNsRDtBQUNBLDhCQUE4QixTQUFTO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxDQUFDOztBQUVELGdFQUFnRTtBQUNoRSxzQkFBc0Isc0NBQXNDOztBQUU1RCx1QkFBdUI7O0FBRXZCO0FBQ0EsWUFBWSxvQkFBb0IsS0FBSztBQUNyQzs7QUFFQSxxREFBcUQ7QUFDckQseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxvQkFBb0I7QUFDcEQ7QUFDQSw4QkFBOEIsU0FBUztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLG9CQUFvQjtBQUNwRDtBQUNBLDhCQUE4QixTQUFTO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxREFBcUQ7O0FBRXJELHVDQUF1QztBQUN2Qyx3REFBd0Q7QUFDeEQsc0VBQXNFOztBQUV0RSxvRkFBb0Y7QUFDcEYseUdBQXlHOztBQUV6RyxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyB0eXBlIH0gZnJvbSBcIm9zXCI7XHJcblxyXG4vLyBzZXJ2aWNlIHdvcmtlciByZWdpc3RyYXRpb24gLSByZW1vdmUgaWYgeW91J3JlIG5vdCBnb2luZyB0byB1c2UgaXRcclxuXHJcbmlmICgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSB7XHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcclxuICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCdzZXJ2aWNld29ya2VyLmpzJykudGhlbihmdW5jdGlvbihyZWdpc3RyYXRpb24pIHtcclxuICAgICAgLy8gUmVnaXN0cmF0aW9uIHdhcyBzdWNjZXNzZnVsXHJcbiAgICAgIGNvbnNvbGUubG9nKCdTZXJ2aWNlV29ya2VyIHJlZ2lzdHJhdGlvbiBzdWNjZXNzZnVsIHdpdGggc2NvcGU6ICcsIHJlZ2lzdHJhdGlvbi5zY29wZSk7XHJcbiAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgLy8gcmVnaXN0cmF0aW9uIGZhaWxlZCA6KFxyXG4gICAgICBjb25zb2xlLmxvZygnU2VydmljZVdvcmtlciByZWdpc3RyYXRpb24gZmFpbGVkOiAnLCBlcnIpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuY29uc3QgYWRkQnV0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24uYnV0dG9uJyk7XHJcbmNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwJyk7XHJcbmNvbnN0IGNhbmNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW5jZWwnKTtcclxuY29uc3QgZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxlbmRhcicpO1xyXG5sZXQgYmFuayA9IG51bGw7XHJcbmNvbnN0IGNhdGVnb3J5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhdGVnb3J5Jyk7XHJcbmNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpdGxlJyk7XHJcbmNvbnN0IGFtb3VudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbW91bnQnKTtcclxuY29uc3Qgb2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2snKTtcclxuY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG5jb25zdCB0cmFuc2ZlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50cmFuc2ZlcicpO1xyXG5jb25zdCB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XHJcbmxldCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dCcpXHJcbmNvbnN0IGJhbmtTZWxlY3RXcmFwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFua1NlbGVjdFdyYXBlcicpO1xyXG5jb25zdCBtYmFua0ljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWJhbmtJY29uJyk7XHJcbmNvbnN0IHBrb0ljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGtvSWNvbicpO1xyXG5jb25zdCBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QnKTtcclxuYmFua1NlbGVjdFdyYXBlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT57XHJcbiAgaWYoZS50YXJnZXQudGFnTmFtZSA9PT0gJ0lNRycgJiYgZS50YXJnZXQuaWQgPT09ICdtYmFua0ljb24nKXtcclxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2JhbmtDbGlja2VkJyk7XHJcbiAgICBwa29JY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2JhbmtDbGlja2VkJyk7XHJcbiAgICBiYW5rID0gJ21CYW5rJztcclxuICB9XHJcbiAgZWxzZSBpZihlLnRhcmdldC50YWdOYW1lID09PSAnSU1HJyAmJiBlLnRhcmdldC5pZCA9PT0gJ3Brb0ljb24nKXtcclxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2JhbmtDbGlja2VkJyk7XHJcbiAgICBtYmFua0ljb24uY2xhc3NMaXN0LnJlbW92ZSgnYmFua0NsaWNrZWQnKTtcclxuICAgIGJhbmsgPSAnUEtPJztcclxuICB9XHJcbn0pXHJcblxyXG5hZGRCdXRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT57XHJcbiAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgbGlzdC5jbGFzc0xpc3QuYWRkKCdsaXN0SGlkZScpO1xyXG4gIGNvbnNvbGUubG9nKGxpc3QpO1xyXG59KVxyXG5jYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+e1xyXG4gIHBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgbGlzdC5jbGFzc0xpc3QucmVtb3ZlKCdsaXN0SGlkZScpO1xyXG59KVxyXG5cclxuLyoqKioqKioqIGFkZCBuZXcgdHJhbnNmZXIgKioqKioqKiovXHJcbm9rQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PntcclxuICBsZXQgYmFua09iamVjdCA9e307XHJcbiAgbGV0IGJhbmtBcnJheSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2JhbmtBcnJheScpKTtcclxuICBpZihiYW5rQXJyYXk9PT1udWxsKXtcclxuICAgIGJhbmtBcnJheSA9IFtdO1xyXG4gIH1cclxuICBjb25zb2xlLmxvZyhiYW5rQXJyYXkudmFsdWUpO1xyXG4gIC8vIGJhbmtPYmplY3QuYmFuayA9IGJhbmsudmFsdWU7XHJcbiAgYmFua09iamVjdC5iYW5rID0gYmFuaztcclxuICBiYW5rT2JqZWN0LmNhdGVnb3J5ID0gY2F0ZWdvcnkudmFsdWU7XHJcbiAgYmFua09iamVjdC5kYXRlID0gZGF0ZS52YWx1ZTtcclxuICBiYW5rT2JqZWN0LnRpdGxlID0gdGl0bGUudmFsdWU7XHJcbiAgYmFua09iamVjdC5hbW91bnQgPSBhbW91bnQudmFsdWU7XHJcbiAgLy8gYmFua09iamVjdC5rZXkgPSBuZXcgRGF0ZShiYW5rT2JqZWN0LmRhdGUpLmdldFRpbWUoKTsvL3R3b3J6eSBrbHVjeiBuYSBwb2RzdHdpZSBcclxuICBiYW5rT2JqZWN0LnN0YXR1cyA9ICcnO1xyXG4gIGNvbnN0IGxvY2FsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2tleXMnKVxyXG4gIGxldCBrZXlzID0gSlNPTi5wYXJzZShsb2NhbCk7XHJcbiAgLy8ga2V5cy5wdXNoKG5ldyBEYXRlKGJhbmtPYmplY3QuZGF0ZSkuZ2V0VGltZSgpKTtcclxuICBcclxuICAvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgna2V5cycsSlNPTi5zdHJpbmdpZnkoa2V5cykpO1xyXG4gIC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGJhbmtPYmplY3Qua2V5LEpTT04uc3RyaW5naWZ5KGJhbmtPYmplY3QpKTtcclxuICB0cmFuc2Zlci5yZXNldCgpOy8vIHJlc2V0KCkgcmVzZXR1amUgdHlsa28gZm9ybVxyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwic3RyaXBcIj48L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJsb2dvV3JhcGVyXCI+XHJcbiAgICAgIDxpbWcgY2xhc3M9XCJpbWFnZVwiIHNyYz1cIlwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2F0ZWdvcnlcIj48L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInN0YXR1c0NpcmNsZVwiPjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwidGltZUxlZnRcIj48L2Rpdj4gXHJcbiAgICA8ZGl2IGNsYXNzPVwiYW1vdW50XCI+PC9kaXY+IFxyXG4gICAgPHAgY2xhc3M9XCJ0aXRsZVwiPjwvcD5cclxuICAgIDxkaXYgY2xhc3M9XCJjbG9zZVwiPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbkNsb3NlXCI+Q2FuY2VsPC9idXR0b24+XHJcbiAgICA8YnV0dG9uIGNsYXNzID1cImJ1dHRvbkRvbmVcIj5Eb25lPC9idXR0b24+XHJcbiAgICA8L2Rpdj4gICAgICAgICAgXHJcbiAgPC9kaXZgO1xyXG4gIHVsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsY29udGFpbmVyKTtcclxuICBjb25zdCBjb250YWluZXJJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXInKTtcclxuICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWFnZScpO1xyXG4gIGNvbnN0IHN0cmlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0cmlwJyk7XHJcbiAgY29uc3QgY2F0ZWdvcnlPdXRwdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0ZWdvcnknKTtcclxuICBjb25zdCBkYXRlT3V0cHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0cmlwJyk7XHJcbiAgY29uc3QgdGl0bGVPdXRwdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGl0bGUnKTtcclxuICBjb25zdCBkYXlzTGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lTGVmdCcpO1xyXG4gIGNvbnN0IGFtb3VudE91dHB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbW91bnQnKTtcclxuICBjb25zdCBzdGF0dXNDaXJjbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzQ2lyY2xlJyk7XHJcbiAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gIGNvbnN0IHRyYXNmZXJEYXkgPSBuZXcgRGF0ZShiYW5rT2JqZWN0LmRhdGUpO1xyXG4gIGNvbnN0IHRpbWVMZWZ0ID0gTWF0aC5jZWlsKCAodHJhc2ZlckRheS10b2RheSkvMTAwMC82MC82MC8yNCk7XHJcbiAgY29udGFpbmVySWQuc2V0QXR0cmlidXRlKCdpZCcsdG9kYXkuZ2V0VGltZSgpKTtcclxuICBiYW5rT2JqZWN0LmlkID0gY29udGFpbmVySWQuZ2V0QXR0cmlidXRlKCdpZCcpO1xyXG4gIC8qIFR1IHNrb8WEY3p5xYJlbSBkb2Rhd2FuaWUgaWQgZGxhIGNvbnRhaW5lciBpIHphcGlzYW5pZSBnbyB3IGJhbmtPYmplY3QgKi9cclxuICAvKiB0cnplYmEgb2dhcm7EhcSHIGFycmF5LmZpbmQoKSAqL1xyXG4gIGJhbmtPYmplY3QuY29udGFpbmVyQ2xhc3MgPSBjb250YWluZXJJZC5jbGFzc0xpc3QudmFsdWU7XHJcbiAgYmFua09iamVjdC5zdGF0dXNDaXJjbGVDbGFzcyA9IHN0YXR1c0NpcmNsZS5jbGFzc0xpc3QudmFsdWU7XHJcbiAgYmFua09iamVjdC50aW1lTGVmdENsYXNzID0gZGF5c0xlZnQuY2xhc3NMaXN0LnZhbHVlO1xyXG4gIGJhbmtBcnJheS5wdXNoKGJhbmtPYmplY3QpO1xyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdiYW5rQXJyYXknLCBKU09OLnN0cmluZ2lmeShiYW5rQXJyYXkpKTtcclxuICBpZih0aW1lTGVmdDw9MSl7XHJcbiAgICBzdGF0dXNDaXJjbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2NyaW1zb24nO1xyXG4gIH1cclxuICBlbHNlIGlmKHRpbWVMZWZ0IDwgMyl7XHJcbiAgICBzdGF0dXNDaXJjbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZSc7XHJcbiAgfVxyXG4gIGNvbnNvbGUubG9nKHRpbWVMZWZ0KTtcclxuICBjb25zb2xlLmxvZyhjYXRlZ29yeSk7XHJcbiAgaWYoYmFua09iamVjdC5iYW5rID09PSAnbUJhbmsnKXtcclxuICAgIGRhdGVPdXRwdXQuaW5uZXJUZXh0ID0gYmFua09iamVjdC5kYXRlO1xyXG4gICAgc3RyaXAuc2V0QXR0cmlidXRlKCdjbGFzcycsICdzdHJpcF9fbWJhbmsnKTtcclxuICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywnYXNzZXRzL2ltZy9tYmFuayAzMHgzMC5wbmcnKTtcclxuICAgIGNhdGVnb3J5T3V0cHV0LmlubmVyVGV4dCA9IGJhbmtPYmplY3QuY2F0ZWdvcnk7XHJcbiAgICB0aXRsZU91dHB1dC5pbm5lclRleHQgPSBiYW5rT2JqZWN0LnRpdGxlO1xyXG4gICAgYW1vdW50T3V0cHV0LmlubmVyVGV4dCA9IGAke2JhbmtPYmplY3QuYW1vdW50fSB6xYJgO1xyXG4gICAgaWYodGltZUxlZnQ+MCl7XHJcbiAgICAgIGRheXNMZWZ0LmlubmVyVGV4dCA9IGAke3RpbWVMZWZ0fSBkLmA7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHRpbWVMZWZ0PT09MCl7XHJcbiAgICAgIGRheXNMZWZ0LmlubmVyVGV4dCA9ICd0b2RheSdcclxuICAgIH1cclxuICAgIGVsc2UgaWYodGltZUxlZnQ8MCl7XHJcbiAgICAgIGRheXNMZWZ0LmlubmVyVGV4dCA9IGBwYXNzZWRgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgfVxyXG4gIGVsc2UgaWYoYmFua09iamVjdC5iYW5rID09PSAnUEtPJyl7XHJcbiAgICBkYXRlT3V0cHV0LmlubmVyVGV4dCA9IGJhbmtPYmplY3QuZGF0ZTtcclxuICAgIHN0cmlwLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc3RyaXBfX3BrbycpO1xyXG4gICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCdhc3NldHMvaW1nL3Brb2JwIDQ2N3g0ODUucG5nJyk7XHJcbiAgICBjYXRlZ29yeU91dHB1dC5pbm5lclRleHQgPSBiYW5rT2JqZWN0LmNhdGVnb3J5O1xyXG4gICAgdGl0bGVPdXRwdXQuaW5uZXJUZXh0ID0gYmFua09iamVjdC50aXRsZTtcclxuICAgIGFtb3VudE91dHB1dC5pbm5lclRleHQgPSBgJHtiYW5rT2JqZWN0LmFtb3VudH0gesWCYDtcclxuICAgIGlmKHRpbWVMZWZ0PjApe1xyXG4gICAgICBkYXlzTGVmdC5pbm5lclRleHQgPSBgJHt0aW1lTGVmdH0gZC5gO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZih0aW1lTGVmdD09PTApe1xyXG4gICAgICBkYXlzTGVmdC5pbm5lclRleHQgPSAndG9kYXknXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHRpbWVMZWZ0PDApe1xyXG4gICAgICBkYXlzTGVmdC5pbm5lclRleHQgPSBgcGFzc2VkYFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICBsaXN0LmNsYXNzTGlzdC5yZW1vdmUoJ2xpc3RIaWRlJyk7XHJcbiAgXHJcbn0pXHJcblxyXG5jb25zdCBiYW5rQXJyYXkgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiYW5rQXJyYXknKSk7Ly9wb2JpZXJhbmllIGFycmF5IHoga2x1Y3phbWkgXHJcbmlmKGJhbmtBcnJheSAhPSBudWxsKXtiYW5rQXJyYXkuc29ydCgoYSxiKT0+IGIua2V5IC0gYS5rZXkpOy8qIHNvcnR1amUgb2QgbmFqd2nEmWtzemVqIGRvIG5ham1uaWVqc3plaiAqL1xyXG5cclxuLy8gYmFua0FycmF5LnJldmVyc2UoKTsvL29kd3JhY2EgbmEgb2QgbmFqbW5pZWpzemVqIGRvIG5handpxJlrc3plaiBcclxuXHJcbi8qKioqKioqIFJFRlJFU1NIICoqKioqKioqKioqL1xyXG5mb3IobGV0IGk9MDsgaTxiYW5rQXJyYXkubGVuZ3RoO2krKyl7ICAvL3DEmXRsYSBpdGVydWrEhWNlIHByemV6IGxvY2FsU3RvcmFnZVxyXG4gIC8vICAgLyogZ2V0IGRhdGEgZnJvbSBsb2NhbFN0b3JhZ2UgKi9cclxuICAgIFxyXG4gICAgY29uc3QgbG9jYWwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShiYW5rQXJyYXlbaV0pOy8vcG9icmFuaWUgeiBsb2NhbFN0b3JhZ2UgZWxlbWVudHUgbyBkYW55bSB3IHDEmXRsaSBrbHVjenVcclxuICAgIGNvbnN0IGJhbmtPYmplY3QgPSBKU09OLnBhcnNlKGxvY2FsKTsvL3BhcnNvd2FuaWUgZG8gb2JpZWt0dVxyXG4gICAgY29uc3QgY29udGFpbmVyID0gYDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJzdHJpcFwiPjwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImxvZ29XcmFwZXJcIj5cclxuICAgICAgPGltZyBjbGFzcz1cImltYWdlXCIgc3JjPVwiXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYXRlZ29yeVwiPjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwic3RhdHVzQ2lyY2xlXCI+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJ0aW1lTGVmdFwiPjwvZGl2PiBcclxuICAgIDxkaXYgY2xhc3M9XCJhbW91bnRcIj48L2Rpdj4gXHJcbiAgICA8cCBjbGFzcz1cInRpdGxlXCI+PC9wPlxyXG4gICAgPGRpdiBjbGFzcz1cImNsb3NlXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbkNsb3NlXCI+Q2FuY2VsPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcyA9XCJidXR0b25Eb25lXCI+RG9uZTwvYnV0dG9uPlxyXG4gICAgPC9kaXY+ICAgICAgICAgIFxyXG4gIDwvZGl2YDtcclxuICB1bC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLGNvbnRhaW5lcik7XHJcbiAgY29uc3QgY2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UnKTtcclxuICBjb25zdCBjb250YWluZXJJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXInKTtcclxuICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWFnZScpO1xyXG4gIGNvbnN0IHN0cmlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0cmlwJyk7XHJcbiAgY29uc3QgY2F0ZWdvcnlPdXRwdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0ZWdvcnknKTtcclxuICBjb25zdCBkYXRlT3V0cHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0cmlwJyk7XHJcbiAgY29uc3QgdGl0bGVPdXRwdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGl0bGUnKTtcclxuICBjb25zdCBkYXlzTGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lTGVmdCcpO1xyXG4gIGNvbnN0IGFtb3VudE91dHB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbW91bnQnKTtcclxuICBjb25zdCBzdGF0dXNDaXJjbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzQ2lyY2xlJyk7XHJcbiAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gIGNvbnN0IHRyYXNmZXJEYXkgPSBuZXcgRGF0ZShiYW5rQXJyYXlbaV0uZGF0ZSk7XHJcbiAgY29uc3QgdGltZUxlZnQgPSBNYXRoLmNlaWwoICh0cmFzZmVyRGF5LXRvZGF5KS8xMDAwLzYwLzYwLzI0KTtcclxuICBjb250YWluZXJJZC5zZXRBdHRyaWJ1dGUoJ2lkJywgYmFua0FycmF5W2ldLmlkKTtcclxuICBjb25zdCBjb250YWluZXJDbGFzcyA9IGJhbmtBcnJheVtpXS5jb250YWluZXJDbGFzcy5zcGxpdCgnICcpO1xyXG4gIGNvbnRhaW5lcklkLmNsYXNzTGlzdC5hZGQoLi4uY29udGFpbmVyQ2xhc3MpO1xyXG4gIGNvbnN0IHN0YXR1c0NpcmNsZUNsYXNzID0gYmFua0FycmF5W2ldLnN0YXR1c0NpcmNsZUNsYXNzLnNwbGl0KCcgJyk7XHJcbiAgc3RhdHVzQ2lyY2xlLmNsYXNzTGlzdC5hZGQoLi4uc3RhdHVzQ2lyY2xlQ2xhc3MpO1xyXG4gIGNvbnN0IHRpbWVMZWZ0Q2xhc3MgPSBiYW5rQXJyYXlbaV0udGltZUxlZnRDbGFzcy5zcGxpdCgnICcpO1xyXG4gIGRheXNMZWZ0LmNsYXNzTGlzdC5hZGQoLi4udGltZUxlZnRDbGFzcyk7XHJcbiAgaWYoYmFua0FycmF5W2ldLnN0YXR1cyA9PT0gJ2RvbmUnKXtcclxuICAgICAgY2xvc2UucmVtb3ZlKCk7XHJcbiAgfVxyXG4gIGlmKHRpbWVMZWZ0PD0xICYmIGJhbmtBcnJheVtpXS5zdGF0dXMhPSdkb25lJyl7XHJcbiAgICBzdGF0dXNDaXJjbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2NyaW1zb24nO1xyXG4gIH1cclxuICBlbHNlIGlmKHRpbWVMZWZ0IDwgMyAmJiBiYW5rQXJyYXlbaV0uc3RhdHVzIT0nZG9uZScpe1xyXG4gICAgc3RhdHVzQ2lyY2xlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdvcmFuZ2UnO1xyXG4gIH1cclxuICAvKiBtQmFuayB0ZW1wbGF0ZSAqL1xyXG4gIGlmKGJhbmtBcnJheVtpXS5iYW5rID09PSAnbUJhbmsnKXtcclxuXHJcbiAgICBkYXRlT3V0cHV0LmlubmVyVGV4dCA9IGJhbmtBcnJheVtpXS5kYXRlO1xyXG4gICAgc3RyaXAuc2V0QXR0cmlidXRlKCdjbGFzcycsICdzdHJpcF9fbWJhbmsnKTtcclxuICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywnYXNzZXRzL2ltZy9tYmFuayAzMHgzMC5wbmcnKTtcclxuICAgIGNhdGVnb3J5T3V0cHV0LmlubmVyVGV4dCA9IGJhbmtBcnJheVtpXS5jYXRlZ29yeTtcclxuICAgIHRpdGxlT3V0cHV0LmlubmVyVGV4dCA9IGJhbmtBcnJheVtpXS50aXRsZTtcclxuICAgIGFtb3VudE91dHB1dC5pbm5lclRleHQgPSBgJHtiYW5rQXJyYXlbaV0uYW1vdW50fSB6xYJgO1xyXG4gICAgaWYodGltZUxlZnQ+MCl7XHJcbiAgICAgIGRheXNMZWZ0LmlubmVyVGV4dCA9IGAke3RpbWVMZWZ0fSBkLmA7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHRpbWVMZWZ0PT09MCl7XHJcbiAgICAgIGRheXNMZWZ0LmlubmVyVGV4dCA9ICd0b2RheSdcclxuICAgIH1cclxuICAgIGVsc2UgaWYodGltZUxlZnQ8MCl7XHJcbiAgICAgIGRheXNMZWZ0LmlubmVyVGV4dCA9IGBwYXNzZWRgXHJcbiAgICB9XHJcblxyXG4gIH1cclxuICAvKiBQS08gdGFtcGxhdGUgKi9cclxuICBlbHNlIGlmKGJhbmtBcnJheVtpXS5iYW5rID09PSAnUEtPJyl7XHJcbiAgICBkYXRlT3V0cHV0LmlubmVyVGV4dCA9IGJhbmtBcnJheVtpXS5kYXRlO1xyXG4gICAgc3RyaXAuc2V0QXR0cmlidXRlKCdjbGFzcycsICdzdHJpcF9fcGtvJyk7XHJcbiAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsJ2Fzc2V0cy9pbWcvcGtvYnAgNDY3eDQ4NS5wbmcnKTtcclxuICAgIGNhdGVnb3J5T3V0cHV0LmlubmVyVGV4dCA9IGJhbmtBcnJheVtpXS5jYXRlZ29yeTtcclxuICAgIHRpdGxlT3V0cHV0LmlubmVyVGV4dCA9IGJhbmtBcnJheVtpXS50aXRsZTtcclxuICAgIGFtb3VudE91dHB1dC5pbm5lclRleHQgPSBgJHtiYW5rQXJyYXlbaV0uYW1vdW50fSB6xYJgO1xyXG4gICAgaWYodGltZUxlZnQ+MCl7XHJcbiAgICAgIGRheXNMZWZ0LmlubmVyVGV4dCA9IGAke3RpbWVMZWZ0fSBkLmA7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHRpbWVMZWZ0PT09MCl7XHJcbiAgICAgIGRheXNMZWZ0LmlubmVyVGV4dCA9ICd0b2RheSdcclxuICAgIH1cclxuICAgIGVsc2UgaWYodGltZUxlZnQ8MCl7XHJcbiAgICAgIGRheXNMZWZ0LmlubmVyVGV4dCA9IGBwYXNzZWRgXHJcbiAgICB9XHJcbiAgfVxyXG4gIH1cclxufVxyXG51bC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT57XHJcbiAgXHJcbiAgaWYoZS50YXJnZXQudGFnTmFtZSA9PT0gJ0RJVicgJiYgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjbG9zZScpKXtcclxuICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LmNoaWxkcmVuLml0ZW0oMSkpO1xyXG4gICAgZS50YXJnZXQuY2hpbGRyZW4uaXRlbSgwKS5jbGFzc0xpc3QuYWRkKCdidXR0b25DbG9zZS0tc2hvdycpO1xyXG4gICAgZS50YXJnZXQuY2hpbGRyZW4uaXRlbSgxKS5jbGFzc0xpc3QuYWRkKCdidXR0b25Eb25lLS1zaG93Jyk7XHJcbiAgICAvLyBlLnRhcmdldC5jaGlsZHJlbi5pdGVtKDQpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7Ly9wb3p3YWxhIGRvc3RhxIcgc2nEmSBkbyBrb25rcmV0bmVnbyBkemllY2thXHJcbiAgfVxyXG4gIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09J0JVVFRPTicgJiYgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidXR0b25Eb25lJykpe1xyXG4gICAgbGV0IGJhbmtBcnJheSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2JhbmtBcnJheScpKTtcclxuICAgIGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdjb250YWluZXJEb25lJyk7XHJcbiAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5wYXJlbnROb2RlKTtcclxuICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2lkJykpO1xyXG4gICAgY29uc3QgY29udGFpbmVySWQgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdpZCcpO1xyXG4gICAgY29uc29sZS5sb2coY29udGFpbmVySWQpO1xyXG4gICAgXHJcbiAgICAvLyBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7Ly9jbG9zZSBkaXYgXHJcbiAgICBcclxuICAgIC8vIGUudGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7Ly9kb25lIGJ1dHRvblxyXG4gICAgLy8gZS50YXJnZXQucGFyZW50RWxlbWVudC5jaGlsZHJlbi5pdGVtKDApLnJlbW92ZSgpOy8vY2FuY2VsIGJ1dHRvblxyXG4gICAgLy8gZS50YXJnZXQucGFyZW50RWxlbWVudC5jaGlsZHJlbi5pdGVtKDApLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7Ly9jYW5jZWwgYnV0dG9uXHJcbiAgIFxyXG4gICAgICBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2hpbGRyZW4uaXRlbSgyKS5jbGFzc0xpc3QuYWRkKCd0aW1lTGVmdERvbmUnKTsvL3RpbWUgbGVmdCBkaXZcclxuICAgICAgZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuLml0ZW0oMSkubGFzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QuYWRkKCdzdGF0dXNDaXJjbGVEb25lJyk7Ly9zdGF0dXMgY2lyY2xlXHJcbiAgICAgXHJcbiAgICBmb3IobGV0IGk9MDsgaTxiYW5rQXJyYXkubGVuZ3RoOyBpKyspe1xyXG4gICAgICBjb25zdCBvYmplY3RWYWx1ZXMgPSBPYmplY3QudmFsdWVzKGJhbmtBcnJheVtpXSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKG9iamVjdFZhbHVlcywgdHlwZW9mIG9iamVjdFZhbHVlcyk7XHJcbiAgICAgIGNvbnN0IGluY2x1ZGVzID0gb2JqZWN0VmFsdWVzLmluY2x1ZGVzKGNvbnRhaW5lcklkKTtcclxuICAgICAgXHJcbiAgICAgIGlmKGluY2x1ZGVzPT09dHJ1ZSl7XHJcbiAgICAgICAgYmFua0FycmF5W2ldLmNvbnRhaW5lckNsYXNzID0gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC52YWx1ZTtcclxuICAgICAgICBiYW5rQXJyYXlbaV0udGltZUxlZnRDbGFzcyA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZHJlbi5pdGVtKDIpLmNsYXNzTGlzdC52YWx1ZTtcclxuICAgICAgICBiYW5rQXJyYXlbaV0uc3RhdHVzQ2lyY2xlQ2xhc3MgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2hpbGRyZW4uaXRlbSgxKS5sYXN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC52YWx1ZTtcclxuICAgICAgICBiYW5rQXJyYXlbaV0uc3RhdHVzID0gJ2RvbmUnO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGJhbmtBcnJheVtpXS5jb250YWluZXJDbGFzcyk7XHJcbiAgICAgICAgY29uc3QgbG9jYWwgPSBKU09OLnN0cmluZ2lmeShiYW5rQXJyYXkpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdiYW5rQXJyYXknLGxvY2FsKTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH1cclxuICAgIC8vIGxldCBjbGFzc0xpc3QgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY29udGFpbmVyQ2xhc3MnKS5zcGxpdCgnICcpO1xyXG4gICAgXHJcbiAgICAvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY29udGFpbmVyQ2xhc3MnLGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QudmFsdWUpO1xyXG4gICAgXHJcbiAgICBlLnRhcmdldC5wYXJlbnROb2RlLnJlbW92ZSgpO1xyXG4gIH1cclxuICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2J1dHRvbkNsb3NlJykpey8vdHUgdHJ6ZWJhIHBvcHJhd2nEhyAhIVxyXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnYnV0dG9uQ2xvc2UtLXNob3cnKTtcclxuICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2hpbGRyZW4uaXRlbSgxKS5jbGFzc0xpc3QucmVtb3ZlKCdidXR0b25Eb25lLS1zaG93Jyk7XHJcbiAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5wYXJlbnRFbGVtZW50KTtcclxuICB9XHJcbiAgfSkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n")},function(module,exports){eval("exports.endianness = function () { return 'LE' };\n\nexports.hostname = function () {\n    if (typeof location !== 'undefined') {\n        return location.hostname\n    }\n    else return '';\n};\n\nexports.loadavg = function () { return [] };\n\nexports.uptime = function () { return 0 };\n\nexports.freemem = function () {\n    return Number.MAX_VALUE;\n};\n\nexports.totalmem = function () {\n    return Number.MAX_VALUE;\n};\n\nexports.cpus = function () { return [] };\n\nexports.type = function () { return 'Browser' };\n\nexports.release = function () {\n    if (typeof navigator !== 'undefined') {\n        return navigator.appVersion;\n    }\n    return '';\n};\n\nexports.networkInterfaces\n= exports.getNetworkInterfaces\n= function () { return {} };\n\nexports.arch = function () { return 'javascript' };\n\nexports.platform = function () { return 'browser' };\n\nexports.tmpdir = exports.tmpDir = function () {\n    return '/tmp';\n};\n\nexports.EOL = '\\n';\n\nexports.homedir = function () {\n\treturn '/'\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3MtYnJvd3NlcmlmeS9icm93c2VyLmpzPzNjNDMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0NBQWtDOztBQUVsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCOztBQUUvQiw4QkFBOEI7O0FBRTlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCOztBQUU1Qiw0QkFBNEI7O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxVQUFVOztBQUV6Qiw0QkFBNEI7O0FBRTVCLGdDQUFnQzs7QUFFaEM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSIsImZpbGUiOiIxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0cy5lbmRpYW5uZXNzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJ0xFJyB9O1xuXG5leHBvcnRzLmhvc3RuYW1lID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0eXBlb2YgbG9jYXRpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBsb2NhdGlvbi5ob3N0bmFtZVxuICAgIH1cbiAgICBlbHNlIHJldHVybiAnJztcbn07XG5cbmV4cG9ydHMubG9hZGF2ZyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdIH07XG5cbmV4cG9ydHMudXB0aW1lID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gMCB9O1xuXG5leHBvcnRzLmZyZWVtZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE51bWJlci5NQVhfVkFMVUU7XG59O1xuXG5leHBvcnRzLnRvdGFsbWVtID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBOdW1iZXIuTUFYX1ZBTFVFO1xufTtcblxuZXhwb3J0cy5jcHVzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW10gfTtcblxuZXhwb3J0cy50eXBlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJ0Jyb3dzZXInIH07XG5cbmV4cG9ydHMucmVsZWFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5hcHBWZXJzaW9uO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG59O1xuXG5leHBvcnRzLm5ldHdvcmtJbnRlcmZhY2VzXG49IGV4cG9ydHMuZ2V0TmV0d29ya0ludGVyZmFjZXNcbj0gZnVuY3Rpb24gKCkgeyByZXR1cm4ge30gfTtcblxuZXhwb3J0cy5hcmNoID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJ2phdmFzY3JpcHQnIH07XG5cbmV4cG9ydHMucGxhdGZvcm0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnYnJvd3NlcicgfTtcblxuZXhwb3J0cy50bXBkaXIgPSBleHBvcnRzLnRtcERpciA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJy90bXAnO1xufTtcblxuZXhwb3J0cy5FT0wgPSAnXFxuJztcblxuZXhwb3J0cy5ob21lZGlyID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gJy8nXG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///1\n")}]);