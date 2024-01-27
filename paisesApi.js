const api = 'https://restcountries.com/v3.1/all?fields=name,flags,region,subregion,population,languages,currencies';

fetch(api)
    .then(response => response.json())
    .then(data => {
        const infoPaises = data.map(pais => ({
            name: pais.name.common,
            flag: pais.flags.svg,
            region: pais.region,
            subregion: pais.subregion,
            population: pais.population,
            languages: Object.values(pais.languages).join(', '),
            currencies: Object.entries(pais.currencies).map(([code, currency]) => `${currency.name} (${currency.symbol})`).join(', ')
        }));

        const site = document.querySelector('.container');

        for (const paises of infoPaises) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.backgroundImage = `url('${paises.flag}')`;

            const name = document.createElement('div');
            name.classList.add('name');
            name.innerHTML = `<p>${paises.name}</p>`;

            card.appendChild(name);

            card.addEventListener('click', () => openModal(paises));

            site.appendChild(card);
        }
    });

function openModal(pais) {
    console.log(pais.currencies);
    const fade = document.querySelector('.fade');
    fade.style.display = 'flex';

    const modal = document.querySelector('.modal');

    modal.innerHTML = `
            <div class="botao_fechar">
                <svg class="fecha_modal" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
            <div class="nome-pais">
                <p>${pais.name}</p>
            </div>
            <div class="linha">
                <div class="info">
                    <p>Região:</p>
                    <p>${pais.region}</p>
                </div>
                <div class="info">
                    <p>Sub-Região:</p>
                    <p>${pais.subregion}</p>
                </div>
            </div>
            <div class="linha">
                <div class="info">
                    <p>População:</p>
                    <p>${pais.population}</p>
                </div>
                <div class="info">
                    <p>Linguagens:</p>
                    <p>${Object.values(pais.languages).join('')}</p>
                </div>
            </div>
            <div class="linha">
                <div class="info">
                <p>${Object.values(pais.currencies).join('')}</p>
                </div>
            </div>
    `

    const botaoFechaModal = document.querySelector('.fecha_modal');


    botaoFechaModal.addEventListener('click', () => closeModal());
}


function closeModal(){
    const fade = document.querySelector('.fade');
    fade.style.display = 'none';
}