// NOVO: Adiciona o framework Express para criar o servidor web
const express = require('express');

// Dependências do seu bot
// NOVO: Adiciona o framework Express para criar o servidor web
const express = require('express');

// Dependências do seu bot
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js'); // Removi Buttons, List, MessageMedia se não estiverem em uso para limpar
const { Client } = require('whatsapp-web.js'); // Removi Buttons, List, MessageMedia se não estiverem em uso para limpar
const client = new Client();


// NOVO: Cria a aplicação Express
const app = express();
// NOVO: O Render define a porta pela variável de ambiente PORT
const PORT = process.env.PORT || 8080;

// NOVO: Cria uma rota principal ("/") que o Render pode verificar para saber se o serviço está vivo
app.get('/', (req, res) => {
  res.send('<h1>O Chatbot Ismael está rodando! 🦎💚</h1>');
});

// NOVO: Inicia o servidor web para escutar na porta definida
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}.`);
    
    // AGORA, inicializa o cliente do WhatsApp DEPOIS que o servidor estiver pronto.
    // Isso garante que o Render não dê timeout.
    
    // serviço de leitura do qr code
    client.on('qr', qr => {
        qrcode.generate(qr, {small: true});
    });
    
    // apos isso ele diz que foi tudo certo
    client.on('ready', () => {
        console.log('Tudo certo! WhatsApp conectado.');
    });
    
    // E inicializa tudo 
    client.initialize();
});

const delay = ms => new Promise(res => setTimeout(res, ms));

client.on('message', async msg => {
    if (msg.body.match(/(dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola|OI|OLA|OLÁ)/i) && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from,'Olá, '+ name.split(" ")[0] + '! Eu sou o Ismael, o Chatbot do curso de LEA-MSI e o meio oficial de contato da gestão do CALEA no WhatsApp, estou aqui para facilitar a comunicação no curso de LEA 🦎💚\n \n Abaixo estão algumas interações que posso realizar, basta digitar o número ☺️:\n\n0 - Calendário letivo\n1 - O que é CALEA?\n2 - Quero entrar em contato com a coordenação ou com professores de LEA\n3 - Como checar as matérias ofertadas\n4 - Quais as informações do iCALEA da semana?\n5 - Quero recomendar algo pro iCALEA\n6 - Assistência estudantil, auxílios e bolsas\n7 - O que é PIBIC?\n8 - O que é PIBEX?\n9 - Quero fazer uma sugestão, comentário, crítica ou elogio.\n10 - Quero falar diretamente com alguém da gestão\n\n A qualquer momento você pode digitar "Menu" para retornar para a tela de escolhas.');
    }

    if (msg.body.match(/(menu|Menu|MENU)/i) && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from,'Abaixo estão algumas interações que posso realizar, basta digitar o número ☺️:\n\n0 - Calendário letivo\n1 - O que é CALEA?\n2 - Quero entrar em contato com a coordenação ou com professores de LEA\n3 - Como checar as matérias ofertadas\n4 - Quais as informações do iCALEA da semana?\n5 - Quero recomendar algo pro iCALEA\n6 - Assistência estudantil, auxílios e bolsas\n7 - O que é PIBIC?\n8 - O que é PIBEX?\n9 - Quero fazer uma sugestão, comentário, crítica ou elogio.\n10 - Quero falar diretamente com alguém da gestão\n\n A qualquer momento você pode digitar "Menu" para retornar para a tela de escolhas.');
    }

    if (msg.body !== null && msg.body === '0' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '*Calendário*\nAqui está um link para acessar o calendário atual do semestre!\n\nhttps://saa.unb.br/images/documentos/graduacao/Calendarios/Atividades/2025_2/2025_2_Calend_Ativ_Grad__03_07_2025.pdf');
    }

    // ... (cole o resto do seu código com as respostas '1' a '10' aqui, ele continua igual)
    if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '*O que é CALEA?*\nO Centro Acadêmico de Línguas Estrangeiras Aplicadas (CALEA) é uma associação de estudantes do curso de LEA-MSI da Universidade de Brasília (UnB). O CALEA representa os alunos de LEA oficialmente dentro da UnB, além de contar com um espaço físico localizado no ICC ala sul, sala BSS 051 (subsolo).\n\nO CALEA é atualmente gerido pela gestão GPT, uma gestão formada por alunos de diferentes semestres e com diferentes habilidades e ambições. Para saber mais sobre a atual gestão, suas propostas e seus membros, acesse o Instagram da gestão: https://www.instagram.com/_chapagpt/');

        await delay(2000); //delay de 2 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'O CALEA possui somente quatro meios de contato oficial:\na. E-mail - caleamsi@gmail.com\nb. Instagram - https://www.instagram.com/caleaunb/ e\nc. Número de telefone - +55 (61) 99104-2264');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Qualquer pessoa pode entrar em contato com o CALEA, seja para tirar dúvidas sobre matrícula, calendário, solicitar informações e prestação de contas, ler o iCALEA da semana ou qualquer outra necessidade.\n\nEste espaço é nosso! ¡Este espacio es nuestro! Cet espace est notre! This space is ours!');
    }

    if (msg.body !== null && msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '*Quero entrar em contato com a coordenação ou com os professores de LEA*\nHá duas maneiras oficiais de entrar em contato com os professores.\nA primeira é através do Microsoft Teams. Basta escrever o nome completo do professor e enviar mensagem.\n A segunda maneira é através do e-mail do professor.\nAbaixo está uma lista com o nome completo e e-mail da coordenação e de todos os professores de LEA!  Lembre-se que para *assuntos relacionados à coordenação*, é Imprescindível que *a dúvida seja enviada para o e-mail da coordenação*, e não do professor que está exercendo cargo na coordenação.');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Coordenação - coordenacao.lea.msi@gmail.com\n\nProfessores:\nAdriana Fernandes Barbosa (Vice coordenadora) - adriana.barbosa@unb.br\n Alessandra Matias Querido - alequerido@gmail.com\nAntônio Marcos Moreira - marcosmoreira@unb.br\nCesário Alvim Pereira Filho - cesape@gmail.com\nCharles Rocha Teixeira - charlesrt2006@gmail.com\nFernanda Alencar Pereira - fapfernanda@gmail.com\nHelena Santiago Vigata - hsantiago@unb.br\nMarcos de Campos Carneiro - mdecampos@unb.br\nSusana Martínez Martínez - (coordenadora) laresu@hotmail.com');
    }

    if (msg.body !== null && msg.body === '3' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '*Como checar as matérias ofertadas?*\nÉ simples! Basta acessar o seguinte link, que irá lhe levar ao SIGAA: https://sigaa.unb.br/sigaa/public/turmas/listar.jsf?aba=p-ensino\n\nJá no site, basta escolher o ano e o período que deseja conferir as matérias a serem ofertadas. Após isso, basta selecionar a unidade.\nAs matérias do LEA estão todas na unidade “DEPTO LÍNGUAS ESTRANGEIRAS E TRADUÇÃO - BRASÍLIA”.');
        
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Para conferir outras matérias do Instituto de Letras, basta selecionar as outras unidades: “DEPTO LINGUISTICA, PORT. LING. CLASSICAS - BRASÍLIA” ou “DEPTO TEORIA LITERÁRIA E LITERATURA - BRASÍLIA”.');
        
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Após selecionar a unidade, basta clicar em Buscar e você terá acesso às matérias ofertadas, o horário delas, local de aula, professor ministrante e quantidade de vagas.\nAo clicar na lupa de cada matéria, será possível observar dados gerais da disciplina, como ementa e pré-requisitos.');
    }

    if (msg.body !== null && msg.body === '4' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '*Quais as informações do iCALEA da semana?*\nO iCALEA é a newsletter semanal do CALEA, recebida via e-mail e postada prioritariamente no domingo. Nela são divulgadas vagas de estágio, vagas de emprego, eventos nacionais e internacionais que acontecem no Distrito Federal, comunicados importantes, informações relevantes sobre a Universidade de Brasília para a semana e muito mais.\n\nCaso ainda não esteja inscrito no iCALEA, basta acessar o seguinte link: https://bit.ly/icaleagroups, selecionar o grupo do iCALEA e se inscrever.');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Caso tenha perdido o último iCALEA, não se preocupe! Segue abaixo as informações do iCALEA do dia 20/07/2024:\nhttps://docs.google.com/document/d/1NFvtp9l8U4O_LLPRShahNt-BBvleLEzTmZ61aaYLG1w/edit?usp=sharing');
    }

    if (msg.body !== null && msg.body === '5' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '*Quero recomendar algo para o iCALEA*\nQue maravilha! Por favor, envie as informações do evento, curso, mini-curso, vaga de estágio ou de emprego, ou qualquer coisa que você achar interessante de ser divulgado no iCALEA. A gestão do CALEA irá averiguar a sua sugestão e incluí-la no próximo iCALEA.');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Não se esqueça de passar informações importantes como poster de divulgação, local, data, link para Instagram do evento ou link para a página do evento.');
    }

    if (msg.body !== null && msg.body === '6' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Na UnB, há diversos programas que visam manter o discente na universidade e melhorar a qualidade de vida dos discentes por meio de programas, auxílios e bolsas, são os chamados programas de assistência estudantil. No Decanato de Assuntos Comunitários (DAC) há várias sub-diretorias responsáveis por isso. Abaixo cito algumas diretorias e alguns auxílios e bolsas que elas fornecem.');
        
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '*Diretoria de Desenvolvimento Social (DDS):*\n\nAuxílio socioeconômico - Bolsa mensal de R$ 700,00 para o estudante gastar com o que quiser/precisar\nAuxílio inclusão digital - Bolsa única de R$ 2000,00 para o estudante adquirir um computador, notebook ou celular\nAuxílio transporte - Bolsa mensal de R$ 400,00 para o estudante custear parcialmente o transporte até a UnB\nAuxílio creche - Repasse mensal de R$ 700,00 para pais e mães que estudam na UnB e precisam arcar com a creche de seu filho\nAuxílio alimentação - Isenção de pagamento nas refeições do Restaurante Universitário, ou seja, o aluno não precisa mais pagar para utilizar o RU em qualquer uma das três refeições\nMoradia estudantil - A UnB fornece uma vaga para o estudante morar nos apartamentos denominados de Casa do Estudante Universitário (CEU), localizados majoritariamente no campus Darcy Ribeiro.');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '*Diretoria de Esporte e Atividades Comunitárias (DEAD):*\n\nFestival FINCA - Auxílio único de R$ 2000,00 destinado a estudantes e bandas que participarem do festival de música da UnB\nPromotor e/ou praticante artístico cultural ou de atividade física - Auxílio mensal que varia de R$ 250,00 a R$ 700,00 para estudantes que promovem eventos culturais ou que praticam atividades artísticas culturais ou atividades físicas de alto desempenho\nOficina de arte e cultura - Bolsa mensal de R$ 400,00 para estudantes auxiliarem na produção e promoção de projetos culturais da UnB');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '*Diretoria de Acessibilidade (DACES):*\n\nAuxílio tecnologia assistiva - Auxílio único de R$ 3000,00 para aquisição ou manutenção de equipamentos de tecnologia assistiva\nPrograma de tutoria - Bolsa mensal de R$ 400,00 para estudantes de graduação atuarem como tutores de colegas do curso atendidos pela DACES e que necessitam de auxílio em atividades acadêmicas\nLedor e transcritor - Bolsa mensal de R$ 400,00 para estudantes de graduação atuarem como ledores ou transcritores de materiais adaptados para alunos atendidos pela DACES');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Há diversos outras diretorias e programas de assistência estudandil. Para mais informações, recomendamos o site oficial da DAC: https://dac.unb.br/\n\nObs: o CALEA não se responsabiliza por quaisquer mudanças nos editais. Toda informação divulgada por aqui deve ser tomada apenas como norteadora. Busque sempre se informar pelo site da DAC e pelos editais');
        
    }

    if (msg.body !== null && msg.body === '7' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '*O que é PIBIC?*\nPIBIC é a sigla para o *Programa Institucional de Bolsas de Iniciação Científica*. É uma das chances de ter o primeiro contato com o mundo da pesquisa científica na graduação.\n\nNo PIBIC, o aluno irá estudar durante o período de 1 ano sobre um tema específico com a orientação de um professor. Ao longo do projeto o aluno poderá revisar a biografia, coletar dados e produzir conhecimento para, no final, apresentar um relatório sobre suas descobertas no Congresso de Iniciação Científica do Distrito Federal.');
        
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Para incentivar o conhecimento científico, a UnB, o CNPq e a FAP-DF fornecem bolsas de R$ 700,00 mensais para os estudantes realizarem suas pesquisas. Apesar de oferecerem bolsa, o estudante pode também realizar sua pesquisa de maneira voluntária, recebendo um certificado.');
        
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Qualquer estudante de graduação da UnB pode participar do PIBIC, desde que possua um professor para ser seu orientador. Por isso, não hesite em se aprofundar em seus interesses ou em conhecer uma área de pesquisa que você goste. Converse com seus professores e saiba a área de pesquisa deles, quais os seus interesses e se possuem recomendações de temas de pesquisa.');
                
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Geralmente, os editais PIBICs são publicados em março, e a atuação começa no mês de setembro.\n\nPara mais informações sobre PIBIC, acesse o site oficial do Programa de iniciação científica da UnB: https://proic.unb.br');
    }

    if (msg.body !== null && msg.body === '8' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '*O que é PIBEX?*\nPIBEX é a sigla para Programa Institucional de Bolsas de Extensão. No PIBEX, o foco é a extensão, ou seja, levar o conhecimento da universidade para a comunidade, através da extensão da atuação da universidade.\n\n A ideia do PIBEX é aplicar o que se aprende em sala de aula para resolver problemas reais. O aluno que estiver participando de um PIBEX estará na linha de frente desses projetos, sob a orientação de um professor.');
        
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'No PIBEX, os alunos irão realizar diversos tipos de atividades, a depender do projeto, durante um período de, geralmente, 9 meses. As atividades de cada projeto variam a depender das necessidades dos professores coordenadores.');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Para incentivar a participação discente, a UnB fornece uma bolsa de R$ 700,00 mensais para bolsistas PIBEX. Apesar de oferecerem bolsa, o estudante também pode participar de um PIBEX de forma voluntária, recebendo um certificado de participação.');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Qualquer estudante de graduação da UnB pode participar de um PIBEX, desde que o coordenador do projeto aceite sua participação. Por isso, não hesite pesquisar por PIBEX ativos no SIGAA e entrar em contato com os coordenadores de cada projeto.');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Geralmente, os editais PIBEX são publicados em janeiro, com a seleção de bolsistas ocorrendo em março, e inicio das atividades em abril.\n\nPara mais informações sobre PIBEX, acesse o site do Decanato de Extensão: https://dex.unb.br/');
    }

    if (msg.body !== null && msg.body === '9' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '*Quero fazer uma sugestão, comentário, crítica ou elogio*\nLegal, adoramos ouvir sugestões e comentários de LEAdores, e entendemos também que todos podemos e devemos receber críticas, sejam elas negativas ou positivas, o importante é não ofender e ser construtivo!\n\nPor favor, escreva abaixo seu comentário que iremos ler com toda atenção.');
    }

    if (msg.body !== null && msg.body === '10' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '*Quero falar diretamente com alguém da gestão*\nEspere um pouquinho até que alguém fora do ciberespaço possa te atender, talvez possa demorar alguns minutos');
    }
});