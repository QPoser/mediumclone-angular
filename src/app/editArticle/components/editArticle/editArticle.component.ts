import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store, select} from '@ngrx/store';
import {Observable, filter, map} from 'rxjs';
import {getArticleAction} from 'src/app/editArticle/store/actions/getArticle.action';
import {updateArticleAction} from 'src/app/editArticle/store/actions/updateArticle.action';
import {articleSelector, isSubmittingSelector, validationErrorsSelector} from 'src/app/editArticle/store/selectors';
import {isLoadingSelector} from 'src/app/editArticle/store/selectors';
import {ArticleInterface} from 'src/app/shared/types/article.interface';
import {ArticleInputInterface} from 'src/app/shared/types/articleInput.interface';
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface';

@Component({
  selector: 'mc-edit-article',
  templateUrl: './editArticle.component.html',
})
export class EditArticleComponent implements OnInit {
  isSubmitting$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;
  initialValues$: Observable<ArticleInputInterface>;
  slug: string;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(updateArticleAction({slug: this.slug, articleInput: articleInput}));
  }

  private initializeValues(): void {
    this.slug = this.route.snapshot['paramMap'].get('slug');
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean),
      map((article: ArticleInterface) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        };
      })
    );
  }

  private fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}));
  }
}
