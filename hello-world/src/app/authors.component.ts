import { Component } from "@angular/core";
import { AuthorsService } from "./authors.service";

@Component({
  selector: "authors",
  template: `
    <h2>{{ authors.length + " Authors:" }}</h2>
    <ul>
      <li *ngFor="let author of authors">{{ author }}</li>
    </ul>
    <table>
      <tr>
        <td [attr.colspan]="colSpan"></td>
      </tr>
    </table>
  `
})
export class AuthorsComponent {
  authors;
  colSpan = 2;
  constructor(service: AuthorsService) {
    this.authors = service.getAuthors();
  }
}
