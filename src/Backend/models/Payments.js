const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  order_id: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  payment_method: {
    type: String,
    enum: ['credit_card', 'bank_transfer'],
    required: true
  },
  payment_status: {
    type: String,
    enum: ['paid', 'pending'],
    default: 'pending'
  },
  payment_date: {
    type: Date,
    default: Date.now
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
