import { Pool } from 'pg'

export class DataSource {

    private static databasePool: Pool = null; 

    public static getPool(): Pool {
        if(!DataSource.databasePool){
            DataSource.databasePool = new Pool();
        }
        return DataSource.databasePool;
    }
}