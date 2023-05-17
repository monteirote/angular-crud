import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup;

  ngOnInit(): void {

  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name:[null],
      category: [null],
    });
  }

  onSubmit() {

  }

  onCancel() {

  }

}
