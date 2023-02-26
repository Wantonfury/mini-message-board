const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const MessageSchema = new Schema({
  text: { type: String, required: true },
  user: { type: String, required: true },
  date: { type: Date, required: true }
});

MessageSchema.virtual("date_formatted").get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
});

module.exports = mongoose.model("Message", MessageSchema);