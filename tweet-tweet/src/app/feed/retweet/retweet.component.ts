
import { Component, OnInit } from '@angular/core';
import {ITweet, IContent} from '../../models/tweet.interface'

@Component({
  selector: 'app-retweet',
  templateUrl: './retweet.component.html',
  styleUrls: ['./retweet.component.css']
})
export class RetweetComponent implements OnInit {

  constructor() { }

  Tweet: any[]=[
    {user:"Anchal",
    tweet:"3",
      date:"29Aug",
      replies: "5",
      likes:"3",
      retweets: "3",
      commemt:"this is retweet component"
  }
]; 

  ngOnInit() {
  }

}
