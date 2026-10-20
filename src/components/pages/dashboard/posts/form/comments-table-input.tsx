import { useFieldArray, useFormContext } from 'react-hook-form';
import { SelectInput } from '@/components/custom-ui/form-ui/form-input';
import { Plus, Trash2, CornerDownRight } from 'lucide-react';
import { format } from 'date-fns/format';
import { Button } from '@/components/ui/button';
import { v4 as uuid } from 'uuid';
import { useWatch } from 'react-hook-form';
import { asyncConfirm } from '@/components/custom-ui/designed-confirm/designed-confirm.hook';
import { useToast } from '@/hooks/custom/use-toast';

export type Comments = any;

type Props = {
  isLoading: boolean;
};

export const CommentsTable = ({ isLoading }: Props) => {
  const toast = useToast();
  const form = useFormContext();
  const { fields, append, remove, insert } = useFieldArray({
    control: form.control,
    name: 'comments',
  });
  const watchedComments = useWatch({
    control: form.control,
    name: 'comments',
  });

  //댓글 추가
  const addComment = () => {
    append({ commentId: uuid(), username: '', content: '', createdAt: '', deleted: false });
  };
  //댓글답글 추가
  const handleAddReply = (parentIndex: number, parentComment: Comments) => {
    insert(parentIndex + 1, {
      userId: '',
      content: '',
      createdAt: '',
      parentId: parentComment.commentId,
      deleted: false,
    });
  };
  // 댓글 삭제
  const handleDelete = async (index: number) => {
    const confirmed = await asyncConfirm('삭제하시겠습니까?', { buttonText: '삭제' });
    if (!confirmed) return;

    const comment = form.getValues(`comments.${index}`) as Comments;
    const allComments = form.getValues('comments') as Comments[];

    const isParent = !comment.parentId;
    const hasReplies = allComments.some((c) => c.parentId === comment.commentId);

    if (isParent && hasReplies) {
      // 댓글이고 답글이 있는 경우 -> 빈 값 처리 (소프트 삭제)
      form.setValue(`comments.${index}.content`, '');
      form.setValue(`comments.${index}.userId`, '');
      form.setValue(`comments.${index}.username`, '');
      form.setValue(`comments.${index}.deleted`, true);
      toast.success('댓글이 삭제되었습니다.');
    } else {
      // 답글이거나 답글이 없는 댓글 -> remove
      remove(index);
      toast.success('댓글이 삭제되었습니다.');
    }
  };

  return (
    <div className="rounded-md border text-[14px]">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            {['작성자', '내용', '작성일', ''].map((title, index) => (
              <th key={index} className="p-2 text-left">
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => {
            const isReply = !!(field as Comments).parentId;
            const comment = watchedComments?.[index] as Comments;
            const isDeleted = comment?.deleted || comment?.deletedAt;

            return (
              <tr key={field.id} className="border-t">
                <td className="p-2 w-35">
                  <div className={isReply ? 'pl-6' : ''}>{isDeleted ? null : null}</div>
                </td>
                <td className="p-2">
                  {isDeleted ? (
                    <span className="text-gray-400 text-sm">삭제된 댓글입니다</span>
                  ) : (
                    <input
                      type="text"
                      className="w-full py-1 px-3 border rounded h-9"
                      placeholder={isReply ? '답글 내용' : '댓글 내용'}
                      {...form.register(`comments.${index}.content`, {
                        validate: () => {
                          const current = form.getValues(`comments.${index}`);
                          const isDeleted = !current.content && !current.userId && !current.username;
                          if (isDeleted) return true;
                          return current.content.trim() !== '' || '내용을 입력하세요';
                        },
                      })}
                    />
                  )}
                </td>
                <td className="p-2">
                  {isDeleted
                    ? ''
                    : (field as Comments).createdAt
                    ? format(new Date((field as Comments).createdAt as string), 'yyyy.MM.dd HH:mm')
                    : ''}
                </td>
                <td className="p-2 flex gap-3">
                  {!isReply && !isDeleted && (
                    <Button type="button" variant="outline" size="sm" onClick={() => handleAddReply(index, field)}>
                      <CornerDownRight className="h-4 w-4" />
                    </Button>
                  )}
                  {!isDeleted && (
                    <Button type="button" variant="outline" size="sm" onClick={() => handleDelete(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isLoading && <div className="p-4 text-lg">Loading...</div>}
      <div className="p-2 border-t">
        <Button type="button" onClick={addComment} variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          댓글 추가
        </Button>
      </div>
    </div>
  );
};
