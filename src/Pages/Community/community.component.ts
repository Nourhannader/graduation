import { Post } from './../../Services/post.service';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../Services/post.service';
import { AddPostComponent } from '../add-post/add-post.component';
import { PostComponent } from '../../post/post.component';
import { AuthService } from '../../Services/auth.service';
import { CommunityService } from '../../Services/community.service';
import { UserCommunity } from '../../interfaces/user-community';
import { TopUser } from '../../interfaces/top-user';
import { ToastrService } from 'ngx-toastr';
import { Advertisement } from '../../interfaces/advertisement';
import { AdvertisementService } from '../../Services/advertisement.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule,PostComponent, AddPostComponent,RouterLink],
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
})
export class CommunityComponent implements OnInit , OnDestroy {
  posts: Post[] = [];
  topUsers: TopUser[] = [];
  twoAds:Advertisement[]=[];
  user :UserCommunity={
    name: '',
    email: '',
    image: '',
    userName: '',
    commentCount: 0,
    reactCount: 0,
    postCount: 0
  };
  loading: boolean = false;
  error: string | null = null;
  showFirstImage: boolean = true;
  image1!:string
  image2!:string
  private intervalId: any;



  _AuthService=inject(AuthService)
  _communityService=inject(CommunityService)
  _AdvertisementService=inject(AdvertisementService)

  constructor(private postService: PostService,private toastr: ToastrService) {}

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.showFirstImage = !this.showFirstImage;
    }, 500); 
    this.loadPosts();
    this.GetUserCommunity();
    this.GetTopUsers();
    this.getTwoAds()
  }

  loadPosts() {
    this.loading = true;
    this.postService.getAllPosts().subscribe({
      next: (res: Post[]) => {
        this.posts = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'error loading data';
        this.loading = false;
      },
    });
  }

  onFireUser(postId:number){
   this.GetUserCommunity();
   this.GetTopUsers();
  }

  onPostAdded(postId: number) {
   this.loadPosts();
   this.GetUserCommunity();
   this.GetTopUsers();
  }

  onPostDeleted(postId: string) {
    this.posts = this.posts.filter(p => p.postId !== Number(postId));
  }

  onPostUpdated(postId: number) {
    this.loadPosts();
  }

  GetUserCommunity() {
    this._communityService.GetUserCommunity().subscribe({
      next: (res) => {
        this.user = res;

        localStorage.setItem('username',res.name);
        localStorage.setItem('image',res.image);
        
      },
      error: (err) => {
        console.error('Error fetching user community:', err);
      }
    });
  }

  GetTopUsers() {
    this._communityService.GetTopUsers().subscribe({
      next: (res) => {
        console.log('Top Users Response:', res);
        this.topUsers = res;
        console.log('Top Users:', this.topUsers);
      },
      error: (err) => {
        console.error('Error fetching top users:', err);
      }
    });
  }

  getTwoAds(){
    this._AdvertisementService.getTwoAds().subscribe({
      next:(res) => {
        this.twoAds=res
        this.image1=this.twoAds[0].image1!
        this.image2=this.twoAds[1].image1!
        
      },error:(err)=>{
        console.log(err.message);
        
      }
    })
  }
 
  ngOnDestroy() {
    clearInterval(this.intervalId);
}
}