import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoursesComponent } from "./courses.component";
import { CoursesService } from "./courses.service";
import { AuthorsService } from "./authors.service";
import { AuthorsComponent } from "./authors.component";
import { FavoriteComponent } from './favorite/favorite.component';
import { PanelComponent } from './panel/panel.component';
import { InputFormatDirective } from './input-format.directive';
import { ContactFormComponent } from './contact-form/contact-form.component';

@NgModule({
  declarations: [AppComponent, AuthorsComponent, CoursesComponent, FavoriteComponent, PanelComponent, InputFormatDirective, ContactFormComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [AuthorsService, CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
