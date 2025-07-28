import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    _HttpClient=inject(HttpClient)

    getAnswer(question: string): Observable<any> {
        return this._HttpClient.post<any>('http://localhost:5267/api/Chat/Chat', {userQuestion: question});
    }
}
