const express = require('express');// llamando al servidor express
const path = require('path');

const app = express();//esto es una instancia para poder acceder al metodo
app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/atracciones.html'));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});