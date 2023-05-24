import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  map,
  Observable,
  switchMap
} from 'rxjs';
import { Album } from '../types/album.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute);
  apiService = inject(ApiService);

  album$!: Observable<Album>;

  /**
   * Initialize the directive or component after Angular first displays
   * the data-bound properties and
   * sets the directive or component's input properties.
   */
  ngOnInit(): void {
    // let's get the url param... but no pyramid of doom!!!
    this.album$ = this.activatedRoute.params.pipe(
      // https://rxjs.dev/api/operators/map
      map(params => params['id']),
      // https://rxjs.dev/api/operators/switchMap
      switchMap(albumId => this.apiService.getAlbum(albumId))
    );
  }
}
