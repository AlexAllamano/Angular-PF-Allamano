import { Directive,
  ElementRef,
  Input,
  Renderer2,
 } from '@angular/core';

@Directive({
  selector: '[appTituloEstilo]'
})
export class TituloEstiloDirective {

  constructor(private elementRef: ElementRef, private render: Renderer2) {
    this.render.setStyle(this.elementRef.nativeElement, 'font-size', '20px');
  }

}