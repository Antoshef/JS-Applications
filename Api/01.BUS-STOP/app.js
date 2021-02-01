function getInfo() {
    
    let input = document.getElementById('stopId').value;
    const url = `https://judgetests.firebaseio.com/businfo/${input}.json`;
    let stopName = document.getElementById('stopName');
    let busesElement = document.getElementById('buses');
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            stopName.innerHTML = 'Error';
        } else {
            stopName.innerHTML = `<p>${data.name}</p>`;
            let currentBuses = Object.values(data)[0];
            for (let bus in currentBuses) {
                busesElement.innerHTML += `<li>Bus ${bus} arrives in ${currentBuses[bus]} minutes</li>`;
            };
        }
    })
}