'use server';

import {auth} from '@/auth';
import {IssueSchema} from '@/schemas';
import {
  createIssue as createIssueDB,
  deleteIssue as deleteIssueDB,
  updateIssue as updateIssueDB,
} from '@/server/db/issues';
import {redirect} from 'next/navigation';
import {z} from 'zod';

export const createIssue = async (values: z.infer<typeof IssueSchema>) => {
  const session = await auth();
  if (!session) return {error: 'Unauthorized'};

  const {success, data} = IssueSchema.safeParse(values);
  if (!success) return {error: 'Invalid issue data'};

  let newIssue;

  try {
    newIssue = await createIssueDB(data);
  } catch (error) {
    console.error('Error creating issue:', error);

    throw new Error('An unexpected Error Occurred');
  }

  redirect(`/issues/${newIssue.id}`);
};

export const editIssue = async (
  id: number,
  values: z.infer<typeof IssueSchema>,
) => {
  const session = await auth();
  if (!session) return {error: 'Unauthorized'};

  const {success, data} = IssueSchema.safeParse(values);
  if (!success) return {error: 'Invalid issue data'};

  let updatedIssue;

  try {
    updatedIssue = await updateIssueDB(id, data);
  } catch (error) {
    console.error('Error in updating issue:', error);

    throw new Error('An unexpected Error Occurred');
  }

  redirect(`/issues/${updatedIssue.id}`);
};

export const deleteIssue = async (id: number) => {
  const session = await auth();
  if (!session) return {error: 'Unauthorized'};

  try {
    await deleteIssueDB(id);
  } catch (error) {
    console.error('Error in deleting issue:', error);

    throw new Error('An unexpected Error Occurred');
  }

  redirect(`/issues`);
};

export const assignIssue = async (id: number, userId: string) => {
  const session = await auth();
  if (!session) return {error: 'Unauthorized'};

  try {
    const issue =
      userId === 'unassign'
        ? {assignedToUser: {disconnect: true}}
        : {assignedToUser: {connect: {id: userId}}};

    await updateIssueDB(id, issue);
  } catch (error) {
    console.error('Error in assigning issue:', error);

    throw new Error('An unexpected Error Occurred');
  }
};
