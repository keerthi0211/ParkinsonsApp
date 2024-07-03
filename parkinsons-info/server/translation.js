// server/translation.js
const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate();

const translateText = async (text, targetLanguage) => {
  const [translation] = await translate.translate(text, targetLanguage);
  return translation;
};

module.exports = translateText;
