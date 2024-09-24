import { SquarePen } from 'lucide-react'

export default async function AllNotes() {
  return (
    <div className="w-96 overflow-y-auto p-4 bg-[#121212] rounded-lg">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-md font-bold">
          All Notes
        </h1>
        <SquarePen size={20} />
      </div>
    </div>
  )
}
