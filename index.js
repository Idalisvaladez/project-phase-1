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
let toggle = false;



let imgDiv = document.querySelector('.img-div')
let allPokemon = [];
let pokeTeam = [];


// Convert given hectograms into pounds for pokemon
function findPounds(hectogram) {
    let pounds = hectogram * 0.2204622622;
    return Math.round(pounds);
}

// Convert given decimeters into inches for pokemon
function findHeight(decimeter) {
    let inches = decimeter * 3.937;
    return Math.round(inches);
}


// Render pokemon from Fetch statement onto the main screen
// Adds event listeners to display pokemon on Info and Img screens
function renderPokedex(pokemon) {

    let pokemonLi = document.createElement('li');
    let pokemonSpanName = document.createElement('span');
    let pokemonSpanNumber = document.createElement('span');

    pokemonLi.className = 'pokemon';
    pokemonLi.style.cursor = 'pointer';

    pokemonSpanName.textContent = pokemon.name;
    pokemonSpanNumber.textContent = `#${pokemon.id}`;
    
    pokemonLi.addEventListener('click', () => {
        toggle = false;
        currPokemon = pokemon
        imgDiv.innerHTML = '';
        info.innerHTML = '';
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

        // fetches the pokemon's description to display in Info Screen
        fetch(`${descripUrl}${pokemon.id}/`) 
        .then(res => res.json())
        .then(data => {
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

            // event listener to change pokemon's picture from Default to Silver and back
            button.addEventListener('click', () => {
                toggle = timesClicked % 2 ? true : false;
                timesClicked += 1;
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


// Event listener to add pokemon into the team section from main screen
let count = -1
let teamCap = []
teamAddBtn.addEventListener('click', () => {
    count += 1
    
    if (count > 5) {
        count = 0
    }
    if (teamCap.length < 6) { 
    let teamImg = document.createElement('img')
    teamImg.className = 'team-image'
    teamImg.src = !toggle ? currPokemon.sprites.other['official-artwork'].front_default : currPokemon.sprites.other['official-artwork'].front_shiny;
    teamCap.push(teamImg)
    displayTeam(teamCap)
   
    teamLi[count].id = 'taken'
    }
    else {
    alert("Your team has 6 members already!")
    }
})

// Displays team to Team section after Add To Team is clicked
let selectedPokemon;
function displayTeam(array) {
    for (let i = 0; i < array.length; i++) {
        teamLi[i].innerHTML = '';
        teamLi[i].append(teamCap[i]);
        teamCap[i].style.cursor = 'pointer';
        teamCap[i].addEventListener('click', () => {
            selectedPokemon = teamCap.indexOf(teamCap[i]);
            selectedPokemonBorderColor(i);
        })
    }
}

// Changes selected Pokemon's border color when clicked

function selectedPokemonBorderColor(index) {
    for (let i = 0; i < 6; i++) {
        teamLi[i].style.border = '1px solid black';
    }

    teamLi[index].style.border = '2px solid blue';
}


// Delete button to clear pokemon from Teams Section
let singleClick = true;
deleteBtn.addEventListener('click', () => { 
    setTimeout(() => {
        if (singleClick) {
            for (let i = 0; i < 6; i++) {
                teamLi[i].style.border = '1px solid black';
            }

            if (selectedPokemon === teamCap.indexOf(teamCap[selectedPokemon])) {
                teamLi[selectedPokemon].innerHTML = '';
                teamCap.splice(selectedPokemon, 1);
                displayTeam(teamCap);
            } else if (selectedPokemon === undefined && teamCap.length === 1) {
                teamLi[0].innerHTML = '';
                teamCap.splice(selectedPokemon, 1);
                displayTeam(teamCap);
            } 
            else {
                selectedPokemon = 0;
                teamCap.splice(selectedPokemon, 1);
                displayTeam(teamCap);
            }
        }
    }, 400)
}) 

// Double click ability to clear all Pokemon from Teams Section
deleteBtn.addEventListener('dblclick', () => {
    singleClick = false;
    teamCap.splice(0, teamCap.length);
    for (let i = 0; i < 6; i++) {
        teamLi[i].innerHTML = '';
    }
    setTimeout(() => {
        singleClick = true;
    }, 500)
}) 

// Search for pokemon in Main Screen

search.addEventListener('keyup', (e) => {
    e.preventDefault()
    let lower = (e.target.value).toLowerCase()
    let iterator = lower.length;
    let searchArray = lower.split('');
    pokemonUl.innerHTML = '';
    allPokemon.forEach(pokemon => {
        let splitName = pokemon.name.split('', iterator);
        if (splitName.join('') == searchArray.join('')) {
            renderPokedex(pokemon);
        }
        
    })
})

//Fetch all Pokemon from API and render them in order into main screen

fetch(pokemonUrl)
.then(resp => resp.json())
.then(data => {
    const fetchPromises = data.results.map(pokemon => {
    return fetch(`${url}/${pokemon.name}`).then(resp => resp.json());
    });

    Promise.all(fetchPromises)
    .then(pokemonDataArray => {
        pokemonDataArray.forEach(pokemonData => {
        renderPokedex(pokemonData);
        allPokemon.push(pokemonData);
        });
    })
    .catch(error => {
        // Handle errors
        console.error("Error fetching Pokemon data:", error);
    });
});





