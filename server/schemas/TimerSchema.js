import mongoose from "mongoose";

const timer = mongoose.Schema({
  email: { type: String, required: true },
  project: { type: String, required: true },
  timeInSeconds: { type: Number, required: true },
});

const TimerSchema = mongoose.model("timer", timer);

export default TimerSchema;