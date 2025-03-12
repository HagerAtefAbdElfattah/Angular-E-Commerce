import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { Order } from '../../core/interfaces/orders';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-all-orders',
  imports: [DatePipe, CurrencyPipe,RouterLink,TranslatePipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements  OnInit {

  userOrders: Order[] = [];

  constructor(private orders:OrdersService) { }
  ngOnInit(): void {
    this.orders.decodeToken()

    this.orders.getUserOrder(this.orders.userId.id).subscribe({
      next:(res)=>{
        console.log(res,this.orders.userId);
        this.userOrders = res.reverse() as Order[]

      },error:(err)=>{
        console.log(err,this.orders.userId);
      }
    })
  }

}
