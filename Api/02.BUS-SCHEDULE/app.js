function solve() {
    
    let currentId;
    let nextId;
    let url = `https://judgetests.firebaseio.com/schedule/${currentId}.json`;
    let departedBtn = document.getElementById('depart');
    let arrivedBtn = document.getElementById('arrive');
    let span = document.getElementsByClassName('info')[0];
    fetch(url)
        .then(res => res.json())
        .then(data => {
            span.innerHTML = data.name;
            departedBtn.disabled = true;
            arrivedBtn.disabled = false;
            nextId = data.next;
            console.log(data);
        });

    function depart(currentId) {
        currentId = 'depot';
    };

    function arrive() {
        
    }

    return {
        depart,
        arrive
    };
}

let result = solve();