import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'Home Page';


  constructor(private translate: TranslateService) {
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
