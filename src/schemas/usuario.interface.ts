export interface CursoUsuario {
  idCurso: string;
  estado: 'iniciado' | 'en curso' | 'completado';
  fechaIngreso: string; // Fecha de ingreso al curso en formato ISO
  progreso: number; // Porcentaje de progreso (0-100)
}

export interface Usuario {
  email: string; // Partition Key
  name: string;
  password: string;
  cursos: CursoUsuario[]; // IDs de los cursos asociados
}
