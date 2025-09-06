import {Component, inject, OnInit} from '@angular/core';
import {CardMovie} from '../../shared/components/card-movie/card-movie';
import {Movie} from '../../../types/movie.type';
import {MoviesService} from '../../shared/services/movies.service';
import {MoviePopup} from '../../shared/components/movie-popup/movie-popup';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CardMovie,
    MoviePopup
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main implements OnInit{
  movies: Movie[] = [];
  selectedMovie: Movie | null = null;
  private moviesService = inject(MoviesService);

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe({
      next: (data) => (this.movies = data),
      error: (err) => console.log('Ошибка загрузки фильмов', err),
    })
  }

  openMovie(movie: Movie): void {
    this.selectedMovie = movie;
  }

  closeMovie(): void {
    this.selectedMovie = null;
  }

}
