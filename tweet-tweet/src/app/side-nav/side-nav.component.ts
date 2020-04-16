import { AuthServiceService } from './../services/auth-service.service';
import { TweetModalComponent } from './tweet-modal/tweet-modal.component';
import { MyprofileComponent } from './../myprofile/myprofile.component';
import { element } from 'protractor';
import { Component, OnInit, Renderer, ElementRef, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import{Router,NavigationEnd}from '@angular/router'
import ParseJwt from "../utils/parsejwt";
import { IJwtPayload} from "../models/user.interface";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit{
   isClicked:boolean = false;
   userhandle: string;
   currentUser: IJwtPayload = ParseJwt.parseJwt();
   currentUserhandle= this.currentUser.userhandle;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router:Router,
    private render:Renderer,
    private ren:Renderer2,
    private el: ElementRef,
    private auth: AuthServiceService,
    private myprofileComponent: MyprofileComponent,
    private modalService: NgbModal
   ){
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {

        // close all open modals
        this.modalService.dismissAll();        

      }

    });
   }

  title: string = "Home"
  closeResult: string;
  logout(){
    localStorage.removeItem('Authorization');
    this.router.navigate(["/login"])
   
  }

  toggle(event:any){
       this.isClicked=!this.isClicked;      
      this.render.setElementClass(event.target,"selected",true);
      this.myprofileComponent.loadSearchedUserDetails(this.currentUserhandle);
  }

  showModal(){
    this.open(TweetModalComponent);
  }
  
    toggle(event:any){
       this.isClicked=!this.isClicked;
       this.render.setElementClass(event.target,"selected",true);
       this.myprofileComponent.loadSearchedUserDetails(this.currentUserhandle);
      }
 
  open(content) {
    this.modalService
      .open(content)
      .result.then(
        result => {
        
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit():void{
  }
}
