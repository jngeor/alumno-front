import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';

@Component({
  selector: 'app-alumno-delete',
  standalone: true,
  imports: [],
  templateUrl: './alumno-delete.component.html',
  styleUrl: './alumno-delete.component.css'
})
export class AlumnoDeleteComponent {
  @Input() alumnoId!: string; // Recibe el ID del alumno a eliminar
  @Output() alumnoEliminado = new EventEmitter<void>(); // Notifica que un alumno fue eliminado

  constructor(private alumnoService: AlumnoService) {}

  eliminarAlumno() {
    this.alumnoService.deleteAlumno(this.alumnoId).subscribe(() => {
      this.alumnoEliminado.emit(); // Notifica la eliminación
    });
  }
}
