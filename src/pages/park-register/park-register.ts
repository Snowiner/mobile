import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParkListPage } from '../park-list/park-list';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AlertController } from 'ionic-angular'; //주차장 추가 입력확인창
import { _appIdRandomProviderFactory } from '@angular/core/src/application_tokens';



@IonicPage()
@Component({
  selector: 'page-park-register',
  templateUrl: 'park-register.html',
})



export class ParkRegisterPage {

  parks: FirebaseListObservable<any[]>;
  toggle : FirebaseListObservable<any[]>;

  doo: string; //도 이름 (충청도,전라도 등)
  si: string; //시 이름 ( 대구광역시 , 포항시 등)
  place: string; //주차장 장소 ( ex) 한동대학교 은혜관  )
  wide: string; //면적.
  a: number; //a 섹션 최대 수용가능 차량대(수)
  b: number;
  c: number;
  d: number;
  e: number;
 detailRef;
 detail: Array<Object> = [];
  a_arr: Array<Object> = [];//a섹션 배열. 각각의 원소는 차량1대공간을 의미하며, carnum(자리이름)과 toggle(사용가능여부)를 가지고있음
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase,
    private alertCtrl: AlertController) {
     this.parks = af.list('/parks'); //constructor 인자에 alertcontroller 추가시켜줘야함
     this.toggle = af.list('/toggle');
    }


  return2enroll(doo, si, place, wide, a, b, c, d, e) {
    for (var i = 0; i < a; i++) {//firebase에 반영하기 전에, 미리 섹션별로 배열을 만들어주는 작업을 한다.
      this.a_arr[i] = { carnum: 'A' + i, toggle: true,id:i };
    }
    for (var i = 0; i < b; i++) {
      this.a_arr[+a + +i] = { carnum: 'B' + i, toggle: true ,id:+a + +i};
    }
    for (var i = 0; i < c; i++) {
      this.a_arr[+a + +b + +i] = { carnum: 'C' + i, toggle: true,id:+a + +b + +i };
    }
    for (var i = 0; i < d; i++) {
      this.a_arr[+a + +b + +c + +i] = { carnum: 'D' + i, toggle: true,id:+a + +b + +c + +i };
    }
    for (var i = 0; i < e; i++) {
      this.a_arr[+a + +b + +c + +d + +i] = { carnum: 'E' + i, toggle: true,id:+a + +b + +c + +d + +i };
    }

//id을 통해서 detail 밑의 번호 알수 있고 => 이를통해서
//('/parks/'+this.key+'/detail/'+details.id)=>세부접근 가능하도록 씨발
///////////////////////////////////////////////////////////////////

    let alert = this.alertCtrl.create({
      title: '주차장 등록 정보 ',
      message: '아래의 정보로 추가 하시겠습니까?<br\><br\>'
        + '위치 : ' + doo + ' ' + si + '<br\>'
        + '장소 : ' + place + "<br\>"
        + '면적 : ' + wide + '㎡' + "<br\>"
        + 'A sec : ' + a + '대' + "<br\>"
        + 'B sec : ' + b + '대' + "<br\>"
        + 'C sec : ' + c + '대' + "<br\>"
        + 'D sec : ' + d + '대' + "<br\>"
        + 'E sec : ' + e + '대',
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: () => {

            this.navCtrl.setRoot(ParkRegisterPage);
          }
        },
        {
          text: '등록',
          handler: () => {
          /*
            var newPostRef = this.detailRef.push();
            //this.detailRef=firebase.database().ref('/parks');
          
            newPostRef.set({
              doo:doo, si:si, place: place, wide: wide, detail: this.a_arr}
            );
*/          
            this.parks.push({ doo:doo, si:si, place: place, wide: wide ,detail:this.a_arr});
            
            
            //기존 location 을 그냥 doo 와 si 로 나눴습니다.
            // else {
            //   let alert = this.alertCtrl.create({
            //     title: '지역 선택 오류',
            //     subTitle: '다시 선택하여 주십시오',
            //     buttons: ['확인']
            //   });
            //   alert.present();
            //   this.navCtrl.setRoot(ParkRegisterPage);
            // }
            this.a_arr = [];//위에서 채워놓았던 배열들을 비워주는 작업.( 또다른 주차장 생성을 위해서)
     
            this.navCtrl.setRoot(ParkListPage);


          }
        }
      ]
    });
    alert.present();



  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkRegisterPage');
  }

}


