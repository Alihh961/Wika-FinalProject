import { Component, OnInit } from '@angular/core';
import { NFTs } from '../Interface/Itoken';
import { HttpClient } from '@angular/common/http';
import { LoggedInUserService } from '../services/logged-in-user.service';
import { ETHService } from '../services/eth.service';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor(private http: HttpClient, private loggedInUserServiceInstance: LoggedInUserService,
    private ETHServiceInstance: ETHService) { }


  //* Calling tokens to display in Gallery view template 

  nfts: Array<NFTs> = [];
  searchInputValue: string = '';
  isAdmin: boolean = false;
  ETHPrice!: number;

  // checked radio button is all by default
  selectedRadioButton: string = "all";

  ngOnInit() {

    this.http.get<any[]>('http://localhost/backend/gallerynfts.php?order=' + this.selectedRadioButton).subscribe(
      data => {
        this.nfts = data;
        // console.log(data);
        console.log(this.nfts);
      },
      (error) => {
        console.error(error);
      }
    );

    this.loggedInUserServiceInstance.getLoggedInUserInfo().subscribe(info => {
      this.isAdmin = info.isAdmin;
    });
    this.setETHPrice();
    // this.ETHPrice = this.ETHServiceInstance.ETHPrice;
  }



  onSearchTextEntered(searchValue: string) {
    this.searchInputValue = searchValue;
  }




  // displaying the qty of each filter option
  getAllTokensQty() {
    return this.nfts.length;
  }

  getTransferableTokensQty() {
    return this.nfts.filter(nft => nft.category === "transferable").length;
  }

  getNonTransferableTokensQty() {
    return this.nfts.filter(nft => nft.category === "non-transferable").length;
  }


  // filtering results when the radio button is changed
  onFilterSelectionChanged(data: string) {

    this.selectedRadioButton = data;

  }

  setETHPrice() {
    this.ETHServiceInstance.getETHPrice().subscribe(data => {
      this.ETHServiceInstance.setETHPrice(data["EUR"]);
      this.ETHPrice = data["EUR"];
    })
  }

}
