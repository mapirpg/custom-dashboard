import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { FieldValues, Resolver } from 'react-hook-form';

type ValidationType = 'email';

interface FieldProps<T> {
  field: keyof T;
  type?: ValidationType;
  schema?: z.ZodTypeAny;
  required?: boolean;
  compareField?: keyof T;
  errorMessage?: string;
}

interface ValidationProps<T> {
  fields: FieldProps<T>[];
}

export const useFormValidation = <T extends FieldValues>({ fields }: ValidationProps<T>) => {
  const { t } = useTranslation();

  const defaultSchemas: (props: { required?: boolean }) => Record<ValidationType, z.ZodTypeAny> = (
    props = { required: true },
  ) => ({
    email: props.required
      ? z
          .string()
          .min(1, { message: t('requiredField') })
          .email({ message: t('invalidEmail') })
      : z
          .string()
          .email({ message: t('invalidEmail') })
          .optional(),
  });

  const getUnknownField: (props: { required?: boolean; errorMessage?: string }) => z.ZodTypeAny = (
    props = { required: true },
  ) => {
    return props.required
      ? z.string().min(1, { message: props?.errorMessage || t('requiredField') })
      : z.string().optional();
  };

  const getSchema = () => {
    let schema = z.object(
      fields.reduce(
        (acc, { field, type, schema, required = true, errorMessage }) => {
          const schemas = defaultSchemas({ required });
          const unknownField = getUnknownField({ required, errorMessage });

          if (type && Object.keys(schemas).includes(String(type))) {
            acc[field] = schemas[type];
          } else if (schema) {
            acc[field] = schema;
          } else {
            acc[field] = unknownField;
          }

          return acc;
        },
        {} as Record<keyof T, z.ZodTypeAny>,
      ),
    );

    fields
      .filter(item => item.compareField)
      .forEach(item => {
        schema = schema.refine(
          data => {
            const compareValue = data[item.compareField as keyof T];
            const fieldValue = data[item.field as keyof T];
            return compareValue === fieldValue;
          },
          {
            message: item.errorMessage || t('fieldsMustMatch'),
            path: [String(item.field)],
          },
        );
      });

    return schema;
  };

  const schema = getSchema();
  const resolver = zodResolver(schema) as unknown as Resolver<T>;

  return {
    schema,
    resolver,
  };
};
