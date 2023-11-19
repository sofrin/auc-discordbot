import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { clearAllGuildBids } from '../functions';
import { SlashCommand } from '../types';

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName('clearfilms')
		.setDescription('Очистить список фильмов')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	execute: (interaction) => {
		clearAllGuildBids(interaction.guild!)
			.then(() => {
				interaction.reply({
					content: `Список фильмов очищен`,
				});
			})
			.catch((err) => {
				interaction.reply({
					content: `Произошла ошибка: ${err}`,
				});
			});
	},
	cooldown: 10,
};

export default command;
