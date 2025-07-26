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
  repositories: any[] = [];//-> guardar lista contida em Items

  //Serviço passado no Construtor
  constructor(private githubService: GithubService) {}

  treatSearch(): void{//-> método chamado ao clicar no botão
    this.githubService.searchRepositories(this.searchTerm)
    .subscribe(response => {
      console.log(response);
      this.repositories = response.items;
    }); 
  }
}
