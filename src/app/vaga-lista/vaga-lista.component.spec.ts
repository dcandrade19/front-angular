import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaListaComponent } from './vaga-lista.component';

describe('VagaListaComponent', () => {
  let component: VagaListaComponent;
  let fixture: ComponentFixture<VagaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VagaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VagaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
