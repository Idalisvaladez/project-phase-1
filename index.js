const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';
const url = 'https://pokeapi.co/api/v2/pokemon';
const pokemonUl = document.querySelector('.pokemon-list');
const search = document.querySelector('form');
let allPokemon = [];


function renderPokedex(pokemon) {
    
    let pokemonLi = document.createElement('li');
    let pokemonSpanName = document.createElement('span');
    let pokemonSpanNumber = document.createElement('span');

    pokemonLi.className = 'pokemon';
    pokemonLi.style.cursor = 'pointer';

    pokemonSpanName.textContent = pokemon.name;
    pokemonSpanNumber.textContent = `#${pokemon.id}`;

    pokemonLi.addEventListener('click', () => {
        console.log('clicked', pokemon.name)
    })

    pokemonLi.append(pokemonSpanName, pokemonSpanNumber);
    pokemonUl.appendChild(pokemonLi);

    

}



search.addEventListener('keyup', (e) => {
    e.preventDefault()
    let iterator = e.target.value.length;
    let searchArray = e.target.value.split('');
    pokemonUl.innerHTML = '';
    allPokemon.forEach(pokemon => {
        let splitName = pokemon.name.split('', iterator);
        if (splitName.join('') == searchArray.join('')) {
            renderPokedex(pokemon)
        }
        
    })
})



fetch(pokemonUrl)
.then(resp => resp.json())
.then(data => {
    data.results.forEach(pokemon => {
        fetch(`${url}/${pokemon.name}`)
        .then(resp => resp.json())
        .then(data => {
            renderPokedex(data);
            allPokemon.push(data);
        })
    });

})



