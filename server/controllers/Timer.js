import TimerSchema from "../schemas/TimerSchema.js";

export const getUserTimers = async (req, res) => {

    const { email } = req.params;

    try {

        const timers = await TimerSchema.find({ "email": email });
        res.status(200).json({ timers });

    } catch(e) { console.log(e); }

}

export const createTimer = async (req, res) => {

    const { email, project, date, time } = req.body;

    const newTimer = await TimerSchema.create({ email, project, date, timeInSeconds: time });
    res.status(200).json({ newTimer });

    try {

    } catch(e) { console.log(e); }

}

export const deleteTimer = async (req, res) => {

    const { id } = req.params;

    try {

        await TimerSchema.deleteOne({ _id: id });
        res.sendStatus(200);

    } catch(e) { console.log(e); }

}