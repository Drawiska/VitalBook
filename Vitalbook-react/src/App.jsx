// importik reactu a komponent
import React, { useEffect, useState } from 'react';
import PatientCard from './components/PatientCard';
import PatientForm from './components/PatientForm';
import PriorityFilter from './components/PriorityFilter';
import SearchBar from './components/SearchBar';

import './styles/style.css';

//main komponenta apky
function App() {
  const [patients, setPatients] = useState([]); //uklada seznam pacientu
  const [editingPatient, setEditingPatient] = useState(null); //ukladani upraveneho pacienta
  const [priorityFilter, setPriorityFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); //filtrovani

  //fnce pro načteni pacientu z backendu
  const fetchPatients = async () => {
    try {
      const res = await fetch('http://localhost:3000/patients');
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error('Chyba při načítání pacientů:', err);
    }
  };

  //spusti pri nacteni komponenty
  useEffect(() => {
    fetchPatients();
  }, []);

  //filtrovani => vysledek ulozi do filterpatients, dal vykresluje
  const filteredPatients = patients.filter((p) => {
    const matchesPriority = priorityFilter ? p.priority === priorityFilter : true;
    const matchesSearch = `${p.jmeno} ${p.prijmeni}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch;
  });
  
  //fnce pro smazani pacienta
  //odesle DELETE pozadavek na backend => smaže pacienta
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/patients/${id}`, { method: 'DELETE' });
      setPatients(patients.filter(p => p.id !== id));
    } catch (err) {
      console.error('Chyba při mazání pacienta:', err);
    }
  };

  //ulozi pacienta ktereho chceme upravit
  const handleEdit = (patient) => {
    setEditingPatient(patient);
  };

  //odeslaniá formulare
  //PUT - uprava
  //POST - novy pacient
  const handleFormSubmit = async (form, id = null) => {
    const url = id
      ? `http://localhost:3000/patients/${id}`
      : 'http://localhost:3000/patients';
    const method = id ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        body: form
      });

      // znovunačtení seznamu pacientu
      await fetchPatients();
      setEditingPatient(null);
    } catch (err) {
      console.error('Chyba při odesílání formuláře:', err);
    }
  };

  //vykresleni komponenty
  return (
    <div>
      <header>
        <h1>Vital Book</h1>
        <div className="filter-controls">
          <SearchBar query={searchQuery} onChange={setSearchQuery} />
          <PriorityFilter selectedPriority={priorityFilter} onChange={setPriorityFilter} />
        </div>
      </header>

      <section id="add-patient-section">
        <PatientForm onSubmit={handleFormSubmit} editingPatient={editingPatient} />
      </section>
      
      <section id="cards-container" className="cards-container">
        {filteredPatients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </section>

    </div>
  );
}

export default App;
