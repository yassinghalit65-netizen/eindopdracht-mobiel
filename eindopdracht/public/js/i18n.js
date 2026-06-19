const translations = {
    nl: {
        title: '📊 BMI Gezondheid Tracker',
        length: 'Lengte (cm)',
        weight: 'Gewicht (kg)',
        calculate: 'Bereken BMI',
        result: 'Jouw BMI',
        advice: 'Advies',
        history: 'Geschiedenis',
        add: 'Nieuwe meting',
        delete: 'Verwijder',
        clear: 'Alles wissen',
        filter: 'Filter op',
        day: 'Vandaag',
        week: 'Deze week',
        month: 'Deze maand',
        all: 'Alle metingen',
        underweight: 'Ondergewicht',
        healthy: 'Gezond gewicht',
        overweight: 'Overgewicht',
        obese: 'Ernstig overgewicht',
        advice_underweight: 'Eet vaker en kies voor voedzame maaltijden',
        advice_healthy: 'Goed bezig! Blijf zo doorgaan',
        advice_overweight: 'Beweeg meer en let op je voeding',
        advice_obese: 'Raadpleeg een arts voor advies',
        noData: 'Nog geen BMI metingen',
        avgBmi: 'Gemiddelde BMI',
        totalMeasurements: 'Totaal metingen'
    },
    en: {
        title: '📊 BMI Health Tracker',
        length: 'Height (cm)',
        weight: 'Weight (kg)',
        calculate: 'Calculate BMI',
        result: 'Your BMI',
        advice: 'Advice',
        history: 'History',
        add: 'New measurement',
        delete: 'Delete',
        clear: 'Clear all',
        filter: 'Filter by',
        day: 'Today',
        week: 'This week',
        month: 'This month',
        all: 'All measurements',
        underweight: 'Underweight',
        healthy: 'Healthy weight',
        overweight: 'Overweight',
        obese: 'Obese',
        advice_underweight: 'Eat more often and choose nutritious meals',
        advice_healthy: 'Great job! Keep it up',
        advice_overweight: 'Exercise more and watch your diet',
        advice_obese: 'Consult a doctor for advice',
        noData: 'No BMI measurements yet',
        avgBmi: 'Average BMI',
        totalMeasurements: 'Total measurements'
    }
};

let currentLang = 'nl';

function t(key) {
    return translations[currentLang][key] || key;
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('bmi_language', lang);
    updateAllTexts();
}

function updateAllTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key);
    });
}

// Laad opgeslagen taal
const savedLang = localStorage.getItem('bmi_language');
if (savedLang) setLanguage(savedLang);