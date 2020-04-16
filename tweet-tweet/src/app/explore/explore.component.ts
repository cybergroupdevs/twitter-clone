import { Component, OnInit } from '@angular/core';
import{Feed} from '../models/feed.interface'
import{ExploreService} from'../services/explore.service'
import{ITweet} from'../models/tweet.interface'
@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  clicked:boolean=false;
  constructor(private exploreService:ExploreService) { }
  change(){
   this.clicked=!this.clicked;

  }
  Feed: Feed[]=[
    {_id:"1",photos: '../../assets/Images/image.jpeg',text:'.Just Now',title:'Anchal',name:'@anchal_hora',description:'A flower, sometimes known as a bloom or blossom. Every flower paint contrasting colors along the ground and bring joy.',newphoto:'../../assets/Images/myimage.jpg',isClicked:false},
    {_id:"2",photos: '../../assets/Images/myimage.jpg',text:'.38 minutes ago',title:'Chetna',name:'@chetna',description:'Mama was my greatest teacher, a teacher of compassion, love and fearlessness. If love is sweet as a flower, then my mother is that sweet flower of love.',newphoto:'../../assets/Images/unnamed.jpg',isClicked:false},
    {_id:"3",photos: '../../assets/Images/nice.jpg',text:'.21 minutes ago',title:'shubham',name:'@shubham',description:'Mama was my greatest teacher, a teacher of compassion, love and fearlessness. If love is sweet as a flower, then my mother is that sweet flower of love.',newphoto:'../../assets/Images/nice.jpg',isClicked:false},
    {_id:"4",photos: '../../assets/Images/nice.jpg',text:'.10 seconds ago',title:'kris',name:'@kris',description:'Mama was my greatest teacher, a teacher of compassion, love and fearlessness. If love is sweet as a flower, then my mother is that sweet flower of love.',newphoto:'../../assets/Images/nice.jpg',isClicked:false}
];
statuses:ITweet[];
data:any;
  ngOnInit() {
    let obj=this.exploreService.showExploreTweets().subscribe(res=>{
       
   
      this.data=res;
       (this.data);

    })
  
  }

}
