import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { GithubService } from './services/github.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let GithubServiceSpy: jasmine.SpyObj<GithubService>;

  beforeEach(async () => {

    const spy = jasmine.createSpyObj("GithubService", ["searchRepositories"]);

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

    GithubServiceSpy = TestBed.inject(GithubService) as jasmine.SpyObj<GithubService>;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should call githubService.searchRepositories when search button is clicked`, () => {
    const testSearchTerm = "angular";
    
    GithubServiceSpy.searchRepositories.and.returnValue(of({ items: [], total_count: 0 }));

    component.searchTerm = testSearchTerm;
    fixture.detectChanges();

    const searchButton = fixture.nativeElement.querySelector("button");
    searchButton.click();

    expect(GithubServiceSpy.searchRepositories).toHaveBeenCalledWith(testSearchTerm, 1);
  });

});
