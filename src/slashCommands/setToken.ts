import {
	SlashCommandBuilder,
	ModalBuilder,
	ActionRowBuilder,
	TextInputBuilder,
	TextInputStyle,
	PermissionFlagsBits,
} from 'discord.js';
import { SlashCommand } from '../types';
import { setGuildToken } from '../functions';

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName('token')
		.setDescription('Добавить токен для интеграции')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	execute: async (interaction) => {
		const modal = new ModalBuilder().setCustomId('token').setTitle('Токен');

		const tokenInput = new TextInputBuilder()
			.setCustomId('tokenInput')
			.setLabel(' Добавьте ваш токен')
			.setStyle(TextInputStyle.Paragraph);

		const secondActionRow =
			new ActionRowBuilder<TextInputBuilder>().addComponents(tokenInput);

		modal.addComponents(secondActionRow);

		await interaction.showModal(modal);
	},

	modal: async (interaction) => {
		await interaction.deferReply({ ephemeral: true });

		const token = interaction.fields.getTextInputValue('tokenInput');
		setGuildToken(interaction.guild, token)
			.then(() => {
				interaction.editReply({
					content: `Ваш токен был успешно зарегестрирован`,
				});
			})
			.catch((err) => {
				interaction.editReply({
					content: `Произошла ошибка: ${err}`,
				});
			});
	},

	cooldown: 5,
};

export default command;
