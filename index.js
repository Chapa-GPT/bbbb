// Adiciona o framework Express para criar o servidor web
const express = require('express');

// Dependências do seu bot
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

// Cria a aplicação Express
const app = express();
// A porta é definida pela variável de ambiente da plataforma (ou 8080 como padrão)
const PORT = process.env.PORT || 8080;

// Cria uma rota principal ("/") que a plataforma pode verificar para saber se o serviço está vivo
app.get('/', (req, res) => {
  res.status(200).send('<h1>O Chatbot Ismael está rodando! 🦎💚</h1>');
});

// Inicia o servidor web para escutar na porta definida
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}. Aguardando conexão do WhatsApp...`);
    
    // AGORA, inicializa o cliente do WhatsApp DEPOIS que o servidor estiver pronto.
    
    // 1. Serviço de leitura do qr code
    client.on('qr', qr => {
        console.log('QR Code recebido, escaneie com seu celular!');
        qrcode.generate(qr, {small: true});
    });
    
    // 2. Mensagem de sucesso após a conexão
    client.on('ready', () => {
        console.log('Tudo certo! WhatsApp conectado e pronto para receber mensagens.');
    });
    
    // 3. Inicializa a conexão com o WhatsApp
    client.initialize();
});

// Função de delay para pausar entre as mensagens
const delay = ms => new Promise(res => setTimeout(res, ms));

// =================================================================
// LÓGICA DO BOT (FUNIL DE MENSAGENS)
// =================================================================
client.on('message', async msg => {

    // Ignora mensagens que não são de usuários diretos (ex: grupos)
    if (!msg.from.endsWith('@c.us')) {
        return;
    }

    const chat = await msg.getChat();
    const contact = await msg.getContact();
    const name = contact.pushname || "usuário"; // Usa "usuário" se o nome não estiver disponível
    const messageBody = msg.body.trim(); // Remove espaços extras

    // Resposta para saudação inicial
    if (messageBody.match(/^(dia|tarde|noite|oi|olá|ola)$/i)) {
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from,`Olá, ${name.split(" ")[0]}! Eu sou o Ismael, o Chatbot do curso de LEA-MSI e o meio oficial de contato da gestão do CALEA no WhatsApp, estou aqui para facilitar a comunicação no curso de LEA 🦎💚\n\n` +
            'Abaixo estão algumas interações que posso realizar, basta digitar o número ☺️:\n\n' +
            '0 - Calendário letivo\n' +
            '1 - O que é CALEA?\n' +
            '2 - Contato da coordenação ou professores\n' +
            '3 - Como checar as matérias ofertadas\n' +
            '4 - Informações do iCALEA da semana\n' +
            '5 - Recomendar algo para o iCALEA\n' +
            '6 - Assistência estudantil, auxílios e bolsas\n' +
            '7 - O que é PIBIC?\n' +
            '8 - O que é PIBEX?\n' +
            '9 - Fazer uma sugestão, comentário ou crítica\n' +
            '10 - Falar diretamente com a gestão\n\n' +
            'A qualquer momento você pode digitar "Menu" para retornar para a tela de escolhas.');
        return; // Termina a execução para não processar outras opções
    }

    // Resposta para o menu
    if (messageBody.match(/^menu$/i)) {
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from, 'Abaixo estão algumas interações que posso realizar, basta digitar o número ☺️:\n\n' +
            '0 - Calendário letivo\n' +
            '1 - O que é CALEA?\n' +
            '2 - Contato da coordenação ou professores\n' +
            '3 - Como checar as matérias ofertadas\n' +
            '4 - Informações do iCALEA da semana\n' +
            '5 - Recomendar algo para o iCALEA\n' +
            '6 - Assistência estudantil, auxílios e bolsas\n' +
            '7 - O que é PIBIC?\n' +
            '8 - O que é PIBEX?\n' +
            '9 - Fazer uma sugestão, comentário ou crítica\n' +
            '10 - Falar diretamente com a gestão\n\n' +
            'A qualquer momento você pode digitar "Menu" para retornar para a tela de escolhas.');
        return;
    }

    // Respostas baseadas no número digitado
    switch (messageBody) {
        case '0':
            await chat.sendStateTyping();
            await delay(2000);
            await client.sendMessage(msg.from, '*Calendário*\nAqui está um link para acessar o calendário atual do semestre!\n\nhttps://saa.unb.br/images/documentos/graduacao/Calendarios/Atividades/2025_2/2025_2_Calend_Ativ_Grad__03_07_2025.pdf');
            break;
            
        case '1':
            await chat.sendStateTyping();
            await delay(2000);
            await client.sendMessage(msg.from, '*O que é CALEA?*\nO Centro Acadêmico de Línguas Estrangeiras Aplicadas (CALEA) é a associação que representa os estudantes do curso de LEA-MSI da Universidade de Brasília (UnB).');
            await delay(2000);
            await client.sendMessage(msg.from, 'O CALEA possui os seguintes meios de contato oficial:\n\n*E-mail:* caleamsi@gmail.com\n*Instagram:* https://www.instagram.com/caleaunb/\n*Telefone:* +55 (61) 99104-2264');
            break;

        case '2':
            await chat.sendStateTyping();
            await delay(2000);
            await client.sendMessage(msg.from, '*Contato da Coordenação e Professores*\nLembre-se: para assuntos de coordenação, escreva para o e-mail da coordenação, não para o e-mail pessoal do professor.\n\n*Coordenação:* coordenacao.lea.msi@gmail.com\n\n*Professores:*\n- Adriana Fernandes Barbosa (Vice-coordenadora): adriana.barbosa@unb.br\n- Alessandra Matias Querido: alequerido@gmail.com\n- Antônio Marcos Moreira: marcosmoreira@unb.br\n- Cesário Alvim Pereira Filho: cesape@gmail.com\n- Charles Rocha Teixeira: charlesrt2006@gmail.com\n- Fernanda Alencar Pereira: fapfernanda@gmail.com\n- Helena Santiago Vigata: hsantiago@unb.br\n- Marcos de Campos Carneiro: mdecampos@unb.br\n- Susana Martínez Martínez (Coordenadora): laresu@hotmail.com');
            break;

        case '3':
            await chat.sendStateTyping();
            await delay(2000);
            await client.sendMessage(msg.from, '*Como checar as matérias ofertadas?*\nÉ simples! Basta acessar o seguinte link, que irá lhe levar ao SIGAA: https://sigaa.unb.br/sigaa/public/turmas/listar.jsf?aba=p-ensino');
            await delay(2000);
            await client.sendMessage(msg.from, 'Já no site, basta escolher o ano e o período que deseja conferir as matérias. Após isso, selecione a unidade "DEPTO LÍNGUAS ESTRANGEIRAS E TRADUÇÃO - BRASÍLIA" para as matérias de LEA.');
            break;

        case '4':
            await chat.sendStateTyping();
            await delay(2000);
            await client.sendMessage(msg.from, '*Quais as informações do iCALEA da semana?*\nO iCALEA é a newsletter semanal do CALEA, onde são divulgadas vagas, eventos e comunicados. Para se inscrever, acesse: https://bit.ly/icaleagroups');
            await delay(2000);
            await client.sendMessage(msg.from, 'Para ver a última edição (20/07/2024), acesse:\nhttps://docs.google.com/document/d/1NFvtp9l8U4O_LLPRShahNt-BBvleLEzTmZ61aaYLG1w/edit?usp=sharing');
            break;

        case '5':
            await chat.sendStateTyping();
            await delay(2000);
            await client.sendMessage(msg.from, '*Quero recomendar algo para o iCALEA*\nQue maravilha! Por favor, envie as informações do evento, vaga ou o que achar interessante. A gestão irá averiguar sua sugestão para incluí-la na próxima edição.');
            await delay(2000);
            await client.sendMessage(msg.from, 'Não se esqueça de passar informações importantes como poster de divulgação, local, data e links relevantes.');
            break;

        case '6':
            await chat.sendStateTyping();
            await delay(2000);
            await client.sendMessage(msg.from, '*Assistência Estudantil*\nNa UnB, o Decanato de Assuntos Comunitários (DAC) oferece diversos auxílios e bolsas. Abaixo estão alguns exemplos:');
            await delay(2000);
            await client.sendMessage(msg.from, '*Diretoria de Desenvolvimento Social (DDS):*\n- Auxílio Socioeconômico\n- Auxílio Inclusão Digital\n- Auxílio Transporte e Creche\n- Isenção no RU e Moradia Estudantil.');
            await delay(2000);
            await client.sendMessage(msg.from, 'Para mais informações e outros auxílios (culturais, esportivos, de acessibilidade), recomendamos o site oficial da DAC:\nhttps://dac.unb.br/\n\n*Atenção:* As informações aqui são um resumo. Sempre consulte os editais oficiais.');
            break;

        case '7':
            await chat.sendStateTyping();
            await delay(2000);
            await client.sendMessage(msg.from, '*O que é PIBIC?*\nPIBIC é a sigla para o *Programa Institucional de Bolsas de Iniciação Científica*. É uma chance de ter o primeiro contato com o mundo da pesquisa científica na graduação, com orientação de um professor e possibilidade de bolsa de R$ 700,00.');
            await delay(2000);
            await client.sendMessage(msg.from, 'Qualquer estudante de graduação pode participar. Converse com seus professores sobre os interesses de pesquisa deles! Os editais geralmente são publicados em março. Saiba mais em: https://proic.unb.br');
            break;

        case '8':
            await chat.sendStateTyping();
            await delay(2000);
            await client.sendMessage(msg.from, '*O que é PIBEX?*\nPIBEX é o *Programa Institucional de Bolsas de Extensão*. O foco é levar o conhecimento da universidade para a comunidade, aplicando o que se aprende em sala de aula em problemas reais, também com possibilidade de bolsa de R$ 700,00.');
            await delay(2000);
            await client.sendMessage(msg.from, 'Os editais geralmente são publicados em janeiro. Para mais informações, acesse o site do Decanato de Extensão: https://dex.unb.br/');
            break;
            
        case '9':
            await chat.sendStateTyping();
            await delay(2000);
            await client.sendMessage(msg.from, '*Quero fazer uma sugestão, comentário, crítica ou elogio*\nLegal, adoramos ouvir! Por favor, escreva abaixo seu comentário que iremos ler com toda atenção.');
            break;
        
        case '10':
            await chat.sendStateTyping();
            await delay(2000);
            await client.sendMessage(msg.from, '*Falar com a gestão*\nEntendido! Por favor, aguarde um momento que um dos membros da gestão irá te atender assim que possível.');
            break;
    }
});