import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signIn() {
    return { status: 1, message: 'signin' };
  }

  signUp() {
    return { status: 1, message: 'signup' };
  }
}
