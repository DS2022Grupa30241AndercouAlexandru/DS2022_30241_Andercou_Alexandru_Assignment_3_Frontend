import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule} from 'highcharts-angular'



import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ResetEmailComponent } from './reset-email/reset-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { WebsocketService } from './websocket.service';
import { ChatComponentComponent } from './chat-component/chat-component.component';
import { ChatDirectiveDirective } from './chat-directive.directive';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UserPageComponent,
    AdminPageComponent,
    LoginPageComponent,
    SigninPageComponent,
    NavbarComponent,
    ResetEmailComponent,
    ResetPasswordComponent,
    ChatComponentComponent,
    ChatDirectiveDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    HighchartsChartModule,
    ReactiveFormsModule,
     DataTablesModule,
     
  ],
  providers: [WebsocketService, ChatComponentComponent],
  bootstrap:[AppComponent]
})
export class AppModule { }
