import { z } from 'zod';

export const useLoginForm = () => {
  const schema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string(),
  });

  return {
    schema,
  };
};

export type LoginFormValuesProps = z.infer<
  typeof useLoginForm extends () => { schema: infer S } ? S : never
>;
