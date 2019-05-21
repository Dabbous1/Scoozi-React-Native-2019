import i18n from 'i18n-js';

i18n.locale = 'en';
i18n.fallbacks = true;

i18n.translations = {
    ar: require('./values.ar'),
    en: require('./values.en')
};

export default i18n;
