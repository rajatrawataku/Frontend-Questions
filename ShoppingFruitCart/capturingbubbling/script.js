

const outputNode = document.getElementsByClassName("output");
function fn1(){
  alert('1st parent')
}

function fn2(){
alert('2nd parent')
}

function fn3(){
  alert('3rd parent')
}

 for(let elem of document.querySelectorAll('.a')) {
    elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
  }