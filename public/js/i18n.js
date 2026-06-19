// ============================================
// I18N - TAAL FUNCTIES
// ============================================

console.log('✅ i18n.js is geladen!');

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

function t(key) {
    return translations[currentLang][key] || key;
}

function setLanguage(lang) {
    if (lang !== 'nl' && lang !== 'en') return;
    
    currentLang = lang;
    localStorage.setItem('bmi_language', lang);
    
    // Update knoppen
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.includes(lang.toUpperCase()));
    });
    
    // Update teksten
    const elements = {
        'title': 'title',
        'labelLength': 'length',
        'labelWeight': 'weight',
        'saveBtn': 'calculate',
        'resultTitle': 'result',
        'historyTitle': 'history'
    };
    
    Object.keys(elements).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = t(elements[id]);
    });
    
    // Update knoppen met classes
    const clearBtn = document.querySelector('.clear-btn');
    const exportBtn = document.querySelector('.export-btn');
    const importBtn = document.querySelector('.import-btn');
    
    if (clearBtn) clearBtn.textContent = t('clear');
    if (exportBtn) exportBtn.textContent = t('export');
    if (importBtn) importBtn.textContent = t('import');
    
    // Update lijst
    if (typeof renderMeasurements === 'function') {
        renderMeasurements();
    }
}

console.log('✅ i18n.js is klaar!');