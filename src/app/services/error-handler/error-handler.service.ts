import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {

  constructor() {
  }

  static handleError(e) {
    console.error(e);
  }
}
