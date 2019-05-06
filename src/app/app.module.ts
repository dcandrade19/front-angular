import { QuestaoService } from './services/questao.service';
import { VagaService } from './services/vaga.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VagasListaComponent } from './components/vagas-lista/vagas-lista.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ReactiveFormsModule } from '@angular/forms';
import { TestesListaComponent } from './components/testes-lista/testes-lista.component';
import { registerLocaleData, DatePipe } from '@angular/common';
import localeBr from '@angular/common/locales/pt';

registerLocaleData(localeBr, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    VagasListaComponent,
    NavtabComponent,
    TestesListaComponent,
    VagaFormComponent
  ],
  imports: [
  AppRoutingModule,
  HttpClientModule,
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
  FlexLayoutModule,
  ReactiveFormsModule
  ],
  providers: [
    VagaService,
    TesteService,
    QuestaoService,
    RespostaService,
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
