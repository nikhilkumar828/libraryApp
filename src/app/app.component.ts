import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('navCol', { static: true }) navCol: ElementRef;

  constructor(private renderer: Renderer2) {  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.navCol.nativeElement, 'padding-left', '0px');
    this.renderer.setStyle(this.navCol.nativeElement, 'padding-right', '0px');
  }
}
