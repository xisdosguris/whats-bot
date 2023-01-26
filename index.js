const express = require('express')
const app = express()

app.get('/', (req, res) => {
res.send('Hello World!2')
// Invocamos o leitor de qr code
const qrcode = require('qrcode-terminal');

const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // MudanÃ§a Buttons

})

var port = process.env.PORT || '3000';
app.listen(port, () => console.log(`Example app listening on port ${port}!`))