function save() {
    var text = document.getElementById('tosave').value;
    var data = new Blob([text], { type: 'text/plain' });
    var url = window.URL.createObjectURL(data);
    document.getElementById('download_link').style.visibility = 'visible';
    document.getElementById('download_link').href = url;
    document.getElementById('download_link').click();
    document.getElementById('download_link').style.visibility = 'collapse';

}

let inputTextArea = document.getElementsByClassName("superunique")[0];
let inputFile = document.getElementById("upload-text");

inputFile.addEventListener('change', () => {

    let files = inputFile.files;

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

        inputTextArea.value = lines.join('\n');

    };

    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(file);
});


function downloadKey() {
    var text = document.getElementById('key').value;
    var data = new Blob([text], { type: 'text/plain' });
    var url = window.URL.createObjectURL(data);
    document.getElementById('download_link_key').style.visibility = 'visible';
    document.getElementById('download_link_key').href = url;
    document.getElementById('download_link_key').click();
    document.getElementById('download_link_key').style.visibility = 'collapse';
}

let keyUpload = document.getElementById('key');
let uploadKeyButton = document.getElementById('upload-key');
uploadKeyButton.addEventListener('change', () => {

    let files = uploadKeyButton.files;

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

        keyUpload.value = lines.join('\n');

    };

    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(file);
});

function _generateRandomKey() {
    var lenText = inputTextArea.value.length;
    var randomShift = Math.floor(Math.random() * lenText) + lenText + 5;
    var key = '';

    for (var i = 0; i < randomShift; i++) {
        key += random();
    }
    console.log(key);
}

console.log('fgdfgdfgd');

function uploadKey() {

    console.log('fgdfgdfgd');


    uploadKeyButton.click();
}