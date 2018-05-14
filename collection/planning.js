import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

Planning = new Mongo.Collection( 'planning' );

Planning.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Planning.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let EventsSchema = new SimpleSchema({
  'title': {
    type: String,
    label: 'The title of this event.'
  },
  'start': {
    type: String,
    label: 'When this event will start.'
  },
  'end': {
    type: String,
    label: 'When this event will end.'
  },
  'type': {
    type: String,
    label: 'What type of event is this?',
    allowedValues: [ 'Birthday', 'Corporate', 'Wedding', 'Miscellaneous' ]
  },
  'guests': {
    type: Number,
    label: 'The number of guests expected at this event.'
  }
});

Planning.attachSchema( EventsSchema );
