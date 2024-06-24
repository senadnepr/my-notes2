import { Component } from '@angular/core';
import {MatGridList, MatGridListModule, MatGridTile} from "@angular/material/grid-list";
import {FoldersComponent} from "./folders/folders.component";
import {NotesComponent} from "./notes/notes.component";
import {TextComponent} from "./text/text.component";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatGridListModule,
    FoldersComponent,
    NotesComponent,
    TextComponent,
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {

}
