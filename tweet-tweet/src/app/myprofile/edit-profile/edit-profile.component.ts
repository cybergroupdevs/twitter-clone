import { UserService } from '../../services/user.service';
import { Component, OnInit, Injectable } from '@angular/core';
import ParseJwt from "../../utils/parsejwt";
import { HttpResponse } from "@angular/common/http";
import { IUser, IJwtPayload } from "../../models/user.interface";
import { Router, ActivatedRoute, Params } from "@angular/router";
import {
  NgbActiveModal,
  NgbModal,
  ModalDismissReasons
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class EditProfileComponent implements OnInit {

  editProfileModal:boolean=true;

  user: IUser = {
    userhandle: "",
    email: "",
    password: "",
    bio:"",
    location:"",
    dob:"",
    name: "",
    count: {
      followerCount: 0,
      followingCount: 0,
      tweetCount: 0
    }
  };
  currentUser: IJwtPayload = ParseJwt.parseJwt();
  obj: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    public activeModal: NgbActiveModal,
  ) {}

  ngOnInit() {
    let currentUserhandle = this.currentUser.userhandle;
    var currentUserId = this.currentUser._id;
    this.loadUserDetails(currentUserId);
  }

  loadUserDetails(currentUserId){
    this.userService.userDetails(currentUserId).subscribe(res => {
      if(res.status == 200){
        this.user = res.body;
        this.user.dob=this.user.dob.substring(0, 10);
      }
      else if(res.status == 401){
        localStorage.removeItem("token");
        this.router.navigate(['/login']);
      }
    });
   }  
   private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    }else {
      return `with: ${reason}`;
    }
  }

  userUpdate(obj):any{
    this.userService.updateUser(obj, this.currentUser._id).subscribe(
      (res: any) => {
        this.router.navigate(["/profile"]);
      },
      err => {
        console.log(err.error.payload.message);
      });
    }
}
