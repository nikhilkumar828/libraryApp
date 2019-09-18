import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { SearchComponent } from './components/dashboard/search/search.component';
import { FormsModule } from '@angular/forms';
import {FilterContentPipe} from './components/dashboard/filter-content.pipe';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SearchComponent,
        FilterContentPipe
      ],
      imports: [ HttpClientTestingModule,FormsModule,
        RouterTestingModule.withRoutes([]),]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'fccorejs'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    console.log(app);
    expect(app.title).toEqual('fccorejs');
  });
});
