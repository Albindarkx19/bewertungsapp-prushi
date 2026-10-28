import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Team {
  id: number;
  name: string;
  klasse: string | null;
}

export interface Evaluation {
  id: number;
  score: number;
  comment: string | null;
  Criterion: { id: number; name: string; maxScore: number; weight: number } | null;
  Juror: { id: number; name: string } | null;
}

export interface Project {
  id: number;
  teamId: number;
  titel: string;
  beschreibung: string | null;
  praesentiertAm: string | null;
  Team: Team | null;
}

export interface ProjectDetail extends Project {
  Evaluations: Evaluation[];
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly url = environment.apiUrl;

  private readonly http = inject(HttpClient);

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.url}/projects`);
  }

  getProject(id: number): Observable<ProjectDetail> {
    return this.http.get<ProjectDetail>(`${this.url}/projects/${id}`);
  }
}