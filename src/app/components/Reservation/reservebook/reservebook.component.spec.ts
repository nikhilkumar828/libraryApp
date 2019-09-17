import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservebookComponent } from './reservebook.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('ReservebookComponent', () => {
  let component: ReservebookComponent;
  let fixture: ComponentFixture<ReservebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservebookComponent ],
      imports : [
        FormsModule,
        NgbModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setIssue date function called', async(() => {
    component.setIssueDate('Wed Sep 18 2019 00:00:00 GMT+0530 (India Standard Time)');
    expect(component.setIssueDate).toBeTruthy();
  }));
});
