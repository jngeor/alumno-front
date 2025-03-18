import { Component, signal } from '@angular/core';
import { Alumno } from '../../models/alumno.model';
import { AlumnoService } from '../../services/alumno.service';
import { AlumnoFormComponent } from '../alumno-form/alumno-form.component';

@Component({
  selector: 'app-alumnos-list',
  standalone: true,
  imports: [AlumnoFormComponent],
  templateUrl: './alumnos-list.component.html',
  styleUrl: './alumnos-list.component.css'
})
export class AlumnosListComponent {
  alumnos = signal<Alumno[]>([]);
  mostrarFormulario = signal(false);

  constructor(private alumnoService: AlumnoService) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    this.alumnoService.getAlumnos().subscribe(data => {
      this.alumnos.set(data);
    });
  }

  toggleFormulario() {
    this.mostrarFormulario.set(!this.mostrarFormulario());
  }

  alumnoAgregado() {
    this.cargarAlumnos();
    this.mostrarFormulario.set(false);
  }

}
