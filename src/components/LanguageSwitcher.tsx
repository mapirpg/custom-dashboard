import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLanguage, useDialog } from '@hooks/useRedux';

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const { languages, currentLanguage } = useLanguage();
  const { openDialog } = useDialog();
  const selectedLanguage = languages.find(lang => lang.code === currentLanguage);

  const handleChangeLanguage = (lang: string) => {
    openDialog({
      content: '',
      title: t('common.changeLanguageConfirmation'),
      actionType: 'CHANGE_LANGUAGE',
      actionPayload: { lang },
    });
  };

  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">{t('common.language')}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentLanguage}
        label={t('common.language')}
        onChange={e => handleChangeLanguage(e.target.value)}
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
