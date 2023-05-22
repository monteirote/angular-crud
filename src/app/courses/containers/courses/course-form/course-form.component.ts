import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { CoursesService } from '../../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    name: [''],
    category: [''],
  });

  ngOnInit(): void {

  }

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private service: CoursesService,
    private snackBar: MatSnackBar,
  ) {

  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      result => this.onSucess(),
      error => this.onError(),
    );
  }

  onCancel() {
    this.location.back();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso.','', {duration: 3000});
  }

  private onSucess() {
    this.snackBar.open('Curso salvo com sucesso!','', {duration: 3000});
    this.location.back();
  }
}
