import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store, select} from '@ngrx/store';
import {Observable, Subscription, filter} from 'rxjs';
import {logoutAction} from 'src/app/auth/store/actions/sync.action';
import {updateCurrentUserAction} from 'src/app/auth/store/actions/updateCurrentUser.action';
import {currentUserSelector} from 'src/app/auth/store/selectors';
import {isSubmittingSelector, validationErrorsSelector} from 'src/app/settings/store/selectors';
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface';
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface';
import {CurrentUserInputInterface} from 'src/app/shared/types/currentUserInput.interface';

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit, OnDestroy {
  currentUser: CurrentUserInterface;
  currentUserSubscription: Subscription;
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  private initializeListeners(): void {
    this.currentUserSubscription = this.store
      .pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: '',
    });
  }

  private initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  submit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value,
    };
    this.store.dispatch(updateCurrentUserAction({currentUserInput}));
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }
}
