import { Component, OnInit } from '@angular/core';
import { ArtService } from './art.service';
import { ArtPiece } from './art.piece';
import { ArtOptions } from './art.options';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'my-app',
  template: ``
})

export class AppComponent implements OnInit {

  artOptions: ArtPiece;

  constructor(private artService: ArtService) { }

  ngOnInit() {
    var x = 'x';
  }
}
