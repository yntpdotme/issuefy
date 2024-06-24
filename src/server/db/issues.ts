import prisma from '@/prisma/client';
import {Prisma} from '@prisma/client';

export const createIssue = async (issue: Prisma.IssueCreateInput) => {
  const newIssue = await prisma.issue.create({data: issue});

  return newIssue;
};
