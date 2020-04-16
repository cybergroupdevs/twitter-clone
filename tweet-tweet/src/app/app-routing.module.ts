
import { RetweetComponent } from './feed/retweet/retweet.component';
import { TweetModalComponent } from './side-nav/tweet-modal/tweet-modal.component';

import { ProfileComponent } from './profile/profile.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FollowersFollowingComponent } from './followers-following/followers-following.component';
import { EditProfileComponent } from './myprofile/edit-profile/edit-profile.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { FeedComponent } from './feed/feed.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { TrendsComponent } from './trends/trends.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/containers/home.component';
import { ExploreComponent } from './explore/explore.component';

const routes: Routes = [

  { path: "welcome", component: WelcomePageComponent},
  { path: "login", component: LoginPageComponent },
  { path: 'comingsoon', component: ComingSoonComponent },
  { path: "signup", component: SignUpComponent },
  { path: "", component: SideNavComponent, children: [
    {
      path: "", redirectTo: "home", pathMatch: "full"
    },
    {
      path: "home", component: HomeComponent
    },
    {
      path: "profile", component: ProfileComponent, children: [
        {
          path: "", redirectTo: ":userhandle", pathMatch: "full"
        },
        {
          path: ":userhandle", component: MyprofileComponent
        },
        {
        path: ':userhandle',
        children: [
          {
            path: ':followers', component: FollowersFollowingComponent
          }
        ]
      }
      ]
    }
  ]},
  { path: 'create', component: CreatePostComponent},
  { path: 'modal', component: EditProfileComponent},
  { path: 'explore', component:ExploreComponent},
  { path: 'temp', component: FeedComponent }
//   {path:"explore",component:ExploreComponent},
//   { path: 'profile',
//     children: [
//    {  path: '', component: MyprofileComponent, 
//       },
//       {
//         path: ':userhandle', component: MyprofileComponent, 
//       },
//       {
//         path: ':userhandle',
//         children: [
//           {
//             path: ':followers', component: FollowersFollowingComponent
//           }
//         ]
//       }
//     ]
//   },
//   {path: "trends", component: TrendsComponent},
//   {path:"feed", component:FeedComponent},
//   {path:"tweetmodal", component:TweetModalComponent},
//   { path: "retweet", component: RetweetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
