import { driver } from './neo4j.config';

async function testConnection() {
  const session = driver.session();
  try {
    const result = await session.run('RETURN 1');
    console.log('Conexión exitosa a Neo4j');
  } catch (error) {
    console.error('Error al conectar a Neo4j:', error);
  } finally {
    await session.close();
    await driver.close();
  }
}

testConnection();