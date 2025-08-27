import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
    private baseUrl=environment.apiUrl;
    _HttpClient=inject(HttpClient)

    getAnswer(question: string): Observable<any> {
        const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

        return this._HttpClient.post<any>(`${this.baseUrl}/Chat/Chat`, JSON.stringify(question), { headers });
    }
}
