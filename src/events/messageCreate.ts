import { Message } from 'discord.js';
import { BotEvent } from '../types';

const event: BotEvent = {
	name: 'messageCreate',
	execute: async (message: Message) => {},
};

export default event;
