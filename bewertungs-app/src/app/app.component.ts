import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { layersOutline, refreshOutline, codeSlashOutline, cloudOfflineOutline, folderOpenOutline, alertCircleOutline, peopleOutline, clipboardOutline, personCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {
    addIcons({ layersOutline, refreshOutline, codeSlashOutline, cloudOfflineOutline, folderOpenOutline, alertCircleOutline, peopleOutline, clipboardOutline, personCircleOutline });
  }
}
