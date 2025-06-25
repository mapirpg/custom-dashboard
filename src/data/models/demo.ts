export interface TableDataProps {
  id: string;
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
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
      }));

      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  }
}

const Demo = new DemoModel();
export default Demo;
