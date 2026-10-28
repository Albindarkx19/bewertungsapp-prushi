import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

describe('ApiService', () => {
  let api: ApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    api = TestBed.inject(ApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('loads projects including their teams from the backend', () => {
    api.getProjects().subscribe(projects => {
      expect(projects[0].Team?.name).toBe('Team Alpha');
    });
    const request = http.expectOne(`${environment.apiUrl}/projects`);
    expect(request.request.method).toBe('GET');
    request.flush([{ id: 1, titel: 'Projekt', Team: { id: 1, name: 'Team Alpha', klasse: '4aAPC' } }]);
  });

  it('loads project details including existing evaluations', () => {
    api.getProject(7).subscribe(project => {
      expect(project.id).toBe(7);
      expect(project.Evaluations[0].score).toBe(8);
    });
    const request = http.expectOne(`${environment.apiUrl}/projects/7`);
    expect(request.request.method).toBe('GET');
    request.flush({ id: 7, Evaluations: [{ id: 1, score: 8 }] });
  });

  it('forwards errors so that pages can show a missing project', () => {
    api.getProject(99).subscribe({
      next: () => { throw new Error('Expected HTTP error'); },
      error: error => expect(error.status).toBe(404),
    });
    http.expectOne(`${environment.apiUrl}/projects/99`).flush(
      { error: 'Projekt nicht gefunden' }, { status: 404, statusText: 'Not Found' },
    );
  });
});