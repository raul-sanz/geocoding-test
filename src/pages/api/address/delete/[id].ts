import prisma from '../../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;
  const result = await prisma.address.delete({
    where: { id: Number(id) }
  });
  res.json(result);
}
