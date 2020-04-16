import { ITweet } from 'src/app/models/tweet.interface';
import { FeedService } from 'src/app/services/feed.service';
import { MatDialogModule } from '@angular/material/dialog';
import { JsonDecoderService } from './../services/json-decoder.service';
import { Component, OnInit, OnChanges, HostListener, ElementRef, SimpleChange, SimpleChanges } from '@angular/core';
import { Feed } from './../models/feed.interface';
import { likeService } from'../services/like.service';
import { ILike } from '../models/like.interface';
import{MatDialog,MatDialogConfig} from'@angular/material'


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
    private feedService: FeedService ) { }

  ngOnInit() {
    console.log('Inside ngOnInit');   
    this.feedService.showTweets().subscribe(res => {
      this.tweets = res;
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

  
 
  onSelect(id:string, feed:Feed){
    this.selectedFeed=feed;
    this.selectedFeed.isClicked=!this.selectedFeed.isClicked;
    const tokenPayload=this.JsonDecoderService.jsonDecoder(localStorage.getItem("Authorization"));
    this.likeObj={
      tweetId:"5e8351537f1fe49ec0039173",//hardcoded value
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
    this.display=true;
    document.getElementById("feed").style.opacity="0.5";
    document.body.setAttribute('style', 'overflow: hidden;'); 
}
closeModal(){
  this.display=false;
 document.getElementById("feed").style.opacity="1";
  document.body.setAttribute('style', 'overflow: scroll;');
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

  comment:any={
     user:"amitabh",
     tweet:"corona has locked us in our homes,but it is a great time for learning and self introspection",
     comment:"very true said amitabh"
    }
  }
