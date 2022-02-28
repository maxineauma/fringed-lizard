import ProjectSchema from "../schemas/ProjectSchema.js";

export const getUserProjects = async (req, res) => {

    const { email } = req.params;

    try {

        const projects = await ProjectSchema.find({ "email": email });
        res.status(200).json({ projects });

    } catch(e) { res.sendStatus(500); console.log(e); }

}

export const createProject = async (req, res) => {

    const { email, project, client } = req.body;

    try {

        const projectExists = await ProjectSchema.findOne({ project });
        if(projectExists)
            return res.sendStatus(409);

        const newProject = await ProjectSchema.create({ email, project, client });
        res.status(200).json({ newProject });

    } catch(e) { res.sendStatus(500); console.log(e); }

}

export const deleteProject = async (req, res) => {

    const { name } = req.params;

    try {

        const projectExists = await ProjectSchema.findOne({ name });
        if(!projectExists)
            return res.sendStatus(409);

        await projectExists.remove();
        res.sendStatus(200);

    } catch(e) { res.sendStatus(500); console.log(e); }

}