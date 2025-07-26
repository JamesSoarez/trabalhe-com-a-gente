import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  searchTerm: String = ""; //-> guardar valor no imput

  treatSearch(): void{ //-> método chamado ao clicar no botão
    console.log("Busca por: ", this.searchTerm);  
  }
}
