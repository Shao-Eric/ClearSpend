const express = require('express')
const next = require('next')
const algoliasearch = require('algoliasearch')
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000;
const app = next({ dev })
const handle = app.getRequestHandler()
const bodyParser = require('body-parser')

const client = algoliasearch(process.env.algoliaAppId, process.env.algoliaAPIKey, {
    timeout: 4000,
})

const index = client.initIndex('test_PriceLists')



app.prepare()

    .then(() => {

        const server = express()

        server.use(bodyParser.json())
        server.use(bodyParser.urlencoded({
            extended: true
        }))


        server.get('/', (req, res) => {
            app.render(req, res, '/home')
        })

        server.post('/search', (req, res) => {
            let queryObj = { 
                query: req.body.query ,
                attributesToHighlight: []
            }
            if ('hospital' in req.body && req.body.hospital) {
                queryObj['filters'] = `"hospital":"${req.body.hospital}"`
            }
            if ('category' in req.body && req.body.category) {
                queryObj['filters'] = queryObj['filters'] + ` AND "Category":"${req.body.category}"`
            }
            index.search(queryObj).then(response => {
                res.json(response.hits)
            })
        })

        server.get('*', (req, res) => {
            handle(req, res)
        })

        server.listen(port, (err) => {
            if (err) throw err
            console.log('> Running')
        })
    })

    