import { Component } from '@angular/core';
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    RouterLink,
    MatFabButton
  ],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent {

}
