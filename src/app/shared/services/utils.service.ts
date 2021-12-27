import {Injectable} from '@angular/core';

@Injectable()
export class UtilsService {
  range(start: number, end: number): number[] {
    if (start > end) {
      return [];
    }

    if (start === end) {
      return [start];
    }

    return [...Array(end).keys()].map((el) => el + 1);
  }
}
