import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingEvent$ = new Subject<boolean>();

  isLoading = this.loadingEvent$.asObservable();

  estaCargando(valor: boolean){
      this.loadingEvent$.next(valor);
  }

  constructor() { }
}
