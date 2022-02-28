import ProjectSchema from "../schemas/ProjectSchema.js";

export const getUserProjects = async (req, res) => {

    const { email } = req.params;

    try {

        const projects = await ProjectSchema.find({ "email": email });
        res.status(200).json({ projects });

    } catch(e) { console.log(e); }

}

export const createProject = async (req, res) => {

    const { email, project, client } = req.body;

    try {

        const projectExists = await ProjectSchema.findOne({ project });
        if(projectExists)
            return res.sendStatus(409);

        const newProject = await ProjectSchema.create({ email, project, client });
        res.status(200).json({ newProject });

    } catch(e) { console.log(e); }

}

export const updateProject = async (req, res) => {

    const { id } = req.params;
    const { email } = req.body;

    try {

        await ProjectSchema.findOneAndUpdate({ _id: id }, { email });
        res.sendStatus(200);

    } catch(e) { console.log(e); }

}

export const getProjects = async (req, res) => {

    try {

        const allProjects = await ProjectSchema.find();
        res.status(200).json({ allProjects });

    } catch(e) { console.log(e); }

}