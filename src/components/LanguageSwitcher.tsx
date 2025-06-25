import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLanguage, useDialog } from '@hooks/useRedux';

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const { languages, currentLanguage } = useLanguage();
  const { openDialog } = useDialog();

  // Procura o idioma atual na lista de idiomas disponíveis
  // ou usa o idioma padrão ou o primeiro da lista como fallback
  const selectedLanguage =
    languages.find(lang => lang.code === currentLanguage) ||
    languages.find(lang => lang.default) ||
    languages[0];

  const handleChangeLanguage = (lang: string) => {
    openDialog({
      content: t('changeLanguageConfirmation'),
      title: t('changeLanguage'),
      actionType: 'CHANGE_LANGUAGE',
      actionPayload: { lang },
    });
  };

  const safeCurrentLanguage = languages.some(lang => lang.code === currentLanguage)
    ? currentLanguage
    : languages.find(lang => lang.default)?.code || languages[0]?.code || '';

  return (
    <FormControl>
      <Select
        labelId="language-select-label"
        id="language-select"
        value={safeCurrentLanguage}
        onChange={e => handleChangeLanguage(e.target.value)}
        variant="outlined"
        sx={{
          height: '50px',
          paddingX: '8px',
          border: 'transparent',
          backgroundColor: 'transparent',
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '& .MuiSelect-select': {
            padding: '8px',
          },
          '& .MuiSelect-select:focus': {
            backgroundColor: 'transparent',
          },
        }}
        renderValue={() => (
          <div>
            {selectedLanguage && (
              <img
                src={selectedLanguage.flag}
                alt={`${selectedLanguage.name} flag`}
                style={{
                  height: '20px',
                  width: 'auto',
                  alignSelf: 'center',
                  marginRight: '4px',
                  verticalAlign: 'middle',
                }}
              />
            )}
          </div>
        )}
      >
        {languages.map(lang => (
          <MenuItem key={lang.code} value={lang.code}>
            <img
              src={lang.flag}
              alt={`${lang.name} flag`}
              style={{
                marginRight: '8px',
              }}
            />
            <Typography>{t(`languages.${lang.code}`)}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
