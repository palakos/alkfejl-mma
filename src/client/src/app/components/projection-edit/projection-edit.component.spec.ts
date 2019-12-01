import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionEditComponent } from './projection-edit.component';

describe('ProjectionEditComponent', () => {
  let component: ProjectionEditComponent;
  let fixture: ComponentFixture<ProjectionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
