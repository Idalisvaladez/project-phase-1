const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';
const url = 'https://pokeapi.co/api/v2/pokemon';
const pokemonUl = document.querySelector('.pokemon-list');
const search = document.querySelector('form');
let allPokemon;
let imgDiv = document.querySelector('.img-div')


function renderPokedex(pokemon) {
    let pokemonLi = document.createElement('li');
    let pokemonSpanName = document.createElement('span');
    let pokemonSpanNumber = document.createElement('span');

    pokemonLi.className = 'pokemon';
    pokemonLi.style.cursor = 'pointer';

    pokemonSpanName.textContent = pokemon.name;
    pokemonSpanNumber.textContent = `#${pokemon.id}`;

    pokemonLi.addEventListener('click', () => {
        imgDiv.innerHTML = '';
        console.log('clicked', pokemon.name)
        let pokemonImg = document.createElement('img');
        pokemonImg.src = pokemon.sprites.other['official-artwork'].front_default;
        imgDiv.append(pokemonImg);

        pokemonImg.className = "poke-img"
    })

    pokemonLi.append(pokemonSpanName, pokemonSpanNumber);
    pokemonUl.appendChild(pokemonLi);

    

}

search.addEventListener('keyup', (e) => {
    e.preventDefault()


    console.log(e.key)
})





fetch(pokemonUrl)
.then(resp => resp.json())
.then(data => {
    // console.log(data)
    data.results.forEach(pokemon => {
        fetch(`${url}/${pokemon.name}`)
        .then(resp => resp.json())
        .then(data => {
            renderPokedex(data);
            let allPokemon = data;
            console.log(data)
        })
    });

})

function displayPokemon (data){
    let newArt = document.createElement("img")
    let pokeImg = document.getElementById("img-div")
    newArt.src = data.sprites.other["official-artwork"].front_default
    pokeImg.appendChild(newArt)
}
