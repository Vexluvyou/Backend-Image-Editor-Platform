import jwt from 'jsonwebtoken';
import MyEnvironment  from './environment.js';


export const generateToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, MyEnvironment.Jwt_Secret, {
      expiresIn: '1h',
    });
  };
  
  export const verifyToken = (token) => {
    return jwt.verify(token, MyEnvironment.Jwt_Secret);
  };
  