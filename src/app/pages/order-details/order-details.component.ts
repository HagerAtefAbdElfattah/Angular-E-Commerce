import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { Order } from '../../core/interfaces/orders';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [DatePipe,CurrencyPipe],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {

  orderID :string = ''

  userOrder!:Order[]

  constructor(private orders:OrdersService,private activatedRoute:ActivatedRoute) { }
  ngOnInit(): void {
    this.orders.decodeToken()
    this.activatedRoute.paramMap.subscribe((params) => {
      this.orderID = params.get('id') as string
      this.getOrders(this.orders.userId.id)
    })
  }

  getOrders(userId:string){
    this.orders.getUserOrder(userId).subscribe({
      next:(res)=>{
        console.log(res.filter((order:Order)=>order._id === this.orderID));
        this.userOrder = res.filter((order:Order)=>order._id === this.orderID)
        
      },error:(err)=>{
        console.log(err,this.orders.userId);
      }
    }) 
  }


}


