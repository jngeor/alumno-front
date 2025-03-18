import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Alumno } from '../../models/alumno.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlumnoService } from '../../services/alumno.service';

@Component({
  selector: 'app-alumno-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './alumno-edit.component.html',
  styleUrl: './alumno-edit.component.css'
})
export class AlumnoEditComponent implements OnChanges {
  @Input() alumno!: Alumno; // Recibe el alumno a editar
  @Output() alumnoActualizado = new EventEmitter<void>(); 

  alumnoForm!: FormGroup;

  constructor(private fb: FormBuilder, private alumnoService: AlumnoService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['alumno'] && this.alumno) {
      this.initForm();
    }
  }

  initForm() {
    this.alumnoForm = this.fb.group({
      nombres: [this.alumno.nombres, [Validators.required, Validators.minLength(3)]],
      apellidos: [this.alumno.apellidos, [Validators.required, Validators.minLength(3)]],
      edad: [this.alumno.edad, [Validators.required, Validators.min(1)]],
      telefono: [this.alumno.telefono, [Validators.required, Validators.pattern('^[0-9]{9,15}$')]]
    });
  } 

  actualizarAlumno() {
    if (this.alumnoForm.valid) {
      const alumnoActualizado: Alumno = {
        ...this.alumno,
        ...this.alumnoForm.value
      };

      this.alumnoService.updateAlumno(this.alumno.id!, alumnoActualizado).subscribe(() => {
        this.alumnoActualizado.emit(); // Notifica que el alumno ha sido actualizado
      });
    }
  }  

}
