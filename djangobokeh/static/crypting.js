let tabHeader = document.getElementsByClassName("tab-header")[0];
let tabIndicator = document.getElementsByClassName("tab-indicator")[0];
let tabBody = document.getElementsByClassName("tab-body")[0];

let tabsPane = tabHeader.getElementsByTagName("div");

for (let i = 0; i < tabsPane.length; i++) {
    tabsPane[i].addEventListener("click", function() {
        tabHeader.getElementsByClassName("active")[0].classList.remove("active");
        tabsPane[i].classList.add("active");
        tabBody.getElementsByClassName("active")[0].classList.remove("active");
        tabBody.getElementsByTagName("div")[i].classList.add("active");

        tabIndicator.style.left = `calc(20px + calc(100% / 2 - 20px) * ${i})`;
    });
}

let decodeTypes = tabBody.getElementsByClassName("types-crypt")[0];
let typesPane = decodeTypes.getElementsByTagName("p");
let inputDecode = document.getElementById("upload-decode");
let textarea1Decode = document.getElementsByClassName("textarea1-decode")[0];
let textarea2Decode = document.getElementsByClassName("textarea2-decode")[0];

inputDecode.addEventListener('change', () => {
    let files = inputDecode.files;

    if (files.length == 0) return;

    /* If any further modifications have to be made on the 
       Extracted text. The text can be accessed using the  
       file variable. But since this is const, it is a read  
       only variable, hence immutable. To make any changes,  
       changing const to var, here and In the reader.onload  
       function would be advisible */
    const file = files[0];

    let reader = new FileReader();

    reader.onload = (e) => {
        const file = e.target.result;

        // This is a regular expression to identify carriage  
        // Returns and line breaks 
        const lines = file.split(/\r\n|\n/);
        textarea1Decode.value = lines.join('\n');

    };

    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(file);
});
for (let i = 0; i < typesPane.length; i++) {
    typesPane[i].addEventListener("click", function() {
        decodeTypes.getElementsByClassName("active")[0].classList.remove("active");
        typesPane[i].classList.add("active");
        if (typesPane[i].classList[0] == "cezar") {

            document.getElementById("key-input").style.visibility = 'visible';
            document.getElementById("key-input").type = 'number';
            document.getElementById("key-input").style.width = '120px';
            document.getElementById("key-input").style.height = '30px';
            document.getElementById("key-input").style.left = '0px';
        }

        if (typesPane[i].classList[0] == 'monoalph') {

            document.getElementById("key-input").style.visibility = 'visible';
            document.getElementById("key-input").type = 'text';
            document.getElementById("key-input").style.width = '120px';
            document.getElementById("key-input").style.height = '30px';
            document.getElementById("key-input").style.left = '0px';
        }
        if (typesPane[i].classList[0] == "freq") {

            document.getElementById("key-input").style.visibility = 'collapse';
            document.getElementById("key-input").style.width = '1px';
            document.getElementById("key-input").style.height = '1px';
            document.getElementById("key-input").style.left = '-1000px';

        }
    });
}
ENGalphabet = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
var dictTransalte = { 'a': null, 'b': null, 'c': null, 'd': null, 'e': null, 'f': null, 'g': null, 'h': null, 'i': null, 'j': null, 'k': null, 'l': null, 'm': null, 'n': null, 'o': null, 'p': null, 'q': null, 'r': null, 's': null, 't': null, 'u': null, 'v': null, 'w': null, 'x': null, 'y': null, 'z': null, }
let keyClassDecode = document.getElementsByClassName("substitution")[0];
let keyInputs = keyClassDecode.getElementsByTagName("input");
var error = false;


var text = textarea1Decode.value.toLowerCase();

