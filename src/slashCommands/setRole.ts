import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types';
import { setGuildRoles } from '../functions';

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName('setrole')
		.setDescription('Добавить роль и ставку для заказа в аукцион ')
		.addRoleOption((option) => {
			return option
				.setName('role')
				.setDescription('Добавить роль ')
				.setRequired(true);
		})
		.addIntegerOption((option) => {
			return option
				.setName('points')
				.setDescription('Добавить ставку ')
				.setRequired(true);
		})
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	execute: (interaction) => {
		const guild = interaction.guild!;
		const member = guild.members.cache.get(interaction.user.id);

		const role = interaction.options.getRole('role')!;
		const points = interaction.options.getInteger('points')!;

		setGuildRoles(guild, role.id, role.color.toString(16), points, role.name)
			.then(() => {
				interaction.reply(
					`Роль ${role.name} добавлена в список. Ставка ${points} добавлена в список.`,
				);
			})
			.catch((err) => {
				interaction.reply(`Произошла ошибка: ${err}`);
			});
	},
};

export default command;
