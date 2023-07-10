interface iData {
  name: FormDataEntryValue | null
  phone: FormDataEntryValue | null
  email: FormDataEntryValue | null
  message: FormDataEntryValue | null
}

export const postData = (data: iData) => {
  const url = 'http://84.201.132.123:8080/v1/api/request_call'
  return fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(data)
  })
}

export const getFormData = (e: React.FormEvent) => {
  const target = e.target
  if (!target) return null
  return new FormData(target as any)
}