import React from 'react';

function PatientCard({ patient, onEdit, onDelete }) {
  // Fotka – použije buď fotku z backendu, nebo výchozí ikonu
  const imageUrl =
    patient.fotka && patient.fotka.trim() !== ''
      ? `http://localhost:3000/uploads/${patient.fotka}` // upravená cesta!
      : 'https://cdn-icons-png.flaticon.com/512/847/847969.png';

  // Vypočítá věk z data narození
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  return (
    <div className="patient-card">
      <img src={imageUrl} alt="Fotka pacienta" className="patient-photo" />

      <div className="patient-info">
        <h2>{patient.jmeno} {patient.prijmeni}</h2>
        <p><strong>Age:</strong> {calculateAge(patient.datumNarozeni)} y.o.</p>
        <p><strong>Diagnose:</strong> {patient.diagnostika || 'neuvedeno'}</p>
        <p><strong>Medications:</strong> {patient.medikace || 'neuvedeno'}</p>
        <p><strong>Priority:</strong> {patient.priority}</p>
      </div>

      <div className="card-buttons">
        <button className="edit-button" onClick={() => onEdit(patient)}>✏️ Edit</button>
        <button className="delete-button" onClick={() => onDelete(patient.id)}>Delete 🗑️</button>
      </div>
    </div>
  );
}

export default PatientCard;
