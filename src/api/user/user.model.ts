/* eslint-disable camelcase */
import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import config from '../../config'

export interface UserDocument extends Document {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  identificacion?: number;
  id?: string;
  password?: string;
  photo?: {
    public_id?: string;
    format?: string;
    created_at?: Date;
    url?: string;
    secure_url?: string;
  };
  userName?: string;
  profile?: any;
  isVerified?: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  comparePassword?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 5
    },
    userName: {
      type: String,
      required: true
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    identificacion: {
      type: Number,
      minlength: 8,
      trim: true
    },
    role: {
      type: String,
      default: 'usuario',
      enum: config.userRoles,
      required: true
    },
    photo: {
      public_id: String,
      format: String,
      created_at: Date,
      url: String,
      secure_url: String
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    passwordResetToken: String,
    passwordResetExpires: Date
  },
  {
    timestamps: true
  }
)

UserSchema.pre('save', async function (next) {
  const user = this
  try {
    if (!user.isModified('password')) {
      return next()
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)

    user.password = hash
  } catch (error: any) {
    next(error)
  }
})

UserSchema.methods.comparePassword = async function (candidatePassword: any) {
  const user = this

  return await bcrypt.compare(candidatePassword, user.password)
}

// Virtuals
// interface Profile { firstName: string, lastName: string, email: string, role: string, identificacion: number, id: string, photo: any, billing: any, userName: string }

UserSchema.virtual('profile').get(function (this: any) {
  const {
    firstName,
    lastName,
    email,
    role,
    identificacion,
    id,
    photo,
    userName
  } = this

  return {
    userName,
    firstName,
    lastName,
    fullname: `${firstName || ''} ${lastName || ''}`,
    role,
    email,
    identificacion,
    photo: { id: photo.public_id, url: photo.url },
    id
  }
})

const User = mongoose.model<UserDocument>('User', UserSchema)
export default User
