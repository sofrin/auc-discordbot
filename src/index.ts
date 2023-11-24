import { Client, GatewayIntentBits, Collection } from 'discord.js';
const { Guilds, MessageContent, GuildMessages, GuildMembers } =
	GatewayIntentBits;
export const client = new Client({
	intents: [Guilds, MessageContent, GuildMessages, GuildMembers],
});
import { SlashCommand } from './types';
import { config } from 'dotenv';
import { readdirSync } from 'fs';
import { join } from 'path';

import express from 'express';

config();

client.slashCommands = new Collection<string, SlashCommand>();

client.cooldowns = new Collection<string, number>();

const handlersDir = join(__dirname, './handlers');
readdirSync(handlersDir).forEach((handler) => {
	if (!handler.endsWith('.js')) return;
	require(`${handlersDir}/${handler}`)(client);
});

const app = express();

app.get('/helthcheck', (req, res) => {
	res.send('OK').status(200);
});

app.get('/', (req, res) => {
	res.send('OK').status(200);
});

app.post('/helthcheck', (req, res) => {
	req.body;
});

setInterval(function () {
	fetch('/helthcheck');
}, 600000);

app.listen(10000);

client.login(process.env.TOKEN);
