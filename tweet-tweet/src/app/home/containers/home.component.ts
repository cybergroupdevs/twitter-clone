import { Component, OnInit } from '@angular/core';
import { ITweet } from 'src/app/models/tweet.interface';

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.scss'],
    template: `
      <app-create-post></app-create-post>
      <app-feed></app-feed>
    `
})
export class HomeComponent implements OnInit{
    tweets: ITweet[];
    
    constructor(){}

    ngOnInit(){
    }
    
}