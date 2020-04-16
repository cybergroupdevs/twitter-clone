import { UserService } from './../services/user.service';
import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FollowService } from "../services/follow.service";
import { MyprofileComponent } from './../myprofile/myprofile.component';
import { HttpResponse } from "@angular/common/http";
import { IFollower, IUnfollow } from "../models/follow.interface";
import { IJwtPayload } from "../models/user.interface";
import ParseJwt from "../utils/parsejwt";


@Component({
  selector: 'app-followers-following',
  templateUrl: './followers-following.component.html',
  styleUrls: ['./followers-following.component.css']
})


export class FollowersFollowingComponent implements OnInit {

  constructor(
    private router: Router,
    private followService : FollowService,
    private userService : UserService,
    private myprofileComponent: MyprofileComponent,
    private eRef: ElementRef
  ) { }
  followingList=[];
  followersList=[];
  name : string;
  userhandle : string;
  bio : string;
  relation: Boolean;
  isFollower: Boolean= false;
  hasRelation: Boolean= false;
  isListingFollowers: Boolean= false;
  isListingFollowing: Boolean= false;
  currentUserhandle: string;
  currentUsername: string;
  currentUser: IJwtPayload = ParseJwt.parseJwt();


  ngOnInit() {
    console.log(this.currentUser.userhandle)
    let current_route = this.router.url.split("/");
    this.currentUserhandle= current_route[2];
    this.userService.searchedUserDetails(this.currentUserhandle).subscribe(res => {
      if(res.status==200){
        this.currentUsername= res.body.name;
      }
    })

    let requestType = current_route[3];
    if(requestType == "followers")
    {
      this.getFollowersList(this.currentUserhandle);  
      this.isListingFollowers = true;
    }
    else if(requestType == "following"){
      this.getFollowingList(this.currentUserhandle);
      this.isListingFollowing = true;
    }    
  }


  @HostListener('document:click', ['$event'])
  redirectToUserOnClick(event) {  
    // if (this.eRef.nativeElement.contains(event.target)) {
    //   if(event.target.id!="angle-down"){
    //     for(let i=0;i<this.isDropdownClicked.length;i++){
    //     this.isDropdownClicked[i]=false;
    //   }
      
    //   }
    // }
    
  }


  getFollowersList(currentUserhandle){
    this.followService.getFollowers(currentUserhandle).subscribe(res => {
      if(res.status == 200){
        this.followersList = res.body.payload.followers;
        this.isFollower = true;
      }
      else if(res.status == 401){
        localStorage.removeItem("Authorization");
        this.router.navigate(['/login']);
      }
    });
  }

  getFollowingList(currentUserhandle){
    this.followService.getFollowing(currentUserhandle).subscribe(res => {
      if(res.status == 200){
        this.followingList = res.body.payload.following;
        
        console.log(this.followingList)
      }
      else if(res.status == 401){
        localStorage.removeItem("Authorization");
        this.router.navigate(['/login']);
      }
    });
  }

  handleUnfollow(user): void {
    this.followService.unfollow({
        userhandle: user,
        followerhandle: this.currentUserhandle
      })
      .subscribe((res: HttpResponse<IUnfollow>) => {
        console.log(res);
      });

  }

  handleFollow(user): void {
    this.followService.follow({
        userhandle: user,
        followerhandle: this.currentUserhandle
      },true)
      .subscribe((res: HttpResponse<IUnfollow>) => {
        console.log(res);
      });

  }

  follow(user): void {
    this.followService.follow({
        userhandle: user,
        followerhandle: this.currentUser.userhandle
      },true)
      .subscribe((res: HttpResponse<IUnfollow>) => {
        console.log(res);
      });

  }
  unfollow(user): void {
    this.followService.unfollow({
        userhandle: user,
        followerhandle: this.currentUser.userhandle
      })
      .subscribe((res: HttpResponse<IUnfollow>) => {
        console.log(res);
      });

  }

  showFollowers(){
    this.router.navigate(["/profile/" + this.currentUserhandle+"/followers"]);
    this.getFollowersList(this.currentUserhandle);  
    this.isListingFollowers = true;
    this.isListingFollowing = false;
  }
  showFollowing(){
    this.router.navigate(["/profile/" + this.currentUserhandle+"/following"]);
    this.getFollowingList(this.currentUserhandle);  
    this.isListingFollowers = false;
    this.isListingFollowing = true;
  }
  redirectToClickedUser(user){
    this.router.navigate(["/profile/" + user]);
  }


}
