import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import * as theStuff from './commands/thecommands.js';
config();
console.log(process.env.CLIENTID);
console.log(process.env.SERVERID);
console.log(process.env.TOKEN);


//Basic setup to get bot online
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
})

function readyDiscord()
{
    console.log("The bot has activated! " + client.user.tag);
}
client.login(process.env.TOKEN); // login to discord with token
client.once(Events.ClientReady, readyDiscord); //turns bot on [indicated by green dot in server]




//Setup specific command to work in discord
async function handleInteraction(interaction) {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === 'thestuffy') {
        await theStuff.execute(interaction);
    }
}
client.on(Events.InteractionCreate, handleInteraction);
