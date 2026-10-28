import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { ApiService, ProjectDetail } from '../../services/api.service';

@Component({
  selector: 'app-projekt-detail',
  templateUrl: './projekt-detail.page.html',
  standalone: false,
})
export class ProjektDetailPage {
  readonly project = signal<ProjectDetail | null>(null);
  readonly loading = signal(true);
  readonly error = signal('');

  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(ApiService);

  ionViewWillEnter(): void {
    this.loadProject();
  }

  loadProject(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.error.set('');
    if (!Number.isSafeInteger(id) || id < 1) {
      this.error.set('Die Projekt-ID ist ungültig.');
      this.loading.set(false);
      return;
    }
    this.loading.set(true);
    this.api.getProject(id).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: project => this.project.set(project),
      error: (error: HttpErrorResponse) => this.error.set(error.status === 404
        ? 'Dieses Projekt wurde nicht gefunden.'
        : 'Das Projekt konnte nicht geladen werden. Bitte versuche es erneut.'),
    });
  }

}