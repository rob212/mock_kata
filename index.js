const express = require('express')
const bodyParser = require('body-parser')
const dateFormat = require('dateformat')


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
        msg: req.body.msg,
        time: dateFormat(new Date()),
    }

    const shouldFail = shouldIFail()
    shouldFail ? payload.result = 'FAILED' : payload.result = 'SUCCESS'
    console.log(`payload is ${payload.msg} - ${payload.time} - ${payload.result}`)
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
