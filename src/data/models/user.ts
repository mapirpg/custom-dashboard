import { IUser } from '@data/interfaces/user';
import Storage from '@data/storage';
class UserModel {
  public async signIn(email: string, password: string): Promise<IUser | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@example.com' && password === 'admin') {
          resolve({
            email,
            id: '1',
            name: 'Admin User',
            role: 'admin',
          });
        } else {
          reject('Api error: Invalid email or password');
        }
      }, 1000);
    });
  }

  public async revalidate(): Promise<IUser | null> {
    const storedUser = Storage.getItem('user');

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!storedUser) {
          reject('Api error: User not found');
        } else {
          resolve(storedUser);
        }
      }, 1000);
    });
  }
}

const User = new UserModel();
export default User;
