const fs = require('fs');
const path = require('path')
require('dotenv').config({ path: path.resolve(process.cwd() + "/.env.local") })

export const stripe = process.env.STRIPE_SECRET_KEY
