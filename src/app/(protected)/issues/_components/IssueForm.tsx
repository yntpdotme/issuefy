'use client';

import {FormError} from '@/components/FormError';
import {Spinner} from '@/components/Spinner';
import {FormMessage} from '@/components/ui/FormMessage';
import {IssueSchema} from '@/schemas';
import {createIssue, editIssue} from '@/server/actions/issues';
import {zodResolver} from '@hookform/resolvers/zod';
import {Issue} from '@prisma/client';
import {Button, TextField} from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import {isRedirectError} from 'next/dist/client/components/redirect';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import {z} from 'zod';
import StatusSelect from './StatusSelect';

type Props = {
  issue?: Issue;
};

const IssueForm = ({issue}: Props) => {
  const [error, setError] = useState('');

  const {
    register,
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<z.infer<typeof IssueSchema>>({
    resolver: zodResolver(IssueSchema),
  });

  const onSubmit = handleSubmit(async data => {
    setError('');

    try {
      if (issue) await editIssue(issue.id, data);
      else await createIssue(data);
    } catch (error) {
      if (!isRedirectError(error)) {
        setError('An unexpected Error Occurred');
      }
    }
  });

  return (
    <div className="mt-5 max-w-xl">
      {error && <FormError message={String(error)} />}

      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="Title"
          defaultValue={issue?.title}
          {...register('title')}
        />
        <FormMessage error={errors.title?.message} />

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({field}) => (
            <SimpleMDE
              placeholder="Description"
              {...field}
              className="dark:invert"
            />
          )}
        />
        <FormMessage error={errors.description?.message} />

        {issue && (
          <>
            <div className="mr-2 inline-block">
              <Controller
                name="status"
                control={control}
                defaultValue={issue.status}
                render={({field}) => (
                  <StatusSelect
                    value={field.value!}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <FormMessage error={errors.status?.message} />
          </>
        )}

        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
