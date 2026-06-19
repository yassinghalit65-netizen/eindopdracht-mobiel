// ============================================
// BMI APP - MINIMALE WERKENDE VERSIE
// ============================================

console.log('✅ app.js is geladen!');

// BMI berekenen functie
function berekenBMI() {
    console.log('🔘 Knop ingedrukt!');
    
    // Haal de waarden op
    var lengthInput = document.getElementById('length');
    var weightInput = document.getElementById('weight');
    
    // Check of de input velden bestaan
    if (!lengthInput || !weightInput) {
        console.error('❌ Input velden niet gevonden!');
        alert('Fout: Input velden niet gevonden!');
        return;
    }
    
    var length = parseFloat(lengthInput.value);
    var weight = parseFloat(weightInput.value);
    
    console.log('📏 Lengte:', length);
    console.log('⚖️ Gewicht:', weight);
    
    // Check of de waarden geldig zijn
    if (isNaN(length) || isNaN(weight) || length <= 0 || weight <= 0) {
        alert('⚠️ Voer geldige getallen in!');
        return;
    }
    
    // BMI berekenen
    var bmi = weight / ((length / 100) * (length / 100));
    bmi = bmi.toFixed(1);
    
    console.log('📊 BMI:', bmi);
    
    // Resultaat tonen
    var resultCard = document.getElementById('resultCard');
    var bmiValue = document.getElementById('bmiValue');
    
    if (resultCard) {
        resultCard.style.display = 'block';
    }
    
    if (bmiValue) {
        bmiValue.textContent = bmi;
    }
    
    // Input velden leegmaken
    lengthInput.value = '';
    weightInput.value = '';
    
    // Melding
    alert('✅ BMI berekend: ' + bmi);
}

// Maak de functie beschikbaar voor onclick in HTML
window.berekenBMI = berekenBMI;

console.log('✅ berekenBMI is beschikbaar!');
console.log('📋 Type van berekenBMI:', typeof berekenBMI);