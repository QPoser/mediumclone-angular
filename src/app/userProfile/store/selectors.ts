import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserProfileStateInterface} from 'src/app/userProfile/types/userProfileState.interface';

export const userProfileFeatureSelector =
  createFeatureSelector<UserProfileStateInterface>('userProfile');

export const isLoadingSelector = createSelector(
  userProfileFeatureSelector,
  (articleState: UserProfileStateInterface) => articleState.isLoading
);

export const errorSelector = createSelector(
  userProfileFeatureSelector,
  (articleState: UserProfileStateInterface) => articleState.error
);

export const userProfileSelector = createSelector(
  userProfileFeatureSelector,
  (articleState: UserProfileStateInterface) => articleState.data
);
