export interface Advertisement {
  adID: number;
  title: string;
  price: number;
  description: string;
  type: string;

  city: string;
  street: string;
  area?: string;
  flatNumber?: string;
  buildingNumber?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  publishDate: Date; 

  unitId: number;
  communityName: string;
  userName:string;
  hasAppointment: boolean;
}
