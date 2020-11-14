import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/ApiResponse.interface';
import { Machine } from '../interfaces/machine.interface';

@Injectable({
  providedIn: 'root'
})
export class MachineHttpService {
  private readonly baseUrl = 'https://machinestream.herokuapp.com/api/v1';

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<Machine[]> {
    return this.httpClient
      .get(`${this.baseUrl}/machines`)
      .pipe(
        map((res: ApiResponse<Machine[]>) => res.data)
      );
  }

  getDetail(id: string): Observable<Machine> {
    return this.httpClient
      .get(`${this.baseUrl}/machines/${id}`)
      .pipe(
        map((res: ApiResponse<Machine>) => res.data)
      );
  }
}
