// ============================================
// BMI APP - HOOFDFUNCTIES
// ============================================

console.log('✅ app.js is geladen!');

// ============================================
// 1. BMI BEREKENING
// ============================================
function berekenBMI() {
    console.log('🔘 berekenBMI() is aangeroepen!');
    
    const lengthInput = document.getElementById('length');
    const weightInput = document.getElementById('weight');
    
    if (!lengthInput || !weightInput) {
        console.error('❌ Input velden niet gevonden!');
        return;
    }
    
    const length = parseFloat(lengthInput.value);
    const weight = parseFloat(weightInput.value);
    
    console.log('📏 Lengte:', length);
    console.log('⚖️ Gewicht:', weight);
    
    if (isNaN(length) || isNaN(weight) || length <= 0 || weight <= 0) {
        alert('⚠️ Voer geldige getallen in!');
        return;
    }
    
    const bmi = parseFloat((weight / ((length/100) * (length/100))).toFixed(1));
    console.log('📊 BMI:', bmi);
    
    // Categorie bepalen
    let category, categoryText, advice;
    if (bmi < 18.5) {
        category = 'underweight';
        categoryText = '⬇️ Ondergewicht';
        advice = '🍽️ Eet vaker en kies voor voedzame maaltijden';
    } else if (bmi < 25) {
        category = 'healthy';
        categoryText = '💚 Gezond gewicht';
        advice = '💪 Goed bezig! Blijf zo doorgaan';
    } else if (bmi < 30) {
        category = 'overweight';
        categoryText = '⚠️ Overgewicht';
        advice = '🏃 Beweeg meer en let op je voeding';
    } else {
        category = 'obese';
        categoryText = '🔴 Ernstig overgewicht';
        advice = '🏥 Raadpleeg een arts voor persoonlijk advies';
    }
    
    // Meting opslaan in localStorage
    const measurement = {
        id: Date.now(),
        datum: new Date().toLocaleString(),
        lengte: length,
        gewicht: weight,
        bmi: bmi,
        categorie: category
    };
    
    let measurements = JSON.parse(localStorage.getItem('bmi_measurements') || '[]');
    measurements.push(measurement);
    measurements.sort((a, b) => new Date(b.datum) - new Date(a.datum));
    localStorage.setItem('bmi_measurements', JSON.stringify(measurements));
    console.log('💾 Opgeslagen in localStorage!');
    
    // Resultaat tonen
    const resultCard = document.getElementById('resultCard');
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');
    const adviceText = document.getElementById('adviceText');
    
    if (resultCard) resultCard.style.display = 'block';
    if (bmiValue) bmiValue.textContent = bmi;
    
    const categoryColors = {
        underweight: '#2196F3',
        healthy: '#4CAF50',
        overweight: '#FF9800',
        obese: '#f44336'
    };
    
    if (bmiCategory) {
        bmiCategory.innerHTML = `
            <span style="background: ${categoryColors[category]}; color: white; padding: 8px 20px; border-radius: 20px; font-weight: bold;">
                ${categoryText}
            </span>
        `;
    }
    
    if (adviceText) {
        adviceText.textContent = advice;
    }
    
    // Reset
    lengthInput.value = '';
    weightInput.value = '';
    
    // Lijst bijwerken
    renderMeasurements();
}

// ============================================
// 2. METINGEN LIJST
// ============================================
function renderMeasurements() {
    const measurements = JSON.parse(localStorage.getItem('bmi_measurements') || '[]');
    const list = document.getElementById('measurementsList');
    
    if (!list) return;
    
    if (measurements.length === 0) {
        list.innerHTML = `<p style="color: #999;">Nog geen BMI metingen</p>`;
        return;
    }
    
    const categoryColors = {
        underweight: '#2196F3',
        healthy: '#4CAF50',
        overweight: '#FF9800',
        obese: '#f44336'
    };
    
    const categoryTexts = {
        underweight: '⬇️ Ondergewicht',
        healthy: '💚 Gezond gewicht',
        overweight: '⚠️ Overgewicht',
        obese: '🔴 Ernstig overgewicht'
    };
    
    list.innerHTML = measurements.map(m => `
        <div class="measurement-item">
            <div>
                <strong>${m.datum}</strong><br>
                Lengte: ${m.lengte} cm | Gewicht: ${m.gewicht} kg
            </div>
            <div>
                <span style="background: ${categoryColors[m.categorie]}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 14px;">
                    BMI: ${m.bmi} (${categoryTexts[m.categorie] || m.categorie})
                </span>
                <button onclick="deleteMeasurement(${m.id})" class="delete-btn">🗑️</button>
            </div>
        </div>
    `).join('');
}

// ============================================
// 3. METING VERWIJDEREN
// ============================================
function deleteMeasurement(id) {
    let measurements = JSON.parse(localStorage.getItem('bmi_measurements') || '[]');
    measurements = measurements.filter(m => m.id !== id);
    localStorage.setItem('bmi_measurements', JSON.stringify(measurements));
    renderMeasurements();
}

// ============================================
// 4. ALLES WISSEN
// ============================================
function clearAll() {
    if (confirm('Weet je zeker dat je alle metingen wilt verwijderen?')) {
        localStorage.removeItem('bmi_measurements');
        renderMeasurements();
        document.getElementById('resultCard').style.display = 'none';
    }
}

// ============================================
// 5. EXPORTEREN
// ============================================
function exportData() {
    const measurements = JSON.parse(localStorage.getItem('bmi_measurements') || '[]');
    
    if (measurements.length === 0) {
        alert('Geen data om te exporteren!');
        return;
    }
    
    const jsonData = JSON.stringify(measurements, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bmi_metingen_${new Date().toLocaleDateString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// ============================================
// 6. IMPORTEREN
// ============================================
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (!Array.isArray(data)) {
                alert('Ongeldig JSON bestand!');
                return;
            }
            
            const bestaandeData = JSON.parse(localStorage.getItem('bmi_measurements') || '[]');
            if (bestaandeData.length > 0) {
                if (!confirm('Er bestaan al metingen. Wil je deze vervangen? Klik op Annuleren om toe te voegen.')) {
                    const alleData = bestaandeData.concat(data);
                    localStorage.setItem('bmi_measurements', JSON.stringify(alleData));
                } else {
                    localStorage.setItem('bmi_measurements', JSON.stringify(data));
                }
            } else {
                localStorage.setItem('bmi_measurements', JSON.stringify(data));
            }
            
            renderMeasurements();
            alert(`✅ ${data.length} metingen geïmporteerd!`);
        } catch (error) {
            alert('❌ Fout bij importeren: Ongeldig JSON bestand!');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// ============================================
// 7. START
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM geladen!');
    renderMeasurements();
    console.log('✅ App gestart!');
});

// Maak functies wereldwijd beschikbaar
window.berekenBMI = berekenBMI;
window.deleteMeasurement = deleteMeasurement;
window.clearAll = clearAll;
window.exportData = exportData;
window.importData = importData;

console.log('✅ app.js is klaar!');