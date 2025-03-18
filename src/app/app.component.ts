import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlumnoService } from './services/alumno.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'alumno-front';

  constructor(private alumnoService: AlumnoService) {}

  ngOnInit() {
    this.alumnoService.getAlumnos().subscribe(alumnos => {
      console.log('Lista de alumnos:', alumnos);
    });
  }

}
