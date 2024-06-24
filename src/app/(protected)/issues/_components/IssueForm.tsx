'use client';

import {FormMessage} from '@/components/ui/FormMessage';
import {IssueSchema} from '@/schemas';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button, TextField} from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import {Controller, useForm} from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import {z} from 'zod';

const IssueForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<z.infer<typeof IssueSchema>>({
    resolver: zodResolver(IssueSchema),
  });

  const onSubmit = handleSubmit(async data => {
    console.log(data);
  });

  return (
    <div className="max-w-xl">
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

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default IssueForm;
