import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-nfts',
  templateUrl: './nfts.component.html',
  styleUrls: ['./nfts.component.scss']
})
export class NftsComponent implements OnInit {

  constructor (private titlePage: Title){}

  ngOnInit(): void {
    this.titlePage.setTitle("NFTs");
  }
}
