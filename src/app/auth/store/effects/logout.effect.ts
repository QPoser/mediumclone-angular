import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs';
import {logoutAction} from 'src/app/auth/store/actions/sync.action';
import {PersistenceService} from 'src/app/shared/services/persistence.service';

@Injectable()
export class LogoutEffect {
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          this.persistenceService.set('accessToken', '');
          this.router.navigateByUrl('/');
        })
      ),
    {dispatch: false}
  );

  constructor(private actions$: Actions, private persistenceService: PersistenceService, private router: Router) {}
}
