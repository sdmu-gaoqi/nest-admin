export default {
  port: 9006,
  mysql: {
    port: 3306,
    host: '127.0.0.1',
    username: 'root',
    password: '123456',
    database: 'test', // 库名
    type: 'mysql',
    autoLoadEntities: true,
    synchronize: true,
  },
};
