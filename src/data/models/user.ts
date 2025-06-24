import { IUser } from '@data/interfaces/user';
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

  public async revalidate(user?: IUser): Promise<IUser | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!user) {
          reject('Api error: User not found');
        } else {
          resolve(user);
        }
      }, 1000);
    });
  }
}

const User = new UserModel();
export default User;
