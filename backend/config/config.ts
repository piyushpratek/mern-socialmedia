import dotenv from 'dotenv'
import logger from './logger'

// NOTE: Always check if `NODE_ENV` before anything else
if (!process.env.NODE_ENV) {
    logger.error(
        'Please define Your `NODE_ENV` variable using `cross-env` in package.json file'
    )
    process.exit(1)
}

logger.success('NODE_ENV:', process.env.NODE_ENV)

let envPath: string | undefined

if (process.env.NODE_ENV === 'production') {
    envPath = '.env'
}

if (process.env.NODE_ENV === 'development') {
    envPath = '.env.development'
}

if (!envPath) {
    logger.error('Please use a valid value of NODE_ENV variable.')
    process.exit(1)
}

dotenv.config({ path: envPath })
if (!process.env.MONGO_URI) {
    logger.error('Please define MONGO_URI in your .env file.')
    process.exit(1)
}
if (!process.env.JWT_SECRET) {
    logger.error('Please define JWT_SECRET in your .env file.')
    process.exit(1)
}

if (!process.env.PORT) {
    logger.error('Please define PORT in your .env file.')
    process.exit(1)
}

if (!process.env.JWT_EXPIRE) {
    logger.error('Please define JWT EXPIRATION in your .env file.')
    process.exit(1)
}

if (!process.env.COOKIE_EXPIRE) {
    logger.error('Please define COOKIE_EXPIRE in your .env file.')
    process.exit(1)
}

if (!process.env.SMPT_MAIL) {
    logger.error('Please define SMPT_MAIL in your .env file.')
    process.exit(1)
}

if (!process.env.SMPT_HOST) {
    logger.error('Please define SMPT_HOST in your .env file.')
    process.exit(1)
}

if (!process.env.SMPT_PORT) {
    logger.error('Please define SMPT_PORT in your .env file.')
    process.exit(1)
}

if (!process.env.SMPT_PASSWORD) {
    logger.error('Please define SMPT_PASSWORD in your .env file.')
    process.exit(1)
}

if (!process.env.CLOUDINARY_NAME) {
    logger.error('Please define CLOUDINARY_NAME in your .env file.')
    process.exit(1)
}

if (!process.env.CLOUDINARY_API_KEY) {
    logger.error('Please define CLOUDINARY_API_KEY in your .env file.')
    process.exit(1)
}

if (!process.env.CLOUDINARY_API_SECRET) {
    logger.error('Please define CLOUDINARY_API_SECRET in your .env file.')
    process.exit(1)
}

export const MONGO_URI = process.env.MONGO_URI
export const JWT_SECRET = process.env.JWT_SECRET
export const NODE_ENV = process.env.NODE_ENV
export const PORT = Number(process.env.PORT)
export const JWT_EXPIRE = process.env.JWT_EXPIRE
export const COOKIE_EXPIRE = process.env.COOKIE_EXPIRE
export const SMPT_MAIL = process.env.SMPT_MAIL
export const SMPT_HOST = process.env.SMPT_HOST
export const SMPT_PORT = process.env.SMPT_PORT
export const SMPT_PASSWORD = process.env.SMPT_PASSWORD
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET
