
import { Observable } from 'rxjs';
import { Review } from './../interfaces/review';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



export interface DeleteReview{
  message:string;
}

@Injectable({
  providedIn: 'root'
})


export class ReviewService {
  
  reviews:Review[]=[];
  _HttpClient=inject(HttpClient)

  constructor() {
    this.getAllReviews();
   }

  getAllReviews(){
    this.reviews=[
    {
    id: 1,
    content: 'Great service and fast delivery!',
    publishDate: '2025-07-20T09:00:00',
    fullName: 'John Smith',
    userImage: 'https://randomuser.me/api/portraits/men/11.jpg',
    userName: 'Nour',
    rate: 5
   },
   {
    id: 2,
    content: 'Satisfied with the overall experience.',
    publishDate: '2025-07-19T14:30:00',
    fullName: 'Emma Johnson',
    userImage: 'https://randomuser.me/api/portraits/women/21.jpg',
    userName: 'Ali',
    rate: 4
   },
   {
    id: 3,
    content: 'Support team was helpful and responsive.',
    publishDate: '2025-07-18T12:10:00',
    fullName: 'Liam Brown',
    userImage: 'https://randomuser.me/api/portraits/men/12.jpg',
    userName: 'Nour',
    rate: 5

   },
   {
    id: 4,
    content: 'Delivery was delayed but service was good.',
    publishDate: '2025-07-18T08:45:00',
    fullName: 'Olivia Davis',
    userImage: 'https://randomuser.me/api/portraits/women/22.jpg',
    userName: 'olivia.d',
    rate: 4
   },
   {
    id: 5,
    content: 'Not happy with the product quality.',
    publishDate: '2025-07-17T11:00:00',
    fullName: 'Noah Wilson',
    userImage: 'https://randomuser.me/api/portraits/men/13.jpg',
    userName: 'noah_wilson',
    rate: 2
   },
   {
    id: 6,
    content: 'Fantastic customer service!',
    publishDate: '2025-07-16T16:20:00',
    fullName: 'Ava Martinez',
    userImage: 'https://randomuser.me/api/portraits/women/23.jpg',
    userName: 'ava.m',
    rate: 5
   },
   {
    id: 7,
    content: 'The app is user-friendly and efficient.',
    publishDate: '2025-07-15T10:00:00',
    fullName: 'William Anderson',
    userImage: 'https://randomuser.me/api/portraits/men/14.jpg',
    userName: 'will.a',
    rate: 5
   },
   {
    id: 8,
    content: 'Okay experience, nothing special.',
    publishDate: '2025-07-14T09:15:00',
    fullName: 'Sophia Thomas',
    userImage: 'https://randomuser.me/api/portraits/women/24.jpg',
    userName: 'sophia.t',
    rate: 3
   },
   {
    id: 9,
    content: 'The process was smooth and easy.',
    publishDate: '2025-07-13T14:50:00',
    fullName: 'James Jackson',
    userImage: 'https://randomuser.me/api/portraits/men/15.jpg',
    userName: 'james_j',
    rate: 4
   },
   {
    id: 10,
    content: 'Definitely recommending this to others!',
    publishDate: '2025-07-12T11:30:00',
    fullName: 'Isabella White',
    userImage: 'https://randomuser.me/api/portraits/women/25.jpg',
    userName: 'isabella.w',
    rate: 5
  },
  {
    id: 11,
    content: 'Not what I expected. Needs improvement.',
    publishDate: '2025-07-11T17:00:00',
    fullName: 'Benjamin Harris',
    userImage: 'https://randomuser.me/api/portraits/men/16.jpg',
    userName: 'ben_h',
    rate: 2
  },
  {
    id: 12,
    content: 'Very helpful and polite staff.',
    publishDate: '2025-07-10T08:30:00',
    fullName: 'Mia Clark',
    userImage: 'https://randomuser.me/api/portraits/women/26.jpg',
    userName: 'mia.clark',
    rate: 4
  },
  {
    id: 13,
    content: 'Love the design and layout!',
    publishDate: '2025-07-09T13:00:00',
    fullName: 'Elijah Lewis',
    userImage: 'https://randomuser.me/api/portraits/men/17.jpg',
    userName: 'elijah.l',
    rate: 5
  },
  {
    id: 14,
    content: 'App is crashing sometimes.',
    publishDate: '2025-07-08T09:45:00',
    fullName: 'Charlotte Robinson',
    userImage: 'https://randomuser.me/api/portraits/women/27.jpg',
    userName: 'charlie_r',
    rate: 2
  },
  {
    id: 15,
    content: 'Everything worked as expected.',
    publishDate: '2025-07-07T18:10:00',
    fullName: 'Lucas Walker',
    userImage: 'https://randomuser.me/api/portraits/men/18.jpg',
    userName: 'lucas_w',
    rate: 4
  },
  {
    id: 16,
    content: 'Great interface and easy to use.',
    publishDate: '2025-07-06T07:30:00',
    fullName: 'Amelia Young',
    userImage: 'https://randomuser.me/api/portraits/women/28.jpg',
    userName: 'amelia_y',
    rate: 5
  },
  {
    id: 17,
    content: 'The update made it worse.',
    publishDate: '2025-07-05T15:00:00',
    fullName: 'Henry Allen',
    userImage: 'https://randomuser.me/api/portraits/men/19.jpg',
    userName: 'henry.allen',
    rate: 1
  },
  {
    id: 18,
    content: 'Highly satisfied with the service.',
    publishDate: '2025-07-04T13:30:00',
    fullName: 'Harper Scott',
    userImage: 'https://randomuser.me/api/portraits/women/29.jpg',
    userName: 'harper.s',
    rate: 5
  },
  {
    id: 19,
    content: 'Would use again for sure!',
    publishDate: '2025-07-03T11:00:00',
    fullName: 'Daniel King',
    userImage: 'https://randomuser.me/api/portraits/men/20.jpg',
    userName: 'dan.king',
    rate: 5
  },
  {
    id: 20,
    content: 'Service was okay but room for improvement.',
    publishDate: '2025-07-02T08:20:00',
    fullName: 'Evelyn Wright',
    userImage: 'https://randomuser.me/api/portraits/women/30.jpg',
    userName: 'evelyn_w',
    rate: 3
  },
  {
    id: 21,
    content: 'Fast, reliable and helpful.',
    publishDate: '2025-07-01T14:40:00',
    fullName: 'Logan Green',
    userImage: 'https://randomuser.me/api/portraits/men/21.jpg',
    userName: 'logan.g',
    rate: 5
  },
  {
    id: 22,
    content: 'Decent but could be more polished.',
    publishDate: '2025-06-30T12:10:00',
    fullName: 'Grace Baker',
    userImage: 'https://randomuser.me/api/portraits/women/31.jpg',
    userName: 'grace_b',
    rate: 3
  },
  {
    id: 23,
    content: 'App loads too slowly.',
    publishDate: '2025-06-29T09:55:00',
    fullName: 'Jackson Adams',
    userImage: 'https://randomuser.me/api/portraits/men/22.jpg',
    userName: 'jack.adams',
    rate: 2
  },
  {
    id: 24,
    content: 'Amazing experience overall.',
    publishDate: '2025-06-28T17:45:00',
    fullName: 'Luna Nelson',
    userImage: 'https://randomuser.me/api/portraits/women/32.jpg',
    userName: 'luna_n',
    rate: 5
  },
  {
    id: 25,
    content: 'They handled my issue very professionally.',
    publishDate: '2025-06-27T16:00:00',
    fullName: 'Sebastian Hill',
    userImage: 'https://randomuser.me/api/portraits/men/23.jpg',
    userName: 'seb.hill',
    rate: 5
  }
    ]
  }

  delete(id:number):Observable<DeleteReview>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.delete<DeleteReview>(`http://localhost:5267/api/Review/${id}`, { headers });
  }
}
