const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// MIDDLEWARE - Zorg dat Express de public map kan vinden
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server draait op http://localhost:${PORT}`);
    console.log(`📁 Map: ${__dirname}`);
});