import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types';
import { getGuildRoles, setBid } from '../functions';

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
	execute: async (interaction) => {
		const guildApprovedRoles = await getGuildRoles(interaction.guild!);
		const guild = interaction.guild!;
		const member = guild.members.cache.get(interaction.user.id);
		const color = member?.displayHexColor!;
		let points = 0;
		if (guildApprovedRoles) {
			member?.roles.cache.reduce((acc, role) => {
				for (let i = 0; i < guildApprovedRoles.length; i++) {
					if (role.id === guildApprovedRoles[i].id) {
						points = guildApprovedRoles[i].points;
					}
				}
				return acc + points;
			}, 0);
		}

		let filmBid = interaction.options.getString('film');
		console.log(filmBid);
		if (points > 0) {
			setBid(
				color,
				interaction.user.username,
				filmBid,
				interaction.guild!,
				points,
			)
				.then(() => {
					return interaction.reply(`Фильм ${filmBid} добавлен в список.`);
				})
				.catch((err) => {
					return interaction.reply(`Произошла ошибка: ${err}`);
				});
		} else interaction.reply(`вы не можете добавлять фильмы`);
	},
	cooldown: 10,
};
export default command;
