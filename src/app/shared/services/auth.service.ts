import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  // Credentials are not stored in local storage.
  // They are only saved in memory, and only support one user.
  public credentials = {
    email: null,
    password: null
  };
  public profile = {
    name: null,
    employer: null,
    job: null,
    birthday: null
  };
  // Auth state
  public authenticated:boolean = false;
  constructor() {}

  public signInUp(event):boolean {
    if (event.action === 'signup') {
      this.signUp(event);
    } else if (event.action === 'signin') {
      this.signIn(event);
    }
    return this.checkAuth();
  }

  public signOut():void {
    this.credentials.email = null;
    this.credentials.password = null;
    console.log('sign out successful');
  }

  public checkAuth():boolean {
    console.log('Auth state: ' + this.authenticated);
    return this.authenticated;
  }

  private signIn(credentialsEntered):void {
    if (this.credentials.password !== null // Only authenticate if user was created
        && this.credentials.email === credentialsEntered.email
        && this.credentials.password === credentialsEntered.password) {
        console.log('sign in successful');
        this.authenticated = true;
    }
  }

  private signUp(formData):void {
    // Save credentials
    this.credentials.email = formData.email;
    this.credentials.password = formData.password;
    // Save profile info
    this.profile.name = formData.name;
    this.profile.employer = formData.employer;
    this.profile.job = formData.job;
    this.profile.birthday = formData.birthday;
    // Authenticate
    this.authenticated = true;
    console.log('sign up successful');
  }

  

}