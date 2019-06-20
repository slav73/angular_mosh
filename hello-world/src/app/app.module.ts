import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoursesComponent } from "./courses.component";
import { CoursesService } from "./courses.service";
import { AuthorsService } from "./authors.service";
import { AuthorsComponent } from "./authors.component";

@NgModule({
  declarations: [AppComponent, AuthorsComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [AuthorsService, CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
