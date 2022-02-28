import UserSchema from "../schemas/UserSchema.js";
import bcrypt from "bcryptjs";

const isStrongPass = (pass) => {

    // Must be at least 8 characters
    if(pass.length < 8)
        return false;

    // With at least one number and one special character from the following list: ( ) ! @ $ & ^ ? /
    const pass_regex = /(?=.*[()!@$&^?\/])(?=.*[0-9])/g;
    if(pass.match(pass_regex) == null)
        return false;

    return true;

}

export const signup = async (req, res) => {

    const { firstName, lastName, email, password, password_confirm } = req.body;

    try {

        const userExists = await UserSchema.findOne({ email });
        if(userExists)
            return res.sendStatus(409); // HTTP 409 -- Conflict

        if(!isStrongPass(password))
            return res.sendStatus(406); // HTTP 406 -- Not Acceptable
        
        if(password !== password_confirm)
            return res.sendStatus(400); // HTTP 400 -- Bad Request

        const hashed_pass = await bcrypt.hash(password, 10);

        const result = await UserSchema.create({
            firstName, lastName,
            email,
            password: hashed_pass
        });

        res.status(200).json({ result }); // HTTP 200 -- OK

    } catch(e) { console.log(e); }

}

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const userExists = await UserSchema.findOne({ email });
        if(!userExists)
            return res.sendStatus(409); // HTTP 409 -- Conflict

        const passwordCorrect = await bcrypt.compare(password, userExists.password);
        if(!passwordCorrect)
            return res.sendStatus(400); // HTTP 400 -- Bad Request

        res.status(200).json({ result: userExists }); // HTTP 200 -- OK

    } catch(e) { console.log(e); }

}

export const getUsers = async (req, res) => {

    try {

        const allUsers = await UserSchema.find();
        res.status(200).json({ allUsers });

    } catch(e) { console.log(e); }

}