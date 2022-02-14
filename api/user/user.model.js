const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config');

const CreditCardSchema = new mongoose.Schema(
  {
    expMonth: {
      type: String,
      required: true,
      trim: true,
    },
    expYear: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mask: {
      type: String,
      required: true,
      trim: true,
    },
    tokenId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const BillingSchema = new mongoose.Schema(
  {
    creditCards: [CreditCardSchema],
    customerId: String,
  },
  { _id: false },
);

const UserSchema = new mongoose.Schema(
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
    userName: {
      type: String,
      uppercase: true,
      required: true,
    },
    firstName: {
      type: String,
      uppercase: true,
    },
    lastName: {
      type: String,
      uppercase: true,
    },
    identificacion: {
      type: Number,
      minlength: 8,
      trim: true,
    },
    role: {
      type: String,
      default: 'usuario',
      enum: config.userRoles,
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
      default: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    billing: BillingSchema,
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  const user = this;
  try {
    if (!user.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;

  return await bcrypt.compare(candidatePassword, user.password);
};

// Virtuals
UserSchema.virtual('profile').get(function () {
  const { firstName, lastName, email, role, identificacion, id, photo, billing, userName } = this;
  return { billing, userName, fullname: `${firstName} ${lastName}`, role, email, identificacion, photo: { id: photo.public_id, url: photo.url }, id };
});

module.exports = mongoose.model('User', UserSchema);
