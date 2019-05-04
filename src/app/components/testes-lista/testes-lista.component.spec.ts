import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestesListaComponent } from './testes-lista.component';

describe('TestesListaComponent', () => {
  let component: TestesListaComponent;
  let fixture: ComponentFixture<TestesListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestesListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
