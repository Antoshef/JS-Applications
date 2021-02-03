function attachEvents() {
    
    let refreshBtn = document.getElementById('refresh');
    let sendBtn = document.getElementById('submit');
    let textArea = document.getElementById('messages');
    let url = 'https://rest-messanger.firebaseio.com/messanger.json';
    let input = document.getElementById('author');
    let content = document.getElementById('content');

    refreshBtn.addEventListener('click', () => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            Object.values(data).map(x => textArea.innerHTML += `${x.author}: ${x.content}\n`);
        })
    });

    sendBtn.addEventListener('click', () => {
        let person = {
            author: input.value,
            content: content.value,
        }
        console.log(person);
        fetch(url, { method: 'POST', body: JSON.stringify(person)});
        input.value = '';
        content.value = '';
    })
}

attachEvents();