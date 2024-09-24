import React from 'react'

interface Props {
  children: React.ReactNode
  allnotes: React.ReactNode
  preview: React.ReactNode
}

export default function NotesLayout({ children, allnotes, preview }: Props) {
  return <div className="flex gap-2 h-screen">
    {children}
    {allnotes}

    <div className="flex-1 bg-gradient-to-b from-[#121212] to-[#09090b] rounded-lg">
      {preview}
    </div>
  </div>
}
