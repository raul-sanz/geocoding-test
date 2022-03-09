
import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const result = await prisma.address.create({
    data: {
      ...req.body
    },
  });
  res.json(result);
}