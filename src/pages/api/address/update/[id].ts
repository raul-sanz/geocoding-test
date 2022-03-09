import prisma from '../../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;
  delete req.body.id;
  const result = await prisma.address.update({
    where: { id: Number(id) },
    data: { 
      ...req.body
     },
  });
  res.json(result);
}
