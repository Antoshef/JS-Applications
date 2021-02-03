function attachEvents() { 

    class Person {
        constructor(person, phone) {
            this.person = person;
            this.phone = phone;
        }
    }
    
    const url = 'https://phonebook-nakov.firebaseio.com/phonebook.json';
    let btnLoad = document.getElementById('btnLoad');
    let ulElement = document.getElementById('phonebook');
    let btnCreate = document.getElementById('btnCreate');

    btnLoad.addEventListener('click', () => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            let array = Object.entries(data);
            array.map(x => {
                let li = document.createElement('li');
                li.innerHTML = `${x[1].person}: ${x[1].phone}`;
                let btnDelete = document.createElement('button');
                btnDelete.textContent = 'Delete';
                btnDelete.style.marginLeft = '20px';
                let key = x[0];
                btnDelete.addEventListener('click', () => {
                    let deleteUrl = `https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`;
                    fetch(deleteUrl, { method: 'DELETE' });
                    btnDelete.parentElement.remove();
                });
                li.appendChild(btnDelete);
                ulElement.appendChild(li);
            })
        });
    });

    btnCreate.addEventListener('click', create);

    function create() {
        let name = document.getElementById('person');
        let phone = document.getElementById('phone');
        let person = new Person(name.value, phone.value);
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(person)
        });
        let list = document.createElement('li');
        list.innerHTML = `${person.person}: +${person.phone}`;
        name.value = '';
        phone.value = '';
    }
};



attachEvents();