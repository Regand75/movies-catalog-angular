import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  query: string = '';

  private searchService = inject(SearchService);

  onSearchChange() {
    this.searchService.setQuery(this.query);
  }
}
