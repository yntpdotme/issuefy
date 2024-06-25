'use client';

import {FormError} from '@/components/FormError';
import {Spinner} from '@/components/Spinner';
import {FormMessage} from '@/components/ui/FormMessage';
import {IssueSchema} from '@/schemas';
import {createIssue} from '@/server/actions/issues';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button, TextField} from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import {z} from 'zod';

const IssueForm = () => {
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
      const result = await createIssue(data);
    } catch (error) {
      setError('An unexpected Error Occurred');
    }
  });

  return (
    <div className="max-w-xl">
      {error && <FormError message={String(error)} />}

      <form className="mt-5 space-y-3" onSubmit={onSubmit}>
        <TextField.Root placeholder="Title" {...register('title')} />
        <FormMessage error={errors.title?.message} />

        <Controller
          name="description"
          control={control}
          render={({field}) => (
            <SimpleMDE
              placeholder="Description"
              {...field}
              className="dark:invert"
            />
          )}
        />
        <FormMessage error={errors.description?.message} />

        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
