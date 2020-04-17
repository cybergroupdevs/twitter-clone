import { CommentComponent } from './comment/comment.component';
import { RetweetComponent } from './retweet/retweet.component';
import { ITweet } from 'src/app/models/tweet.interface';
import { FeedService } from 'src/app/services/feed.service';
import { MatDialogModule } from '@angular/material/dialog';
import { JsonDecoderService } from './../services/json-decoder.service';
import { Component, OnInit, OnChanges, HostListener, ElementRef, SimpleChange, SimpleChanges } from '@angular/core';
import { Feed } from './../models/feed.interface';
import { likeService } from'../services/like.service';
import { ILike } from '../models/like.interface';
import{MatDialog,MatDialogConfig} from'@angular/material'
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css',]
})

export class FeedComponent implements OnInit {
  isDropdownClicked: Boolean[] = [false, false, false, false, false, false, false, false, false, false];

  selectedFeed: Feed;
  icon: any;
  likeObj: ILike;
  message: any;
  tweets: Array<ITweet> = [];
  customObject = [];
  closeResult: string;

  constructor(
    private eRef: ElementRef,
    private likeService:likeService,
    private JsonDecoderService:JsonDecoderService,
    private dialog: MatDialog,
    private feedService: FeedService,
    private modalService: NgbModal ) { }

  ngOnInit() {
    console.log('Inside ngOnInit');   
    this.feedService.showTweets().subscribe(res => {
      this.tweets = res;
      console.log(this.tweets);
    });
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event) {  
    if (this.eRef.nativeElement.contains(event.target)) {
      if(event.target.id!="angle-down"){
        for(let i=0;i<this.isDropdownClicked.length;i++){
          this.isDropdownClicked[i]=false;
        }
      }
    }
  }
  
  dropdownShow(id: number){
    this.isDropdownClicked[id] = true;    
  }

  
  isClicked:boolean=false;
  onSelect(feed:Feed){
    this.selectedFeed=feed;
     this.isClicked=!this.isClicked;
    const tokenPayload=this.JsonDecoderService.jsonDecoder(localStorage.getItem("Authorization"));
    this.likeObj={
      tweetId:feed._id,//hardcoded value
      userId:tokenPayload._id
    }
    
    this.likeService.like(this.likeObj).subscribe((res:any) => {
      this.message=res.payload.message;
    },err => {
      this.message=err.error.message;
    });
  }

display:boolean=false;
showModal(){
   
    this.open(CommentComponent);
}
showRetweetModal(){
 this.open(RetweetComponent);
 
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


  Feed: Feed[]=[
    {_id:"1",photos: '../../assets/Images/image.jpeg',text:'.Just Now',title:'Anchal',name:'@anchal_hora',description:'A flower, sometimes known as a bloom or blossom. Every flower paint contrasting colors along the ground and bring joy.',newphoto:'../../assets/Images/myimage.jpg',isClicked:false},
    {_id:"2",photos: '../../assets/Images/myimage.jpg',text:'.38 minutes ago',title:'Chetna',name:'@chetna',description:'Mama was my greatest teacher, a teacher of compassion, love and fearlessness. If love is sweet as a flower, then my mother is that sweet flower of love.',newphoto:'../../assets/Images/unnamed.jpg',isClicked:false},
    {_id:"3",photos: '../../assets/Images/nice.jpg',text:'.21 minutes ago',title:'shubham',name:'@shubham',description:'Mama was my greatest teacher, a teacher of compassion, love and fearlessness. If love is sweet as a flower, then my mother is that sweet flower of love.',newphoto:'../../assets/Images/nice.jpg',isClicked:false},
    {_id:"4",photos: '../../assets/Images/nice.jpg',text:'.10 seconds ago',title:'kris',name:'@kris',description:'Mama was my greatest teacher, a teacher of compassion, love and fearlessness. If love is sweet as a flower, then my mother is that sweet flower of love.',newphoto:'../../assets/Images/nice.jpg',isClicked:false}
  ];
  
  ModalDialog: any[]=[
    {message: "This trend is spam"},
    {message: "This trend is abusive or harmful"},
    {message: "This trend is a duplicate"},
    {message: "This trend is low quality"},
  ]

  
  }
