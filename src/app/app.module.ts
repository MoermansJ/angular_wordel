import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { HamburgerButtonComponent } from './components/hamburger-button/hamburger-button.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HamburgerMenuComponent } from './components/hamburger-menu/hamburger-menu.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GamePageComponent,
    ContactPageComponent,
    HamburgerButtonComponent,
    HamburgerMenuComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
