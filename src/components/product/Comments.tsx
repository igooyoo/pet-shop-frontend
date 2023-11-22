/* eslint-disable no-alert */
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { createComment, getComments } from '@/lib/api';
import { DateUtil } from '@/lib/date-util';
import type { Comment, CreateComment } from '@/types';

import { Button, Text } from '../ui';
import Input from '../ui/Input/Input';

type Props = {
  productId: string;
};

type CommentFormValues = {
  comment: string;
};

export const Comments: FC<Props> = ({ productId }) => {
  const [comments, setComments] = useState<Comment[]>();

  const fetchComments = async () => {
    const res = await getComments();
    const data = await res.data?.items;
    setComments(data);
  };

  const productComments = comments?.filter(
    (comment) => comment.product_id === productId
  );

  useEffect(() => {
    fetchComments();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CommentFormValues>();

  const onSubmit = async (data: CommentFormValues) => {
    const userId = JSON.parse(localStorage.getItem('token') || 'null');
    if (!userId) {
      alert('Та эхлээд нэвтэрнэ үү');
      return;
    }
    const body: CreateComment = {
      comment: data.comment,
      product_id: productId,
      user_id: userId,
    };

    await createComment(body)
      .then(() => {
        alert('Амжилттай');
        reset();
        fetchComments();
      })
      .catch(() => {
        alert('Error adding category');
      });
  };

  return (
    <div className="mt-12">
      <Text variant="pageHeading">Сэтгэгдлүүд</Text>
      {productComments?.map((comment) => (
        <div
          key={comment.id}
          className="my-2 max-w-2xl border-y bg-primary px-4 py-2 "
        >
          <h3 className="uppercase">
            <strong>{comment.created_by}</strong>
          </h3>
          <p className="pl-1 pt-1 text-sm">{comment.comment}</p>
          <p className="pl-1 text-xs">{DateUtil.parse(comment.created_at)}</p>
        </div>
      ))}
      {productComments?.length === 0 && (
        <div className="my-2 max-w-2xl rounded-md bg-primary px-4 py-2">
          <h3>
            <strong>Сэтгэгдэл байхгүй байна.</strong>
          </h3>
        </div>
      )}
      <Text className="mb-2 mt-6">
        <strong>Сэтгэгдэл бичих</strong>
      </Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl gap-5 rounded-md bg-primary px-8 py-4 shadow-lg"
      >
        <Input
          placeholder="comment"
          {...register('comment' as const, { required: true })}
          className="mb-4 w-full rounded-md border border-accent-2 bg-accent-0 p-2 outline-none"
        />
        <Button
          type="submit"
          variant="slim"
          className="mt-5 w-full"
          loading={isSubmitting}
        >
          Хадгалах
        </Button>
      </form>
    </div>
  );
};
