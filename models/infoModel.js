const mongoose = require("mongoose");

const infoSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter your UserName"],
    },
    email: {
      type: String,
      required: [true, "Please Enter your Email"],
    },
    occupation: {
      type: String,
      required: [true, "Please Enter your Occupation"],
    },
    tagline: {
      type: String,
      required: [true, "Please Enter your Tagline"],
    },

    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Info", infoSchema);
