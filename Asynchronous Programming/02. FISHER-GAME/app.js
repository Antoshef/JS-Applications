function attachEvents() {
    
    const updateBtn = document.getElementsByClassName('update')[0];
    const deleteBtn = document.getElementsByClassName('delete')[0];
    const loadBtn = document.getElementsByClassName('load')[0];
    const addBtn = document.getElementsByClassName('add')[0];

    addBtn.addEventListener('click', addFisher);
}

function addFisher() {
    let obj = {
        angler: document.getElementsByClassName('angler')[1].value,
        weigth: document.getElementsByClassName('weight')[1].value,
        species: document.getElementsByClassName('species')[1].value,
        location: document.getElementsByClassName('location')[1].value,
        bait: document.getElementsByClassName('bait')[1].value,
        captureTime: document.getElementsByClassName('captureTime')[1].value,
    }

    fetch('https://fisher-game.firebaseio.com/catches.json', {method: 'POST', body: JSON.stringify(obj)});
}

attachEvents();

