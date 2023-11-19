import mongoose, { Schema, model } from 'mongoose';
import { Ibid } from '../types';

const BidSchema = new Schema<Ibid>(
	{
		guildId: { required: true, type: String },
		cost: { type: Number, default: 123 },
		username: { type: String },
		message: { required: true, type: String },
		id: { type: String },
		color: { type: String, default: '#436519' },
		isDonation: { type: Boolean, default: false },
		timestamp: { type: String },
		// guild: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'Guild',
		// 	required: true,
		// },
	},
	{
		timestamps: true,
	},
);

const BidModel = model('Bid', BidSchema);

export default BidModel;
