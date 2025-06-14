import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthVerifyPage } from './auth-verify.page';

describe('AuthVerifyPage', () => {
  let component: AuthVerifyPage;
  let fixture: ComponentFixture<AuthVerifyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthVerifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
