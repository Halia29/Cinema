import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.css']
})
export class PaymentResultComponent implements OnInit {
  change: number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const changeString = this.route.snapshot.paramMap.get('changeAmount');
    const change = parseFloat(changeString as string);
    if (!isNaN(change) && changeString !== null){
      this.change = change;
    }else {
      this.change = 0;
    }
  }
}
