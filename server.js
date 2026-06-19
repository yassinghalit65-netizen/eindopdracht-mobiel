const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Zorg dat Express de public map kan vinden
app.use(express.static(path.join(__dirname, 'public')));

// EJS instellen
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Homepage
app.get('/', (req, res) => {
    res.render('index');
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server: http://localhost:${PORT}`);
});