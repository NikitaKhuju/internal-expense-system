import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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

    phone: {
      type: String,
      default: "",
    },

    department: {
      type: String,
      enum: ["Engineering", "Marketing", "Operations", "HR", "Finance"],
      default: "Engineering",
    },

    role: {
      type: String,
      enum: ["admin", "staff"],
      default: "staff",
    },
  },
  {
    timestamps: true, // gives createdAt & updatedAt
  }
);

export default mongoose.model("User", userSchema);
