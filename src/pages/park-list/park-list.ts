import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Park } from './park';
import { Dialogs } from '@ionic-native/dialogs';
import { ParkRegisterPage } from '../park-register/park-register';
/*
  Generated class for the ParkList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-park-list',
  templateUrl: 'park-list.html'
})
export class ParkListPage {
  parks: FirebaseListObservable<any[]>;
  searchQuery: string = '';
  do: Array<any> =[];
  loadedDo: Array<any>;
  doRef;
  constructor(public navCtrl: NavController) {
    /*
    parkData.getParks().then(theResult => {
      this.parks = theResult;
    })
    */
  this.doRef = firebase.database().ref('/parks');
   // this.parks =af.list('/parks');
   }

  addPark(){ //ParkRegisterPage로 넘어가는 함수.
    this.navCtrl.setRoot(ParkRegisterPage);
  }

  goParkDetails(theParkData){
    this.navCtrl.push("ParkDetailsPage", { parkData: theParkData });
  }

  ionViewDidLoad() {
    this.doRef.on('value', data=>{
      let tmp = [];
      data.forEach(data => {
        tmp.push({
          key: data.key,
          do: data.val().doo,
          si: data.val().si,
          place: data.val().place})      
      });
    this.do = tmp;
    this.loadedDo = tmp;
    });
  }
  
  initializeParks(){
    this.do = this.loadedDo;
  }

  getParks(event){
    this.initializeParks();
    let queryString = event.target.value;


    if(queryString !== undefined){
      if(queryString.trim() == '') { return; }

      this.do = this.do.filter((v) => {
        if(v.place && queryString){
          if(v.place.toLowerCase().indexOf(queryString.toLowerCase()) > -1){
              return true;
          }
          return false;
        }
      });
    }
  }

  resetList(event){
    this.initializeParks();
  }

   customHeaderFn(record, recordIndex, records){
     if(recordIndex > 0){
       if( record.do !== records[recordIndex-1].do){
                        return record.do;
       }else{
            return null;
      }
     }else{
          return record.do;
     }
    }
}