function translateText() {

    for (var i = 0; i < keyInputs.length - 4; i++) {
        if (keyInputs[i].value == "") {
            continue;
        } else {
            for (var j = 0; j < i; j++) {
                if (keyInputs[i].value == keyInputs[j].value) {
                    error = true;
                    keyInputs[i].style.backgroundColor = "red";
                    keyInputs[j].style.backgroundColor = "red";
                }
            }
        }
    }
    if (error == true) {
        alert("Incorrect letters!");
    } else {

        var text = textarea1Decode.value.toLowerCase();
        for (var k = 0; k < keyInputs.length - 4; k++) {
            dictTransalte[ENGalphabet[k].toLowerCase()] = keyInputs[k].value;
            if (keyInputs[k].value != "") {
                text = text.replace(new RegExp(ENGalphabet[k].toLowerCase(), 'g'), keyInputs[k].value.toUpperCase());
            }
        }
        textarea2Decode.value = text;
        for (var k = 0; k < keyInputs.length - 4; k++) {
            keyInputs[k].style.backgroundColor = "white";
            keyInputs[k].style.borderWidth = "1px";
            keyInputs[k].style.borderStyle = "";
        }
    }
    error = false;
}

function save() {
    var text = document.getElementById('tosave').value;
    var data = new Blob([text], { type: 'text/plain' });
    var url = window.URL.createObjectURL(data);
    document.getElementById('download_link').href = url;
    document.getElementById('download_link').click();
}

let fregColumns = document.getElementsByClassName('analysis-2-columns')[0];
let mostFrequent = fregColumns.getElementsByClassName('most-frequent')[0];
let number1Letter = mostFrequent.getElementsByClassName('one-letter')[0];
let number2Letter = mostFrequent.getElementsByClassName('two-letter')[0];
let number3Letter = mostFrequent.getElementsByClassName('three-letter')[0];
let allP1let = number1Letter.getElementsByTagName('p');
let allP1letCommon = fregColumns.getElementsByClassName('most-common')[0].getElementsByClassName('one-letter')[0].getElementsByTagName('p');
let allP2let = number2Letter.getElementsByTagName('p');
let allP3let = number3Letter.getElementsByTagName('p');


