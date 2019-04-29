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
  public getOne(id: number) {
    return this.http.get<Language>('/api/languages/' + id);
  }

  public create(language: Language) {
    return this.http.post<Language>('/api/languages', language);
  }

  public update(language: Language) {
    return this.http.put<Language>('/api/languages', language);
  }

  public delete(id: number) {
    return this.http.delete('/api/languages/' + id);
  }
}
