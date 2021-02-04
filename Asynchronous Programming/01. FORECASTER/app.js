function attachEvents() {
    
    const subminBtn = document.getElementById('submit');
    const input = document.getElementById('location');
    let forecast = document.getElementById('forecast');
    let currentConditions = document.getElementById('current');
    let upcomingConditions = document.getElementById('upcoming');
    let urlLocation = 'https://judgetests.firebaseio.com/locations.json';
    let deg = '&#176';
    let divFor = document.createElement('div');
    divFor.className = 'forecast';
    let divForecast = document.createElement('div');
    divForecast.className = 'forecast-info';
    let request = document.getElementById('request');

    subminBtn.addEventListener('click', () => {
        divFor.innerHTML = '';
        divForecast.innerHTML = '';
        if (document.getElementsByClassName('err')[0]) {
            request.removeChild(document.getElementsByClassName('err')[0]);
        }
        let city = input.value;
        fetch(urlLocation)
        .then(res => res.json())
        .then(data => {
            let {name, code} = Object.values(data).find(x => x.name == city);
            fetch(`https://judgetests.firebaseio.com/forecast/today/${code}.json`)
            .then(res => res.json())
            .then(current => {
                
                forecast.style.display = 'block';
                let spanSymbol = document.createElement('span');
                spanSymbol.className = 'condition symbol';
                let symbol = current.forecast.condition;
                spanSymbol.innerHTML = displaySymbol(symbol);
                let spanCondition = document.createElement('span');
                spanCondition.className = 'condition';
                spanCondition.innerHTML = `<span class="forecast-data">${current.name}</span>
                <span class="forecast-data">${current.forecast.low}${deg}/${current.forecast.high}${deg}</span>
                <span class="forecast-data">${current.forecast.condition}</span>`
                divFor.appendChild(spanSymbol);
                divFor.appendChild(spanCondition);
                currentConditions.appendChild(divFor);
                })
            fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`)
            .then(entry => entry.json())
            .then(up => {
                
                
                for (let i = 0; i < 3; i++) {
                    let spanUpcome = document.createElement('span');
                    spanUpcome.className = 'upcoming';
                    let current = up.forecast[i];
                    let spanSymb = document.createElement('span');
                    spanSymb.className = 'symbol';
                    let symbol = current.condition;
                    spanSymb.innerHTML = displaySymbol(symbol);
                    let spanData1 = document.createElement('span');
                    spanData1.className = 'forecast-data';
                    spanData1.innerHTML = `${current.low}${deg}/${current.high}${deg}`;
                    let spanData2 = document.createElement('span');
                    spanData2.className = 'forecast-data';
                    spanData2.innerHTML = `${current.condition}`;
                    spanUpcome.appendChild(spanSymb);
                    spanUpcome.appendChild(spanData1);
                    spanUpcome.appendChild(spanData2);
                    divForecast.appendChild(spanUpcome);

                };
                upcomingConditions.appendChild(divForecast);
            })
        })
        .catch((e) => {
            forecast.style.display = 'none';
            let label = document.createElement('div');
            label.className = 'label err';
            label.innerHTML = 'Error!';
            request.appendChild(label);

        });
        input.value = '';
    });
}

function displaySymbol(symbol) {
    let result;
    switch (symbol) {
        case 'Sunny':
            result = '&#x2600';
            break;
        case 'Partly sunny':
            result = '&#x26C5';
            break;
        case 'Overcast':
            result = '&#x2601';
            break;
        case 'Rain':
            result = '&#x2614';
            break;
    }
    return result;
};

attachEvents();