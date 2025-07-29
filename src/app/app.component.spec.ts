import { TestBed, ComponentFixture } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { of } from "rxjs";

import { AppComponent } from "./app.component";
import { GithubService } from "./services/github.service";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let githubServiceSpy: jasmine.SpyObj<GithubService>;

  beforeEach(async () => {
    //cria mock para GithubService
    const spy = jasmine.createSpyObj("GithubService", ["searchRepositories"]);

    //configura ambiente de teste
    await TestBed.configureTestingModule({
      imports: [AppComponent, FormsModule],
      providers: [
        //fornece provedores de HttpClient e de animações que os componentes do Angular Material precisa
        //Substitui o GithubService real pelo mock
        { provide: GithubService, useValue: spy },
        provideHttpClientTesting(),
        provideAnimationsAsync(),
      ],
    }).compileComponents();

    //etapa principal para criar instância do AppComponent e renderizar html no ambiente de teste
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    githubServiceSpy = TestBed.inject(
      GithubService,
    ) as jasmine.SpyObj<GithubService>;
  });

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });

  //testa integração entre html/TS e verifica ação correta no componente
  it("should call githubService.searchRepositories when search button is clicked", () => {
    const testSearchTerm = "angular";

    githubServiceSpy.searchRepositories.and.returnValue(
      of({ items: [], total_count: 0 }),
    );

    component.searchTerm = testSearchTerm;
    fixture.detectChanges();

    const searchButton = fixture.nativeElement.querySelector("button");
    searchButton.click();

    expect(githubServiceSpy.searchRepositories).toHaveBeenCalledWith(
      testSearchTerm,
      1,
    );
  });

  //verifica se o componente atualiza dados falsos, atualizando o estado do componente
  it("should render the list of repositories when search is successful", () => {
    const dummyResponse = {
      total_count: 2,
      items: [
        {
          full_name: "angular/angular",
          description: "One framework.",
          html_url: "",
          stargazers_count: 0,
          watchers_count: 0,
          open_issues_count: 0,
          owner: { avatar_url: "" },
        },
        {
          full_name: "facebook/react",
          description: "A declarative library.",
          html_url: "",
          stargazers_count: 0,
          watchers_count: 0,
          open_issues_count: 0,
          owner: { avatar_url: "" },
        },
      ],
    };
    githubServiceSpy.searchRepositories.and.returnValue(of(dummyResponse));

    component.searchTerm = "angular";

    component.treatSearch();
    fixture.detectChanges();

    const repoListItems = fixture.nativeElement.querySelectorAll("mat-card");

    expect(repoListItems.length).toBe(2);
    expect(repoListItems[0].textContent).toContain("angular/angular");
  });
});
