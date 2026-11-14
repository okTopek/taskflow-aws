import app from './app.js'
import { config } from './config.js'

app.listen(config.port, () => {
  console.log(`Serwer nasłuchuje na porcie ${config.port}`)
})
