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

  //Um método para realizar busca da página
  public searchRepositories(query: string, page: number = 1): Observable<any> {

    //"page" como parâmetro da requisição
    const params = {
      q: query,
      page: page.toString(),
      per_page: "30" //quantidade de itens por página 
    };

    //fazer a chamada e retornar o Observable
    return this.http.get(this.API_URL, { params });
  }
}
