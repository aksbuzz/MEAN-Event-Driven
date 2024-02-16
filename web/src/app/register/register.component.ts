import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  form!: FormGroup;

  //FormBuilder provides syntax that reduces boilerplate
  //code to build complex forms
  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: '',
      username: '',
      password: '',
      confirm: '',
    });
  }
}
