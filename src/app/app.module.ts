import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StepsModule } from 'primeng-lts/steps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsComponent } from './components/details/details.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { CardModule } from 'primeng-lts/card';
import { RadioButtonModule } from 'primeng-lts/radiobutton';
import { DropdownModule } from 'primeng-lts/dropdown';
import { ButtonModule } from 'primeng-lts/button';
import { InputNumberModule } from 'primeng-lts/inputnumber';
import { DialogModule } from 'primeng-lts/dialog';
@NgModule({
  declarations: [AppComponent, DetailsComponent, ReviewsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StepsModule,
    FormsModule,
    BrowserAnimationsModule,
    CardModule,
    ReactiveFormsModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    InputNumberModule,
    DialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
