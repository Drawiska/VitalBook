const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/patients.json");

function readPatients() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

function writePatients(patients) {
  fs.writeFileSync(dataPath, JSON.stringify(patients, null, 2));
}

function getAllPatients() {
  return readPatients();
}

function getPatientById(id) {
  return readPatients().find(p => p.id === id);
}

function createPatient(data) {
  const patients = readPatients();
  const newPatient = { id: Date.now().toString(), ...data };
  patients.push(newPatient);
  writePatients(patients);
  return newPatient;
}

function updatePatient(id, data) {
  const patients = readPatients();
  const index = patients.findIndex(p => p.id === id);
  if (index === -1) return null;

  const oldPatient = patients[index];

  // Zachovat staré hodnoty, pokud nové nejsou vyplněny
  const updatedPatient = {
    ...oldPatient,
    ...Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined && v !== null && v !== "")
    )
  };

  patients[index] = updatedPatient;
  writePatients(patients);
  return updatedPatient;
}

function deletePatient(id) {
  const patients = readPatients();
  const updated = patients.filter(p => p.id !== id);
  writePatients(updated);
}

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient
};
