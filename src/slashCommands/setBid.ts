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

		setBid(interaction.user.username, filmBid, interaction.guild!, points)
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
