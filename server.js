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

// MARK: port 8000
app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})