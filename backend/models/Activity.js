const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["job_posted", "new_application", "status_changed"],
      required: true,
    },

    metadata: {
      jobId: mongoose.Schema.Types.ObjectId,
      jobTitle: String,
      candidateId: mongoose.Schema.Types.ObjectId,
      candidateName: String,
      status: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

// Fast employer feed
ActivitySchema.index({ employer: 1, isDeleted: 1, createdAt: -1 });

// Optional: auto-delete after 90 days
// Remove if you want permanent history
ActivitySchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 90 }
);

module.exports = mongoose.model("Activity", ActivitySchema);
