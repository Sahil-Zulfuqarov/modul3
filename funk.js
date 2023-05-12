const url='https://api.exchangerate.host/latest';

let currentCurr='RUB', exchangeCurr='USD';
let currVal=1;

const inpLeft=document.querySelector('.frst');
const inpRight=document.querySelector('.scnd');

const currLeft=document.querySelector('#pp1');
const currRight=document.querySelector('#pp2');

const btnsLeft=document.querySelector('#b1').children;
for(let i=0;i<btnsLeft.length;i++){
    btnsLeft[i].addEventListener('click',changeCurrentCurrency);
}
const btnsRight=document.querySelector('#b2').children;
for(let i=0;i<btnsRight.length;i++){
    btnsRight[i].addEventListener('click',changeExchangeCurrency);
}
async function loadCurrency(a,b){
    if(a===b) return 1;
    const query=`?base=${a}&symbols=${b}`;
    const res=await fetch(url+query);
    const data=await res.json();
    return data.rates[b];
}
function getData(c,e,l,r){
    loadCurrency(c,e)
    .then(data=>{
        currVal=data.toFixed(4);
        const val=parseFloat(l.value);
        r.value=(val*currVal).toFixed(4);
        currLeft.innerText=`1 ${c}=${currVal} ${e}`;
        const excVal=(1/currVal).toFixed(4);
        currRight.innerText=`1 ${e} =${excVal} ${c}`;
    })
    //.catch(e=>alert('Network error: error while getting data'));
}
function changeCurrentCurrency(e){
    const btn=e.target;
    for(let i=0;i<btnsLeft.length;i++){
        btnsLeft[i].classList.remove('bactive');
    }
    btn.classList.add('bactive');
    currentCurr=btn.innerText.toUpperCase();
    getData(currentCurr,exchangeCurr,inpLeft,inpRight);
}
function changeExchangeCurrency(e) {
    const btn=e.target;
    for(let i=0;i<btnsRight.length;i++){
        btnsRight[i].classList.remove('bactive');
    }
    btn.classList.add('bactive');
    exchangeCurr=btn.innerText.toUpperCase();
    getData(currentCurr,exchangeCurr,inpLeft,inpRight);
}
inpLeft.addEventListener('input', (e)=>{
e.target.value=e.target.value.replaceAll(',', '.');
getData(currentCurr,exchangeCurr,inpLeft,inpRight);
})
inpRight.addEventListener('input',(e)=>{
e.target.value-e.target.value.replaceAll(',','.');
getData(exchangeCurr,currentCurr,inpRight,inpLeft);
})
