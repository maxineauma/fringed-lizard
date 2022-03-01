import ClientSchema from "../schemas/ClientSchema.js";

export const getClients = async (req, res) => {
  try {
    const allClients = await ClientSchema.find();
    res.status(200).json({ allClients });
  } catch (e) {
    console.log(e);
  }
};

export const createClient = async (req, res) => {
  const { companyName, email } = req.body;

  try {
    const clientExists = await ClientSchema.findOne({ email });
    if (clientExists) return res.sendStatus(409); // HTTP 409 -- Conflict

    const result = await ClientSchema.create({
      companyName,
      email,
    });

    res.status(200).json({ result }); // HTTP 200 -- OK
  } catch (e) {
    console.log(e);
  }
};