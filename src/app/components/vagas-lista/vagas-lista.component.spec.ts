import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VagasListaComponent } from './vagas-lista.component';

describe('VagasListaComponent', () => {
  let component: VagasListaComponent;
  let fixture: ComponentFixture<VagasListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VagasListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VagasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
