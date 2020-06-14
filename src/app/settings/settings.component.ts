import { User } from './../shared/models/user.model';
import { UserService } from './../shared/services/user.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @ViewChild('credentialsForm', { static: false }) credentialsForm: NgForm;
  @ViewChild('settingsForm', { static: false }) settingsForm: NgForm;
  credentialsSave = 'Save';
  credentialsError: string = null;
  credentialsLoading = false;
  settingsSave = 'Save';
  settingsError: string = null;
  settingsLoading = false;
  email: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.user.subscribe((user: User) => {
      this.email = user.email;
    });
  }

  onSubmitCredentials() {
    this.credentialsLoading = true;
    this.userService.updatePassword(
      this.credentialsForm.value.currentPassword,
      this.credentialsForm.value.newPassword,
      this.credentialsForm.value.confirmPassword,
    ).subscribe(() => {
      this.credentialsLoading = false;
      this.credentialsError = null;
      this.credentialsForm.reset();
      this.credentialsSave = 'Saved';
      setTimeout(() => {
        this.credentialsSave = 'Save';
      }, 2000);
    }, (error: any) => {
      this.credentialsLoading = false;
      this.credentialsError = error.error.message;
    });
  }

  onSubmitSettings() {
    this.settingsLoading = true;
    this.userService.updateEmail(this.settingsForm.value.email).subscribe(() => {
      this.settingsLoading = false;
      this.settingsError = null;
      this.settingsSave = 'Saved';
      setTimeout(() => {
        this.settingsSave = 'Save';
      }, 2000);
    }, (error: any) => {
      this.settingsLoading = false;
      this.settingsError = error.error.message;
    });
  }
}
