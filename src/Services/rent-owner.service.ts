import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  constructor(private http: HttpClient) {}

  getMonthRents(month: number, year: number) {
    return this.http.get<any[]>(`https://your-api.com/api/MonthRents?month=${month}&year=${year}`);
  }
}
