import express from 'express'
import bodyParser from 'body-parser'
import dateFormat from 'dateformat'


const app = express()
app.set('view engine', 'pug');

// serve static files from the `public` folder
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const port = process.env.PORT || 3000

const logs = []

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Logger',
        logs: logs
    })
})

app.post('/', (req, res) => {
    const payload = {
        insult: req.body.insult,
        time: dateFormat(new Date()),
    }

    const shouldFail = shouldIFail()
    shouldFail ? payload.result = 500 : payload.result = 200
    console.log(`payload is ${payload.insult} - ${payload.time} - ${payload.result}`)
    logs.push(payload)
    shouldFail ? res.status(500).send({message: 'Something went wrong - Please try later'}) : res.sendStatus(200)
    
})

app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`)
})

const shouldIFail = () => {
    const result = Math.floor(Math.random() * 4) + 1 
    return result === 1
}