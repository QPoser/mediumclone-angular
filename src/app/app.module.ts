import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {AppComponent} from 'src/app/app.component';
import {AuthModule} from 'src/app/auth/auth.module';
import {TopBarModule} from 'src/app/shared/modules/topBar/topBar.module';
import {AuthInterceptor} from 'src/app/shared/services/authInterceptor.service';
import {PersistenceService} from 'src/app/shared/services/persistence.service';
import {environment} from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    TopBarModule,
  ],
  providers: [
    PersistenceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
