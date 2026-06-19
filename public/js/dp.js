// ============================================
// DB FUNCTIES (Voor localStorage)
// ============================================

console.log('✅ db.js is geladen!');

// Gegevens ophalen
function getMeasurements() {
    return JSON.parse(localStorage.getItem('bmi_measurements') || '[]');
}

// Gegevens opslaan
function saveMeasurements(measurements) {
    localStorage.setItem('bmi_measurements', JSON.stringify(measurements));
}

// Meting toevoegen
function addMeasurement(measurement) {
    let measurements = getMeasurements();
    measurements.push(measurement);
    measurements.sort((a, b) => new Date(b.datum) - new Date(a.datum));
    saveMeasurements(measurements);
}

// Meting verwijderen
function removeMeasurement(id) {
    let measurements = getMeasurements();
    measurements = measurements.filter(m => m.id !== id);
    saveMeasurements(measurements);
}

// Alle metingen wissen
function clearMeasurements() {
    localStorage.removeItem('bmi_measurements');
}

// Metingen tellen
function countMeasurements() {
    return getMeasurements().length;
}

// Gemiddelde BMI berekenen
function getAverageBMI() {
    const measurements = getMeasurements();
    if (measurements.length === 0) return 0;
    const total = measurements.reduce((sum, m) => sum + m.bmi, 0);
    return parseFloat((total / measurements.length).toFixed(1));
}

console.log('✅ db.js is klaar!');