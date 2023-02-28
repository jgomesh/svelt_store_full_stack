import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
    username: 'postgres',
    password: '123456',
    database: 'tsauth',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
};

export default config;
