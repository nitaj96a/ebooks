import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Language } from './language.model';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

constructor(private http: HttpClient) { }

  public getLanguages() {
    return this.http.get<Language[]>('api/languages');
  }
}
