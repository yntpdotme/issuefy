import prisma from '@/prisma/client';
import {Prisma, Status} from '@prisma/client';

export const createIssue = async (issue: Prisma.IssueCreateInput) => {
  const newIssue = await prisma.issue.create({data: issue});

  return newIssue;
};

export const getIssues = async (status?: Status) => {
  const issues = await prisma.issue.findMany({
    where: {status},
    orderBy: {createdAt: 'desc'},
  });

  return issues;
};

export const getIssue = async (id: number) => {
  const issue = await prisma.issue.findUnique({
    where: {id},
  });

  return issue;
};

export const updateIssue = async (
  id: number,
  issue: Prisma.IssueUpdateInput,
) => {
  const updatedIssue = await prisma.issue.update({
    where: {id},
    data: issue,
  });

  return updatedIssue;
};

export const deleteIssue = async (id: number) => {
  await prisma.issue.delete({where: {id}});
};
