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
const baseURL = 'https://fdnd-agency.directus.app/items/pokemon_catches'

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

// MARK: Favorieten pagina
app.get('/favorites', async function (request, response) {
    // Stap 1: haal alle catches van user 6 op
    const likeParams = new URLSearchParams();
    likeParams.set('filter[user_id][_eq]', '6');

    const catchResponse = await fetch(baseURL + '?' + likeParams.toString());
    const catchJSON = await catchResponse.json();

    // Stap 2: haal voor elke gelikete pokemon de details op
    const pokemonDetails = await Promise.all(
        catchJSON.data.map(async (catchItem) => {
            const detailResponse = await fetch(`${pokeApi}pokemon/${catchItem.pokemon_id}`)
            const detailJSON = await detailResponse.json()

            return {
                name: detailJSON.name,
                id: detailJSON.id,
                image: detailJSON.sprites.other['official-artwork'].front_default,
                types: detailJSON.types.map(type => type.type.name),
            }
        })
    )

    response.render('index', {
        page: "favorites",
        pokemon: pokemonDetails
    })
})

// MARK: Pokemon detail pagina
app.get('/pokemon/:id', async function (request, response) {
    const detailResponse = await fetch(`${pokeApi}pokemon/${request.params.id}`)

    if (!detailResponse.ok) {
        return response.status(404).render('error')
    }

    const detailJSON = await detailResponse.json()

    const likeParams = new URLSearchParams();
    likeParams.set('filter[pokemon_id][_eq]', request.params.id);
    likeParams.set('filter[user_id][_eq]', '6');

    const catchResponse = await fetch(baseURL + '?' + likeParams.toString());
    const catchJSON = await catchResponse.json();
    const isLiked = catchJSON.data.length > 0;

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
        },
            isLiked: isLiked
    })
})

// MARK: POST Favoriet
app.post('/pokemon/:id/like', async function (request, response) {
    await fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify({
            pokemon_id: request.params.id,
            user_id: request.body.user_id
        }),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    });

    response.redirect(303, `/pokemon/${request.params.id}`);
})

// DELETE Favoriet
app.post('/pokemon/:id/unlike', async function (request, response) {
    const params = new URLSearchParams();
    params.set('filter[pokemon_id][_eq]', request.params.id);
    params.set('filter[user_id][_eq]', request.body.user_id);

    const catchResponse = await fetch(baseURL + '?' + params.toString());
    const catchJSON = await catchResponse.json();
    const catchId = catchJSON.data[0]?.id;

    if (catchId) {
        await fetch(baseURL + '/' + catchId, { method: 'DELETE' });
    }

    response.redirect(303, `/pokemon/${request.params.id}`);
})

app.use((request, response) => {
    response.status(404).render('error')
})

// MARK: port 8000
app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
})