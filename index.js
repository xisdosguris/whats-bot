const express = require('express')
const app = express()

app.get('/', (req, res) => {
res.send('Hello World!')
// Invocamos o leitor de qr code
const qrcode = require('qrcode-terminal');

})

var port = process.env.PORT || '3000';
app.listen(port, () => console.log(`Example app listening on port ${port}!`))