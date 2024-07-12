export interface FormError {
    path: string[]; // Ruta del campo que falló la validación
    message: string; // Mensaje de error asociado con el campo
  }