import { Input } from '@/components/atoms'

export function FormField({ label, name, type = 'text', placeholder, error, value, onChange, required, rows }) {
  return (
    <Input
      label={label}
      name={name}
      type={type}
      placeholder={placeholder}
      error={error}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
    />
  )
}
