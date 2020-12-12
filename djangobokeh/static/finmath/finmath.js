let coverButttons = document.getElementsByClassName('buttons')[0];
let buttons = coverButttons.getElementsByClassName('button');

let inputs = document.getElementsByClassName('input-value')[0];

let checkBox = document.getElementById('checkbox');
console.log(checkBox.checked);
checkBox.addEventListener('change', function() {
    if (checkBox.checked == true) {
        inputs.getElementsByClassName('pilga')[0].classList.add('boxactive');
        inputs.getElementsByClassName('pilga')[0].style.position = "relative";
        inputs.getElementsByClassName('pilga')[0].style.display = "block";
        inputs.getElementsByClassName('pilga')[0].style.left = "0px";
        inputs.getElementsByClassName('pilga')[0].style.width = "auto";



        console.log('here');
    } else {
        console.log('somethi wrong here');


        inputs.getElementsByClassName('pilga')[0].classList.remove('boxactive');
        inputs.getElementsByClassName('pilga')[0].style.position = "absolute";
        inputs.getElementsByClassName('pilga')[0].style.display = "block";
        inputs.getElementsByClassName('pilga')[0].style.left = "-1500px";
        inputs.getElementsByClassName('pilga')[0].style.width = "1px";



    }
})

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        coverButttons.getElementsByClassName("active")[0].classList.remove('active');
        buttons[i].classList.add('active');
        let buttonClassName = buttons[i].classList[0];
        console.log(buttonClassName);
        console.log(inputs);
        let inputsActive = inputs.getElementsByClassName('active');
        console.log(inputsActive);
        for (let j = 0; j < inputsActive.length; j++) {
            inputsActive[j].classList.remove('active');
        }
        let toChange = inputs.getElementsByClassName(buttonClassName);
        for (let g = 0; g < toChange.length; g++) {
            toChange[g].classList.add('active');
        }
        let resultOutput = document.getElementsByClassName('results')[0];
        resultOutput.getElementsByClassName('active')[0].classList.remove('active');
        resultOutput.getElementsByClassName(buttonClassName)[0].classList.add('active');


    });
}

let calculateButton = document.getElementById('calculate');

function a(n, i) {
    return (1 - Math.pow(1 + i, -n)) / i
}

function v(L, i) {
    return 1 / (Math.pow(1 + i / 1200, L))
}





calculateButton.addEventListener('click', function() {

    let L = document.getElementById('L').value;
    let D = document.getElementById('D').value;
    let i = document.getElementById('i').value;
    let n = document.getElementById('n').value;
    let g = document.getElementById('g').value;
    let t = document.getElementById('t').value;
    let Wout = document.getElementById('W');
    let Yout = document.getElementById('Y');
    let Sout = document.getElementById('S');
    let w;
    let W;
    let Y;
    let S;

    let whatToCalculate = coverButttons.getElementsByClassName('active')[0].classList[0];
    console.log(whatToCalculate);
    if (whatToCalculate == 'W-undefined') {
        if (checkBox.checked == true) {
            w = 1 - (v(L, i / 100) * a((n * 12 - L) / 12, i / 100) / a((n * 12 - L) / 12, g / 100) + (g / 100) * a(L / 12, i / 100))
        } else {
            console.log(a(n, i / 100));
            w = 1 - a(n, i / 100) / a(n, g / 100);
            console.log(w);

        }
        W = w * D;
        Wout.value = W;
    } else {
        Y = (((D * g) / 1200) * Math.pow(1 + g / 1200, 12 * n)) / (Math.pow(1 + g / 1200, 12 * n) - 1)
        S = D * ((Math.pow(1 + g / 1200, 12 * n) - Math.pow(1 + g / 1200, t - 1)) / (Math.pow(1 + g / 1200, 12 * n) - 1))
        Yout.value = Y
        Sout.value = S
    }
})