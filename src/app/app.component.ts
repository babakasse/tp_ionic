import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/auth.service';
import {MapPage} from "../pages/map/map";
import {PhotoPage} from "../pages/photo/photo";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = HomePage;
  rootPage:any = LoginPage;
    isAndroid: boolean = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private auth:AuthService) {
      this.isAndroid = platform.is('android');
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.auth.afAuth.authState
    .subscribe(
      user => {
        if (user) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
        }
      },
      () => {
      this.rootPage = LoginPage;
      }
    );
  }

  login() {
    //this.menu.close();
    this.auth.signOut();
    //this.nav.setRoot(LoginPage);
    }

    logout() {
      //this.menu.close();
      this.auth.signOut();
      //this.nav.setRoot(HomePage);
    }
}

