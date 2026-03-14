export type TramiteTipo = 'Nacimiento' | 'Matrimonio' | 'Defunción';
export type EstadoTipo = 'Pendiente' | 'En Proceso' | 'Finalizado';

export interface Ciudadano {
  id: string;
  nombre: string;
  apellido: string;
  cedula: string;
  tramite: TramiteTipo;
  estado: EstadoTipo;
  fechaRegistro: string;
  foto?: string;
}