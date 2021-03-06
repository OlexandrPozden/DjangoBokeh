const uri = 'rsa/api/key';
const message = document.getElementById('message');
const public_key = document.getElementById('public-key');
const private_key = document.getElementById('private-key');
const mod = document.getElementById('mod')
const result = document.getElementById('tosave');

const choose = document.getElementById('choose');

function deOrEncode() {
    if (choose.checked == true) {
        public_key.required = false;
        public_key.readOnly = true;
        public_key.style.backgroundColor = '#C0C0C0';
        private_key.required = true;
        private_key.readOnly = false;
        private_key.style.backgroundColor = 'inherit';
    } else {

        private_key.required = false;
        private_key.readOnly = true;
        private_key.style.backgroundColor = '#C0C0C0';
        public_key.required = true;
        public_key.readOnly = false;
        public_key.style.backgroundColor = 'inherit';
    }
}


function generateKeys() {
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            public_key.value = data.publicKey;
            private_key.value = data.privateKey;
            mod.value = data.mod;
        })
        .catch(error => console.error('Unable to get items.', error));


}

function sendItems() {

    const item = {
        message: message.value,
        key: null,
        N: mod.value,
    };
    if (choose.checked == true) {
        item.key = private_key.value;
    } else {
        item.key = public_key.value;
    }
    fetch(uri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        .then(response => response.json())
        .then((data) => {
            result.value = data.result;
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