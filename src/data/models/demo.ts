export interface TableDataProps {
  id: string;
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
  avatar: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  weekDays?: string[];
  schedule?: Array<{
    day: string;
    startTime: string;
    endTime: string;
  }>;
}

class DemoModel {
  public async getTableData(quantity?: number): Promise<Array<TableDataProps>> {
    return new Promise(resolve => {
      const res = Array.from({ length: quantity || 100 }, (_, index) => ({
        id: `dessert-${index + 1}`,
        name: `Dessert ${index + 1}`,
        calories: Math.floor(Math.random() * 500),
        fat: Math.random() * 20,
        carbs: Math.random() * 50,
        protein: Math.random() * 10,
        avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
        address: {
          street: `Street ${index + 1}`,
          city: `City ${index + 1}`,
          state: `State ${index + 1}`,
          zip: `Zip ${index + 1}`,
        },
        weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        schedule: [
          {
            day: `Day ${index + 1}`,
            startTime: `08:00`,
            endTime: `17:00`,
          },
          {
            day: `Day ${index + 1} Evening`,
            startTime: `18:00`,
            endTime: `22:00`,
          },
        ],
      }));

      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  }
}

const Demo = new DemoModel();
export default Demo;
