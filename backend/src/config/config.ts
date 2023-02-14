import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
    username: 'root',
    password: '123456',
    database: 'tsauth',
    host: 'db',
    port: 5432,
    dialect: 'postgres',
    logging: false,
};

export default config;
