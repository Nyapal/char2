const mongoose = require('mongoose');

const Charity = mongoose.model('Charity', {
  org: String
});

module.exports = Charity
