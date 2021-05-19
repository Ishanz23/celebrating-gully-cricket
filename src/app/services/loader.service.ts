import { BehaviorSubject, Observable, of, Subject } from 'rxjs'
import { finalize, switchMap, tap } from 'rxjs/operators'

import { Injectable } from '@angular/core'

@Injectable()
export class LoaderService {
  private loaderSubject = new BehaviorSubject<boolean>(false)
  loader$ = this.loaderSubject.asObservable()

  constructor() {}

  showLoader() {
    this.loaderSubject.next(true)
  }

  hideLoader() {
    this.loaderSubject.next(false)
  }

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.showLoader()),
      switchMap((val) => obs$),
      finalize(() => this.hideLoader())
    )
  }
}
