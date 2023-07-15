import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  description: z.string(),
  birthDate: z.number(),
  coffeeCounter: z.number().optional(),
  coffeeExtraction: z.string().optional(),
  coffeeGrinderMachine: z.string().optional(),
  coffeeExtractionMachine: z.string().optional(),
});

export type UserModel = z.TypeOf<typeof userSchema>;
