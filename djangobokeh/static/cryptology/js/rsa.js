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
    dlAnchorElem.setAttribute("download", "scene.json");
    dlAnchorElem.click();
}

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