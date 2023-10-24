import { Component } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css'],
})
export class HamburgerMenuComponent {
  constructor(public activeOffcanvas: NgbActiveOffcanvas) {}

  public closeMenu(): void {
    this.activeOffcanvas.close();
  }
}
