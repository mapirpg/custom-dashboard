import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLanguage, useDialog } from '@hooks/useRedux';

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const { languages, currentLanguage } = useLanguage();
  const { openDialog } = useDialog();
  const selectedLanguage = languages.find(lang => lang.code === currentLanguage);

  const handleChangeLanguage = (lang: string) => {
    openDialog({
      content: t('alerts.changeLanguageConfirmation'),
      title: t('alerts.changeLanguage'),
      actionType: 'CHANGE_LANGUAGE',
      actionPayload: { lang },
    });
  };

  return (
    <FormControl>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentLanguage}
        onChange={e => handleChangeLanguage(e.target.value)}
        variant="outlined"
        sx={{
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
