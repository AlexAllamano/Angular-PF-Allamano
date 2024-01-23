import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NombreApellidoPipe } from './pipes/nombre-apellido.pipe';
import { TituloEstiloDirective } from './directives/titulo-estilo.directive';

@NgModule({
  declarations: [NombreApellidoPipe, TituloEstiloDirective],
  imports: [CommonModule],
  exports: [NombreApellidoPipe, TituloEstiloDirective],
})
export class HelpersModule {}
