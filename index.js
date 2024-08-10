const express = require('express')
const path = require('path')
const bip39 = require('bip39')
const { Keypair } = require('@solana/web3.js');
const  app = express();
const port = 2525;

let mnemonic = '';

app.set('views', path.join(__dirname , 'Pages'))
let keys = [];
app.set('view engine', 'ejs');
app.get('/', (req , res)=>{
    console.log('Home Page');
    res.render('Home')
})

app.get('/create' , (req,res)=>{
    mnemonic = bip39.generateMnemonic();
    const word = mnemonic.split(" ");
    res.render('Enen',{word})
})

app.get('/walletKeys', (req,res)=>{
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    res.render('Wallets', {
        publicKey: keypair.publicKey.toBase58(),
        secretKey: Buffer.from(keypair.secretKey).toString('hex') // Convert Uint8Array to hex string
    });

})
app.listen(port , ()=>{
    console.log(`Server is running on ${port}`)
})


