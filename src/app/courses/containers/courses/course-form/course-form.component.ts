import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { CoursesService } from '../../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/courses/model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form = this.formBuilder.group({
    _id: [''],
    name: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(30)],
    ],
    category: ['', [Validators.required]],
  });

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      name: course.name,
      category: course.category,
      _id: course._id,
    });
  }

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (result) => this.onSucess(),
      (error) => this.onError()
    );
  }

  onCancel() {
    this.location.back();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso.', '', { duration: 3000 });
  }

  private onSucess() {
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 3000 });
    this.location.back();
  }

  getErrorMessage(fieldName: string) {

    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ?
                                field.errors['minlength']['requiredLength'] : 3;
      return `Nome curto demais.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ?
                                field.errors['maxlength']['requiredLength'] : 30;
      return `Nome longo demais.`;
    }

    return 'Campo inválido';
  }
}
