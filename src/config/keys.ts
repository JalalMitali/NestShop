const path = require('path')
require('dotenv').config({path: path.resolve(process.cwd() + '/.env.local'), debug: false})

export default {
    mongoURI: process.env.MONGO_URI
}