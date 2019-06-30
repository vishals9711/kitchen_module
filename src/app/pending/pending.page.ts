import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { PendingService } from '../service/pending.service';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-pending',
  templateUrl: './pending.page.html',
  styleUrls: ['./pending.page.scss'],
})
export class PendingPage implements OnInit {

  public restaurantName: string = '';
  public restaurantAddress: string = '';
  public allRestaurantData: any;
  searchRest: string;
  public RestData: any;
  public RestNameId: any = [];
  public currentDD: any;
  public orderid: any;



  constructor(public modalController: ModalController,
    private router: Router, public restaurantAPI: PendingService,
    private storage: Storage, public events: Events) {
    this.restaurantAPI.getAllRestaurants().subscribe((data: {}) => {
      this.allRestaurantData = data;
      for (var eachrestaurant of this.allRestaurantData) {
        let obj = {
          id: eachrestaurant.CId,
          name: eachrestaurant.ItemID,
        }
        this.RestNameId.push(obj);
      }
    });
  }


  ngOnInit() {
  }

  accept(order) {
    this.restaurantAPI.acceptorder(order).subscribe((data: {}) => {
      this.orderid = data;
      console.log(this.orderid);

      let index: number = this.allRestaurantData.findIndex(d => d.OId === order);
      this.allRestaurantData.splice(index, 1);

      // this.router.navigate(['/pending']);

    });


  }


}