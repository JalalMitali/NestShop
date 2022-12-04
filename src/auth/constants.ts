const fs = require('fs');
const path = require('path')
const privatePem =  fs.readFileSync(path.resolve(process.cwd() + "/private_key.pem"), 'utf-8');
const publicPem =  fs.readFileSync(path.resolve(process.cwd() + "/public_key.pem"), 'utf-8');

export const jwtConstants = {
    secret: privatePem,
    cert: publicPem
};