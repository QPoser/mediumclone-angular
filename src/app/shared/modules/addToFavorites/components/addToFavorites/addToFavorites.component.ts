import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {addToFavoritesAction} from 'src/app/shared/modules/addToFavorites/store/actions/addToFavorites.action';

@Component({
  selector: 'mc-add-to-favorites',
  templateUrl: './addToFavorites.component.html',
})
export class AddToFavoritesComponent {
  @Input('isFavorited') isFavoritedProps: boolean;
  @Input('favoritesCount') favoritesCountProps: number;
  @Input('articleSlug') articleSlugProps: string;

  favoritesCount: number;
  isFavorited: boolean;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.favoritesCount = this.favoritesCountProps;
    this.isFavorited = this.isFavoritedProps;
  }

  handleLike(): void {
    this.store.dispatch(addToFavoritesAction({isFavorited: this.isFavorited, slug: this.articleSlugProps}));
    if (this.isFavorited) {
      this.favoritesCount--;
    } else {
      this.favoritesCount++;
    }

    this.isFavorited = !this.isFavorited;
  }
}
