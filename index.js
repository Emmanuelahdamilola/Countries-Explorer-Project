
let countries = []; 

const fetchCountries = async () => {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name,region,population,flag');
        if (!res.ok) {
            console.log('Could not fetch country');
            return;
        }
        const data = await res.json();
        console.log(data);
        countries = data; 

        displayCountries(countries);

    } catch (error) {
        console.log('Error fetching api', error)
    }
};

// function to display countries
function displayCountries(countriesToDisplay) {
    const container = document.getElementById('country');
    container.innerHTML = ""; 

    for (const country of countriesToDisplay) {
        const card = document.createElement('div');
        card.classList.add('country-card');

        const name = document.createElement('h2');
        const region = document.createElement('h3');
        const flag = document.createElement('p');
        const population = document.createElement('p');

        name.textContent = `Name: ${country.name.common}`;
        region.textContent = `Region: ${country.region}`;
        flag.textContent = `Flag: ${country.flag}`;
        population.textContent = `Population: ${country.population}`;

        card.append(name, region, flag, population);
        container.appendChild(card);
    }
}

// filter function
function getCountry() {
    const inputText = document.getElementById('input').value.trim();

    const filterCountry = countries.filter(country =>
        country.region.toLowerCase() === inputText.toLowerCase()
    );

    console.log(filterCountry);
    displayCountries(filterCountry);
}

document.getElementById('getCountry').addEventListener('click', getCountry);

// function to search
function searchedCountry() {
    const inputText = document.getElementById('search').value.trim();

    const foundCountry = countries.find(country =>
        country.name.common.toLowerCase() === inputText.toLowerCase()
    );

    if (foundCountry) {
        displayCountries([foundCountry]);  
    } else {
        document.getElementById('country').innerHTML = "<p>No country found</p>";
    }
}



document.getElementById('searchCountry').addEventListener('click', searchedCountry);


fetchCountries();