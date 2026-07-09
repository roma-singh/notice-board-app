import { z } from 'zod';
import { Category, Priority } from '@prisma/client';

export const NoticeSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  body: z.string().trim().min(1, 'Body is required'),
  category: z.nativeEnum(Category, { message: 'Invalid category' }),
  priority: z.nativeEnum(Priority, { message: 'Invalid priority' }),
  publishDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Valid date is required',
  }).transform((date) => new Date(date)),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
});

export type NoticeFormData = z.infer<typeof NoticeSchema>;
