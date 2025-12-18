const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  status: { type: String, enum: ['pending','live','closed'], default: 'pending' },
  currentBid: { amount: { type: Number, default: 0 }, team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null } },
  bids: [{
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    amount: Number,
    at: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Auction', auctionSchema);
