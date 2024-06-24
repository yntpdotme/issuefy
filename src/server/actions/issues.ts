'use server'

import { auth } from '@/auth';
import {IssueSchema} from '@/schemas';
import {createIssue as createIssueDB} from '@/server/db/issues';
import {redirect} from 'next/navigation';
import {z} from 'zod';

export const createIssue = async (values: z.infer<typeof IssueSchema>) => {
  const session = auth();
  if (!session) return {error: 'Unauthorized'};

  const {success, error, data} = IssueSchema.safeParse(values);
  if (!success) return {error: error.format()};

  const newIssue = await createIssueDB(data);

  redirect(`/issues/${newIssue.id}`);
};
