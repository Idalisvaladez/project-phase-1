const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';
const url = 'https://pokeapi.co/api/v2/pokemon';
const descripUrl = 'https://pokeapi.co/api/v2/pokemon-species/'
const pokemonUl = document.querySelector('.pokemon-list');
const search = document.querySelector('form');
const info = document.querySelector('.info-div')
const button = document.querySelector('.toggle-button')

let imgDiv = document.querySelector('.img-div')
let allPokemon = [];


function findPounds(hectogram) {
    let pounds = hectogram * 0.2204622622;
    return Math.round(pounds);
}

function findHeight(decimeter) {
    let inches = decimeter * 3.937;
    return Math.round(inches);
}



function renderPokedex(pokemon) {
    console.log(pokemon)
    let pokemonLi = document.createElement('li');
    let pokemonSpanName = document.createElement('span');
    let pokemonSpanNumber = document.createElement('span');

    pokemonLi.className = 'pokemon';
    pokemonLi.style.cursor = 'pointer';

    pokemonSpanName.textContent = pokemon.name;
    pokemonSpanNumber.textContent = `#${pokemon.id}`;

    pokemonLi.addEventListener('click', () => {
        imgDiv.innerHTML = '';
        info.innerHTML = '';
        console.log('clicked', pokemon.name)
        let pokemonImg = document.createElement('img');
        pokemonImg.src = pokemon.sprites.other['official-artwork'].front_default;
        imgDiv.append(pokemonImg);


        pokemonImg.className = "poke-img"
        let height = document.createElement('p')
        let weight = document.createElement('p')
        let type = document.createElement('p')
        let name = document.createElement('p')
        name.textContent = pokemon.name
        height.textContent = `Height: ${findHeight(pokemon.height)} in`
        weight.textContent = `Weight: ${findPounds(pokemon.weight)} lbs`
        type.textContent = `Type: ${pokemon.types[0].type.name}`
        info.append(name, height, weight, type)

        const typeStyles = {
            'bug': { color: '#d5ed9d' },
            'grass': { color: '#24b30e' },
            'normal': { color: '#fcf7a9' },
            'fire': { color: 'orange' },
            'water': { color: '#0cb1f7' },
            'electric': { color: '#e9ff42' },
            'poison': { color: '#ff42f6' },
            'ground': { color: '#8c7556' },
            'psychic': { color: '#e892da'},
            'dragon': { color: 'teal'},
            'fairy': { color: 'pink'},
            'fighting': { color: 'red'},
            'ice': { color: 'blue'},
            'ghost': { color: 'grey'},
            'rock': { color: '#c7c118'},
        }
        
        const typeInfo = typeStyles[pokemon.types[0].type.name];
        
        if (typeInfo) {
            type.style.color = typeInfo.color;
            type.style.borderBlockStyle = 'dotted';
            type.style.borderColor = 'black';
            type.style.textShadow = '-1px 1px 2px #000';
        }

        fetch(`${descripUrl}${pokemon.id}/`) 
        .then(res => res.json())
        .then(data => {
            let description = data.flavor_text_entries[0].flavor_text
            let descrip = document.createElement('p')
            descrip.textContent = `Description: ${description}`
            descrip.className = 'description'
            info.append(descrip)


            button.addEventListener('click', () => {
                imgDiv.innerHTML = '';
                let shinyImg = document.createElement('img');
                shinyImg.src = pokemon.sprites.other['official-artwork'].front_shiny;
                shinyImg.className = 'silver-img'
                imgDiv.append(shinyImg)

            })
            

        })
        })

        console.log('clicked', pokemon.name)


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







