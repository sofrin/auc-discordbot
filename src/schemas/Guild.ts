import { Schema, model } from 'mongoose';
import { IGuild } from '../types';

const GuildSchema = new Schema<IGuild>({
	guildID: { required: true, type: String },
	token: { type: String },
	joinedAt: { type: Date, default: Date.now },
});

const GuildModel = model('guild', GuildSchema);

export default GuildModel;
