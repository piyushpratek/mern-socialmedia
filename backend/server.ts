import { PORT } from './config/config'
import logger from './config/logger'

import app from './src/app'


const server = app.listen(PORT, () => {
    logger.success(`SERVER STARTED ON PORT ${PORT}`)
    logger.success(`HEALTH: http://localhost:${PORT}/api/health \n`)
})