import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthStateInterface} from 'src/app/auth/types/authState.interface';
import {SettingsStateInterface} from 'src/app/settings/types/settingsState.interface';

export const settingsFeatureSelector = createFeatureSelector<SettingsStateInterface>('settings');

export const isSubmittingSelector = createSelector(
  settingsFeatureSelector,
  (settingsState: SettingsStateInterface) => settingsState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  settingsFeatureSelector,
  (settingsState: SettingsStateInterface) => settingsState.validationErrors
);
