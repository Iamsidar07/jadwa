import mongoose from "mongoose";

interface User {
  name: string;
  role: string;
  email: string;
  password: string;
  profileImageUrl: string;
}

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
    default: "https://avatar.iran.liara.run/public/1",
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
