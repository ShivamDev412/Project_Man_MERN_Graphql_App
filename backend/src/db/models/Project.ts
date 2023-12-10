import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: "Client",
  },
});
const Project = mongoose.model("Project", ProjectSchema);
export default Project;
