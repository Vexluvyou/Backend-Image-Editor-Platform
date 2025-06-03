import { Sequelize } from 'sequelize';
import MyEnvironment from './core/environment.js';


const sequelize = new Sequelize(MyEnvironment.DbConnection.database, MyEnvironment.DbConnection.user, MyEnvironment.DbConnection.password, {
  host: MyEnvironment.DbConnection.host,
  port: MyEnvironment.DbConnection.port,
  dialect: MyEnvironment.DbConnection.dialect,
});

// (async () => {
//   try {
//     await sequelize.sync({ force: false });
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// })();

export default sequelize;
