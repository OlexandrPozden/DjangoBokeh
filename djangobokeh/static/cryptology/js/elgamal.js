const uri = 'elgamal/api/generate-key';
const urlSign = 'elgamal/api/signature';
const message = document.getElementById('message');
const public_key_p = document.getElementById('public-key-p');
const public_key_g = document.getElementById('public-key-g');
const public_key_y = document.getElementById('public-key-y');
const private_key = document.getElementById('private-key');
const s1 = document.getElementById('s1');
const s2 = document.getElementById('s2');
const result = document.getElementById('tosave');


function generateKeys() {
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            public_key_p.value = data.publicKey.p;
            public_key_g.value = data.publicKey.g;
            public_key_y.value = data.publicKey.y;
            private_key.value = data.privateKey;

        })
        .catch(error => console.error('Unable to get items.', error));


}

function sendItems() {

    const item = {
        msg: message.value,
        p: public_key_p.value,
        g: public_key_g.value,
        x: private_key.value
    };
    fetch(urlSign, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            s1.value = data.s1;
            s2.value = data.s2;
        })
        .catch(error => console.error('Unable to add item.', error));
}



/// download part

function downloadPublicKey() {
    const storageObj = {
        encryption: public_key.value,
        mod_N: mod.value,
    }
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storageObj));
    var dlAnchorElem = document.getElementById('download-public-key');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "publicKey.json");
    dlAnchorElem.click();
}

function downloadPrivateKey() {
    const storageObj = {
        decryption: private_key.value,
        mod_N: mod.value,
    }
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storageObj));
    var dlAnchorElem = document.getElementById('download-private-key');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "privateKey.json");
    dlAnchorElem.click();
}


//public key upload

let fileReaderPublicKey = document.getElementById('upload-public-key');

fileReaderPublicKey.addEventListener('change', () => {

    console.log('or even here');
    var importedFile = fileReaderPublicKey.files[0];

    var reader = new FileReader();
    console.log('at least here');
    reader.onload = function() {

        var fileContent = JSON.parse(reader.result);
        public_key.value = fileContent.encryption;
        mod.value = fileContent.mod_N;
    };
    reader.readAsText(importedFile);
});

function uploadPublicKey() {
    fileReaderPublicKey.click();
}

//private key upload

let fileReaderPrivateKey = document.getElementById('upload-private-key');

fileReaderPrivateKey.addEventListener('change', () => {

    var importedFile = fileReaderPrivateKey.files[0];

    var reader = new FileReader();
    reader.onload = function() {

        var fileContent = JSON.parse(reader.result);
        private_key.value = fileContent.decryption;
        mod.value = fileContent.mod_N;
    };
    reader.readAsText(importedFile);
});

function uploadPrivateKey() {
    fileReaderPrivateKey.click();
}



/// uploading message (plain text)
let inputfile = document.getElementById('upload-plain-text');
inputfile.addEventListener('change', () => {
    console.log('before if');
    let files = inputfile.files;

    if (files.length == 0) return;
    console.log('after now');
    const file = files[0];

    let reader = new FileReader();

    reader.onload = (e) => {
        const file = e.target.result;

        const lines = file.split(/\r\n|\n/);
        console.log('before message')
        message.value = lines.join('\n');

    };

    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(file);
});


/// downloading result (crypted text)

function save() {
    var text = document.getElementById('tosave').value;
    var data = new Blob([text], { type: 'text/plain' });
    var url = window.URL.createObjectURL(data);
    document.getElementById('download_link').style.visibility = 'visible';
    document.getElementById('download_link').href = url;
    document.getElementById('download_link').click();
    document.getElementById('download_link').style.visibility = 'collapse';

}