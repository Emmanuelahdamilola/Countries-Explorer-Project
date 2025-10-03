let countries = [];

const fetchCountries = async () => {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name,region,population,flags,capital,languages,currencies,timezones,maps');
        if (!res.ok) {
            console.log('Could not fetch country');
            return;
        }
        const data = await res.json();
        countries = data;
        displayCountries(countries);
    } catch (error) {
        console.log('Error fetching api', error)
    }
};

// display countries as cards
function displayCountries(countriesToDisplay) {
    const container = document.getElementById('country');
    container.innerHTML = "";

    for (const country of countriesToDisplay) {
        const card = document.createElement('div');
        card.classList.add('country-card', 'p-3', 'border', 'rounded', 'shadow-sm', 'text-center', 'm-2');

        const name = document.createElement('h5');
        const region = document.createElement('p');
        const flagImg = document.createElement('img');
        const population = document.createElement('p');

        name.textContent = country.name.common;
        region.textContent = `Region: ${country.region}`;
        flagImg.src = country.flags.png;
        flagImg.alt = `${country.name.common} flag`;
        flagImg.width = 60;
        population.textContent = `Population: ${country.population}`;

        // Add click event to open modal
        card.addEventListener('click', () => showCountryDetails(country));

        card.append(flagImg, name, region, population);
        container.appendChild(card);
    }
}

// show detailed info in modal
function showCountryDetails(country) {
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');

    modalContent.innerHTML = `
        <span class="close">&times;</span>
        <h2>${country.name.common}</h2>
        <img src="${country.flags.png}" alt="${country.name.common} flag" width="120">
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
        <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
        
        <p><strong>Timezones:</strong> ${country.timezones ? country.timezones.join(", ") : "N/A"}</p>
        <p><a href="${country.maps.googleMaps}" target="_blank">View on Google Maps</a></p>
    `;

    // reopen modal after content reset
    modal.style.display = "block";

    // close modal on X
    const closeBtn = modalContent.querySelector(".close");
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // close modal on outside click
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// filter by region
function getCountry() {
    const inputText = document.getElementById('input').value.trim();

    const filterCountry = countries.filter(country =>
        country.region.toLowerCase() === inputText.toLowerCase()
    );

    displayCountries(filterCountry);
}
document.getElementById('getCountry').addEventListener('click', getCountry);

// search by name
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
