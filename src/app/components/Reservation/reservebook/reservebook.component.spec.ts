import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservebookComponent } from './reservebook.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { componentFactoryName } from '@angular/compiler';
import { RouterTestingModule } from '@angular/router/testing';



describe('ReservebookComponent', () => {
  let component: ReservebookComponent;
  let fixture: ComponentFixture<ReservebookComponent>;
  let inputElement: HTMLInputElement;
  let inputElement1: HTMLInputElement;
  let spy;

  beforeEach(async (() => {
    TestBed.configureTestingModule( {
      declarations: [ ReservebookComponent ],
      imports : [
        RouterTestingModule,
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

  beforeEach(() =>  {
    inputElement = fixture.nativeElement.querySelector('input[name=issueDate]');
    inputElement1 = fixture.nativeElement.querySelector('input[name=returnDate]');
    spy = jasmine.createSpyObj('ReservebookComponent', ['setIssueDate', 'setReturnDate']);
  });

  it('setIssue date function called', async( () => {
    const date = 'Wed Sep 18 2019 00:00:00 GMT+0530 (India Standard Time)';
    sendIssueDate(date).then(() => {
    spy.setIssueDate('Wed Sep 18 2019 00:00:00 GMT+0530 (India Standard Time)');
    expect(spy.setIssueDate).toHaveBeenCalledWith(date);
    });
 }));

  it('setReturnDate date function called', async( () => {
  const date = 'Wed Sep 18 2019 00:00:00 GMT+0530 (India Standard Time)';
  sendReturnDate(date).then(() => {
  spy.setReturnDate('Wed Sep 18 2019 00:00:00 GMT+0530 (India Standard Time)');
  expect(spy.setReturnDate).toHaveBeenCalledWith(date);

  });
}));

  function sendIssueDate(date: string) {
    inputElement.value = date;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    return fixture.whenStable();
  }

  function sendReturnDate(date: string) {
    inputElement1.value = date;
    inputElement1.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    return fixture.whenStable();
  }

  beforeEach(() => {
      // tslint:disable-next-line: object-literal-key-quotes max-line-length
      const store = {'admin': false, '_id': '5d82e9d8951828000422e235', 'firstName': 'virender', 'lastName': 'gulair', 'username': 'vg@gmail.com', 'createdDate': '2019-09-19T02:37:12.251Z', '__v': 0, 'code': 'J2n6Q14', 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZDgyZTlkODk1MTgyODAwMDQyMmUyMzUiLCJpYXQiOjE1NjkzMTc1NDZ9.srOK_cPIwtE-DkyOy_zcwiI-CDPPebPHOLJcoyU5Ao4'};
      const mockLocalStorage = {
        getItem: (key: string): string => {
          return key in store ? store[key] : null;
        }
      };

      spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);

    });

  // it('reserve book function called', async(() => {
  //   component.books = [
  //     {
  //       quantity: 3,
  //       rentedCount: 1,
  //       rentedBy: [
  //         {
  //           ownerID: '5d831029677e530004f69d0f',
  //           startDate: '2019-09-24T18:30:00.000Z',
  //           daysToRent: 2
  //         }
  //       ],
  //       _id: '5d83519dfd108a80d2a5425e',
  //       title: 'Get Programming with Node.js',
  //       // tslint:disable-next-line: max-line-length
  //       description: 'Get Programming with Node.js Get Programming with Node.js teaches you to write server-side code in JavaScript using Node.js. In 37 fast-paced, fun, and practical lessons, you\'ll discover how to extend your existing JavaScript skills to write back-end code for your web applications.Node.js delivers the speed and reliability you need for ecommerce, social media, and gaming applications. It comes with thousands of prebuilt packages to help you get started immediately. If you want to use JavaScript on the server, Node.js is your choice.',
  //       // tslint:disable-next-line: max-line-length
  //       image: '',
  //       isbn: '9781617294747',
  //       author: 'Jonathan Wexler',
  //       publisher: 'Manning',
  //       category: 'IT',
  //       year: 2019,
  //       createdDate: '2019-09-19T09:59:57.259Z',
  //       __v: 0,
  //       id: '5d83519dfd108a80d2a5425e'
  //     }
  //   ];
  //   console.log(component.books);
  //   component.reserveBook();
  //   expect(component).toBeTruthy();
  // }));

});
