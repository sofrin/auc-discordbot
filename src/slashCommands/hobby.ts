import {
	SlashCommandBuilder,
	ModalBuilder,
	ActionRowBuilder,
	TextInputBuilder,
	TextInputStyle,
} from 'discord.js';
import { SlashCommand } from '../types';
import { setGuildToken } from '../functions';

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName('token')
		.setDescription('What is your token?'),
	execute: async (interaction) => {
		const modal = new ModalBuilder()
			.setCustomId('token')
			.setTitle('What is your token?');

		const tokenInput = new TextInputBuilder()
			.setCustomId('tokenInput')
			.setLabel("What's some of your favorite token?")
			.setStyle(TextInputStyle.Paragraph);

		const secondActionRow =
			new ActionRowBuilder<TextInputBuilder>().addComponents(tokenInput);

		modal.addComponents(secondActionRow);

		await interaction.showModal(modal);
	},
	modal: async (interaction) => {
		await interaction.deferReply({ ephemeral: true });

		const token = interaction.fields.getTextInputValue('tokenInput');
		setGuildToken(interaction.guild, token);
		await interaction.editReply({ content: `So, your token is ${token}!` });
	},
	cooldown: 5,
};

export default command;
