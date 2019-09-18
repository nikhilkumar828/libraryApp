import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FilterContentPipe} from '../filter-content.pipe';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent, FilterContentPipe ],
      imports : [FormsModule,
                RouterModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('fieldSearch should be `isbn` initially', () => {
    const component: SearchComponent = new SearchComponent();
    expect(component.fieldSearch).toEqual('isbn');
  });
  it('title should be `Search for your book..` initially', () => {
    const component: SearchComponent = new SearchComponent();
    expect(component.title).toEqual('Search for your book..');
  });
});
