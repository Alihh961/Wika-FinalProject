import { Component, OnInit } from '@angular/core';
import { NFTs } from '../Interface/Itoken';
import { HttpClient } from '@angular/common/http';
import { LoggedInUserService } from '../../services/logged-in-user.service';
import { ETHService } from '../../services/eth.service';
import { baseURL } from 'src/environment/environment';



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
  all_categories!:number;
  sport_categories!:number;
  music_categories!:number;
  gaming_categories!:number;
  art_categories!:number;




  // checked radio button is all by default
  selectedRadioButton: string = "all";

  ngOnInit() {

    this.getCategoriesTotal();
    this.fetchingNFTs();
    this.setETHPrice();

  }

  // get the total number of items for every category
  getCategoriesTotal(){
    this.http.get<any>(`${baseURL}calculateCategories.php`).subscribe(data => {

      this.all_categories = data["all"];
      this.sport_categories =data["sport"];
      this.music_categories =data["music"];
      this.gaming_categories = data["gaming"];
      this.art_categories = data["art"];

      //set limitMax to the total number of categories
      
      this.limitMax = this.all_categories;

    },
    error => {
      console.log(error);
    })
  }

  //fetching 4 NFTs
  fetchingNFTs() {

    this.http.get<any[]>('http://localhost/backend/gallerynfts.php?c=' + this.selectedRadioButton + '&o=4').subscribe(
      data => {
        this.nfts = data;
        // console.log(data.length);

      },
      (error) => {
        console.error(error);
      }
    );
  }

  // FEtching more NFTs on button clicked
  fetchMore(): void {
    this.http.get<any[]>('http://localhost/backend/gallerynfts.php?c=' + this.selectedRadioButton + '&o=' + (4 + this.limit)).subscribe(
      data => {

        this.nfts = data;
        this.limit += 4;
      },
      (error) => {
        console.error(error);
      }
    );
  }

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



  onSearchTextEntered(searchValue: string) {
    this.searchInputValue = searchValue;
  }


  // filtering results when the radio button is changed
  onFilterSelectionChanged(data: string) {

    this.selectedRadioButton = data;
    this.fetchingNFTs();
   

    if(data == "Art"){
      this.limitMax = this.art_categories;
    }else if(data == "Sport"){
      this.limitMax = this.sport_categories;

    }else if(data == "Gaming"){
      this.limitMax = this.gaming_categories;

    }else if(data == "Music"){
      this.limitMax = this.music_categories;

    }
    console.log(this.limitMax);

  }

  setETHPrice() {
    this.ETHServiceInstance.getETHPrice().subscribe(data => {
      this.ETHServiceInstance.setETHPrice(data["EUR"]);
      this.ETHPrice = data["EUR"];
    })
  }

}
