/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import enus from '../i18n/locales/en_US/translation.json';
import ptBr from '../i18n/locales/pt_BR/translation.json';

export const translationKeysVerify = () => {
  const languages: { [key: string]: Record<string, unknown> } = {
    'en-us': enus,
    'pt-br': ptBr,
  };

  const getAllNestedKeys = (obj: Record<string, unknown>, prefix = ''): string[] => {
    return Object.keys(obj).reduce<string[]>((result, key) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        return result.concat(getAllNestedKeys(obj[key] as Record<string, unknown>, fullKey));
      } else {
        return result.concat(fullKey);
      }
    }, []);
  };

  // Função para verificar se uma chave aninhada existe em um objeto
  const hasNestedKey = (obj: Record<string, any>, path: string): boolean => {
    const parts = path.split('.');
    let current = obj;

    for (const part of parts) {
      if (current[part] === undefined) {
        return false;
      }

      current = current[part];
    }

    return true;
  };

  const verifyKeys = (source: string, target: string) => {
    const sourceObj = languages[source];
    const targetObj = languages[target];
    const sourceNestedKeys = getAllNestedKeys(sourceObj);
    let isOk = true;

    sourceNestedKeys.forEach(key => {
      if (!hasNestedKey(targetObj, key)) {
        isOk = false;
        console.warn(`Translation: Key "${key}" missing in ${target}`);
      }
    });

    return isOk;
  };

  const languageCodes = Object.keys(languages);
  const verifications: boolean[] = [];

  for (let i = 0; i < languageCodes.length; i += 1) {
    for (let j = 0; j < languageCodes.length; j += 1) {
      if (i !== j) {
        verifications.push(verifyKeys(languageCodes[i], languageCodes[j]));
      }
    }
  }

  if (verifications.every(ok => ok)) {
    console.warn('Translation: All keys OK');
  } else {
    console.warn('Translation: Missing keys detected. Check the logs above.');
  }
};
