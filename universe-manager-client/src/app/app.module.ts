import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

/* components */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

/* providers */
import { AuthGuardService } from "./_guards/auth-guard.service";
import { LoggedInGuardService } from "./_guards/logged-in-guard.service";
import { AuthService } from "./_services/auth.service";

/* other */
import { appRoutes } from './app-routes';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      enableTracing: environment.production
    })
  ],
  providers: [
    AuthService,
    AuthGuardService,
    LoggedInGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
