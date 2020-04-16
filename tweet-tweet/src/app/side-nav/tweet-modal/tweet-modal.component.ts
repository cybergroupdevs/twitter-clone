import { Component, OnInit ,ViewChild} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {
  NgbActiveModal,
  NgbModal,
  ModalDismissReasons
} from "@ng-bootstrap/ng-bootstrap";
import { UserService } from '../../services/user.service';
const URL = 'http://localhost:3000/tweet';
@Component({
  selector: 'app-tweet-modal',
  templateUrl: './tweet-modal.component.html',
  styleUrls: ['./tweet-modal.component.css']
})
export class TweetModalComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
    authToken: localStorage.getItem("Authorization").substring(7)
  });
  constructor(private userService: UserService,
    public activeModal: NgbActiveModal,) { }
  
  flag: number = 0;
  
  textArea:string;
  isVisible: Boolean = false;
  mentionIdArray = [];
  //searchedUsers: any = [];
  searchedUsers = [];
  ngOnInit() {
  }
  check(event: any){
    var strArray = this.textArea.split(" ");
    if(this.flag == 1){
      this.searchForUser();
    }
    if(event.key == "@"){
      this.flag = 1;
      this.isVisible = true;
    }
    if(event.key == " "){
      this.flag = 0;
      this.isVisible = false;
    }
    if(strArray[strArray.length - 1].charAt(0) == "@"){
      this.flag = 1;
      this.isVisible = true;
    }
    else{
      this.flag = 0;
      this.isVisible = false;
    }

    if(this.textArea == ""){
      this.flag = 0;
      this.isVisible = false;
    }
  }
  searchForUser(){
    var str = this.textArea.split(" ");
    var searchString = (str[str.length - 1]).substring(1);
    this.userService.searchUser(searchString).subscribe(res => {
      if(res.status == 200){
        this.searchedUsers = res.body;
      }
      else{
        console.log("Some Error");
      }
    });
  }

  OnSubmit(){
    this.uploader.onBuildItemForm = (item, form) => {
      form.append("text", this.textArea);
      form.append("mentions", this.mentionIdArray);
      item.formData = [this.textArea];
      item.formData = this.mentionIdArray;
    };
    this.uploader.uploadAll();
    this.textArea = "";
    this.mentionIdArray = [];
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
}
