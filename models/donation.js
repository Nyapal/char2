const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Donation = mongoose.model('Donation', {
  date: String,
  amount: Number,
  notes: String,
  charityId: { type: Schema.Types.ObjectId, ref: 'Charity'}
});

module.exports = Donation
