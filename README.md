# Open Source eCommerce Backend ( NestJS )
**an e-commerce shop backend implementation written in Typescript powered by NestJS & Node JS.**
- [x] Scaffold Product Routing đĨ 
- [x] Connect MongoDB Database đ 
- [x] Implement Authentication â 
- [x] Modern Shopping Cart đ
- [x] Integrate Stripe Payments đ° 
- [ ] Add Profile Features âšī¸  
- [ ] Add Categorie Feature đ
- [x] Implement Admin Control đ  
- [x] Deploy to Vercel đĨŗ
## 1. How To Run Locally ?
1. ```git clone https://github.com/JalalMitali/MitaliShop-NestJS.git```
2. `create MongoDB cluster , create file 'env.local' in root and add the URI ( as in env.example)`
3. install `openssl` if you haven't yet on Mac use  `brew install openssl@3` ( [HomeBrew](https://formulae.brew.sh/formula/openssl@3) )
2. generate your private key đ  ```openssl genrsa -out private_key.pem 2048```
4. generate your public key đ ```openssl rsa -in private_key.pem -out public_key.pem -outform PEM -pubout```
5. start server `yarn start dev --watch`
6. use `PostMan`  âī¸ to test API endpoints and auth
