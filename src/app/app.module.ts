import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule, routerReducer} from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {AppComponent} from 'src/app/app.component';
import {AuthModule} from 'src/app/auth/auth.module';
import {GlobalFeedModule} from 'src/app/globalFeed/globalFeed.module';
import {TopBarModule} from 'src/app/shared/modules/topBar/topBar.module';
import {AuthInterceptor} from 'src/app/shared/services/authInterceptor.service';
import {PersistenceService} from 'src/app/shared/services/persistence.service';
import {TagFeedModule} from 'src/app/tagFeed/tagFeed.module';
import {YourFeedModule} from 'src/app/yourFeed/yourFeed.module';
import {environment} from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    StoreModule.forRoot({router: routerReducer}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot(),
    TopBarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
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
