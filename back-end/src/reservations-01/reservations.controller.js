const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function listDate(req, res) {
  try {
    const date = req.query.date; 
    const data = await service.listDate(date);
    res.json({ data });
  } catch (error) {
    console.error("Error in reservations controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}


module.exports = {
  create: asyncErrorBoundary(create),
  listDate: asyncErrorBoundary(listDate),
 
};

