import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ErrorService } from '../../../core/services/error.service';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './error-modal.component.html',
})
export class ErrorModalComponent {
  protected readonly errorService = inject(ErrorService);

  protected description(status: number): string {
    switch (status) {
      case 400:
        return '<strong>Datos inválidos.</strong> Algunos campos no cumplen con el formato esperado. Revisa <strong>cada campo</strong> del formulario, especialmente aquellos marcados, y corrige la información antes de enviar de nuevo.';
      case 401:
        return '<strong>Sesión expirada.</strong> No estás autenticado o tu sesión ya no es válida. <strong>Inicia sesión de nuevo</strong> con tu correo y contraseña para continuar. Si el problema persiste, contáctanos.';
      case 403:
        return '<strong>Acceso denegado.</strong> No tienes los permisos necesarios para esta sección o acción. Si crees que es un error, <strong>comunícate con el administrador</strong> del sistema.';
      case 404:
        return '<strong>No encontrado.</strong> El recurso al que intentas acceder no existe o fue eliminado. <strong>Verifica la URL</strong> o navega desde el menú para encontrar lo que buscas.';
      case 409:
        return '<strong>Registro duplicado.</strong> Ya existe un registro con esos mismos datos en el sistema. <strong>Usa valores diferentes</strong> para los campos únicos como nombre o código, o edita el registro existente.';
      case 422:
        return '<strong>Error de validación.</strong> Los datos enviados no cumplen con las reglas del servidor. <strong>Revisa los campos</strong> e intenta de nuevo con información correcta.';
      case 500:
        return '<strong>Error interno.</strong> Ocurrió un problema inesperado en el servidor. Puede deberse a una sobrecarga temporal. <strong>Espera unos minutos e intenta de nuevo.</strong> Si el error persiste, contacta al equipo de soporte.';
      default:
        return '<strong>Error inesperado.</strong> Algo salió mal. <strong>Intenta de nuevo más tarde.</strong> Si el problema continúa, comunícate con el administrador del sistema.';
    }
  }
}
