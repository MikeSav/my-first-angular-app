import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import {
  Observable,
} from 'rxjs';
import { Router } from '@angular/router';
import { Album } from '../types/album.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-list-albums',
  templateUrl: './list-albums.component.html',
  styleUrls: ['./list-albums.component.scss']
})
export class ListAlbumsComponent implements OnInit {

  albums$!: Observable<Album[]>;

  apiService = inject(ApiService);

  router = inject(Router);

  /**
   * Initialize the directive or component after Angular first displays
   * the data-bound properties and
   * sets the directive or component's input properties.
   */
  ngOnInit(): void {
    this.albums$ = this.apiService.getAlbums();
  }

  /**
   * Add a Brian Eno album
   */
  addBrianEnoAlbum(): void {
    // make a random id
    const id = (Math.random() + 1).toString(36).substring(7);

    const brianEnoAlbum = {
      id,
      artist: 'Brian Eno',
      title: 'Another Green World',
      genre: 'Avant-pop',
      released: '1975'
    };

    this.apiService.addAlbum(brianEnoAlbum).subscribe((resp: Album) => {
      console.log(`${JSON.stringify(resp)} was added to the database`);
      // now let's update the view as the Observable won't update automatically as we aren't using a store or anything...
      this.albums$ = this.apiService.getAlbums();
    });

  }

  // navigation move to album details when clicked
  goToAlbum(id: string): void {
    this.router.navigate(['album', id]);
  }
}
