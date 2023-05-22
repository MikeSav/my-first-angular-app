import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MOCK_ALBUMS } from '../../globals';
import { Router } from '@angular/router';
import { Album } from '../types/album.interface';

@Component({
  selector: 'app-list-albums',
  templateUrl: './list-albums.component.html',
  styleUrls: ['./list-albums.component.scss']
})
export class ListAlbumsComponent implements OnInit {

  albums$!: Observable<Album[]>;
  // let's get our data by injecting the HttpClient
  http = inject(HttpClient);
  router = inject(Router)

  /**
   * Initialize the directive or component after Angular first displays
   * the data-bound properties and
   * sets the directive or component's input properties.
   */
  ngOnInit(): void {
    this.albums$ = this.http.get<Album[]>('/get-albums');
  }

  /**
   * Add an album to the global fake call... not that random is it?
   */
  addRandomAlbum(): void {
    // make a random id
    const id = (Math.random() + 1).toString(36).substring(7);

    MOCK_ALBUMS.push({
      id,
      artist: 'Brian Eno',
      title: 'Another Green World',
      genre: 'Avant-pop',
      released: '1975'
    });
  }

  // navigation move to album details when clicked
  goToAlbum(id: string): void {
    this.router.navigate(['album', id]);
  }
}
