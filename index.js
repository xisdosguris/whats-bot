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
    console.log('Tudo certo! WhatsApp conectado.');
});
// E inicializa tudo para fazer a nossa magica =)
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // FunÃ§Ã£o que usamos para criar o delay entre uma aÃ§Ã£o e outra

// Funil Base Projeto

client.on('message', async msg => {
    
    const mensagemArray = msg.body.toLowerCase().replace('?', '').replace('.', '').replace('!', '').replace(',', '').split(" ");

    // FUNÇÕES PARA FAZER PEDIDO
    function botFazerPedido(message) {
        const stringsFazerPedidos = ["quero","queria","desejo","desejava","fazer","consigo","posso"];
        const stringsFazerPedidos1 = ["pedido","pedidos","pedir","encomendar","encomenda","delivery","tele","retirar","retirada","comer"];

        let i = 0;
        let i1 = 0;
        
        while (i < stringsFazerPedidos.length) {
            const includesTwenty = message.includes(stringsFazerPedidos[i]);

            if(includesTwenty===true){
                while (i1 < stringsFazerPedidos1.length) {
                    const includesTwenty1 = message.includes(stringsFazerPedidos1[i1]);
                    if(includesTwenty1===true){
                        return true;
                        break;
                    }
                i1++;
                }
            break;
            }
            i++;
        }
    }

    // FUNÇÕES PARA ENVIAR CARDÁPIO
    function botEnviarCardapio(message) {
        const stringsFazerCardapio = ["enviar","enviam","mandar","manda","quero","queria","encontro","encontrar","cardapio","cardápio","cardapios","cardápios","menu","opções","opcoes","servem","favor"];
        const stringsFazerCardapio1 = ["cardapio","cardápio","cardapios","cardápios","menu","opções","opcoes","servem","favor"];
        
        let iC = 0;
        let iC1 = 0;
        
        while (iC < stringsFazerCardapio.length) {
            const includesCardapio = message.includes(stringsFazerCardapio[iC]);

            if(includesCardapio===true){
                while (iC1 < stringsFazerCardapio1.length) {
                    const includesCardapio1 = message.includes(stringsFazerCardapio1[iC1]);
                    if(includesCardapio1===true){
                        return true;
                        break;
                    }
                iC1++;
                }
            break;
            }
            iC++;
        }
    }

    // FUNÇÕES PARA ATRASOS
    function botEnviarAtrasos(message) {
        const stringsFazerAtrasos = ["atraso","atrasado","ainda","demora","demorando","situacao","situação","andamento","status"];
        
        let iA = 0;
        
        while (iA < stringsFazerAtrasos.length) {
            const includesAtrasos = message.includes(stringsFazerAtrasos[iA]);
            if(includesAtrasos===true){
                return true;
                break;
            }
            iA++;
        }
    }

    // CHAMADA PARA FAZER PEDIDO
    if(botFazerPedido(mensagemArray) === true){
        const chat = await msg.getChat();
        chat.sendStateTyping();
        await delay(3000);
        client.sendMessage(msg.from, new Buttons('Certo! Você quer fazer um pedido.', [{id:'customId',body:'Tele Entrega'},{body:'Retirar no Local'}, {body:'Consumir no Local'}], 'Olá', 'Escolha abaixo o que você deseja:'));       
    }

    if (msg.body !== null && msg.body === 'Tele Entrega') {
        const chat = await msg.getChat();
        chat.sendStateTyping();
        await delay(2000);
        client.sendMessage(msg.from,'Os pedidos são feitos pelo link: https://gurispubcachoeirinha.menudino.com/');
    }

    if (msg.body !== null && msg.body === 'Retirar no Local') {
        const chat = await msg.getChat();
        chat.sendStateTyping();
        await delay(2000);
        client.sendMessage(msg.from,'Os pedidos para retirada são feitos pelo link: https://gurispubcachoeirinha.menudino.com/ e retirados na Loja de Cachoeirinha na Av. Fernando Ferrari, 50 - Vila Regina - Cachoeirinha.');
    }

    if (msg.body !== null && msg.body === 'Consumir no Local') {
        const chat = await msg.getChat();
        chat.sendStateTyping();
        await delay(2000);
        client.sendMessage(msg.from,'Os pedidos para consumir no local são feitos pelo link: https://gurispubcachoeirinha.menudino.com/, escolha a opção para consumir no local. Nosso endereço é na Av. Fernando Ferrari, 50 - Vila Regina - Cachoeirinha.');
    }

    // FIM FUNÇÕES PARA FAZER PEDIDO //////////////////////////////////////////////////////////////////////////////////////////////

    // CHAMADA PARA CARDÁPIO
    if(botEnviarCardapio(mensagemArray) === true){
        const chat = await msg.getChat();
        chat.sendStateTyping();
        await delay(2000);
        client.sendMessage(msg.from, 'Nosso cardápio você encontra nesse link: https://gurispubcachoeirinha.menudino.com/ . Os pedidos também são feitos pelo mesmo link.');
    }

    // CHAMADA PARA ATRASO
    if(botEnviarAtrasos(mensagemArray) === true){
        const chat = await msg.getChat();
        chat.sendStateTyping();
        await delay(2000);
        client.sendMessage(msg.from, new Buttons('Você fez o pedido pelo Ifood, Cardápio Digital ou Outros?', [{id:'customId',body:'Ifood'},{body:'Cardápio Digital'}, {body:'Outros'}], 'Vamos verificar o seu pedido!', 'Escolha abaixo:'));
    }
    if (msg.body !== null && (msg.body === 'Ifood' || msg.body === 'Cardápio Digital' || msg.body === 'Outros')) {
        const chat = await msg.getChat();
        chat.sendStateTyping();
        await delay(2000);
        client.sendMessage(msg.from,'Por favor, informe o Nome de quem fez o pedido e o Número do Pedido.');
    }




    if (msg.body === 'ATIVAR FUNIL BASICO') {
        const chat = await msg.getChat();
        chat.sendStateTyping(); // Simulando DigitaÃ§Ã£o
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        msg.reply('OlÃ¡! Seja muito bem vindo. VocÃª entrou no Funil Basico do treinamento Chatbot projetado pelo Johnny'); //Primeira mensagem de texto
        await delay(1000); //delay de 1 segundo
        client.sendMessage(msg.from, 'VocÃª vai ter contato com as funcionalidades bÃ¡sicas do nosso projeto e poderÃ¡ ver o quanto Ã© fÃ¡cil criar seus prÃ³prios funis personalizados ao seu negÃ³cio.');
        await delay(3000); //delay de 3 segundos
        client.sendMessage(msg.from, 'Agora vamos testar os botÃµes. ðŸ˜Ž');
        client.sendMessage(msg.from, new Buttons('Olha que bacana', [{id:'customId',body:'Bacana demais!!'},{body:'Eu concordo, mto mesmo..'}, {body:'Olha o terceiro botao'}], 'Vamos lÃ¡...', 'Escolha abaixo ðŸ‘‡'));
    }
    
    if (msg.body !== null && msg.body === 'Bacana demais!!') {
        const chat = await msg.getChat();
        chat.sendStateTyping(); //Simulando digitaÃ§Ã£o
        await delay(3000); //Delay de 3 segundos
        client.sendMessage(msg.from, 'VocÃª escolheu a opÃ§Ã£o Bacana demais. Isso Ã© muito bom, pois na prÃ¡tica vocÃª vai se comunicar com seus clientes exatamente desta maneira.');
        await delay(3000); //Delay de 3 segundos
        client.sendMessage(msg.from, 'Agora eu vou te mandar um audio gravado mas enviado como se fosse fresquinho!!');
        chat.sendStateRecording(); //Simulando audio gravando
        await delay(5000); //Delay de 5 segundos
        const formal1 = MessageMedia.fromFilePath('./audio_base.ogg'); // Arquivo de audio em ogg gravado
        client.sendMessage(msg.from, formal1, {sendAudioAsVoice: true}); // enviando o audio1
        await delay(4000); //Delay de 4 segundos
        client.sendMessage(msg.from, 'Agora quero te mandar uma imagem');
        await delay(3000); //Delay de 3 segundos
        const img1 = MessageMedia.fromFilePath('./imagem_base.png'); // arquivo em imagem
        client.sendMessage(msg.from, img1, {caption: 'Olha que legal'}); //Enviando a imagem
        await delay(3000); //Delay de 3 segundos
        client.sendMessage(msg.from, 'Prontinho! Agora use a sua criatividade para criar sequencias de respostas com audios, botÃµes e imagens. O cÃ©u Ã© o limite');
    }

    if (msg.body !== null && msg.body === 'Eu concordo, mto mesmo..') {
        const chat = await msg.getChat();
        chat.sendStateTyping(); //Simulando digitaÃ§Ã£o
        await delay(3000); //Delay de 3 segundos
        client.sendMessage(msg.from, 'VocÃª escolheu a opÃ§Ã£o Eu concordo, mto mesmo.. Isso Ã© muito bom, pois na prÃ¡tica vocÃª vai se comunicar com seus clientes exatamente desta maneira.');
        await delay(3000); //Delay de 3 segundos
        client.sendMessage(msg.from, 'Agora eu vou te mandar um audio gravado mas enviado como se fosse fresquinho!!');
        chat.sendStateRecording(); //Simulando audio gravando
        await delay(5000); //Delay de 5 segundos
        const formal1 = MessageMedia.fromFilePath('./audio_base.ogg'); // Arquivo de audio em ogg gravado
        client.sendMessage(msg.from, formal1, {sendAudioAsVoice: true}); // enviando o audio1
        await delay(4000); //Delay de 4 segundos
        client.sendMessage(msg.from, 'Agora quero te mandar uma imagem');
        await delay(3000); //Delay de 3 segundos
        const img1 = MessageMedia.fromFilePath('./imagem_base.png'); // arquivo em imagem
        client.sendMessage(msg.from, img1, {caption: 'Olha que legal'}); //Enviando a imagem
        await delay(3000); //Delay de 3 segundos
        client.sendMessage(msg.from, 'Prontinho! Agora use a sua criatividade para criar sequencias de respostas com audios, botÃµes e imagens. O cÃ©u Ã© o limite');
    }
    
});
