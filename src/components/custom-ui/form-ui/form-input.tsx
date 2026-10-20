'use client';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils/utils';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { TiptapEditor } from '@/components/custom-ui/tiptap/core';
import { useS3 } from '@/lib/s3-service/use-s3';
import z from 'zod';
import { PopoverCalendar } from '@/components/custom-ui/pop-calendar/popover-calendar';
import { X } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// 스키마에서 필드가 optional인지 확인하는 유틸리티 함수
const isFieldRequired = <T extends FieldValues>(schema: z.ZodType<T>, fieldName: string): boolean => {
  try {
    if (schema instanceof z.ZodObject) {
      const shape = schema.shape;
      const fieldSchema = shape[fieldName];

      if (!fieldSchema) return false;

      // optional, nullable, nullish 체크
      return !(
        fieldSchema instanceof z.ZodOptional ||
        fieldSchema instanceof z.ZodNullable ||
        fieldSchema instanceof z.ZodDefault ||
        fieldSchema.isOptional?.() === true
      );
    }
    return false;
  } catch {
    return false;
  }
};

// 공통 필드 컴포넌트들
export const TextInput = <T extends FieldValues>({
  name,
  label,
  placeholder,
  className,
  description,
  ...props
}: { name: Path<T>; label: string; placeholder?: string; schema: z.ZodType<T>; description?: string } & Omit<
  React.ComponentProps<typeof Input>,
  'name'
>) => {
  const form = useFormContext<T>();

  const isRequired = isFieldRequired(props.schema, name);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={props.disabled ? 'text-neutral-500' : ''}>
            {label}
            {(props.required || isRequired) && <span className="text-destructive">*</span>}
          </FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            <Input {...field} value={field.value || ''} {...props} placeholder={placeholder} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const NumberInput = <T extends FieldValues>({
  name,
  label,
  placeholder,
  className,
  min,
  max,
  description,
  ...props
}: { name: Path<T>; label: string; placeholder?: string; schema: z.ZodType<T>; description?: string } & Omit<
  React.ComponentProps<typeof Input>,
  'name'
>) => {
  const form = useFormContext();
  const isRequired = isFieldRequired(props.schema, name);
  return (
    <FormField
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {(props.required || isRequired) && <span className="text-destructive">*</span>}
          </FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            <Input
              type="number"
              name={name}
              placeholder={placeholder}
              value={field.value || ''}
              onChange={(e) => field.onChange(Number(e.target.value))}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const DateInput = <T extends FieldValues>({
  name,
  label,
  className,
  isString = false,
  description,
  isResetable = false,
  required,
  ...props
}: {
  name: Path<T>;
  label: string;
  className?: string;
  isString?: boolean;
  description?: string;
  isResetable?: boolean;
  schema: z.ZodType<T>;
  required?: boolean;
} & Omit<React.ComponentProps<typeof PopoverCalendar>, 'value' | 'onSelect'>) => {
  const form = useFormContext();
  const isRequired = isFieldRequired(props.schema, name);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className, 'flex flex-col gap-2')}>
          <FormLabel>
            {label}
            {(required || isRequired) && <span className="text-destructive">*</span>}
          </FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            <PopoverCalendar
              value={field.value}
              isResetable={isResetable}
              onSelect={(val: Date | null) => {
                field.onChange(isString ? (val ? val.toISOString() : '') : (val ?? undefined));
              }}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const SelectInput = <T extends FieldValues>({
  name,
  label,
  options,
  className,
  gap,
  description,
  isResetable = false,
  ...props
}: {
  name: Path<T>;
  label: string;
  options: { label: string; value: string }[];
  className?: string;
  gap?: string;
  description?: string;
  isResetable?: boolean;
  schema: z.ZodType<T>;
} & Omit<React.ComponentProps<typeof Select>, 'name'>) => {
  const form = useFormContext();
  const isRequired = isFieldRequired(props.schema, name);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(gap, className)}>
          <FormLabel>
            {label}
            {(props.required || isRequired) && <span className="text-destructive">*</span>}
          </FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <div className="relative">
            <Select key={field.value} value={field.value ?? ''} onValueChange={field.onChange} {...props}>
              <FormControl>
                <SelectTrigger className={cn(field.value && isResetable && 'pl-9')}>
                  <SelectValue placeholder="선택하세요" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((value) => (
                  <SelectItem key={value.value} value={value.value}>
                    {value.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 리셋 버튼 */}
            {field.value && isResetable && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  field.onChange(''); // 빈 값으로 리셋
                }}
                className="absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer rounded-sm p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                tabIndex={-1}
              >
                <X className="size-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
              </button>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const TextAreaInput = <T extends FieldValues>({
  name,
  label,
  placeholder,
  className,
  ...props
}: { name: Path<T>; label: string; placeholder?: string; schema: z.ZodType<T>; description?: string } & Omit<
  React.ComponentProps<typeof Textarea>,
  'name'
>) => {
  const form = useFormContext();
  const isRequired = isFieldRequired(props.schema, name);
  return (
    <FormField
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {(props.required || isRequired) && <span className="text-destructive">*</span>}
          </FormLabel>
          <FormControl>
            <Textarea {...field} {...props} name={name} placeholder={placeholder} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const FormButtons = ({
  className,
  buttonName,
  isLoading,
  isEditMode,
}: {
  className?: string;
  buttonName?: string;
  isLoading?: boolean;
  isEditMode?: boolean;
}) => {
  const form = useFormContext();
  const id = form.getValues('id');

  return (
    <div className={cn('flex gap-2 justify-end', className)}>
      <Button size="lg" className="cursor-pointer text-lg font-medium px-7" type="submit" disabled={isLoading}>
        {isLoading ? '로딩 중...' : id || isEditMode ? `${buttonName} 수정` : `${buttonName} 추가`}
      </Button>
      {/* <Button className="cursor-pointer" type="button" variant="destructive" onClick={() => form.reset()}>
        초기화
      </Button> */}
    </div>
  );
};

export const CheckboxInput = <T extends FieldValues>({
  name,
  label,
  className,
  wrapClassName,
  description,
  schema,
  ...props
}: { name: Path<T>; label: React.ReactNode; schema: z.ZodType<T>; description?: string; wrapClassName?: string } & Omit<
  React.ComponentProps<'input'>,
  'name' | 'type'
>) => {
  const form = useFormContext();
  const isRequired = isFieldRequired(schema, name);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className={cn('h-fit', wrapClassName)}>
          <FormItem className={cn('flex items-center text-sm gap-0', className)}>
            <FormLabel className="pr-4 cursor-pointer">
              {label}
              {(props.required || isRequired) && <span className="text-destructive">*</span>}
            </FormLabel>

            <FormControl>
              <Checkbox
                {...field}
                checked={field.value || false}
                onCheckedChange={field.onChange}
                className="size-5 border-gray-500 cursor-pointer"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          {description && <FormDescription>{description}</FormDescription>}
        </div>
      )}
    />
  );
};

export const CheckboxGroupInput = <T extends FieldValues>({
  name,
  label,
  options,
  className,
  isAllVisible = false,
  disabled = false,
  description,
  schema,
  required,
}: {
  name: Path<T>;
  label: string;
  options: { value: string; label: string; description?: string }[];
  className?: string;
  isAllVisible?: boolean;
  disabled?: boolean;
  schema: z.ZodType<T>;
  description?: string;
  required?: boolean;
}) => {
  const form = useFormContext();
  const isRequired = isFieldRequired(schema, name);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const values: string[] = field.value || [];

        // 모든 옵션의 value들을 배열로 만들기
        const allValues = options.map((option) => option.value);

        // 전체 선택 상태 확인 (모든 옵션이 선택되었는지)
        const isAllSelected = allValues.every((value) => values.includes(value));

        const handleChange = (option: { value: string; label: string }, checked: boolean) => {
          if (option.value === 'all') {
            // 전체 선택/해제 처리
            if (checked) {
              // 전체 선택: 모든 옵션의 value들을 추가
              const newValues = [...values.filter((v) => !allValues.includes(v)), ...allValues];
              field.onChange(newValues);
            } else {
              // 전체 해제: 모든 옵션의 value들을 제거
              field.onChange(values.filter((v) => !allValues.includes(v)));
            }
          } else {
            // 개별 옵션 처리
            if (checked) {
              field.onChange([...values, option.value]);
            } else {
              field.onChange(values.filter((v) => v !== option.value));
            }
          }
        };

        return (
          <FormItem className={cn('flex flex-col gap-3', className)}>
            {/* 그룹 라벨 */}
            <FormLabel>
              {label}
              {(required || isRequired) && <span className="text-destructive">*</span>}
            </FormLabel>
            {description && <FormDescription>{description}</FormDescription>}

            {/* 체크박스들 가로 정렬 */}
            <div className="space-y-4">
              {/* 전체 선택 체크박스 (isAllVisible이 true일 때만 표시) */}
              {isAllVisible && (
                <FormItem className="flex items-center space-y-0 gap-0">
                  <FormLabel className={cn('text-sm font-normal pr-2 cursor-pointer', disabled && 'text-neutral-400')}>
                    - 전체 선택
                  </FormLabel>
                  <FormControl>
                    <Checkbox
                      disabled={disabled}
                      checked={isAllSelected}
                      onCheckedChange={(checked) =>
                        handleChange({ value: 'all', label: '전체 선택' }, Boolean(checked))
                      }
                      className="size-5 border-gray-500 cursor-pointer"
                    />
                  </FormControl>
                </FormItem>
              )}

              {/* 개별 옵션들 */}
              {options.map((option) => (
                <div key={option.value} className="space-y-1">
                  <FormItem className="flex items-center space-y-0 gap-0">
                    <FormLabel
                      className={cn('text-sm font-normal pr-2 cursor-pointer', disabled && 'text-neutral-400')}
                    >
                      - {option.label}
                    </FormLabel>

                    <FormControl>
                      <Checkbox
                        disabled={disabled}
                        checked={values.includes(option.value)}
                        onCheckedChange={(checked) => handleChange(option, Boolean(checked))}
                        className="size-5 border-gray-500 cursor-pointer"
                      />
                    </FormControl>
                  </FormItem>
                  {option.description && <FormDescription>{option.description}</FormDescription>}
                </div>
              ))}
            </div>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export const RadioGroupInput = <T extends FieldValues>({
  name,
  label,
  options,
  className,
  groupClassName,
  description,
  ...props
}: {
  name: Path<T>;
  label: string;
  options: { label: string; value: string | boolean }[];
  schema: z.ZodType<T>;
  groupClassName?: string;
  description?: string;
} & Omit<React.ComponentProps<typeof RadioGroup>, 'name'>) => {
  const form = useFormContext<T>();

  const isRequired = isFieldRequired(props.schema, name);

  const handleChange = (val: string) => {
    if (val === 'true') form.setValue(name, true as any);
    else if (val === 'false') form.setValue(name, false as any);
    else form.setValue(name, val as any);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {(props.required || isRequired) && <span className="text-destructive">*</span>}
          </FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            <RadioGroup
              className={groupClassName || ''}
              defaultValue={options[0]?.value?.toString() || ''}
              onValueChange={handleChange}
              value={typeof field.value === 'boolean' ? field.value.toString() : field.value || ''}
              {...props}
            >
              {options.map((opt) => (
                <FormItem key={String(opt.value)} className="flex cursor-pointer items-center space-y-0">
                  <FormControl>
                    <RadioGroupItem value={String(opt.value)} />
                  </FormControl>
                  <FormLabel className="cursor-pointer pl-3 font-normal">{opt.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const TipTapInput = <T extends FieldValues>({
  name,
  label,
  height,
  className,
  keyId,
  schema,
  description,
}: {
  name: Path<T>;
  label?: string;
  height?: number;
  className?: string;
  keyId: string;
  schema: z.ZodType<T>;
  description?: string;
}) => {
  const form = useFormContext();
  const { handleUpload, isLoading, error } = useS3();

  const isRequired = isFieldRequired(schema, name);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label}
              {isRequired && <span className="text-destructive">*</span>}
            </FormLabel>
          )}
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            <div className="relative">
              <TiptapEditor
                keyId={keyId}
                height={height}
                {...field}
                onImageUpload={async (file) => {
                  const url = await handleUpload(file);
                  return url || '';
                }}
                onChange={field.onChange}
                content={field.value}
                className={className}
              />
              {isLoading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center rounded-xl bg-black/20">
                  <div className="rounded-lg bg-white p-4 shadow-lg">이미지 업로드 중...</div>
                </div>
              )}
              {error && (
                <div className="absolute bottom-2 left-2 z-50 rounded bg-red-100 p-2 text-sm text-red-600">
                  업로드 실패: {false || '에러 발생'}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const InputWrap = ({ children, columns = 2 }: { children: React.ReactNode; columns?: number }) => {
  return (
    <div className="gap-x-8 grid items-start" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {children}
    </div>
  );
};
