import {Platform, NativeModules} from 'react-native';
import I18n from 'i18n-js';
import en from './en-US'; // importa o objeto de traduções para o idioma inglês
import pt from './pt-BR'; // importa o objeto de traduções para o idioma português
import es from './es-ES'; // importa o objeto de traduções para o idioma espanhol

// Função que irá nos auxiliar a normalizar as traduções que serão recebidas pela função getLanguageByDevice
// Isso é necessário pois no android e no iOS o retorno do mesmo idioma pode ser diferente
// Exemplo: no iOS podemos receber pt_US e no android pt_BR para o idioma português Brasil.
const normalizeTranslate = {
  //--- INGLÊS ---//
  en: 'en_US',
  en_US: 'en_US',
  // VARIANTS
  en_GB: 'en_US', // GRÃ-BRETANHA (UNITED KINGDOM)
  en_IN: 'en_US', // INDIA

  //--- PORTUGUES ---//
  pt: 'pt_BR',
  pt_BR: 'pt_BR',
  // VARIANTS
  pt_PT: 'pt_BR',
  pt_US: 'pt_BR', // (PT-BR NO IOS)

  //--- ESPANHOL ---//
  es: 'es_ES',
  es_ES: 'es_ES', // SPAIN
  es_US: 'es_ES', // AMERICA
  // VARIANTS
  es_AR: 'es_ES',
  es_BO: 'es_ES',
  es_CL: 'es_ES',
  es_CO: 'es_ES',
  es_CR: 'es_ES',
  es_DO: 'es_ES',
  es_EC: 'es_ES',
  es_GT: 'es_ES',
  es_HN: 'es_ES',
  es_MX: 'es_ES',
  es_NI: 'es_ES',
  es_PA: 'es_ES',
  es_PE: 'es_ES',
  es_PR: 'es_ES',
  es_PY: 'es_ES',
  es_SV: 'es_ES',
  es_UY: 'es_ES',
  es_VE: 'es_ES',
};

// Função responsável por adquirir o idioma utilizado no device
const getLanguageByDevice = () => {
  return Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale // Adquire o idioma no device iOS
    : NativeModules.I18nManager.localeIdentifier; // Adquire o idioma no device Android
};

// Aqui setamos os idiomas que o I18N irá dar suporte
I18n.translations = {
  en_US: en,
  pt_BR: pt,
  es_ES: es,
};

// Função responsável por verificar se o idioma atual do divice está sendo suportado, caso não ele irá setar como 'pt_BR'
const setLanguageToI18n = () => {
  const language = getLanguageByDevice();
  const translateNormalize = normalizeTranslate[language];
  const iHaveThisLanguage = I18n.translations.hasOwnProperty(
    translateNormalize,
  );
  iHaveThisLanguage
    ? (I18n.locale = translateNormalize)
    : (I18n.defaultLocale = 'pt_BR') && (I18n.locale = 'pt_BR');
};

setLanguageToI18n();

export const translate = (key) => I18n.t(key);
