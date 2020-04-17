import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-profile",
  styleUrls: ["./profile.component.scss"],
  template: `
  <app-myprofile></app-myprofile>
  <app-feed></app-feed>
  `
})
export class ProfileComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }
}
