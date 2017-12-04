import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { EventProvider } from '../providers/event/event';
import { ProfileProvider } from '../providers/profile/profile';
import { Camera } from '@ionic-native/camera';
import { ParkListPage } from '../pages/park-list/park-list';
import firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Dialogs } from '@ionic-native/dialogs';
import { ParkRegisterPage } from '../pages/park-register/park-register';


export const firebaseConfig =
{ apiKey: "AIzaSyCSUkWpvARbHh9GkEqmSnorlFJekRIRq8E",
authDomain: "fir-test-a0388.firebaseapp.com",
databaseURL: "https://fir-test-a0388.firebaseio.com",
projectId: "fir-test-a0388",
storageBucket: "",
messagingSenderId: "649356034318"
};

firebase.initializeApp({
  apiKey: "AIzaSyCSUkWpvARbHh9GkEqmSnorlFJekRIRq8E",
  authDomain: "fir-test-a0388.firebaseapp.com",
  databaseURL: "https://fir-test-a0388.firebaseio.com",
  projectId: "fir-test-a0388",
  storageBucket: "",
  messagingSenderId: "649356034318"
  });

class CameraMock extends Camera {
  getPicture(options){
    return new Promise( (resolve, reject) => {
      resolve(`TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIG
      J1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3a
      GljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ug
      b2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmV
      yYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2
      YgYW55IGNhcm5hbCBwbGVhc3VyZS4=`);
      });
    }
  }

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ParkListPage,
    ParkRegisterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ParkListPage,
    ParkRegisterPage
  ],
  providers: [
    StatusBar,
    Dialogs,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    {provide: Camera, useClass: CameraMock},
    EventProvider,
    ProfileProvider
  ]
})
export class AppModule {}
