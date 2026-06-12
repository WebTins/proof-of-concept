const searchInput = document.querySelector('#search')
const pokemonLinks = document.querySelectorAll('.pokemon-card a')

searchInput.addEventListener('input', function () {
    const searchValue = searchInput.value.toLowerCase()

    pokemonLinks.forEach(link => {
        const name = link.dataset.name.toLowerCase()

        if (name.includes(searchValue)) {
            link.style.display = 'flex'
        } else {
            link.style.display = 'none'
        }
    })
})