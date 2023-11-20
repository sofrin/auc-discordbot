import {
	SlashCommandBuilder,
	CommandInteraction,
	Collection,
	PermissionResolvable,
	Message,
	AutocompleteInteraction,
	ChatInputCommandInteraction,
} from 'discord.js';
import mongoose from 'mongoose';

export interface SlashCommand {
	command: SlashCommandBuilder;
	execute: (interaction: ChatInputCommandInteraction) => void;
	autocomplete?: (interaction: AutocompleteInteraction) => void;
	modal?: (interaction: ModalSubmitInteraction<CacheType>) => void;
	cooldown?: number; // in seconds
}

export interface Command {
	name: string;
	execute: (message: Message, args: Array<string>) => void;
	permissions: Array<PermissionResolvable>;
	aliases: Array<string>;
	cooldown?: number;
}

interface GuildOptions {
	prefix: string;
}

export interface IGuild extends mongoose.Document {
	guildID: string;
	options: GuildOptions;
	joinedAt: Date;
	token: string;
	roles: {
		name: string;
		id: string;
		color: string;
		points: number;
	}[];
}

export interface Ibid extends mongoose.Document {
	guildId: string;
	cost?: number;
	username?: string;
	message: string;
	id?: string;
	color?: string;
	isDonation?: boolean;
	timestamp?: string;
	guild: mongoose.Types.ObjectId;
}
export type GuildOption = keyof GuildOptions;
export interface BotEvent {
	name: string;
	once?: boolean | false;
	execute: (...args) => void;
}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TOKEN: string;
			CLIENT_ID: string;
			MONGO_URI: string;
			MONGO_DATABASE_NAME: string;
		}
	}
}

declare module 'discord.js' {
	export interface Client {
		slashCommands: Collection<string, SlashCommand>;
		commands: Collection<string, Command>;
		cooldowns: Collection<string, number>;
	}
}
