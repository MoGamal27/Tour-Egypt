import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  user?: any;
}

const authenticateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Check for token in cookies or Authorization header
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.redirect('/login.html');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    
    // Check if user exists (could be tourist or tour guide)
    let user = await prisma.tourist.findUnique({
      where: { id: decoded.id }
    });

    if (!user) {
      user = await prisma.tourGuide.findUnique({
        where: { id: decoded.id }
      });
    }

    if (!user) {
      return res.redirect('/login.html');
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.redirect('/login.html');
  }
};

export default authenticateUser;