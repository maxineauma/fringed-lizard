import UserSchema from "../schemas/UserSchema.js";
import bcrypt from "bcryptjs";

const isStrongPass = (pass) => {
  // Must be at least 8 characters
  if (pass.length < 8) return false;

  // With at least one number and one special character from the following list: ( ) ! @ $ & ^ ? /
  const pass_regex = /(?=.*[()!@$&^?\/])(?=.*[0-9])/g;
  if (pass.match(pass_regex) == null) return false;

  return true;
};

const isValidEmail = (email) => {
  // Mega large regular expression
  const email_regex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (email.match(email_regex) == null) return false;

  return true;
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, password_confirm } = req.body;

  try {
    const userExists = await UserSchema.findOne({ email });
    if (userExists) return res.sendStatus(409); // HTTP 409 -- Conflict

    if (!isStrongPass(password)) return res.sendStatus(406); // HTTP 406 -- Not Acceptable

    if (!isValidEmail(email)) return res.sendStatus(406);

    if (password !== password_confirm) return res.sendStatus(400); // HTTP 400 -- Bad Request

    const hashed_pass = await bcrypt.hash(password, 10);

    const result = await UserSchema.create({
      firstName,
      lastName,
      email,
      password: hashed_pass,
      role: "Consultant",
    });

    res.status(200).json({ _id: result._id }); // HTTP 200 -- OK
  } catch (e) {
    console.log(e);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await UserSchema.findOne({ email });
    if (!userExists) return res.sendStatus(409); // HTTP 409 -- Conflict

    const passwordCorrect = await bcrypt.compare(password, userExists.password);
    if (!passwordCorrect) return res.sendStatus(400); // HTTP 400 -- Bad Request

    res.status(200).json({ _id: userExists._id }); // HTTP 200 -- OK
  } catch (e) {
    console.log(e);
  }
};

export const getUsers = async (req, res) => {
  try {
    const allUsers = await UserSchema.find({ role: "Consultant" });
    res.status(200).json({ allUsers });
  } catch (e) {
    console.log(e);
  }
};

export const getUserNameById = async (req, res) => {
  const { id } = req.params;

  try {
    const userExists = await UserSchema.findById(id).hint("_id_");
    res
      .status(200)
      .json({ name: userExists.firstName + " " + userExists.lastName });
  } catch (e) {
    console.log(e);
  }
};

export const getUserEmailById = async (req, res) => {
  const { id } = req.params;

  try {
    const userExists = await UserSchema.findById(id).hint("_id_");
    res.status(200).json({ email: userExists.email });
  } catch (e) {
    console.log(e);
  }
};

export const getUserRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const userExists = await UserSchema.findById(id).hint("_id_");
    res.status(200).json({ role: userExists.role });
  } catch (e) {
    console.log(e);
  }
};