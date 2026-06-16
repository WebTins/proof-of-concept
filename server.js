import express, { response } from 'express'
import { Liquid } from 'liquidjs';

// Express
const app = express()
app.use(express.static('public'))

// Liquid
const engine = new Liquid();
app.engine('liquid', engine.express()); 

// Views
app.set('views', './views')
app.set('view engine', 'liquid')
app.use(express.urlencoded({extended: true}))

// BASE API link
const pokeApi = 'https://pokeapi.co/api/v2/'

// MARK: Home page
app.get ('/', async function (request, response) {

  const pokeResponse = await fetch (`${pokeApi}/pokemon?limit=20`)
  const pokeResponseJSON = await pokeResponse.json()

  const pokemonDetails = await Promise.all(
      pokeResponseJSON.results.map(async (pokemon) => {
        const detailResponse = await fetch(pokemon.url)
        const detailJSON = await detailResponse.json()

        console.log(detailJSON);
      
        return {
            name: detailJSON.name,
            id: detailJSON.id,
            image: detailJSON.sprites.other['official-artwork'].front_default,
            // map uitzoeken wat het is en wat het kan
            types: detailJSON.types.map(type => type.type.name),
      }
    })
  )

// maak index.liquid om naar html en geef hier onderstaande data aan mee
    response.render('index', {
      page: "home",
// de data die in de template mag, in me liquid kan ik dan {{} pokemon }} gebruiken
    pokemon: pokemonDetails
    })
})

// MARK: Pokemon detail pagina
app.get('/pokemon/:id', async function (request, response) {
    const detailResponse = await fetch(`${pokeApi}pokemon/${request.params.id}`)
    const detailJSON = await detailResponse.json()

     // Stap 1: haal de species op, hierin staat de link naar de evolution chain
    const speciesResponse = await fetch(`${pokeApi}pokemon-species/${request.params.id}`)
    const speciesJSON = await speciesResponse.json()

    // Stap 2: haal de evolution chain op
    const evolutionResponse = await fetch(speciesJSON.evolution_chain.url)
    const evolutionJSON = await evolutionResponse.json()

    // Stap 3: de evolution chain is genest, dus we moeten erdoorheen lopen
    const evolutions = []
    let current = evolutionJSON.chain

    while (current) {
        evolutions.push(current.species.name)
        current = current.evolves_to[0] // pakt de eerste evolutie (sommige hebben meerdere takken)
    }

    // Stap 4: haal voor elke evolutie de afbeelding en het id op
    const evolutionDetails = await Promise.all(
        evolutions.map(async (name) => {
            const evoResponse = await fetch(`${pokeApi}pokemon/${name}`)
            const evoJSON = await evoResponse.json()
            return {
                name: evoJSON.name,
                id: evoJSON.id,
                image: evoJSON.sprites.other['official-artwork'].front_default
            }
        })
    )

    response.render('detail', {
        pokemon: {
            name: detailJSON.name,
            id: detailJSON.id,
            image: detailJSON.sprites.other['official-artwork'].front_default,
            types: detailJSON.types.map(type => type.type.name),
            height: detailJSON.height,
            weight: detailJSON.weight,
            baseXP: detailJSON.base_experience,
            stats: detailJSON.stats.map(stat => ({
                name: stat.stat.name,
                value: stat.base_stat
            })),
            abilities: detailJSON.abilities.map(a => a.ability.name),
            evolutions: evolutionDetails,
        }
    })
})

// MARK: port 8000
app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})