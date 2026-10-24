import express from 'express'
import tasksRouter from './routes/tasks.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/tasks', tasksRouter)

app.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`)
})
