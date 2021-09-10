const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  cname: {
    type: String,
    required: [true, 'Name of co-ordinator is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  desc: {
    type: String,
    required: [true, 'Description is required'],
  },
  start: {
    type: Date,
    required: [true, 'Start Date is required'],
  },
  end: {
    type: Date,
    required: [true, 'End Date is required'],
  },
  img: {
    type: String,
    required: [true, 'Image is required'],
  },
  url: {
    type: String,
    required: [true, 'URL is required'],
  },
  org: {
    type: String,
    required: [true, 'Organisation is required'],
  },
  backgroundColor: {
    type: String,
    required: [true, 'Label Color is required'],
  },
  borderColor: {
    type: String,
    required: [true, 'Border Color is required'],
  },
  textColor: {
    type: String,
    required: [true, 'Text Color is required'],
  },
});

const Events = mongoose.model('event', EventSchema);
module.exports = Events;
