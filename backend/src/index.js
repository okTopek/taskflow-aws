import cors from 'cors'
import express from 'express'
import { config } from './config.js'
import tasksRouter from './routes/tasks.js'

const app = express()
const port = config.port

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/tasks', tasksRouter)

app.use((req, res) => {
  res.status(404).json({ error: 'Nie znaleziono zasobu' })
})

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Nieprawidłowy JSON w treści żądania' })
  }
  console.error(err)
  res.status(500).json({ error: 'Wewnętrzny błąd serwera' })
})

app.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`)
})
