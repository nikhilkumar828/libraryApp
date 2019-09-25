import { Directive, Input, ElementRef, HostListener, Renderer2, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements AfterViewChecked {
  @Input() className: string;

  ngAfterViewChecked(): void {
    this.dropDownElement = (document.querySelector(this.className + ' .dropdown-menu') as HTMLElement);
  }
  dropDownElement:  HTMLElement;

  @HostListener('mouseenter') mouseEnter() {
    this.dropDownElement.style.display = "block";
  }

  @HostListener('mouseleave') mouseLeave() {
    this.dropDownElement.style.display = "none";
  }

  constructor(private renderer: Renderer2) { }

}
