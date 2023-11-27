import { SlashCommandBuilder } from 'discord.js';

// sets up command to be used in discord server
export const data = new SlashCommandBuilder()
  .setName('thestuffy')
  .setDescription('This is a demo of execute');

// waits for command then outputs text
export async function execute(interaction) {
  await interaction.reply('Replied!');

}