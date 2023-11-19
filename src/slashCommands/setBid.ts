import {
	ChannelType,
	PermissionFlagsBits,
	SlashCommandBuilder,
} from 'discord.js';
import { SlashCommand } from '../types';
import { setBid } from '../functions';

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName('subfilm')
		.setDescription('Добавить фильм в список')
		.addStringOption((option) => {
			return option
				.setName('film')
				.setDescription('Добавить фильм ')
				.setRequired(true);
		})
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
	execute: (interaction) => {
		let filmBid = interaction.options.getString('film');
		console.log(filmBid);

		setBid(interaction.user.username, filmBid, interaction.guild!)
			.then(() => {
				interaction.reply(`Фильм ${filmBid} добавлен в список.`);
			})
			.catch((err) => {
				interaction.reply(`Произошла ошибка: ${err}`);
			});
	},
	cooldown: 10,
};
export default command;
