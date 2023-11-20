import { Schema, model } from 'mongoose';
import { IGuild } from '../types';

const GuildSchema = new Schema<IGuild>({
	guildID: { required: true, type: String },
	token: { type: String },
	joinedAt: { type: Date, default: Date.now },
	roles: [
		{
			name: { type: String },
			id: { type: String },
			color: { type: String },
			points: { type: Number },
		},
	],
});

const GuildModel = model('guild', GuildSchema);

export default GuildModel;
