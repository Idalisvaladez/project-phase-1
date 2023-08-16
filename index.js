const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';
const url = 'https://pokeapi.co/api/v2/pokemon';
const descripUrl = 'https://pokeapi.co/api/v2/pokemon-species/'
const pokemonUl = document.querySelector('.pokemon-list');
const search = document.querySelector('form');
const info = document.querySelector('.info-div')
const button = document.querySelector('.toggle-button')

const teamAddBtn = document.querySelector('.team-add')
const teamList = document.querySelector('.team-list')
const deleteBtn = document.querySelector('.team-remove')
const teamLi = document.querySelectorAll('#empty')


console.log(teamLi[0])

let imgDiv = document.querySelector('.img-div')
let allPokemon = [];
let pokeTeam = [];

function findPounds(hectogram) {
    let pounds = hectogram * 0.2204622622;
    return Math.round(pounds);
}

function findHeight(decimeter) {
    let inches = decimeter * 3.937;
    return Math.round(inches);
}



function renderPokedex(pokemon) {

    let pokemonLi = document.createElement('li');
    let pokemonSpanName = document.createElement('span');
    let pokemonSpanNumber = document.createElement('span');

    pokemonLi.className = 'pokemon';
    pokemonLi.style.cursor = 'pointer';

    pokemonSpanName.textContent = pokemon.name;
    pokemonSpanNumber.textContent = `#${pokemon.id}`;

    pokemonLi.addEventListener('click', () => {
        currPokemon = pokemon
        imgDiv.innerHTML = '';
        info.innerHTML = '';
        console.log('clicked', pokemon.name)
        let pokemonImg = document.createElement('img');
        pokemonImg.src = pokemon.sprites.other['official-artwork'].front_default;
        imgDiv.append(pokemonImg);
        let timesClicked = 1;
        button.style.backgroundColor = 'silver';

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
            console.log(data)
            let description;
            for (let i = 0; i < 10; i++) {
                if (data.flavor_text_entries[i].language.name === 'en') {
                     description = data.flavor_text_entries[i].flavor_text;
                }
            }
            let descrip = document.createElement('p')
            descrip.textContent = description
            descrip.className = 'description'
            info.append(descrip)


            button.addEventListener('click', () => {
                timesClicked += 1;
                console.log(timesClicked)
                button.style.backgroundColor = timesClicked % 2 ? 'silver' : 'rgb(251, 217, 25)';
                imgDiv.innerHTML = '';
                let shinyImg = document.createElement('img');
                shinyImg.src = timesClicked % 2 ? pokemon.sprites.other['official-artwork'].front_default : pokemon.sprites.other['official-artwork'].front_shiny;
                shinyImg.className = 'poke-img'
                imgDiv.append(shinyImg)


            })

        })
        })

        


    pokemonLi.append(pokemonSpanName, pokemonSpanNumber);
    pokemonUl.appendChild(pokemonLi);

    
}

let count = -1
let teamCap = []
teamAddBtn.addEventListener('click', () => {
    count += 1
    if (count > 5) {
        count = 0
    }
    if (teamLi[count].id === 'empty') { 
    let teamImg = document.createElement('img')
    teamImg.className = 'team-image'
    teamImg.src = currPokemon.sprites.other['official-artwork'].front_default
    teamLi[count].append(teamImg)
    teamCap.push(teamImg)
    teamLi[count].id = 'taken'
    }
    else {
    alert("Your team has 6 members already!")
    }
})


deleteBtn.addEventListener('click', () => {
    let newTeam = teamCap.splice(-1);
    console.log(teamCap)
}) 




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









