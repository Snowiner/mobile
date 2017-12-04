import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Dialogs } from '@ionic-native/dialogs';
import * as firebase from 'firebase';

/**
 * Generated class for the ParkDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-park-details',
  templateUrl: 'park-details.html',
})
export class ParkDetailsPage {
  check: Object;
  key: any;
  parkDetailRef;toggle;
  detail: Array<Object> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public af:AngularFireDatabase, public dialogs: Dialogs) {
  
    this.check = navParams.data.parkData;
    this.key = navParams.data.parkData.key;
    this.parkDetailRef = firebase.database().ref('/parks/'+this.key);
    this.toggle = firebase.database().ref('/parks/'+this.key+'/detail/');
  }

  ionViewDidLoad() {
    this.parkDetailRef.child('detail').on('value', data=>{
      data.forEach(data => {
       this.detail.push({
          carnum: data.val().carnum,
          toggle: data.val().toggle,
          id: data.val().id})      
    }); 
   });
  }
  
  toggleButton(details:any){
    
    window.alert( details.id);

    firebase.database().ref('/parks/'+this.key+'/detail/'+details.id+'/')
    .update({carnum:details.carnum , toggle:!details.toggle});
  //   this.toggle.on('value', data=>{
  //     data.forEach(data => {
  //      if(data.val().carnum == details.carnum){
  //        this.toggle.update(details,{carnum:details.carnum , toggle:!details.toggle});
  //      }
       
      
  //   }); 
  //  });
  
  }
}
