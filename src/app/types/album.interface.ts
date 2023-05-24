import { Song } from './song.interface';

export interface Album {
  id: string;
  artist: string;
  title: string;
  genre: string;
  released: string;
  favouriteSongs?: Song[]
}
