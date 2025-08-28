import mongoose from "mongoose";

const Schema = mongoose.Schema;
const topicSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Topic", topicSchema);
