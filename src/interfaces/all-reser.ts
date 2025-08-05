
export interface AllReser {
    id:number,
    status:string,
    reservationDate:Date
    location:string
    name:string
    phoneNumber:string
    email:string
    appointmentId:number
    owner:string
}

export interface TransformedReservationAdmin {
  id: number;
  status: string;
  dayName: string;
  daynumber: number;
  hour: string;
  month: string;
  location: string;
  name: string;
  phoneNumber: string;
  email: string;
  appointmentId: number;
  owner:string
}

export interface MonthGroupAdmin {
  month: string;
  reservations: TransformedReservationAdmin[];
}
