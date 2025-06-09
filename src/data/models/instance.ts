import { IIstance } from '../interfaces/instance';

class InstanceModel {
  public defaultInstance: IIstance = {
    theme: {
      primary: {
        100: '#45BAF5',
        200: '#3A9DDC',
        300: '#2F81C3',
        400: '#2465AA',
      },
    },
  };

  public async getInstance(): Promise<IIstance> {
    return new Promise((_resolve, reject) => {
      setTimeout(() => {
        // resolve({
        //   theme: {
        //     primary: {
        //       100: '#5eb3a7',
        //       200: '#1A9084',
        //       300: '#167168',
        //       400: '#10564F',
        //     },
        //     logo: 'https://cdn3d.iconscout.com/3d/free/thumb/free-react-native-3d-logo-download-in-png-blend-fbx-gltf-file-formats--software-social-media-pack-logos-4642743.png?f=webp',
        //   },
        // });

        reject(new Error('Failed to fetch instance data'));
      }, 2000);
    });
  }
}

const Instance = new InstanceModel();

export default Instance;
