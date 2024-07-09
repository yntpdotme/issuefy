import prisma from '@/prisma/client';
import {Issue, Prisma, Status} from '@prisma/client';

export const createIssue = async (issue: Prisma.IssueCreateInput) => {
  const newIssue = await prisma.issue.create({data: issue});

  return newIssue;
};

export const getIssues = async (
  params: {
    status?: Status;
    orderBy?: keyof Pick<Issue, 'title' | 'status' | 'createdAt'>;
    page?: number;
    pageSize?: number;
  } = {},
) => {
  const {status, orderBy, page = 1, pageSize = 10} = params;

  const issues = await prisma.issue.findMany({
    where: {status},
    orderBy: orderBy
      ? [{[orderBy]: 'asc'}, {createdAt: 'desc'}]
      : {createdAt: 'desc'},
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalIssues = await prisma.issue.count({
    where: {status},
  });

  return {
    data: issues,
    currentPage: page,
    pageSize,
    totalIssues,
  };
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

export const getIssuesWithUsers = async (
  params: {
    status?: Status;
    orderBy?: keyof Pick<Issue, 'title' | 'status' | 'createdAt'>;
    page?: number;
    pageSize?: number;
    includeUser?: boolean;
  } = {},
) => {
  const {status, orderBy, page = 1, pageSize = 10, includeUser = true} = params;

  const issues = await prisma.issue.findMany({
    where: {status},
    orderBy: orderBy
      ? [{[orderBy]: 'asc'}, {createdAt: 'desc'}]
      : {createdAt: 'desc'},
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      assignedToUser: includeUser,
    },
  });

  const totalIssues = await prisma.issue.count({
    where: {status},
  });

  return {
    data: issues,
    currentPage: page,
    pageSize,
    totalIssues,
  };
};
