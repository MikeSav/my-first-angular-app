import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  map,
  Observable,
  switchMap
} from 'rxjs';
import { Album } from '../types/album.interface';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute);
  http = inject(HttpClient);

  album$!: Observable<Album>;

  ngOnInit(): void {
    // let's get the url param
    this.album$ = this.activatedRoute.params.pipe(
      map(params => params['id']),
      switchMap(albumId => this.http.get<Album>(`/get-albums/${albumId}`)
      ));
  }
}