'use client'

import clsx from 'clsx'
import { useState, useCallback } from 'react'
import { Preview as PreviewNotes } from '@/components/preview'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from '@/components/ui/dropdown-menu'
import { Editor } from '@/components/editor'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, PencilRuler, ChevronDown, CircleCheck, Disc2, CirclePause } from 'lucide-react'
import { hashStringToColor, toPascalCase } from '@/lib/utils'
import { axiosInstance } from '@/lib/fetcher'

export default function Preview() {
  const [previewOpen, setPreviewOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [status, setStatus] = useState<string>("Status")
  const [tags, setTags] = useState<string[]>([])
  const [tagsInput, setTagsInput] = useState<string>('')
  const [docs, setDocs] = useState<string>(
    "# Tick Mark Data and Rust Code Example\n\n## Tick Mark Data\nHere's a list of tick marks and their descriptions:\n- ✔ Checkmark\n- ✖ Cross Mark\n- ✓ Heavy Check Mark\n- ✗ Heavy Ballot X\n\n## Rust Code\n```rust\nfn main() {\n    println!(\"Hello from Rust\");\n}\n```\n\n> Open [http://localhost:3000](http://localhost:3000) with your browser to see the result."
  )

  console.log("title", title)
  console.log("status", status)
  console.log("tags", tags)
  console.log("markdown docs", docs)

  const handleChange = useCallback((preVal: string) => {
    setDocs(preVal)
  }, [])

  const showPreview = (toShow: string) => {
    if (toShow === "ntShow") {
      setPreviewOpen(false)
    } else {
      setPreviewOpen(true)
    }
  }

  const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleTagsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagsInput.trim() !== '') {
      e.preventDefault()
      setTags([...tags, tagsInput.trim()])
      setTagsInput('')
    }
  }

  const handleCreateNotes = () => {
    axiosInstance.post('/', {
      title,
      content: docs,
      tags,
      status
    })
  }

  return <div className="flex flex-col p-2 space-y-4">
    <div className="flex flex-row justify-between">
      <Input
        value={title}
        onChange={handleTitleInput}
        placeholder="Untitled"
        className="flex-1 bg-transparent placeholder:text-2xl text-xl font-semibold"
      />
      <div>
        {previewOpen ? (
          <Button onClick={() => showPreview("ntShow")} variant="ghost" className="bg-gray-800/30 gap-2">
            <PencilRuler size={20} />
          </Button>
        ) : (
          <div>
            <Button onClick={() => showPreview("ysShow")} variant="ghost" className="bg-gray-800/30 gap-2">
              <Eye size={20} />
              <p className="font-semi-bold tracking-wide">Ctrl R</p>
            </Button>

            <Button onClick={handleCreateNotes} variant="ghost" className="bg-gray-800/30 gap-2">
              <Eye size={20} />
              <p className="font-semi-bold tracking-wide">Save</p>
            </Button>
          </div>
        )}
      </div>
    </div>
    <div className="flex gap-2 flex-row items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default"
            className={clsx('text-muted-foreground hover:bg-non outline-none border-0 bg-non',
              {
                'gap-2': status === "ACTIVE" || status === "ON_HOLD" || status === "COMPLETED",
              }
            )}>
            {status === "ACTIVE" && <Disc2 size={16} color="gray" />}
            {status === "ON_HOLD" && <CirclePause size={16} color="orange" />}
            {status === "COMPLETED" && <CircleCheck size={16} color="green" />}
            {toPascalCase(status)}
            <ChevronDown size={20} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-[#18181b] shadow-2xl border-none">
          <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
            <DropdownMenuRadioItem value="ACTIVE" className="gap-2">
              <Disc2 size={16} color="gray" />
              Active
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem value="ON_HOLD" className="gap-2">
              <CirclePause size={16} color="orange" />
              On Hold
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem value="COMPLETED" className="gap-2">
              <CircleCheck size={16} color="green" />
              Completed
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex gap-1">
        {tags.map((tag, _i) => (
          <span key={_i}
            className="px-[6px] py-1 rounded-full text-xs flex items-center font-semibold gap-1"
            style={{ backgroundColor: hashStringToColor(tag), color: '#e2e8f0' }}
          >
            {tag}
          </span>
        ))}
      </div>
      <Input
        type="text"
        value={tagsInput}
        onChange={handleTagsInput}
        onKeyDown={handleInputKeyDown}
        placeholder="Add Tags"
        className="placeholder:text-sm bg-transparent text-sm tracking-wide"
      />
    </div>
    <div className="px-2">
      {previewOpen ? (
        <PreviewNotes docs={docs} />
      ) : (
        <Editor docs={docs} onChange={handleChange} />
      )}
    </div>
  </div>
}



