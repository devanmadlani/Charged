import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelfScanPage } from './self-scan.page';

describe('SelfScanPage', () => {
  let component: SelfScanPage;
  let fixture: ComponentFixture<SelfScanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
