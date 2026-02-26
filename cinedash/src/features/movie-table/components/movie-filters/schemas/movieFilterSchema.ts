import { z } from 'zod';

export const movieFilterSchema = z.object({
  query: z.string().optional(),
  genre: z.string().optional(),
  year: z.string().optional(),
  rating: z.number().min(0).max(10).optional(),
});

export type MovieFilterFormData = z.infer<typeof movieFilterSchema>;