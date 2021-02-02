function solve() {
    
    let currentId = 'depot';
    let name;
    let nextId;
    let url = `https://judgetests.firebaseio.com/schedule/`;
    let departedBtn = document.getElementById('depart');
    let arrivedBtn = document.getElementById('arrive');
    let span = document.getElementsByClassName('info')[0];

    function depart() {
        fetch(url + currentId + '.json')
        .then(res => res.json())
        .then(data => {
            span.innerHTML = `Next stop ${data.name}`;
            departedBtn.disabled = true;
            arrivedBtn.disabled = false;
            nextId = data.next;
            name = data.name;
        });

    };

    function arrive() {
        span.innerHTML = `Arrived at ${name}`;
        currentId = nextId;
        departedBtn.disabled = false;
        arrivedBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();