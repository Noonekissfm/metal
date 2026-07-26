import { postRequestCall } from 'src/api/order';

interface iData {
  name: FormDataEntryValue | null
  phone: FormDataEntryValue | null
  email: FormDataEntryValue | null
  message: FormDataEntryValue | null
  company?: FormDataEntryValue | null
}

export const postData = (data: iData) => postRequestCall({
  name: String(data.name || ''),
  phone: String(data.phone || ''),
  email: String(data.email || ''),
  message: String(data.message || ''),
  company: String(data.company || ''),
})

export const getFormData = (e: React.FormEvent) => {
  const target = e.target
  if (!target) return null
  return new FormData(target as any)
}
