import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { NoticeSchema } from '../../../lib/validation';
import { ZodError } from 'zod';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'GET') {
    try {
      const notice = await prisma.notice.findUnique({
        where: { id },
      });
      if (!notice) {
        return res.status(404).json({ error: 'Notice not found' });
      }
      return res.status(200).json(notice);
    } catch (error) {
      console.error('Error fetching notice:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const data = NoticeSchema.parse(req.body);
      const notice = await prisma.notice.update({
        where: { id },
        data: {
          title: data.title,
          body: data.body,
          category: data.category,
          priority: data.priority,
          publishDate: data.publishDate,
          image: data.image || null,
        },
      });
      return res.status(200).json(notice);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: 'Validation failed', details: error.issues });
      }
      // Check if Prisma throws a RecordNotFound error
      if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025') {
        return res.status(404).json({ error: 'Notice not found' });
      }
      console.error('Error updating notice:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.notice.delete({
        where: { id },
      });
      return res.status(204).end();
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025') {
        return res.status(404).json({ error: 'Notice not found' });
      }
      console.error('Error deleting notice:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
