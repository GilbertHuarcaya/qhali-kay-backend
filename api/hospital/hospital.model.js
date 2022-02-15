const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const HospitalSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    hospitalName: {
      type: String,
      uppercase: true,
      required: true,
    },
    photo: {
      public_id: String,
      format: String,
      created_at: Date,
      url: String,
      secure_url: String,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);
HospitalSchema.pre('save', async function (next) {
  const hospital = this;
  try {
    if (!hospital.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(hospital.password, salt);

    hospital.password = hash;
  } catch (error) {
    next(error);
  }
});

HospitalSchema.methods.comparePassword = async function (candidatePassword) {
  const hospital = this;

  return await bcrypt.compare(candidatePassword, hospital.password);
};

// Virtuals
HospitalSchema.virtual('profile').get(function () {
  const { email, id, photo, hospitalName } = this;
  return { hospitalName, email, photo: { id: photo.public_id, url: photo.url }, id };
});

module.exports = mongoose.model('Hospital', HospitalSchema);
