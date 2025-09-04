import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../../../types/movie.type';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  #http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/movies';

  //получить список фильмов
  getMovies(): Observable<Movie[]> {
    return this.#http.get<Movie[]>(this.apiUrl);
  }

  //получить фильмы по id
  getMovie(id: number): Observable<Movie> {
    return this.#http.get<Movie>(`${this.apiUrl}/${id}`);
  }
}
