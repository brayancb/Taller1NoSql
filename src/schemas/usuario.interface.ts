export interface Usuario {
  email: string; // Partition Key
  name: string;
  password: string;
  cursos: string[]; // IDs de los cursos asociados
}
