import mongoose from 'mongoose';

const { Schema } = mongoose;

const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  }
});

// Virtual for genre's URL
genreSchema.virtual('url').get(function() {
  return `/catalog/genre/${this._id}`;
});

// Export the model
const Genre = mongoose.model('Genre', genreSchema);
export default Genre;
