import mongoose from "mongoose";

const client = mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true },
});

const ClientSchema = mongoose.model("client", client);

export default ClientSchema;