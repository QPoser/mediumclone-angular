import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule, routerReducer} from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {AppComponent} from 'src/app/app.component';
import {ArticleModule} from 'src/app/article/article.module';
import {AuthModule} from 'src/app/auth/auth.module';
import {CreateArticleModule} from 'src/app/createArticle/createArticle.module';
import {EditArticleModule} from 'src/app/editArticle/editArticle.module';
import {GlobalFeedModule} from 'src/app/globalFeed/globalFeed.module';
import {SettingsModule} from 'src/app/settings/settings.module';
import {TopBarModule} from 'src/app/shared/modules/topBar/topBar.module';
import {AuthInterceptor} from 'src/app/shared/services/authInterceptor.service';
import {PersistenceService} from 'src/app/shared/services/persistence.service';
import {TagFeedModule} from 'src/app/tagFeed/tagFeed.module';
import {UserProfileModule} from 'src/app/userProfile/userProfile.module';
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
    CreateArticleModule,
    EditArticleModule,
    ArticleModule,
    SettingsModule,
    UserProfileModule,
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
