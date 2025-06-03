import IUserRepository from './repository.js';
import { generateToken } from '../../core/authentication.js';
import bcrypt from 'bcryptjs';

class AuthenticationController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
  
      const existingUser = await IUserRepository.getSingle({email});
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
  
      const newUser = await IUserRepository.add({
        name,
        email,
        password, 
      });
  
      const token = generateToken(newUser);
      res.status(200).json({
        userId: newUser.id,
        accessToken: token,
        refreshToken: token,
        username: newUser.name, 
        email: newUser.email, 
      });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await IUserRepository.getSingle({email});
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const token = generateToken(user);

      res.status(200).json({
        userId: user.id,
        accessToken: token,
        refreshToken: token,
        username: user.name, 
        email: user.email, 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
  }
}

export default new AuthenticationController();
