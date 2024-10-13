const translations = {
  en: {
    title: "Auto Marketplace",
    subtitle: "Find the car of your dreams",
  },
  fr: {
    title: "Auto Marketplace",
    subtitle: "Trouvez la voiture de vos rêves",
  },
};

export function getTranslation(lang: 'en' | 'fr', key: string) {
  return translations[lang][key as keyof typeof translations['en']] || key;
}