import { Component, signal } from '@angular/core';
import { Alumno } from '../../models/alumno.model';
import { AlumnoService } from '../../services/alumno.service';
import { AlumnoFormComponent } from '../alumno-form/alumno-form.component';
import { AlumnoEditComponent } from '../alumno-edit/alumno-edit.component';
import { AlumnoDeleteComponent } from '../alumno-delete/alumno-delete.component';

@Component({
  selector: 'app-alumnos-list',
  standalone: true,
  imports: [AlumnoFormComponent, AlumnoEditComponent, AlumnoDeleteComponent],
  templateUrl: './alumnos-list.component.html',
  styleUrl: './alumnos-list.component.css'
})
export class AlumnosListComponent {
  alumnos = signal<Alumno[]>([]);
  alumnoSeleccionado = signal<Alumno | null>(null);
  alumnoEliminarId = signal<string | null>(null);  
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

  seleccionarAlumno(alumno: Alumno) {
    this.alumnoSeleccionado.set(alumno);
  }

  eliminarAlumno(id: string) {
    this.alumnoEliminarId.set(id);
  }  

  cerrarEdicion() {
    this.alumnoSeleccionado.set(null);
  }

  cerrarEliminacion() {
    this.alumnoEliminarId.set(null);
  }  

}
