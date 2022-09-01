import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdownDirective]',
})
export class DropdownDirectiveDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  @HostListener('click') openDropDown(eventData: Event) {
    const elementClasses = this.elRef.nativeElement.classList;
    elementClasses.toggle('open');
    // this.renderer.addClass(this.elRef.nativeElement, 'open');
  }
}
