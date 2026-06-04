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
// MARK: port 8000
app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})