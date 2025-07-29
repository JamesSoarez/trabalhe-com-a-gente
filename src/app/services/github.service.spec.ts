import { TestBed } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";

import { GithubService } from "./github.service";
import { GITHUB_TOKEN } from "../api-keys";

//método que cria testes - framework jasmine
describe("GithubService", () => {
  let service: GithubService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  //bloco que executa antes de cada teste
  beforeEach(() => {
    //mock criado
    const spy = jasmine.createSpyObj("HttpClient", ["get"]);

    //configura ambiente de teste
    TestBed.configureTestingModule({
      providers: [GithubService, { provide: HttpClient, useValue: spy }],
    });
    service = TestBed.inject(GithubService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  // teste que verifica se o ambiente foi configurado corretamente e se uma instância do GithubService foi criada
  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  // teste principal
  it("should call http.get with correct URL, params, and headers", () => {
    const testQuery = "typescript";
    const testPage = 2;
    const expectedUrl = "https://api.github.com/search/repositories";

    httpClientSpy.get.and.returnValue(of({ items: [] }));

    service.searchRepositories(testQuery, testPage).subscribe();

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);

    const mostRecentCall = httpClientSpy.get.calls.mostRecent();

    const url = mostRecentCall.args[0];
    const options = mostRecentCall.args[1];

    expect(url).toEqual(expectedUrl);

    expect(options)
      .withContext("Options object should have been provided")
      .toBeDefined();

    if (options) {
      expect(options.params)
        .withContext("Params should be defined")
        .toBeDefined();

      expect(Object.keys(options.params!)).toContain("q");
      expect(Object.keys(options.params!)).toContain("page");

      expect((options.params! as any).q).toEqual(testQuery);
      expect((options.params! as any).page).toEqual(testPage.toString());

      expect(options.headers)
        .withContext("Headers should be defined")
        .toBeDefined();
      expect((options.headers as any).get("Authorization")).toEqual(
        `Bearer ${GITHUB_TOKEN}`,
      );
    }
  });
});
