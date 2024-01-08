export default {
  port: 9006,
  mysql: {
    port: 3306,
    host: '127.0.0.1',
    // username: 'root',
    // password: 'root',
    // database: 'store_main', // 库名
    username: 'root',
    password: '123456',
    database: 'test',
    type: 'mysql',
    autoLoadEntities: true,
    synchronize: true,
  },

  redisConf: {
    host: '127.0.0.1',
    port: 6379,
    db: 0,
  },
};
