import {Component, inject, OnInit} from '@angular/core';
import {CardMovie} from '../../shared/components/card-movie/card-movie';
import {Movie} from '../../../types/movie.type';
import {MoviesService} from '../../shared/services/movies.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CardMovie
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main implements OnInit{
  movies: Movie[] = [];
  private moviesService = inject(MoviesService);

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe({
      next: (data) => (this.movies = data),
      error: (err) => console.log('Ошибка загрузки фильмов', err),
    })
  }

}
