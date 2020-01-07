import { Injectable, Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ArtOptions } from './art.options';
import { ArtPiece } from './art.piece';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'art-service',
  template: `<img src= {{artPiece.primaryImageSmall}}>
             <p>Title: {{artPiece.title}}</p>
             <p>Artist: {{artPiece.artistDisplayName}}</p>
             <p>{{artPiece.artistDisplayBio}}</p>`
})

@Injectable()
export class ArtService {

  // two objects representing the two apis we need to access
  artPiece: ArtPiece;
  artOptions: ArtOptions;

  paintingOptionsUrl: string = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Painting&medium=Paintings';
  paintingInfoUrl: string = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
  paintingImageUrl: string = 'https://images.metmuseum.org/CRDImages/ep/web-large/DT1567.jpg';

  constructor(private http: Http) {
    // get all possible art options
    this.getArtOptions();
  }

  // api get: get all art options that have images
  getArtOptions() {
    // make asynch api call
    var artOptionApiResponse = this.http.get(this.paintingOptionsUrl).map((response:Response) => response.json());

    // once we successfully retrieve data from the api, call our .getArtData() function
    artOptionApiResponse.subscribe(
      artOptionJsonData => {
        this.getArtInfo(artOptionJsonData);
      },
      error => alert(error),
      () => console.log("finished")
    );
  }

  // api get: get the info (title, artist, etc) regarding a specific painting
  getArtInfo(artOptionJsonData) {
    this.artOptions = artOptionJsonData;

    // randomly pick a painting id
    var randomInt = Math.floor(Math.random() * Math.floor(this.artOptions.objectIDs.length));
    var randomPaintingId = this.artOptions.objectIDs[randomInt];

    // adding the painting id to the url to get its info
    this.paintingInfoUrl = this.paintingInfoUrl + randomPaintingId

    // make asynch api call
    var paintingInfoApiResponse = this.http.get(this.paintingInfoUrl).map((response:Response) => response.json());

    // once we successfully retrieve data from the api, set the current ArtPiece to the info
    paintingInfoApiResponse.subscribe(
      artPieceJsonData => this.artPiece = artPieceJsonData,
      error => alert(error),
      () => console.log("finished")
    );
  }
}
