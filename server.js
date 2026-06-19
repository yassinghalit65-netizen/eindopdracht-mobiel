const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// STATIC BESTANDEN (CSS, JS, afbeeldingen)
app.use(express.static('public'));

// EJS INSTELLEN
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// HOME PAGE
app.get('/', (req, res) => {
    res.render('index');
});

// START SERVER
app.listen(PORT, () => {
    console.log(`✅ Server: http://localhost:${PORT}`);
});