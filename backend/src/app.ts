import express, { Application } from 'express'


const app: Application = express()

app.use(express.json())

app.get('/api/health', (req, res) => {
    res.send('Api is Running')
})

export default app