import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, map} from 'rxjs';
import {GetPopularTagsResponseInterface} from 'src/app/shared/modules/popularTags/types/getPopularTagsResponse.interface';
import {PopularTagType} from 'src/app/shared/types/popularTag.type';
import {environment} from 'src/environments/environment';

@Injectable()
export class PopularTagsService {
  constructor(private http: HttpClient) {}
  getPopularTags(): Observable<PopularTagType[]> {
    const url = environment.apiUrl + '/tags';

    return this.http.get(url).pipe(
      map((response: GetPopularTagsResponseInterface) => {
        return response.tags;
      })
    );
  }
}
