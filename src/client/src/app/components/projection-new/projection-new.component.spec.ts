import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionNewComponent } from './projection-new.component';

describe('ProjectionNewComponent', () => {
  let component: ProjectionNewComponent;
  let fixture: ComponentFixture<ProjectionNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectionNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
