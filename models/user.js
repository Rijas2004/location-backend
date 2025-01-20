const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    image: { type: String, required: true },
    places: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Place",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.path("email").validate(async function (value) {
  const emailCount = await mongoose.models.User.countDocuments({
    email: value,
  });
  return emailCount === 0;
}, "Email already exists");

module.exports = mongoose.model("User", userSchema);
