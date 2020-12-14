const uri = 'rsa/api/key';
const message = document.getElementById('message');
const public_key = document.getElementById('public-key');
const private_key = document.getElementById('private-key');
const mod = document.getElementById('mod')

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

function addItem() {

    const item = {
        message: false,
        name: addNameTextbox.value.trim()
    };

    fetch(uri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}