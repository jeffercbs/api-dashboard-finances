export interface DBConfig {
   host: string;
   port: number;
   username: string;
   password: string;
   database: string;
}

export const dbconfig: DBConfig = {
   host: 'localhost',
   port: 5432,
   username: 'postgres',
   password: 'hack4u',
   database: 'finances',
};
