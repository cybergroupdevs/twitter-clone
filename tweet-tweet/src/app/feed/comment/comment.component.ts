import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(public activeModal:NgbActiveModal) { }

  ngOnInit() {
  }
  comment:any={
    user:"amitabh",
    tweet:"corona has locked us in our homes,but it is a great time for learning and self introspection",
    comment:"very true said amitabh"
   }

 }



