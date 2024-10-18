import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
  make: {
    type: String,
    required: [true, 'Please provide a make for this car.'],
    maxlength: [60, 'Make cannot be more than 60 characters'],
  },
  model: {
    type: String,
    required: [true, 'Please provide a model for this car.'],
    maxlength: [60, 'Model cannot be more than 60 characters'],
  },
  year: {
    type: Number,
    required: [true, 'Please provide a year for this car.'],
    min: [1900, 'Year must be 1900 or later'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the future'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price for this car.'],
    min: [0, 'Price cannot be negative'],
  },
  mileage: {
    type: Number,
    required: [true, 'Please provide the mileage for this car.'],
    min: [0, 'Mileage cannot be negative'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this car.'],
    maxlength: [1000, 'Description cannot be more than 1000 characters'],
  },
});

export default mongoose.models.Car || mongoose.model('Car', CarSchema);