import {
  inject,
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../types/album.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http = inject(HttpClient);

  /**
   * Method to add all new albums
   */
  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>('http://localhost:3000/albums');
  }

  /**
   * Method to add a new album
   * @param album
   */
  addAlbum(album: Album): Observable<Album> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<Album>('http://localhost:3000/albums', album, httpOptions);
  }

  /**
   * Method that returns a single album...
   * @param id - string, id of album in DB...
   */
  getAlbum(id: string): Observable<Album> {
    return this.http.get<Album>(`http://localhost:3000/albums/${id}`);
  }
}