function calcfreq() {

    var text = textarea1Decode.value.toLowerCase();
    fregColumns.style.visibility = 'visible';
    var punctuationless = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`'~() 1234567890\]\[\r?\n|\r]/g, "");
    var finalString = punctuationless.replace(/\s{2,}/g, " ");
    var freq = {};
    for (var i = 0; i < finalString.length; i++) {
        var character = finalString.charAt(i);
        if (freq[character]) {
            freq[character]++;
        } else {
            freq[character] = 1;
        }
    }
    var items = Object.keys(freq).map(function(key) {
        return [key, freq[key]];
    });
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    for (var l = 0; l < allP1let.length; l++) {
        if (items.length <= l) {
            continue;
        }
        allP1let[l].innerHTML = items[l][0].toUpperCase() + "-" + items[l][1].toString();
    }
    var freq2 = {};
    for (var m2 = 0; m2 < finalString.length - 1; m2++) {
        var substr = finalString.substring(m2, m2 + 2);
        if (freq2[substr]) {
            freq2[substr]++;
        } else {
            freq2[substr] = 1;
        }
    }
    var items2 = Object.keys(freq2).map(function(key) {
        return [key, freq2[key]];
    });
    items2.sort(function(first, second) {
        return second[1] - first[1];
    });
    for (var l = 0; l < allP2let.length; l++) {
        if (items2.length <= l) {
            continue;
        }
        allP2let[l].innerHTML = items2[l][0].toUpperCase() + "-" + items2[l][1].toString();
    }

    var freq3 = {};
    for (var m3 = 0; m3 < finalString.length - 2; m3++) {
        var substr = finalString.substring(m3, m3 + 3);
        if (freq3[substr]) {
            freq3[substr]++;
        } else {
            freq3[substr] = 1;
        }
    }
    var items3 = Object.keys(freq3).map(function(key) {
        return [key, freq3[key]];
    });
    items3.sort(function(first, second) {
        return second[1] - first[1];
    });
    for (var l = 0; l < allP3let.length; l++) {
        if (items3.length <= l) {
            continue;
        }
        allP3let[l].innerHTML = items3[l][0].toUpperCase() + "-" + items3[l][1].toString();
    }


}

for (let p = 0; p < allP1let.length; p++) {
    allP1let[p].addEventListener("click", function() {
        if (allP1let[p].classList[allP1let[p].classList.length - 1] == 'active') {
            allP1let[p].classList.remove('active');
            allP1letCommon[p].classList.remove('active');
        } else {
            allP1let[p].classList.add('active');
            allP1letCommon[p].classList.add('active');
        }
    })
}


//////////////////////////
//he;;;p


var containerBody = document.getElementsByClassName('body-decode')[0];
var backdrop = containerBody.getElementsByClassName('backdrop')[0];
var highlights = backdrop.getElementsByClassName('highlights')[0];
var highlightsWithPre = highlights.getElementsByTagName('pre')[0];
var textarea = document.getElementById('in-highlights');
//var $toggle = $('button');

// yeah, browser sniffing sucks, but there are browser-specific quirks to handle that are not a matter of feature detection
/*
var ua = window.navigator.userAgent.toLowerCase();
var isIE = !!ua.match(/msie|trident\/7|edge/);
var isWinPhone = ua.indexOf('windows phone') !== -1;
var isIOS = !isWinPhone && !!ua.match(/ipad|iphone|ipod/);*/ //we dont need it for now, cause we only need it working on windows, chrome

function applyHighlights(text) {
    text = text
        .replace(/\n&/g, '\n\n')
        .replace(/[A-Z].*?\b/g, '<span>$&</span> ');

    /*if (isIE) {
        // IE wraps whitespace differently in a div vs textarea, this fixes it
        text = text.replace(/ /g, ' <wbr>');
    }*/

    return text;
}

function handleInput() {
    var pre = document.createElement('pre');

    var text = textarea.value;
    //console.log(text);
    var highlightedText = applyHighlights(text);
    //console.log(highlightedText);
    //pre.appendChild(highlightedText)
    highlightsWithPre.innerHTML = highlightedText;
}

function handleScroll() {
    var scrollTop = textarea.scrollTop;
    backdrop.scrollTop = scrollTop;

    var scrollLeft = textarea.scrollLeft;
    backdrop.scrollLeft = scrollLeft;
}

/*function fixIOS() {
    // iOS adds 3px of (unremovable) padding to the left and right of a textarea, so adjust highlights div to match
    $highlights.css({
        'padding-left': '+=3px',
        'padding-right': '+=3px'
    });
}*/

//textarea.addEventListener('input', handleInput);
//textarea.addEventListener('scroll', handleScroll);

/*$textarea.on({
    'input': handleInput,
    'scroll': handleScroll
});

$toggle.on('click', function() {
    $container.toggleClass('perspective');
});*/


//handleInput();
let linkToDownloadKey = document.getElementById('download_link_key');

function download_key() {
    var key = "";
    for (var i = 0; i < keyInputs.length - 4; i++) {
        if (keyInputs[i].value == "") {
            key += " ";
        } else {
            key += keyInputs[i].value;
        }
    }
    var data = new Blob([key], { type: 'text/plain' });
    var url = window.URL.createObjectURL(data);
    document.getElementById('download_link_key').href = url;
    document.getElementById('download_link_key').click();
}

let uploadKey = document.getElementById('upload-key');

uploadKey.addEventListener('change', () => {
    let files = uploadKey.files;

    if (files.length == 0) return;

    /* If any further modifications have to be made on the 
       Extracted text. The text can be accessed using the  
       file variable. But since this is const, it is a read  
       only variable, hence immutable. To make any changes,  
       changing const to var, here and In the reader.onload  
       function would be advisible */
    const file = files[0];

    let reader = new FileReader();

    reader.onload = (e) => {
        const file = e.target.result;

        // This is a regular expression to identify carriage  
        // Returns and line breaks 


        const lines = file.split(/\r\n|\n/);

        for (var i = 0; i < 26; i++) {

            if (lines[0].charAt(i) == " ") {
                continue;
            } else {
                keyInputs[i].value = lines[0].charAt(i);
            }
        }

    };

    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(file);
});

function upload_key() {
    uploadKey.click();

}