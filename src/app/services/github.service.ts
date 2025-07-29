import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GITHUB_TOKEN } from "../api-keys";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root", //configuração que permite com que uma instância GitHubService seja criada
})
export class GithubService {
  //URL da API
  private readonly API_URL = "https://api.github.com/search/repositories";

  private readonly token = GITHUB_TOKEN;

  //HttpClient passado ao Construtor
  constructor(private http: HttpClient) {}

  //Um método para realizar busca da página
  public searchRepositories(query: string, page: number = 1): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    //"page" como parâmetro da requisição
    const params = {
      q: query,
      page: page.toString(),
      per_page: "30", //quantidade de itens por página
    };

    //fazer a chamada e retornar o Observable
    return this.http.get(this.API_URL, { headers, params });
  }
}
