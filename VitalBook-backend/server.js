//importování toho s čím pracuji
const express = require('express'); 
const cors = require('cors'); //komunikace FE & BE
const path = require('path');
const patientRoutes = require('./routes/patientRoutes'); //importuje endpointy týkající se pacientů z exter.souboru

const app = express();
const PORT = 3000;

app.use(cors());//aby FE mohl posílat požadavky na BE
app.use(express.json());//umožňuje parsovat json v těle požadavků
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/patients', patientRoutes);

app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});

