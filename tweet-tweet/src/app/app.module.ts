import { HttpInterceptorService } from './http-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

//Custom Components
import { HomeComponent } from './home/containers/home.component';
import { TweetCreateComponent } from './home/components/tweet-create/tweet-create.component';
import { PostComponent } from './home/components/post/post.component';
import { TrendComponent } from './home/components/trend/trend.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';

//Material UI Imports
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { ReplyComponent } from './home/components/reply/reply.component';
import { SearchComponent } from './home/components/search/search.component';
import { FeedComponent } from './feed/feed.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { TrendsComponent } from './trends/trends.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { EditProfileComponent } from './myprofile/edit-profile/edit-profile.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { FollowersFollowingComponent } from './followers-following/followers-following.component';
import { ExploreComponent } from './explore/explore.component';
import { RetweetComponent } from './feed/retweet/retweet.component';
import { TweetModalComponent } from './side-nav/tweet-modal/tweet-modal.component';




@NgModule({
  declarations: [
    SignUpComponent,
    AppComponent,
    TweetCreateComponent,
    PostComponent,
    TrendComponent,
    SideNavComponent,
    WelcomePageComponent,
    LoginPageComponent,
    HomeComponent,
    PostComponent,
    TweetCreateComponent,
    TrendComponent,
    ProfileComponent,
    ReplyComponent,
    SearchComponent,
    FeedComponent,
    CreatePostComponent,
    TrendsComponent,
    MyprofileComponent,
    FileSelectDirective,
    EditProfileComponent,
    ComingSoonComponent,
    FollowersFollowingComponent,
    ExploreComponent,
    RetweetComponent,
    TweetModalComponent
  ],

  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    //Materail UI Modules
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    CommonModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
 
})
export class AppModule { }
