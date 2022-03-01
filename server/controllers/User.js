import UserSchema from "../schemas/UserSchema.js";
import ProjectSchema from "../schemas/ProjectSchema.js";
import TimerSchema from "../schemas/TimerSchema.js";

import bcrypt from "bcryptjs";
import pdf from "html-pdf-node";

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

export const getUserReportById = async (req, res) => {
  const { id } = req.params;
  let options = { format: "A4" };

  try {
    const userExists = await UserSchema.findById(id).hint("_id_");
    const userProjects = await ProjectSchema.find({ email: userExists.email });
    const userEntries = await TimerSchema.find({ email: userExists.email });

    let projects =
      "<table border=1 cellpadding=20><tr><td><b>Project</b></td><td><b>Client</b></td></tr>";
    for (let x = 0; x < userProjects.length; x++) {
      projects +=
        "<tr>" +
        "<td>" +
        userProjects[x]["project"] +
        "</td>" +
        "<td>" +
        userProjects[x]["client"] +
        "</td>" +
        "</tr>";
    }
    projects += "</table>";

    let entries =
      "<table border=1 cellpadding=20><tr><td><b>Project</b></td><td><b>Time (Min.)</b></td></tr>";
    for (let x = 0; x < userEntries.length; x++) {
      entries +=
        "<tr>" +
        "<td>" +
        userEntries[x]["project"] +
        "</td>" +
        "<td>" +
        parseFloat(parseInt(userEntries[x]["timeInSeconds"]) / 60).toFixed(5) +
        "</td>" +
        "</tr>";
    }
    entries += "</table>";

    let file = {
      content:
        "<body style='padding:20px; font-family:Verdana;'>" +
        "<h1>User Report</h1>" +
        "<p>Report generated " +
        new Date() +
        "</p>" +
        "<hr/>" +
        "<h2>" +
        userExists.firstName +
        " " +
        userExists.lastName +
        "<br/>(" +
        userExists.email +
        ")</h2>" +
        "<hr/>" +
        "<h3>Assigned Projects</h3>" +
        projects +
        "<h3>Project Timer Entries</h3>" +
        entries +
        "</body>",
    };
    await pdf.generatePdf(file, options).then((pdfBuffer) => {
      res.set("Content-Type", "application/octet-stream");
      res.set("Content-Disposition", 'attachment;filename="report.pdf"');
      res.status(200).send(pdfBuffer);
    });
  } catch (e) {
    console.log(e);
  }
};