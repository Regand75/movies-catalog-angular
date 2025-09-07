import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Movie} from '../../../../types/movie.type';
import {backdropAnimation, popupAnimation} from '../../animations/popup.animation';

@Component({
  selector: 'app-movie-popup',
  standalone: true,
  imports: [],
  templateUrl: './movie-popup.html',
  styleUrl: './movie-popup.scss',
  animations: [popupAnimation, backdropAnimation]
})
export class MoviePopup {
  @Input() movie: Movie | null = null;
  @Output() close = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape() {
    this.close.emit();
  }
}
