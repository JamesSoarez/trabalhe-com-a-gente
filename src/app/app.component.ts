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
          this.visiblePages = []; //em caso de erro, as paginas são limpadas
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
    const maxPages = Math.min(totalPages, 34); //a API limita os resultados, permitindo apenas 34 páginas 
    const currentPage = this.currentPage;
    const siblingCount = 1; // quantidade de números que mostra ao lado do atual

    const totalPageSlots = 7; //quantidade de espaços para os números de páginas da navegação

    if (maxPages <= totalPageSlots) {
      this.visiblePages = Array.from({ length: maxPages }, (_, i) => i + 1);
      return;
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, maxPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < maxPages - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      this.visiblePages = [...leftRange, '...', maxPages];
      return;
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from({ length: rightItemCount }, (_, i) => maxPages - rightItemCount + 1 + i);
      this.visiblePages = [1, '...', ...rightRange];
      return;
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = [];
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        middleRange.push(i);
      }
      this.visiblePages = [1, '...', ...middleRange, '...', maxPages];
      return;
    }
  }

  isNumber(value: any): value is number {
    return typeof value === "number";
  }

  isString(value: any): value is string {
    return typeof value === "string";
  }
}