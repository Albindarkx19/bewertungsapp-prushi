import { Component, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ApiService, Project } from '../../services/api.service';

@Component({
  selector: 'app-projekt-liste',
  templateUrl: './projekt-liste.page.html',
  standalone: false,
})
export class ProjektListePage {
  readonly projects = signal<Project[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');

  private readonly api = inject(ApiService);

  ionViewWillEnter(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading.set(true);
    this.error.set('');
    this.api.getProjects().pipe(finalize(() => this.loading.set(false))).subscribe({
      next: projects => this.projects.set(projects),
      error: () => this.error.set('Projekte konnten nicht geladen werden. Bitte versuche es erneut.'),
    });
  }

}