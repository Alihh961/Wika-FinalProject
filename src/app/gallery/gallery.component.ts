import { Component, OnInit } from '@angular/core';
import { Itoken } from '../Interface/Itoken';
import { HttpClient } from '@angular/common/http';

// import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor(private http: HttpClient) { }


  //* Calling all tokens to display in Gallery view template 

  tokens: Array<Itoken> = [];

  ngOnInit() {

    this.http.get<any[]>('http://localhost/backend/gallerytokens.php?order=' + this.selectedRadioButton ).subscribe(
      data => {
        this.tokens = data;
      },
      error => {
        console.error(error);
      }
    )

  }

  searchInputValue: string = '';

  onSearchTextEntered(searchValue: string) {
    this.searchInputValue = searchValue;
  }

  hovered: boolean = false;


  // displaying the qty of each filter option
  getAllTokensQty() {
    return this.tokens.length;
  }

  getTransferableTokensQty() {
    return this.tokens.filter(token => token.type === "transferable").length;
  }

  getNonTransferableTokensQty() {
    return this.tokens.filter(token => token.type === "non-transferable").length;
  }


  // checked radio button is all by default
  selectedRadioButton: string = "all";

  // filtering results when the radio button is changed
  onFilterSelectionChanged(data: string) {

    this.selectedRadioButton = data;
    console.log(this.selectedRadioButton);
    console.log('http://localhost/backend/alltokens.php?order=' + this.selectedRadioButton );
  }





}
