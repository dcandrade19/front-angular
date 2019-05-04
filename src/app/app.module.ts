import { QuestaoService } from './services/questao.service';
import { VagaService } from './services/vaga.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VagasListaComponent } from './components/vagas-lista/vagas-lista.component';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatListModule,
MatExpansionModule,
MatIconModule,
MatAutocompleteModule,
MatBadgeModule,
MatBottomSheetModule,
MatButtonToggleModule,
MatChipsModule,
MatDatepickerModule,
MatDialogModule,
MatDividerModule,
MatGridListModule,
MatInputModule,
MatMenuModule,
MatNativeDateModule,
MatPaginatorModule,
MatProgressBarModule,
MatProgressSpinnerModule,
MatRadioModule,
MatRippleModule,
MatSelectModule,
MatSidenavModule,
MatSliderModule,
MatSlideToggleModule,
MatSnackBarModule,
MatSortModule,
MatStepperModule,
MatTableModule,
MatTabsModule,
MatToolbarModule,
MatTooltipModule,
MatTreeModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavtabComponent } from './components/navtab/navtab.component';
import { TesteService } from './services/teste.service';
import { RespostaService } from './services/resposta.service';
import { VagaFormComponent } from './components/vaga-form/vaga-form.component';

@NgModule({
  declarations: [
    AppComponent,
    VagasListaComponent,
    NavtabComponent,
    VagaFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatListModule,
MatExpansionModule,
MatIconModule,
MatAutocompleteModule,
MatBadgeModule,
MatBottomSheetModule,
MatButtonToggleModule,
MatChipsModule,
MatDatepickerModule,
MatDialogModule,
MatDividerModule,
MatGridListModule,
MatInputModule,
MatMenuModule,
MatNativeDateModule,
MatPaginatorModule,
MatProgressBarModule,
MatProgressSpinnerModule,
MatRadioModule,
MatRippleModule,
MatSelectModule,
MatSidenavModule,
MatSliderModule,
MatSlideToggleModule,
MatSnackBarModule,
MatSortModule,
MatStepperModule,
MatTableModule,
MatTabsModule,
MatToolbarModule,
MatTooltipModule,
MatTreeModule,
FormsModule,
FlexLayoutModule
  ],
  providers: [
    VagaService,
    TesteService,
    QuestaoService,
    RespostaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
