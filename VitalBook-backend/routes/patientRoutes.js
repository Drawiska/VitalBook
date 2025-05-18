const express = require("express");
const router = express.Router();
const controller = require("../controllers/patientController");
const upload = require("../config/multer");

// Získání všech pacientů
router.get("/", controller.getPatients);

// Získání jednoho pacienta podle ID (nepovinné, ale praktické)
router.get("/:id", controller.getPatient);

// Přidání nového pacienta (s fotkou, pokud je přiložena)
router.post("/", upload.single("fotka"), controller.create);

// Úprava pacienta podle ID (může obsahovat novou fotku)
router.put("/:id", upload.single("fotka"), controller.editPatient);

// Smazání pacienta podle ID
router.delete("/:id", controller.removePatient);

module.exports = router;
