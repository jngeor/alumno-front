import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoDeleteComponent } from './alumno-delete.component';

describe('AlumnoDeleteComponent', () => {
  let component: AlumnoDeleteComponent;
  let fixture: ComponentFixture<AlumnoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
