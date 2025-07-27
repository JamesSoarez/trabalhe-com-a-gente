import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GithubService } from './services/github.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  searchTerm: string = "";//-> guardar valor no imput
  repositories: any[] = [];//-> guardar lista contida em items

  //Paginação
  currentPage: number = 1;
  totalCount: number = 0;

  //Serviço passado no Construtor
  constructor(private githubService: GithubService) {}

  //Resetar página
  treatSearch(): void {
    this.currentPage = 1; //a cada nova busca, retorna para a primeira página
    this.executeSearch();
  }

  private executeSearch(): void {//-> método chamado ao clicar no botão
    this.githubService.searchRepositories(this.searchTerm, this.currentPage)
    .subscribe({
      
      //Chamada realizada
      next: (response) => { 
        this.repositories = response.items; //salva items da resposta 
        this.totalCount = response.total_count;//Guarda o total de resultados
      },

      //Erro ao realizar a chamada
      error: (err) => {
        console.error("ERRO AO FAZER A BUSCA:", err);
        this.repositories = []; //resultados de dados antigos são limpados
        this.currentPage = 0;
      }

    }); 
  }

  //Mudar de página
  nextPage(): void {
    this.currentPage++;
    this.executeSearch();
  }

  //página anterior
  previousPage(): void {
    this.currentPage--;
    this.executeSearch();
  }
}
