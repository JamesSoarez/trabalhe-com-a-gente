import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { GithubService } from './services/github.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  searchTerm: string = ""; //-> guardar valor no imput

  //Serviço passado no Construtor
  constructor(private githubService: GithubService) {}

  treatSearch(): void{ //-> método chamado ao clicar no botão
    this.githubService.searchRepositories(this.searchTerm)
    .subscribe(response => {
      //Resposta no Console
      console.log("Dados recebidos da API GitHub: ");
      console.log(response);
    }); 
  }
}
