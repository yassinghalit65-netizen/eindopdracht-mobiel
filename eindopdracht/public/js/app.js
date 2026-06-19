// ============================================
// BMI BEREKENING
// ============================================
function calculateBMI(lengthCm, weightKg) {
    if (lengthCm <= 0 || weightKg <= 0) return null;
    const lengthM = lengthCm / 100;
    return parseFloat((weightKg / (lengthM * lengthM)).toFixed(1));
}

// ============================================
// BMI CATEGORIE
// ============================================
function getBMICategory(bmi) {
    if (bmi < 18.5) return { key: 'underweight', class: 'bmi-underweight', emoji: '⬇️' };
    if (bmi < 25) return { key: 'healthy', class: 'bmi-healthy', emoji: '💚' };
    if (bmi < 30) return { key: 'overweight', class: 'bmi-overweight', emoji: '⚠️' };
    return { key: 'obese', class: 'bmi-obese', emoji: '🔴' };
}

// ============================================
// WACHT TOT DE PAGINA GELADEN IS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ App.js is geladen!');
    
    // ---- ELEMENTEN OPHALEN ----
    const saveBtn = document.getElementById('saveBtn');
    const lengthInput = document.getElementById('length');
    const weightInput = document.getElementById('weight');
    const resultCard = document.getElementById('resultCard');
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');
    const adviceText = document.getElementById('adviceText');
    const measurementsList = document.getElementById('measurementsList');
    const clearAllBtn = document.getElementById('clearAllBtn');
    
    // ---- CHECK OF ALLES BESTAAT ----
    if (!saveBtn) {
        console.error('❌ Save knop niet gevonden!');
        return;
    }
    console.log('✅ Alle elementen gevonden!');
    
    // ---- BEREKEN KNOP ----
    saveBtn.addEventListener('click', async function() {
        console.log('🔘 Knop ingedrukt!');
        
        const length = parseFloat(lengthInput.value);
        const weight = parseFloat(weightInput.value);
        
        console.log('📏 Lengte:', length);
        console.log('⚖️ Gewicht:', weight);
        
        if (isNaN(length) || isNaN(weight) || length <= 0 || weight <= 0) {
            alert('Voer geldige getallen in!');
            return;
        }
        
        const bmi = calculateBMI(length, weight);
        const category = getBMICategory(bmi);
        
        console.log('📊 BMI:', bmi);
        console.log('🏷️ Categorie:', category);
        
        // ---- METING OPSLAAN ----
        const measurement = {
            id: Date.now(),
            datum: new Date().toISOString(),
            lengte: length,
            gewicht: weight,
            bmi: bmi,
            categorie: category.key,
            bmiClass: category.class
        };
        
        try {
            await addMeasurement(measurement);
            console.log('✅ Meting opgeslagen!');
        } catch (error) {
            console.error('❌ Fout bij opslaan:', error);
        }
        
        // ---- RESULTAAT TONEN ----
        resultCard.style.display = 'block';
        bmiValue.textContent = bmi;
        bmiCategory.innerHTML = `<span style="padding: 8px 16px; border-radius: 20px; background: #4CAF50; color: white;">${category.emoji} ${category.key}</span>`;
        adviceText.textContent = `Advies: ${getAdviceForCategory(category.key)}`;
        
        // ---- FORM RESET ----
        lengthInput.value = '';
        weightInput.value = '';
        
        // ---- LIJST UPDATEN ----
        await updateList();
    });
    
    // ---- CLEAR ALL ----
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', async function() {
            if (confirm('Weet je zeker dat je alle metingen wilt verwijderen?')) {
                await clearAllMeasurements();
                await updateList();
                resultCard.style.display = 'none';
            }
        });
    }
    
    // ---- LIJST INITIALISEREN ----
    async function updateList() {
        try {
            const measurements = await getAllMeasurements();
            console.log('📋 Metingen gevonden:', measurements.length);
            
            if (measurements.length === 0) {
                measurementsList.innerHTML = '<p>Nog geen BMI metingen</p>';
                return;
            }
            
            measurementsList.innerHTML = measurements.map(m => `
                <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; border-radius: 8px;">
                    <strong>${new Date(m.datum).toLocaleString()}</strong><br>
                    BMI: ${m.bmi} | Lengte: ${m.lengte} cm | Gewicht: ${m.gewicht} kg
                    <button onclick="deleteItem(${m.id})" style="background: #f44336; color: white; border: none; padding: 5px 10px; border-radius: 4px; margin-left: 10px; cursor: pointer;">
                        🗑️ Verwijder
                    </button>
                </div>
            `).join('');
        } catch (error) {
            console.error('❌ Fout bij updaten lijst:', error);
        }
    }
    
    // ---- DELETE ITEM ----
    window.deleteItem = async function(id) {
        await deleteMeasurement(id);
        await updateList();
    };
    
    // ---- START ----
    updateList();
    console.log('✅ App is klaar!');
});

// ---- ADVIES FUNCTIE ----
function getAdviceForCategory(category) {
    const advice = {
        underweight: 'Eet vaker en kies voor voedzame maaltijden',
        healthy: 'Goed bezig! Blijf zo doorgaan',
        overweight: 'Beweeg meer en let op je voeding',
        obese: 'Raadpleeg een arts voor persoonlijk advies'
    };
    return advice[category] || 'Geen advies beschikbaar';
}

// ---- TAAL FUNCTIES (voor de knoppen) ----
function setLanguage(lang) {
    console.log('🌐 Taal gewijzigd naar:', lang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.includes(lang.toUpperCase()));
    });
    
    const labels = {
        nl: { length: 'Lengte (cm)', weight: 'Gewicht (kg)' },
        en: { length: 'Height (cm)', weight: 'Weight (kg)' }
    };
    
    document.getElementById('labelLength').textContent = labels[lang].length;
    document.getElementById('labelWeight').textContent = labels[lang].weight;
    document.getElementById('saveBtn').textContent = lang === 'nl' ? 'Bereken BMI' : 'Calculate BMI';
}