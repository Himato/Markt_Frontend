import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SpinnerComponent,
  ],
  imports: [CommonModule],
  exports: [
    SpinnerComponent,
    CommonModule,
  ],
  entryComponents: [],
  providers: []
})
export class SharedModule { }
