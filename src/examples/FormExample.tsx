import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Input, Label, Textarea, Checkbox, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  bio: z.string().optional(),
  role: z.string().min(1, 'Please select a role'),
  terms: z.literal(true, { errorMap: () => ({ message: 'You must accept the terms' }) }),
})

type FormData = z.infer<typeof schema>

export function FormExample() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const role = watch('role')

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1000))
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-md">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name" required>Name</Label>
        <Input id="name" error={!!errors.name} {...register('name')} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" error={!!errors.email} {...register('email')} />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" {...register('bio')} />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Role</Label>
        <Select onValueChange={(v) => setValue('role', v, { shouldValidate: true })}>
          <SelectTrigger><SelectValue placeholder="Select a role" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="developer">Developer</SelectItem>
            <SelectItem value="designer">Designer</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
          </SelectContent>
        </Select>
        {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="terms" checked={!!role} onCheckedChange={(c) => setValue('terms', c === true, { shouldValidate: true })} />
        <Label htmlFor="terms">I accept the terms</Label>
      </div>
      {errors.terms && <p className="text-sm text-red-500">{errors.terms.message}</p>}

      <Button type="submit" loading={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  )
}
