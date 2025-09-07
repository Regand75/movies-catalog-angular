import {Component, HostListener, inject, OnInit, Renderer2, ElementRef} from '@angular/core';
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
  private scrollY: number = 0;
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
    this.lockScroll();
  }

  closeMovie(): void {
    this.selectedMovie = null;
    this.unlockScroll();
  }

  private lockScroll(): void {
    this.scrollY = window.scrollY;
    const body = document.body;

    // Вычисляем ширину скроллбара
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Блокируем скролл и компенсируем ширину скроллбара
    body.style.position = 'fixed';
    body.style.top = `-${this.scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.overflow = 'hidden';

    // Добавляем отступ справа равный ширине скроллбара
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  private unlockScroll(): void {
    const body = document.body;

    // Восстанавливаем стили
    body.style.position = '';
    body.style.top = '';
    body.style.left = '';
    body.style.right = '';
    body.style.overflow = '';
    body.style.paddingRight = '';

    // Возвращаем скролл на прежнее место
    window.scrollTo(0, this.scrollY);
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.selectedMovie) {
      this.closeMovie();
    }
  }
}
