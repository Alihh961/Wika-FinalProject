import { Component, OnInit } from '@angular/core';
import { Itoken } from '../Interface/Itoken';
import { HttpClient } from '@angular/common/http';
import { LoggedInUserService } from '../services/logged-in-user.service';

// import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor(private http: HttpClient , private loggedInUserServiceInstance: LoggedInUserService) { }


  //* Calling tokens to display in Gallery view template 

  tokens: Array<Itoken> = [];
  searchInputValue: string = '';
  isAdmin: boolean = false;

  ngOnInit() {

    this.http.get<any[]>('http://localhost/test/gallerytokens.php?order=' + this.selectedRadioButton ).subscribe(
      data => {
        this.tokens = data;
      },
      error => {
        console.error(error);
      }
    );

    this.loggedInUserServiceInstance.getLoggedInUserInfo().subscribe(info =>{
      this.isAdmin = info.isAdmin;
    });

  }



  onSearchTextEntered(searchValue: string) {
    this.searchInputValue = searchValue;
  }



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

  }





}
