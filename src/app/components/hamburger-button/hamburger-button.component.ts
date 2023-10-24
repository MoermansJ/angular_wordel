import { Component } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { HamburgerMenuComponent } from '../hamburger-menu/hamburger-menu.component';

@Component({
  selector: 'app-hamburger-button',
  templateUrl: './hamburger-button.component.html',
  styleUrls: ['./hamburger-button.component.css'],
})
export class HamburgerButtonComponent {
  public menuOpen: boolean = false;

  constructor(private offcanvasService: NgbOffcanvas) {}

  public toggleMenuOpen(): void {
    const offcanvasRef = this.offcanvasService.open(HamburgerMenuComponent);
    offcanvasRef.componentInstance.name = 'HamburgerMenu';
  }
}
