import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ServiceComponent } from './userlist/service.component';

import { ProfileComponent } from './profile/profile.component';

import { UploadimageComponent } from './uploadimage/uploadimage.component';
import { PaymentComponent } from './payment/payment.component';
import { SettingComponent } from './setting/setting.component';
import { UserlistBComponent } from './userlist-b/userlist-b.component';
import { HotdealComponent } from './hotdeal/hotdeal.component';
import { StoresComponent } from './stores/stores.component';
import { WalletComponent } from './wallet/wallet.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ReferralComponent } from './referral/referral.component';
import { CardsComponent } from './cards/cards.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { SocialmediaComponent } from './socialmedia/socialmedia.component';
import { NewsNpressComponent } from './news-npress/news-npress.component';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes: Routes = [
  // {
  //   path: 'login',
  //   loadChildren: () => import('./userMGT/user-mgt-module-routing.module').then(m => m.UserMGTModuleRoutingModule),
  // },
  // {
  //   path: 'site',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./site-visit/butlerrouting.module').then(m => m.ButlerroutingModule),
  // },

  // {
  //   path: 'butler_mgt',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./butler_activity/butler-routing.module').then(m => m.ButlerRoutingModule),
  // },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'service', component: ServiceComponent },

  { path: 'profile', component: ProfileComponent },

  { path: 'uploadimage', component: UploadimageComponent },
  { path: 'pay', component: PaymentComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'business', component: UserlistBComponent },
  { path: 'hotdeal', component: HotdealComponent },
  { path: 'stores', component: StoresComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'trans', component: TransactionsComponent },
  { path: 'referral', component: ReferralComponent },
  { path: 'cards', component: CardsComponent },

  /////////////////////////////////////////////////////////////
  { path: 'contact', component: ContactusComponent },
  { path: 'about', component: AboutusComponent },
  { path: 'worlflow', component: WorkflowComponent },
  { path: 'socialmedia', component: SocialmediaComponent },
  { path: 'newsNpress', component: NewsNpressComponent },
  { path: 'tutorial', component: TutorialComponent },

  ////////////////////////////////////////////////////////////
  // { path: 'job', component: JoballocationComponent },
  // { path: 'service', component: ServicesComponent },
  // { path: 'setting', component: SettingComponent },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
