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
  limit: number = 4;
  limitMax!: number;

  // checked radio button is all by default
  selectedRadioButton: string = "all";

  ngOnInit() {

    this.maxNumberOfNfts();
    this.fetchingNFTs();
    this.loggedInUserServiceInstance.getLoggedInUserInfo().subscribe(info => {
      this.isAdmin = info.isAdmin;
    });
    this.setETHPrice();


  }

  maxNumberOfNfts(): void {
    this.http.get<any>('http://localhost/backend/gallerynfts.php?c=all').subscribe(
      data => {
 
        this.limitMax = data[0][0]["total"];
        console.log(this.limitMax + " limit max");

      })
  }

  fetchingNFTs() {

    this.http.get<any[]>('http://localhost/backend/gallerynfts.php?c=' + this.selectedRadioButton + '&o=4').subscribe(
      data => {
        this.nfts = data;

      },
      (error) => {
        console.error(error);
      }
    );
  }

  fetchMore(): void {
    this.http.get<any[]>('http://localhost/backend/gallerynfts.php?c=' + this.selectedRadioButton + '&o=' + (4 + this.limit)).subscribe(
      data => {

        this.nfts = data;
        this.limit += 4;
        console.log(this.limitMax + " limit max");
        console.log(this.limit + " limi");



      },
      (error) => {
        console.error(error);
      }
    );
  }



  onSearchTextEntered(searchValue: string) {
    this.searchInputValue = searchValue;
  }




  // displaying the qty of each filter option
  getAllTokensQty(): number {
    return this.nfts.length;

  }

  getNftArtQty(): number {
    return this.nfts.filter(nft => nft.category_name === "Art").length;
  }
  getNftMusicQty(): number {
    return this.nfts.filter(nft => nft.category_name === "Music").length;
  }
  getNftSportQty(): number {
    return this.nfts.filter(nft => nft.category_name === "Sport").length;
  }
  getNftGamingQty(): number {
    return this.nfts.filter(nft => nft.category_name === "Gaming").length;
  }


  // filtering results when the radio button is changed
  onFilterSelectionChanged(data: string) {

    this.selectedRadioButton = data;
    this.fetchingNFTs();

  }

  setETHPrice() {
    this.ETHServiceInstance.getETHPrice().subscribe(data => {
      this.ETHServiceInstance.setETHPrice(data["EUR"]);
      this.ETHPrice = data["EUR"];
    })
  }

}
