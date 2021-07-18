const result = document.getElementById('result');
const buttons = document.getElementsByTagName('button');
const OVERFROW = 'overflow';
let calcResult = '';
let taxResult = '';

// 文字数をチェックする関数
function checkLength(){
  const resultLen = result.textContent.length;
  const btnLen = buttons.length;
  if(resultLen > 12) {
    result.textContent = OVERFROW;
    for(let i = 1; i < btnLen; i++){
    buttons[i].disabled = "true";
    }
  }
}

// 数字ボタンが押された時の関数
function pushNum(key){
  const resultStr = result.textContent;
  const keyStr = key.textContent;
  if(resultStr == "0" 
     || resultStr == calcResult 
     || resultStr == taxResult) {
    result.textContent = keyStr;
  }else {
    result.textContent += keyStr;
  }
  calcResult = '';
  taxResult = '';
  checkLength();
}

// 演算子ボタンが押された時の関数
function pushOpe(key){
  const resultStr = result.textContent;
  const keyStr = key.textContent;
  if(resultStr.indexOf('+') !== -1 
     || resultStr.indexOf('-') !== -1 
     || resultStr.indexOf('*') !== -1 
     || resultStr.indexOf('/') !== -1) {
    result.textContent = resultStr;
  }else {
    result.textContent += keyStr;
  }
  checkLength();
}

// イコールが押された時に計算結果を返す関数
function calc(){
  const resultStr =result.textContent;
  const lastStr = result.textContent.slice(-1);
  const btnLen = buttons.length;
  if(lastStr == '+' 
     || lastStr == '-' 
     || lastStr == '*' 
     || lastStr == '/') {
    result.textContent = resultStr;
  }else {
    if(resultStr.indexOf('+') !== -1) {
    let number = result.textContent.split('+');
    result.textContent = Number(number[0]) + Number(number[1]);
    }else if(resultStr.indexOf('-') !== -1) {
      let number = result.textContent.split('-');
      result.textContent = Number(number[0]) - Number(number[1]);
    }else if(resultStr.indexOf('*') !== -1) {
      let number = result.textContent.split('*');
      result.textContent = Number(number[0]) * Number(number[1]);
    }else if(resultStr.indexOf('/') !== -1) {
      let number = result.textContent.split('/');
      result.textContent = Number(number[0]) / Number(number[1]);
    }
    calcResult = result.textContent;
    calcResultLen = result.textContent.length;
  }
  if(calcResultLen > 12) {
    result.textContent = result.textContent.slice(0, 12);
  }else if(calcResult == Infinity) {
    for(let i = 1; i < btnLen; i++) {
      buttons[i].disabled = "true";
    }
  }
}

// ACボタンで全てをリセットする関数
function reset(){
  const resultStr = result.textContent; 
  if(resultStr == OVERFROW || resultStr.indexOf('e')) {
    location.reload();
  }else {
    result.textContent = '0';
  }
}

// 税込計算をする関数
function calcTax(){
  const resultStr = result.textContent;
  const btnLen = buttons.length;
  if(!isNaN(resultStr)) {
    result.textContent = Math.floor(resultStr * 1.1);
    taxResult = result.textContent;
    if(taxResult.length > 12) {
      result.textContent = taxResult.slice(0, 1) + 'e' + taxResult.length;
      for(let i = 1; i < btnLen; i++) {
      buttons[i].disabled = "true";
      }
    }
  }
}

// 1文字消す関数
function back(){
  const resultStr = result.textContent;
  const resultLen = result.textContent.length;
  if(0 <= resultStr && resultStr <= 9
     || resultStr == calcResult 
     || resultStr == taxResult) {
  result.textContent = '0';
  }else {
    result.textContent = result.textContent.substring(0, resultLen - 1);
  }
}
