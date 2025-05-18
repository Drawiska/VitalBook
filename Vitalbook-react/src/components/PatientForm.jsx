import React, { useState, useEffect } from 'react';

function PatientForm({ onSubmit, editingPatient }) {
  const [formData, setFormData] = useState({
    jmeno: '',
    prijmeni: '',
    medikace: '',
    diagnostika: '',
    priority: 'normal',
    datumNarozeni: '',
    fotka: null
  });

  useEffect(() => {
    if (editingPatient) {
      setFormData({
        jmeno: editingPatient.jmeno,
        prijmeni: editingPatient.prijmeni,
        medikace: editingPatient.medikace,
        diagnostika: editingPatient.diagnostika,
        priority: editingPatient.priority,
        datumNarozeni: editingPatient.datumNarozeni,
        fotka: null
      });
    }
  }, [editingPatient]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    for (let key in formData) {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    }

    // odesilame data pres prop do App.jsx
    onSubmit(form, editingPatient?.id || null);

    setFormData({
      jmeno: '',
      prijmeni: '',
      medikace: '',
      diagnostika: '',
      priority: 'normal',
      datumNarozeni: '',
      fotka: null
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{editingPatient ? 'Upravit pacienta' : 'Add patient'}</h2>
      <input type="text" name="jmeno" value={formData.jmeno} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="prijmeni" value={formData.prijmeni} onChange={handleChange} placeholder="Surname" required />
      <input type="text" name="medikace" value={formData.medikace} onChange={handleChange} placeholder="Medication" />
      <input type="text" name="diagnostika" value={formData.diagnostika} onChange={handleChange} placeholder="Diagnose" />
      <input type="date" name="datumNarozeni" value={formData.datumNarozeni} onChange={handleChange} required />
      <select name="priority" value={formData.priority} onChange={handleChange}>
        <option value="normal">Normal</option>
        <option value="high">High</option>
        <option value="low">Low</option>
      </select>
      <input type="file" name="fotka" accept="image/*" onChange={handleChange} />
      <button type="submit">{editingPatient ? 'Uložit změny' : 'Add profile'}</button>
    </form>
  );
}

export default PatientForm;
