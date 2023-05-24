import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {

  addAlbumForm!: FormGroup;

  // inject the formbuilder from Angular...
  fb = inject(FormBuilder);

  // let's get our api service

  apiService = inject(ApiService);

  formSubmitted = false

  showThanks = false;

  ngOnInit(): void {
    // first of all let's create our form...
    // I'll do this in a separate method
    this.addAlbumForm = this.createAlbumForm();

    // now we can actually subscribe to the form/formGroup to detect changes
    this.addAlbumForm.valueChanges.subscribe((formValue: Observable<any>) => {
      // pointless but you can see how reactive the form is!
      console.log(formValue);
    });
  }

  /**
   * Method to create a formGroup
   */
  createAlbumForm(): FormGroup {
    // create a form group... https://angular.io/api/forms/FormGroup
    // and inside list all the form controls we need
    return this.fb.group({
      albumArtist: ['', [Validators.required, Validators.maxLength(20)]],
      albumTitle: ['', [Validators.required, Validators.maxLength(20)]],
      albumGenre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      albumReleaseDate: ['', [Validators.required]],
      albumBestSongs: this.fb.array([])
    });
  }

  /**
   * this getter returns the addAlbumForm formControl albumBestSongs as a FormArray
   */
  get songs(): FormArray {
    return this.addAlbumForm.get('albumBestSongs') as FormArray;
  }

  /**
   * Method to remove a song from fb array
   * @param index
   */
  deleteSong(index: number): void {
    this.songs.removeAt(index);
  }

  /**
   * Method to add songs to the albumBestSongs fb array
   */
  addSong(): void {
    const song = this.fb.group({
      songName: '',
      songTrackNumber: null
    });

    this.songs.push(song);
  }

  /**
   * Simple method to toggle the thanks message
   */
  closeThanks() {
    this.showThanks = false;
  }

  onSubmit(): void {

    // disable submit
    this.formSubmitted = true;

    // let's get the form data
    // it would be nice that the form names match our Album type but hey ho...

    const id: string = (Math.random() + 1).toString(36).substring(7);

    const newAlbum = {
      id,
      artist: this.addAlbumForm.controls['albumArtist'].value,
      title: this.addAlbumForm.controls['albumTitle'].value,
      genre: this.addAlbumForm.controls['albumGenre'].value,
      released: this.addAlbumForm.controls['albumReleaseDate'].value,
      favouriteSongs: this.addAlbumForm.controls['albumBestSongs'].value
    }

    // now let's post the album using out nice service
    this.apiService.addAlbum(newAlbum).subscribe(() => {
      // let's reset the form
      this.addAlbumForm.reset();
      // reset state that the form has been submitted..
      this.formSubmitted = false;
      // let's show our thanks / acknowledgement message
      this.showThanks = true;
    });
  }
}
