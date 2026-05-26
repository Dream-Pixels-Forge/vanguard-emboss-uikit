import React from 'react'
import {
  useFormState,
  useForm,
  FormProvider,
  Controller,
  type ControllerProps,
  type FieldValues,
  type FieldPath,
  type UseFormProps,
} from 'react-hook-form'
import { cn } from '../../lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { Label } from './label'

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = { name: TName }

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

type FormItemContextValue = { id: string }

const FormItemContext = React.createContext<FormItemContextValue | null>(null)

export interface FormProps<TFieldValues extends FieldValues> extends UseFormProps<TFieldValues> {
  onSubmit?: (values: TFieldValues) => void
  className?: string
  children?: React.ReactNode
}

export function Form<TFieldValues extends FieldValues>({
  onSubmit,
  className,
  children,
  ...formProps
}: FormProps<TFieldValues>) {
  const form = useForm<TFieldValues>(formProps)

  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined}
        className={cn('space-y-6', className)}
      >
        {children}
      </form>
    </FormProvider>
  )
}

export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ControllerProps<TFieldValues, TName>

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: FormFieldProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

export function useFormField() {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)

  if (!fieldContext) throw new Error('useFormField should be used within <FormField>')
  if (!itemContext) throw new Error('useFormField should be used within <FormItem>')

  const { name } = fieldContext
  const { id } = itemContext

  // Narrow subscription to only this field's error state
  const { errors, dirtyFields, touchedFields, isValidating } = useFormState({ name: name as unknown as undefined })

  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    invalid: errors[name]?.message ? true : false,
    isDirty: dirtyFields[name] ? true : false,
    isTouched: touchedFields[name] ? true : false,
    isValidating,
    error: errors[name]?.message,
  }
}

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FormItem({ className, ...props }: FormItemProps) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  )
}

export interface FormLabelProps extends React.ComponentPropsWithoutRef<typeof Label> {}

export function FormLabel({ className, ...props }: FormLabelProps) {
  const { formItemId, error } = useFormField()

  return (
    <Label
      htmlFor={formItemId}
      className={cn(error && 'text-red-500', className)}
      {...props}
    />
  )
}

export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  function FormControl({ ...props }, ref) {
    const { formItemId, formDescriptionId, formMessageId, invalid } = useFormField()

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={!invalid ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={invalid}
        {...props}
      />
    )
  }
)

export interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FormDescription({ className, ...props }: FormDescriptionProps) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      id={formDescriptionId}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FormMessage({ className, children, ...props }: FormMessageProps) {
  const { formMessageId, error } = useFormField()
  const body = error ? String(error) : children

  if (!body) return null

  return (
    <p
      id={formMessageId}
      className={cn('text-sm font-medium text-red-500', className)}
      {...props}
    >
      {body}
    </p>
  )
}
