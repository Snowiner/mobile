import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkRegisterPage } from './park-register';

@NgModule({
  declarations: [
    ParkRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(ParkRegisterPage),
  ],
})
export class ParkRegisterPageModule {}
