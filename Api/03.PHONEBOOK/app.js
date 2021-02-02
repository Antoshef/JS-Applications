function attachEvents() {

    class Person {
        constructor(name, phone) {
            this.name = name;
            this.phone = phone;
            this.id = phone + 'id';
        }
    }
    
    const url = 'https://phonebook-nakov.firebaseio.com/phonebook.json';
    let btnLoad = document.getElementById('btnLoad');
    let ulElement = document.getElementById('phonebook');
    let btnCreate = document.getElementById('btnCreate');
    let li = document.createElement('li');
    let btnDelete = document.createElement('button');
    btnDelete.textContent = 'Delete';

    btnLoad.addEventListener('click', () => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            for (let key in data) {
                li.innerHTML = `${data[key].person}: +${data[key].phone}`;
                btnDelete.addEventListener('click', deleteElements(data[key].id));
                li.appendChild(btnDelete);
                ulElement.appendChild(li);
            }
        });
    });

    btnCreate.addEventListener('click', create);

    function deleteElements(key) {
        let deleteUrl = `https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`;
        fetch(deleteUrl, { method: 'DELETE' })
    }

    function create() {
        let name = document.getElementById('person');
        let phone = document.getElementById('phone');
        let person = new Person(name.value, phone.value);
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(person)
        });
    
        li.innerHTML = `${person.name}: +${person.phone}`;
        btnDelete.addEventListener('click', () => {
            fetch(person, { method: 'DELETE' })
        });
        li.appendChild(btnDelete);
        ulElement.appendChild(li);
        name.value = '';
        phone.value = '';
    }
};



attachEvents();