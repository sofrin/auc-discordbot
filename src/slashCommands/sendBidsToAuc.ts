import { SlashCommandBuilder } from 'discord.js';
import { getAllGuildBids, getGuildToken } from '../functions';
import { SlashCommand } from '../types';
const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName('sendfilms')
		.setDescription('Отправить список фильмов в аукцион'),
	execute: async (interaction) => {
		const token = await getGuildToken(interaction.guild!);

		if (myHeaders.has('Authorization')) {
			myHeaders.delete('Authorization');
		}
		myHeaders.append('Authorization', `Bearer ${token}`);
		console.log(`myHeaders`, myHeaders);

		console.log(`token`, token);
		const bids = await getAllGuildBids(interaction.guild!);
		const raw = JSON.stringify({
			bids: bids,
		});
		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow' as RequestRedirect,
		};
		fetch('https://pointauc.com/api/oshino/bids', requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(`result`, result))
			.catch((error) => console.log('error', error));
		interaction.reply({
			content: 'Фильмы отправлены в аукцион',
		});
	},
	cooldown: 10,
};

export default command;
