const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
app.set("port", process.env.PORT || 5000);

const browserP = puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});


app.get("/", (req, res) => {
// Invocamos o leitor de qr code
const qrcode = require('qrcode-terminal');

const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // MudanÃ§a Buttons
const client = new Client();

// entao habilitamos o usuario a acessar o serviÃ§o de leitura do qr code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
// apos isso ele diz que foi tudo certin 
client.on('ready', () => {
    
});

});

