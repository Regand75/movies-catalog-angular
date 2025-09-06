import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Movie} from '../../../../types/movie.type';

@Component({
  selector: 'app-movie-popup',
  standalone: true,
  imports: [],
  templateUrl: './movie-popup.html',
  styleUrl: './movie-popup.scss'
})
export class MoviePopup {
  @Input() movie: Movie | null = null;
  @Output() close = new EventEmitter<void>();
}
