import { SlashCommandBuilder } from 'discord.js';


export const data = new SlashCommandBuilder()
  .setName('thestuffy')
  .setDescription('This is a demo of execute');

// waits for command then outputs text
export async function execute(interaction) {
  await interaction.reply('Replied!');

}