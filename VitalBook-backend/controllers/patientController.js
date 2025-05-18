const {
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
  } = require("../dao/patientDao");
  
  async function getPatients(req, res) {
    res.json(getAllPatients());
  }
  
  async function getPatient(req, res) {
    const patient = getPatientById(req.params.id);
    if (!patient) return res.status(404).send("Not found");
    res.json(patient);
  }
  
  async function create(req, res) {
    const data = req.body;
    if (req.file) data.photoFilename = req.file.filename;
    const newPatient = createPatient(data);
    res.status(201).json(newPatient);
  }
  
  async function editPatient(req, res) {
    const data = req.body;
    if (req.file) data.photoFilename = req.file.filename;
    const updated = updatePatient(req.params.id, data);
    if (!updated) return res.status(404).send("Not found");
    res.json(updated);
  }
  
  async function removePatient(req, res) {
    deletePatient(req.params.id);
    res.status(204).send();
  }
  
  module.exports = {
    getPatients,
    getPatient,
    create,
    editPatient,
    removePatient
  };