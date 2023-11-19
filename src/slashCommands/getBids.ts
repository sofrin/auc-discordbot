import { SlashCommandBuilder } from 'discord.js';
import { getAllGuildBids } from '../functions';
import { SlashCommand } from '../types';

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName('allfilms')
		.setDescription('Список всех фильмов'),
	execute: (interaction) => {
		getAllGuildBids(interaction.guild!).then((bids) => {
			const table = bids.map((bid) => {
				return `${bid.message} заказал ${bid.username}  - ${
					bid.timestamp?.split('T')[0]
				} в ${bid.timestamp?.split('T')[1].split('.')[0]}  \n`;
			});
			interaction.reply({
				content: `Всего ${
					bids.length
				} фильмов в списке, список: \n ${table.join('')}`,
			});
		});
	},
	cooldown: 10,
};

export default command;
