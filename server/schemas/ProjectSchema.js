import mongoose from "mongoose";

const project = mongoose.Schema({
    email: {type: String, required: true},
    project: {type: String, required: true},
    client: {type: String, required: true}
});

const ProjectSchema = mongoose.model("project", project);

export default ProjectSchema;