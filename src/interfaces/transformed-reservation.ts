export interface TransformedReservation {
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
}

export interface MonthGroup {
  month: string;
  reservations: TransformedReservation[];
}
