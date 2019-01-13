import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'
import { AppConstant } from '../app.constant'
import {Router} from "@angular/router";
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registration_msg: string = "";
  public registrationFormGroup: FormGroup;
  registration_result: boolean = false;
  submitted: boolean = false;
  data: any;
  message = {
    "success": "registration successfully !",
    "error": "Some error occurred during registration."
  };

  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.initRegistrationForm();
  }

  initRegistrationForm() {
    this.registrationFormGroup = this.formBuilder.group({
      fName: [null, [Validators.required, Validators.pattern(AppConstant.ALPHA_PATTERN), Validators.maxLength(30)]],
      lName: [null, [Validators.required, Validators.pattern(AppConstant.ALPHA_PATTERN), Validators.maxLength(30)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(30)]],
      dateOfBirth: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      mobile: [null, [Validators.pattern(AppConstant.NUMBER_PATTERN), Validators.minLength(10), Validators.maxLength(10)]],
      city: [null, [Validators.required, Validators.pattern(AppConstant.ALPHA_PATTERN), Validators.maxLength(30)]],
      address: [null, [Validators.required, Validators.maxLength(250)]],
    });
  }

  isValidField(form: FormGroup, field: string, submitted: boolean) {
    return this.validateField(form, field, submitted);
  }

  validateField(form: FormGroup, field: string, submitted: boolean) {
    let isFieldValid = (submitted && form.get(field).errors) || (form.get(field).errors &&
      (form.get(field).touched || form.get(field).dirty));

    return isFieldValid;
  }

  onSignFormSubmit(registrationFormData) {
    this.submitted = true;
    if (this.registrationFormGroup.invalid) {
      return;
    }
    this.data = this.appService.registration(registrationFormData);
    this.data.subscribe(res => {
      this.registrationFormGroup.reset();
      if (res['message'] == "success") {
        this.registration_result = true;
        this.registration_msg = this.message.success;
        this.router.navigateByUrl('/user-list');
      } else {
        this.registration_result = false;
        this.registration_msg = this.message.error;
      }
    });
  }
}
