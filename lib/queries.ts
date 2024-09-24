import useSWR from 'swr'

export const useCreateNotes = () => {
  return useSWR<any>('/')
}
