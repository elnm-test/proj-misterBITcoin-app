
const sticky = (function () {
  window.addEventListener('scroll', () => {
    var elNav = document.querySelector('.header');
    elNav.classList.toggle('sticky', window.scrollY > 0);
  })
})()

function saveToLocal(key, value) {
  var str = JSON.stringify(value);
  localStorage.setItem(key, str)
}

function loadFromLocal(key) {
  var str = localStorage.getItem(key);
  var value = JSON.parse(str);
  return value;
}


function saveToSession(key, value) {
  var str = JSON.stringify(value);
  sessionStorage.setItem(key, str)
}

function loadFromSession(key) {
  var str = sessionStorage.getItem(key);
  var value = JSON.parse(str);
  return value;
}

function redirectPage() {
  return this.props.history.push('/')
}


function makeId(length = 10) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}
 

export default {
  sticky,
  loadFromLocal,
  saveToLocal,
  makeId,
  saveToSession,
  loadFromSession,
  redirectPage
}
