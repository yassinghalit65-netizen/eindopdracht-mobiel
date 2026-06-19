// ============================================
// 1. TALEN (NL/EN)
// ============================================
const translations = {
    nl: {
        title: '📊 BMI Calculator',
        length: '📏 Lengte (cm)',
        weight: '⚖️ Gewicht (kg)',
        calculate: '🧮 Bereken BMI',
        result: '📊 Jouw BMI',
        history: '📋 Geschiedenis',
        clear: '🗑️ Alles wissen',
        export: '💾 Exporteer JSON',
        import: '📂 Importeer JSON',
        underweight: '⬇️ Ondergewicht',
        healthy: '💚 Gezond gewicht',
        overweight: '⚠️ Overgewicht',
        obese: '🔴 Ernstig overgewicht',
        advice_underweight: '🍽️ Eet vaker en kies voor voedzame maaltijden',
        advice_healthy: '💪 Goed bezig! Blijf zo doorgaan',
        advice_overweight: '🏃 Beweeg meer en let op je voeding',
        advice_obese: '🏥 Raadpleeg een arts voor persoonlijk advies',
        no_data: 'Nog geen BMI metingen',
        enter_valid: '⚠️ Voer geldige getallen in!',
        confirm_clear: 'Weet je zeker dat je alle metingen wilt verwijderen?'
    },
    en: {
        title: '📊 BMI Calculator',
        length: '📏 Height (cm)',
        weight: '⚖️ Weight (kg)',
        calculate: '🧮 Calculate BMI',
        result: '📊 Your BMI',
        history: '📋 History',
        clear: '🗑️ Clear all',
        export: '💾 Export JSON',
        import: '📂 Import JSON',
        underweight: '⬇️ Underweight',
        healthy: '💚 Healthy weight',
        overweight: '⚠️ Overweight',
        obese: '🔴 Obese',
        advice_underweight: '🍽️ Eat more often and choose nutritious meals',
        advice_healthy: '💪 Great job! Keep it up',
        advice_overweight: '🏃 Exercise more and watch your diet',
        advice_obese: '🏥 Consult a doctor for personal advice',
        no_data: 'No BMI measurements yet',
        enter_valid: '⚠️ Enter valid numbers!',
        confirm_clear: 'Are you sure you want to clear all measurements?'
    }
};

let currentLang = localStorage.getItem('bmi_language') || 'nl';

// Vertaal functie
function t(key) {
    return translations[currentLang][key] || key;
}

// Taal wisselen
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('bmi_language', lang);
    
    // Update knoppen
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.includes(lang.toUpperCase()));
    });
    
    // Update alle teksten
    document.getElementById('title').textContent = t('title');
    document.getElementById('labelLength').textContent = t('length');
    document.getElementById('labelWeight').textContent = t('weight');
    document.getElementById('saveBtn').textContent = t('calculate');
    document.getElementById('resultTitle').textContent = t('result');
    document.getElementById('historyTitle').textContent = t('history');
    document.querySelector('.clear-btn').textContent = t('clear');
    document.querySelector('.export-btn').textContent = t('export');
    document.querySelector('.import-btn').textContent = t('import');
    
    // Update lijst
    renderMeasurements();
}

// ============================================
// 2. BMI BEREKENING
// ============================================
function berekenBMI() {
    const length = parseFloat(document.getElementById('length').value);
    const weight = parseFloat(document.getElementById('weight').value);
    
    // Check of de waarden geldig zijn
    if (isNaN(length) || isNaN(weight) || length <= 0 || weight <= 0) {
        alert(t('enter_valid'));
        return;
    }
    
    // BMI berekenen
    const lengthM = length / 100;
    const bmi = parseFloat((weight / (lengthM * lengthM)).toFixed(1));
    
    // Categorie bepalen
    let category, adviceKey;
    if (bmi < 18.5) {
        category = 'underweight';
        adviceKey = 'advice_underweight';
    } else if (bmi < 25) {
        category = 'healthy';
        adviceKey = 'advice_healthy';
    } else if (bmi < 30) {
        category = 'overweight';
        adviceKey = 'advice_overweight';
    } else {
        category = 'obese';
        adviceKey = 'advice_obese';
    }
    
    // Meting opslaan
    const measurement = {
        id: Date.now(),
        datum: new Date().toLocaleString(),
        lengte: length,
        gewicht: weight,
        bmi: bmi,
        categorie: category
    };
    
    // Opslaan in localStorage
    saveMeasurement(measurement);
    
    // Resultaat tonen
    document.getElementById('resultCard').style.display = 'block';
    document.getElementById('bmiValue').textContent = bmi;
    
    // Categorie met kleur
    const categoryColors = {
        underweight: '#2196F3',
        healthy: '#4CAF50',
        overweight: '#FF9800',
        obese: '#f44336'
    };
    document.getElementById('bmiCategory').innerHTML = `
        <span style="background: ${categoryColors[category]}; color: white; padding: 8px 20px; border-radius: 20px; font-weight: bold;">
            ${t(category)}
        </span>
    `;
    document.getElementById('adviceText').textContent = t(adviceKey);
    
    // Form resetten
    document.getElementById('length').value = '';
    document.getElementById('weight').value = '';
    
    // Lijst bijwerken
    renderMeasurements();
}

