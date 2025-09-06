import {Component, inject, OnInit} from '@angular/core';
import {CardMovie} from '../../shared/components/card-movie/card-movie';
import {Movie} from '../../../types/movie.type';
import {MoviesService} from '../../shared/services/movies.service';
import {MoviePopup} from '../../shared/components/movie-popup/movie-popup';
import {SearchService} from '../../shared/services/search.service';

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
  filterMovies: Movie[] = [];
  private moviesService = inject(MoviesService);
  private searchService = inject(SearchService);

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.filterMovies = data;
      },
      error: (err) => console.error('Ошибка загрузки фильмов', err),
    });

    this.searchService.query$.subscribe(query => {
      this.filterMovies = this.movies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  openMovie(movie: Movie): void {
    this.selectedMovie = movie;
  }

  closeMovie(): void {
    this.selectedMovie = null;
  }

}
