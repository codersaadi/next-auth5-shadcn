import { db } from '@/lib/db';

class UserRepository {
  async getUserByEmail(email: string) {
    try {
      return await db.user.findUnique({
        where: { email },
      });
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new Error('Could not fetch user by email');
    }
  }

  async getUserById(id: string) {
    try {
      return await db.user.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw new Error('Could not fetch user by ID');
    }
  }
  async verifyUserEmail(id : string){
    await db.user.update({
      where: { id },
      data: {
        emailVerified: new Date(),
      },
    });
  }

}

const userRepository = new UserRepository();
export default userRepository;
