import { OrdersService } from './../../core/services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  cartID:string = ''

  errorMessage:string = ''

  checkoutForm!:FormGroup  

  constructor(private ActivatedRoute:ActivatedRoute, private orders:OrdersService) { }
  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe((params) => {
      this.cartID = params.get('id') as string

      this.checkoutForm = new FormGroup({
        details: new FormControl(null,[Validators.required]),
        phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]),
        city: new FormControl(null,[Validators.required])
      })
    
    })
  }

  submit(){
    this.orders.onlinePayment(this.cartID, this.checkoutForm.value).subscribe({
      next:(res) => {
      console.log(res);
      window.open(res.session.url,'_self');
    },
    error:(err) => {
      this.errorMessage = err.error.message
      console.log(err);
    }
    })
  }

  alertClose(){
    this.errorMessage = ''
  }

}
