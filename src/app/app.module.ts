import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './userlist/service.component';
import { RequestComponent } from './request/request.component';
import { ApprovedComponent } from './approved/approved.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UploadimageComponent } from './uploadimage/uploadimage.component';
import { RegisterComponent } from './register/register.component';
import { TestapprovalComponent } from './testapproval/testapproval.component';
import { PaymentComponent } from './payment/payment.component';
import { SettingComponent } from './setting/setting.component';
import { UserlistBComponent } from './userlist-b/userlist-b.component';
import { HotdealComponent } from './hotdeal/hotdeal.component';
import { StoresComponent } from './stores/stores.component';
import { WalletComponent } from './wallet/wallet.component';
import { ReferralComponent } from './referral/referral.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CardsComponent } from './cards/cards.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { NewsNpressComponent } from './news-npress/news-npress.component';
import { SocialmediaComponent } from './socialmedia/socialmedia.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { TutorialComponent } from './tutorial/tutorial.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ServiceComponent,
    RequestComponent,
    ApprovedComponent,
    ProfileComponent,
    ChatComponent,
    UploadimageComponent,
    RegisterComponent,
    TestapprovalComponent,
    PaymentComponent,
    SettingComponent,
    UserlistBComponent,
    HotdealComponent,
    StoresComponent,
    WalletComponent,
    ReferralComponent,
    TransactionsComponent,
    CardsComponent,
    AboutusComponent,
    ContactusComponent,
    NewsNpressComponent,
    SocialmediaComponent,
    WorkflowComponent,
    TutorialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
