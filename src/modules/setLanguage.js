import { dataKeyRu, dataKeyEn } from './dataKey';
import renderKeysToDom from './createKey';

const setLanguage = () => {
  const lang = localStorage.getItem('lang') ? JSON.parse(localStorage.getItem('lang')) : 'en';

  const defaultLanguage = () => {
    if (lang === 'ru') {
      renderKeysToDom(dataKeyRu);
    } else {
      renderKeysToDom(dataKeyEn);
    }
  };

  defaultLanguage();
};
export default setLanguage;
