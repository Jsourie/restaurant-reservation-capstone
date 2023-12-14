const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");



async function list(req, res) {
  try {
    const date = req.query.date;
    const data = await service.list(date);
    res.json({ data });
  } catch (error) {
    console.error("Error in reservations controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


async function create(req, res) {
  try {
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
  } catch (error) {
    console.error("Error in reservations controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  create: asyncErrorBoundary(create),
  list: asyncErrorBoundary(list),
 
};

