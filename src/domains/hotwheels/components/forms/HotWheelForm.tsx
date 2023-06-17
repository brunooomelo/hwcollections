import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../../../../shared/components/Button'
import { Input } from '../../../../shared/components/Input'

const schema = z.object({
  name: z.string({
    required_error: 'is required'
  }),
  lote: z.string({
    required_error: 'is required'
  })
})

type SchemaType = z.infer<typeof schema>;

type HotWheelFormProps = {
  isEditable?: boolean
  defaultValues?: Partial<SchemaType>
  onSubmit: (data: SchemaType) => Promise<void>
}
export const HotWheelForm = ({ defaultValues, onSubmit, isEditable }: HotWheelFormProps) => {
  const { control, handleSubmit } = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues
  })

  return (
    <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="lote"
        label="Lote"
        control={control}
        placeholder="Lote"
      />
      <Input
        name="name"
        label="Name"
        control={control}
        placeholder="Hot wheels name"
      />
      <Button type='submit'>{!!isEditable ? 'Edit it' : 'Add it'}</Button>
    </form>
  )
}
