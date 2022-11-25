import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntroduceRoutingModule } from './introduce-routing.module';
import { IntroduceComponent } from './introduce.component';


@NgModule({
  declarations: [
    IntroduceComponent
  ],
  imports: [
    CommonModule,
    IntroduceRoutingModule
  ]
})
export class IntroduceModule { }
