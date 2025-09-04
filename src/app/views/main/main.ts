import { Component } from '@angular/core';
import {CardMovies} from '../../shared/components/card-movies/card-movies';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CardMovies
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {

}
