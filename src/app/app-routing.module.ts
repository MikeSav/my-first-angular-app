import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAlbumsComponent } from './list-albums/list-albums.component';
import { AddAlbumComponent } from './add-album/add-album.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';

const routes: Routes = [
  { path: '', component: ListAlbumsComponent },
  { path: 'add-album', component: AddAlbumComponent },
  { path: 'album/:id', component: AlbumDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
