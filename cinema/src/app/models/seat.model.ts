export class Seat {
    row: number;
    seat: number;
    price: number;
    isVIP: boolean;
    isAvailable: boolean;
    customerEmail: string;
    wasPaidFor: boolean;
  
    constructor(row: number, 
      seat: number, 
      price: number, 
      isVIP: boolean, 
      isAvailable: boolean, 
      customerEmail: string, 
      wasPaidFor: boolean) {
      this.row = row;
      this.seat = seat;
      this.price = price;
      this.isVIP = isVIP;
      this.isAvailable = isAvailable;
      this.customerEmail = customerEmail;
      this.wasPaidFor = wasPaidFor;
    }
  }