import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import * as theStuff from './commands/thecommands.js';
import OpenAI from 'openai';

config();
console.log(process.env.CLIENTID);
console.log(process.env.SERVERID);
console.log(process.env.TOKEN);


//Basic setup to get bot online and connect to discord API
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
})

// Connect to OPENAI API
const openai = new OpenAI({
  organisation: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_KEY}) // this is also the default, can be omitted

//checks when a message is sent on discord
client.on('messageCreate', async function(message){
    try{


        if(message.author.bot) return; // bot does not respond to itself or other bots, only users
        // console.log(message.content);
        // message.reply(`Dylan said: ${message.content}`)
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{role: 'system' , content: 'DylanBOT is a friendly chatbot'}, {role: 'user', content: message.content}]
        });

        message.reply(chatCompletion.choices[0].message.content)
        return
    } catch(error){
        console.log(error);
    }
});

function readyDiscord()
{
    console.log("The bot has activated! " + client.user.tag);
}
client.login(process.env.TOKEN); // login to discord with token
client.once(Events.ClientReady, readyDiscord); //turns bot on [indicated by green dot in server]




//Setup specific command to work in discord
async function handleInteraction(interaction) {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === 'exit') {
        await theStuff.execute(interaction);
    }
}
client.on(Events.InteractionCreate, handleInteraction);
