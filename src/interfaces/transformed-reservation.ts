export interface TransformedReservation {
  id: number;
  Status: string;
  dayName: string;
  daynumber: number;
  hour: string;
  month: string;
  Location: string;
  name: string;
  phoneNumber: string;
  Email: string;
  AppointmentId: number;
}

export interface MonthGroup {
  month: string;
  reservations: TransformedReservation[];
}
