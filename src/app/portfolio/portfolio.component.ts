import { Component } from '@angular/core';
import { ETHService } from 'src/services/eth.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {

  test :any;
  constructor(private ETHServiceInstance : ETHService){}

  // getETHValue(){
  //   this.ETHServiceInstance.getETHPrice().subscribe(value=>{
  //     console.log(value);
  //   })
  // }
}
