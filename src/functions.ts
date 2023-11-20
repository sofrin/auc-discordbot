import chalk from 'chalk';
import {
	Guild,
	GuildMember,
	PermissionFlagsBits,
	PermissionResolvable,
	PermissionsBitField,
	TextChannel,
} from 'discord.js';
import GuildDB from './schemas/Guild';
import BidDB from './schemas/Bid';

import { GuildOption, Ibid } from './types';
import mongoose from 'mongoose';

type colorType = 'text' | 'variable' | 'error';

const themeColors = {
	text: '#ff8e4d',
	variable: '#ff624d',
	error: '#f5426c',
};

export const getThemeColor = (color: colorType) =>
	Number(`0x${themeColors[color].substring(1)}`);

export const color = (color: colorType, message: any) => {
	return chalk.hex(themeColors[color])(message);
};

export const checkPermissions = (
	member: GuildMember,
	permissions: Array<PermissionResolvable>,
) => {
	let neededPermissions: PermissionResolvable[] = [];
	permissions.forEach((permission) => {
		if (!member.permissions.has(permission)) neededPermissions.push(permission);
	});
	if (neededPermissions.length === 0) return null;
	return neededPermissions.map((p) => {
		if (typeof p === 'string') return p.split(/(?=[A-Z])/).join(' ');
		else
			return Object.keys(PermissionFlagsBits)
				.find((k) => Object(PermissionFlagsBits)[k] === p)
				?.split(/(?=[A-Z])/)
				.join(' ');
	});
};

export const sendTimedMessage = (
	message: string,
	channel: TextChannel,
	duration: number,
) => {
	channel
		.send(message)
		.then((m) =>
			setTimeout(
				async () => (await channel.messages.fetch(m)).delete(),
				duration,
			),
		);
	return;
};

export const getGuildOption = async (guild: Guild, option: GuildOption) => {
	if (mongoose.connection.readyState === 0)
		throw new Error('Database not connected.');
	let foundGuild = await GuildDB.findOne({ guildID: guild.id });
	if (!foundGuild) return null;
	return foundGuild.options[option];
};

export const setGuildOption = async (
	guild: Guild,
	option: GuildOption,
	value: any,
) => {
	if (mongoose.connection.readyState === 0)
		throw new Error('Database not connected.');
	let foundGuild = await GuildDB.findOne({ guildID: guild.id });
	if (!foundGuild) return null;
	foundGuild.options[option] = value;
	foundGuild.save();
};

export const setGuildToken = async (guild: Guild, value: any) => {
	if (mongoose.connection.readyState === 0)
		throw new Error('Database not connected.');
	let foundGuild = await GuildDB.findOne({ guildID: guild.id });
	if (!foundGuild) return null;
	foundGuild.token = value;
	foundGuild.save();
};
export const getGuildToken = async (guild: Guild) => {
	if (mongoose.connection.readyState === 0)
		throw new Error('Database not connected.');
	let foundGuild = await GuildDB.findOne({ guildID: guild.id });
	if (!foundGuild) return null;
	return foundGuild.token;
};

export const setBid = async (
	username: string,
	value: any,
	guild: Guild,
	cost = 123,
) => {
	if (mongoose.connection.readyState === 0)
		throw new Error('Database not connected.');
	let foundBid = await BidDB.findOne({ username: username, guildId: guild.id });
	if (!foundBid) {
		let newBid = new BidDB({
			cost,
			username: username,
			guildId: guild.id,
			message: value,
			timestamp: new Date().toISOString(),
		});
		newBid.save();
		return;
	}
	foundBid.message = value;
	foundBid.timestamp = new Date().toISOString();
	foundBid.cost = cost;

	foundBid.save();
};

export const getAllGuildBids = async (guild: Guild) => {
	if (mongoose.connection.readyState === 0)
		throw new Error('Database not connected.');
	let foundBids: Ibid[] = await BidDB.find({ guildId: guild.id });
	return foundBids;
};

export const clearAllGuildBids = async (guild: Guild) => {
	if (mongoose.connection.readyState === 0)
		throw new Error('Database not connected.');
	await BidDB.deleteMany({ guildId: guild.id });
};

export const setGuildRoles = async (
	guild: Guild,
	id: string,
	color: string,
	points: number,
	name: string,
) => {
	if (mongoose.connection.readyState === 0)
		throw new Error('Database not connected.');
	let foundGuild = await GuildDB.findOne({ guildID: guild.id });
	if (!foundGuild) return null;
	const foundRole = foundGuild.roles.find((role) => role.id === id);
	if (!foundRole) {
		let newRole = {
			name: name,
			id: id,
			color: color,
			points: points,
		};
		foundGuild.roles.push(newRole);
		foundGuild.save();
		return;
	}
	foundRole.name = name;
	foundRole.color = color;
	foundRole.points = points;
	foundGuild.save();
};

export const getGuildRoles = async (guild: Guild) => {
	if (mongoose.connection.readyState === 0)
		throw new Error('Database not connected.');
	let foundGuild = await GuildDB.findOne({ guildID: guild.id });
	if (!foundGuild) return null;
	return foundGuild.roles;
};
