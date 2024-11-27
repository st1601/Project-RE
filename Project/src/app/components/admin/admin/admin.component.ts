import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  images = [
    { src: 'assets/img/caAndersen.jpg', text: 'Overlay Text 1' },
    { src: 'assets/img/caAndersen.jpg', text: 'Overlay Text 2' },
    { src: 'assets/img/caAndersen.jpg', text: 'Overlay Text 3' }
  ];
}
