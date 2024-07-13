const pokemonName = document.querySelector('.pokemonName')
const pokemonID = document.querySelector('.pokemonId')
const pokemonImg = document.querySelector('.pokemonImg')
const buttonNext = document.querySelector('.btnNext')
const buttonPrev = document.querySelector('.btnPrev')

let searchPokemon = 1

const form = document.querySelector('.form')
const input = document.querySelector('.inputSearch')


const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if (APIResponse.status === 200) {
        const data = await APIResponse.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'loading...';
    pokemonID.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonImg.style.display = 'block'
        pokemonName.innerHTML = data.name;
        pokemonID.innerHTML = data.id;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        searchPokemon = data.id

    } else {
        pokemonName.innerHTML = 'Not found';
        pokemonID.innerHTML = '';
        pokemonImg.style.display = 'none'
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
    input.value = ''
});

buttonNext.addEventListener('click', () => {
    searchPokemon++
    renderPokemon(searchPokemon)
})
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon--
        renderPokemon(searchPokemon)
    }
})

renderPokemon(searchPokemon)