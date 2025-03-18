import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-alumno-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './alumno-form.component.html',
  styleUrl: './alumno-form.component.css'
})
export class AlumnoFormComponent {
  alumnoForm!: FormGroup;

  @Output() alumnoAgregado = new EventEmitter<void>(); // Evento para notificar cuando se agrega un alumno

  constructor(private alumnoService: AlumnoService, private fb: FormBuilder) {
    this.initForm();
  }

  initForm() {
    this.alumnoForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['', [Validators.required, Validators.min(1)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9,15}$')]]
    });
  }

  agregarAlumno() {
    if (this.alumnoForm.valid) {
      const nuevoAlumno: Alumno = {
        ...this.alumnoForm.value
      };

      this.alumnoService.createAlumno(nuevoAlumno).subscribe(() => {
        this.alumnoForm.reset();
        this.alumnoAgregado.emit(); // Notifica al componente padre
      });
    }
  }  

}
