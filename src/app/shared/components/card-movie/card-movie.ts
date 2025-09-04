import {Component, Input} from '@angular/core';
import {Movie} from '../../../../types/movie.type';

@Component({
  selector: 'app-card-movie',
  standalone: true,
  imports: [],
  templateUrl: './card-movie.html',
  styleUrl: './card-movie.scss'
})
export class CardMovie{
  @Input() movie?: Movie;
}
