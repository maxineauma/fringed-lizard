import TimerSchema from "../schemas/TimerSchema.js";

export const getUserTimers = async (req, res) => {

    const { email, date } = req.params;

    try {

        const timers = await TimerSchema.find({ "email": email, "date": date });
        res.status(200).json({ timers });

    } catch(e) { res.sendStatus(500); console.log(e); }

}

export const createTimer = async (req, res) => {

    const { email, project, date, time } = req.body;

    const newTimer = await TimerSchema.create({ email, project, date, timeInSeconds: time });
    res.status(200).json({ newTimer });

    try {

    } catch(e) { res.sendStatus(500); console.log(e); }

}

export const deleteTimer = async (req, res) => {

    try {

    } catch(e) { res.sendStatus(500); console.log(e); }

}