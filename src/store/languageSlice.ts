import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import i18n from '@i18n/i18n';
import PT_BR_FLAG from '@assets/flags/BR.svg';
import EN_US_FLAG from '@assets/flags/US.svg';
import { normalizeLanguageCode } from '@/utils/normalizeLanguageCode';

interface Language {
  code: string;
  name: string;
  default?: boolean;
  flag: string;
}

interface LanguageState {
  currentLanguage: string;
  languages: Language[];
}

export const initializeLanguage = createAsyncThunk('language/initialize', async () => {
  const savedLanguage = localStorage.getItem('i18nextLng');

  if (savedLanguage) {
    const normalizedCode = normalizeLanguageCode(savedLanguage) || 'pt_BR';
    i18n.changeLanguage(normalizedCode);
    return normalizedCode;
  }

  return normalizeLanguageCode(i18n.language) || 'en_US';
});

const initialState: LanguageState = {
  currentLanguage: i18n.language || 'en_US',
  languages: [
    { code: 'en_US', name: 'English', default: false, flag: EN_US_FLAG },
    { code: 'pt_BR', name: 'Português', default: true, flag: PT_BR_FLAG },
  ],
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      const lang = normalizeLanguageCode(action.payload);
      state.currentLanguage = lang;
      i18n.changeLanguage(lang);
      localStorage.setItem('i18nextLng', lang);
    },
    updateLanguageName: (state, action: PayloadAction<{ code: string; name: string }>) => {
      const { code, name } = action.payload;
      const langIndex = state.languages.findIndex(lang => lang.code === code);

      if (langIndex !== -1) {
        state.languages[langIndex].name = name;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(initializeLanguage.fulfilled, (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
    });
  },
});

export const { changeLanguage, updateLanguageName } = languageSlice.actions;

export default languageSlice.reducer;
