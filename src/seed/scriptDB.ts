import { DynamoDBClient, ListTablesCommand, DeleteTableCommand, CreateTableCommand, ScalarAttributeType, KeyType } from '@aws-sdk/client-dynamodb';
import * as dotenv from 'dotenv';

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const client = new DynamoDBClient({
  region: process.env.DYNAMODB_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const listTables = async () => {
  try {
    const data = await client.send(new ListTablesCommand({}));
    console.log('Existing tables:', data.TableNames);
  } catch (error) {
    console.error('Error listing tables:', error);
  }
};

export const deleteTable = async (tableName: string) => {
  const params = {
    TableName: tableName,
  };

  try {
    await client.send(new DeleteTableCommand(params));
    console.log(`Table ${tableName} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting table ${tableName}:`, error);
  }
};

export const createTable = async () => {
  const params = {
    TableName: 'Users',
    KeySchema: [
      { AttributeName: 'email', KeyType: KeyType.HASH }, // Primary key
    ],
    AttributeDefinitions: [
      { AttributeName: 'email', AttributeType: ScalarAttributeType.S }, // 'S' significa string
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  };

  try {
    await client.send(new CreateTableCommand(params));
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

// Llama a las funciones según sea necesario

deleteTable('Users');
createTable();
listTables();