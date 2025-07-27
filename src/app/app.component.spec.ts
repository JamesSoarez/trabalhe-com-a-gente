import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { GithubService } from './services/github.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let githubServiceSpy: jasmine.SpyObj<GithubService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GithubService', ['searchRepositories']);

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        FormsModule
      ],
      providers: [
        { provide: GithubService, useValue: spy },
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    githubServiceSpy = TestBed.inject(GithubService) as jasmine.SpyObj<GithubService>;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call githubService.searchRepositories when search button is clicked', () => {
    const testSearchTerm = "angular";
    
    githubServiceSpy.searchRepositories.and.returnValue(of({ items: [], total_count: 0 }));

    component.searchTerm = testSearchTerm;
    fixture.detectChanges();

    const searchButton = fixture.nativeElement.querySelector("button");
    searchButton.click();

    expect(githubServiceSpy.searchRepositories).toHaveBeenCalledWith(testSearchTerm, 1);
  });

  it('should render the list of repositories when search is successful', () => {
    const dummyResponse = {
      total_count: 2,
      items: [
        { full_name: 'angular/angular', description: 'One framework.', html_url: '', stargazers_count: 0, watchers_count: 0, open_issues_count: 0 },
        { full_name: 'facebook/react', description: 'A declarative library.', html_url: '', stargazers_count: 0, watchers_count: 0, open_issues_count: 0 }
      ]
    };
    githubServiceSpy.searchRepositories.and.returnValue(of(dummyResponse));
    
    const searchButton = fixture.nativeElement.querySelector('button');
    searchButton.click();
    fixture.detectChanges();

    const repoListItems = fixture.nativeElement.querySelectorAll('li');
    
    expect(repoListItems.length).toBe(2);
    expect(repoListItems[0].textContent).toContain('angular/angular');
  });

});