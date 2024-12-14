import neo4j from 'neo4j-driver';
import * as dotenv from 'dotenv';
import { join } from 'path';

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: join(__dirname, '../../.env')} );

export const driver = neo4j.driver(
//'bolt://localhost:7687',
process.env.NEO4J_URI,
neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD),
);