import { SlashCommandBuilder } from 'discord.js';

// sets up command to be used in discord server
export const data = new SlashCommandBuilder()
  .setName('exit')
  .setDescription('This is to turn the bot off');

// waits for command then outputs text
export async function execute(interaction) {
  await interaction.reply('Replied!');

}