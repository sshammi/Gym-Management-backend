import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';
import { IUserData } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<IUserData>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'trainer', 'trainee'],
      default: 'trainee',
    },
    contactNo: {
      type: String,
    },
    address: {
      type: String,
    },
    profileImg: {
      type: String,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
// Instance method to compare passwords
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<IUserData>('User', userSchema);
