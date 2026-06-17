const express    = require('express');
const cors       = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'DocApp Server Running' });
});

// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
