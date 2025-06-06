import { useLanguageContext } from '@/contexts/LanguageContext';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const { languages, currentLanguage, changeLanguage } = useLanguageContext();

  const selectedLanguage = languages.find(lang => lang.code === currentLanguage);

  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">{t('common.language')}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentLanguage}
        label={t('common.language')}
        onChange={e => changeLanguage(e.target.value as string)}
        variant="standard"
        sx={{
          minWidth: '100px',
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
