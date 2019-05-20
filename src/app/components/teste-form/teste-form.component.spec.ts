import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteFormComponent } from './teste-form.component';

describe('TesteFormComponent', () => {
  let component: TesteFormComponent;
  let fixture: ComponentFixture<TesteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
