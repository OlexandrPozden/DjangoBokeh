const uri = 'rsa/key';

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Unable to get items.', error));
}