import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  //URL da API
  private readonly API_URL = "https://api.github.com/search/repositories";

  //HttpClient passado ao Construtor
  constructor(private http: HttpClient) { }

  //Um método para realizar busca
  public searchRepositories(query: string): Observable<any> {
    const params = {
      q: query
    };

    //fazer a chamada e retornar o Observable
    return this.http.get(this.API_URL, { params});
  }
}