// ============================================
// 3. OPSLAAN IN LOCALSTORAGE
// ============================================
function saveMeasurement(measurement) {
    // Haal bestaande metingen op
    let measurements = JSON.parse(localStorage.getItem('bmi_measurements') || '[]');
    
    // Voeg nieuwe meting toe
    measurements.push(measurement);
    
    // Sorteer op datum (nieuwste eerst)
    measurements.sort((a, b) => new Date(b.datum) - new Date(a.datum));
    
    // Bewaar in localStorage
    localStorage.setItem('bmi_measurements', JSON.stringify(measurements));
}

function getMeasurements() {
    return JSON.parse(localStorage.getItem('bmi_measurements') || '[]');
}

function clearAllMeasurements() {
    localStorage.removeItem('bmi_measurements');
}

// ============================================
// 4. METINGEN LIJST TONEN
// ============================================
function renderMeasurements() {
    const measurements = getMeasurements();
    const list = document.getElementById('measurementsList');
    
    if (measurements.length === 0) {
        list.innerHTML = `<p style="color: #999;">${t('no_data')}</p>`;
        return;
    }
    
    const categoryColors = {
        underweight: '#2196F3',
        healthy: '#4CAF50',
        overweight: '#FF9800',
        obese: '#f44336'
    };
    
    list.innerHTML = measurements.map(m => `
        <div class="measurement-item">
            <div>
                <strong>${m.datum}</strong><br>
                Lengte: ${m.lengte} cm | Gewicht: ${m.gewicht} kg
            </div>
            <div>
                <span style="background: ${categoryColors[m.categorie]}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 14px;">
                    BMI: ${m.bmi} (${t(m.categorie)})
                </span>
                <button onclick="deleteMeasurement(${m.id})" style="background: #f44336; color: white; border: none; padding: 4px 10px; border-radius: 8px; cursor: pointer; margin-left: 8px;">
                    🗑️
                </button>
            </div>
        </div>
    `).join('');
}

// ============================================
// 5. METING VERWIJDEREN
// ============================================
function deleteMeasurement(id) {
    let measurements = getMeasurements();
    measurements = measurements.filter(m => m.id !== id);
    localStorage.setItem('bmi_measurements', JSON.stringify(measurements));
    renderMeasurements();
}

// ============================================
// 6. ALLES WISSEN
// ============================================
function clearAll() {
    if (confirm(t('confirm_clear'))) {
        clearAllMeasurements();
        renderMeasurements();
        document.getElementById('resultCard').style.display = 'none';
    }
}

// ============================================
// 7. EXPORTEREN NAAR JSON BESTAND
// ============================================
function exportData() {
    const measurements = getMeasurements();
    
    if (measurements.length === 0) {
        alert('Geen data om te exporteren!');
        return;
    }
    
    // Maak JSON string
    const jsonData = JSON.stringify(measurements, null, 2);
    
    // Maak download link
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bmi_metingen_${new Date().toLocaleDateString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// ============================================
// 8. IMPORTEREN VAN JSON BESTAND
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
            
            // Vraag of ze de bestaande data willen vervangen of toevoegen
            const bestaandeData = getMeasurements();
            if (bestaandeData.length > 0) {
                if (!confirm('Er bestaan al metingen. Wil je deze vervangen? Klik op Annuleren om toe te voegen.')) {
                    // Toevoegen
                    const alleData = bestaandeData.concat(data);
                    localStorage.setItem('bmi_measurements', JSON.stringify(alleData));
                } else {
                    // Vervangen
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
    
    // Reset file input
    event.target.value = '';
}

// ============================================
// 9. START DE APP
// ============================================
// Zet de juiste taal bij laden
document.addEventListener('DOMContentLoaded', function() {
    setLanguage(currentLang);
    renderMeasurements();
    console.log('✅ App gestart!');
});

// Maak functies wereldwijd beschikbaar
window.setLanguage = setLanguage;
window.berekenBMI = berekenBMI;
window.deleteMeasurement = deleteMeasurement;
window.clearAll = clearAll;
window.exportData = exportData;
window.importData = importData;
window.t = t;