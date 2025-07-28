import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GithubService } from './services/github.service';

//os imports do Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  searchTerm: string = '';
  repositories: any[] = [];
  currentPage: number = 1;
  totalCount: number = 0;
  errorMessage: string | null = null;
  isLoading: boolean = false; // aqui será controlado o circulo de carregamento (spinner)

  constructor(private githubService: GithubService) {}

  visiblePages: (number | string) [] = []; // lista paginas para serem exibidas

  treatSearch(): void {
    if (!this.searchTerm.trim()) return; // se o campo estiver vazio, não realizará busca
    this.currentPage = 1;
    this.executeSearch();
  }
  
  private executeSearch(): void {
    this.errorMessage = null;
    this.isLoading = true; //mostra o circulo de carregamento (spinner)
    this.githubService.searchRepositories(this.searchTerm, this.currentPage)
      .subscribe({
        next: (response) => {
          this.repositories = response.items;
          this.totalCount = response.total_count;
          this.isLoading = false; //esconde o circulo de carregamento (spinner)

          this.updateVisiblePages();
        },
        error: (err) => {
          console.error("ERRO AO FAZER A BUSCA:", err);
          this.repositories = [];
          this.totalCount = 0;
          this.errorMessage = "Erro ao buscar dados. Você pode ter atingido o limite de requisições. Tente novamente em um minuto.";
          this.isLoading = false; //se houver erro, também esconde o circulo de carregamento (spinner)
        }
      });
  }

  nextPage(): void { // próxima página
    this.currentPage++;
    this.executeSearch();
  }

  previousPage(): void { //página anterior
    this.currentPage--;
    this.executeSearch();
  }

  goToPage(page: number | string): void {
    if (typeof page === "number" && page !== this.currentPage) {
      this.currentPage = page;
      this.executeSearch();
    }
  }

  //lógica da paginação
  private updateVisiblePages(): void {
    const totalPages = Math.ceil(this.totalCount / 30);
    const maxPages = Math.min(totalPages, 34);
    const currentPage = this.currentPage;

    if(maxPages <= 7) {
      this.visiblePages = Array.from({ length: maxPages }, (_, i) => i + 1);
      return;
    }

    const pages: (number | string) [] = [];
    pages.push(1);

    if(currentPage > 4){
      pages.push("...");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(maxPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if(currentPage < maxPages - 3){
      pages.push("...");
    }

    pages.push(maxPages);
    this.visiblePages = pages;
  }

  isNumber(value: any): value is number {
    return typeof value === "number";
  }

  isString(value: any): value is string {
    return typeof value === "string";
  }

}