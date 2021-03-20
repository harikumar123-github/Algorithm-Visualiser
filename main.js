const inputs = document.querySelector('.inputs')
const size = document.getElementById('size')
const btn = document.querySelector('.btn')
const btn2 = document.querySelector("#reset")
const msg = document.querySelector('.msg')
const vis = document.querySelector('.visualiser')
 
let values = [];

btn.addEventListener('click',() => {
    if(size.value=="" || size.value>180 || size.value<1){ 
        let nm = document.createElement('p');
        nm.innerText = (size.value=="")?"Please enter correct value..":"Enter a value from 1 to 180";
        msg.appendChild(nm)
        setTimeout(() => {
            nm.remove();
        },3000)
    }
    else{
        inputs.classList.add('hide');
        btn2.classList.remove('hide');
        start();
    }
})

document.addEventListener('keydown', e => {
    if(e.keyCode === 13 && !(inputs.classList.contains('hide')) ){
        e.preventDefault();
        btn.click();
    }
});

btn2.addEventListener('click', () => {
    location.reload();
})

function start(){
    for(let i=0;i<size.value;++i){
        values.push(Math.floor(Math.random()*630+1));
        let newDiv = document.createElement('div');
        newDiv.className = 'bar';
        newDiv.style.height = `${values[i]}px`
        newDiv.style.width = '8px'
        vis.appendChild(newDiv);
    }
    startSort();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSort(){
    let bars = Array.from(document.querySelectorAll('.bar'))
    for(let i=0;i<size.value;++i){
        bars[i].style.backgroundColor = 'orange';
        for(let j=i+1;j<size.value;++j){
            bars[j].style.backgroundColor = 'orange';
            if(values[i]>values[j]){
                let temp = bars[i].style.height;
                bars[i].style.height =  bars[j].style.height;
                await sleep(10);
                bars[j].style.height = temp;
                await sleep(10);
                [values[i],values[j]] = [values[j],values[i]];
            }
            bars[j].style.backgroundColor = 'rgb(16, 245, 195)';
        }
        bars[i].style.backgroundColor = 'lightblue';
    }
}
