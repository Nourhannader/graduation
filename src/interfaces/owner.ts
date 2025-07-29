export interface Owner {
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber?: string;             
  email: string;
  image?: string;  
  compLocation:CompLocation[];     
}

export interface CompLocation{
  city:string
  area:string
}
