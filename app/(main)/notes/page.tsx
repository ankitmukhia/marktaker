'use client'

import clsx from 'clsx'
import { ArrowDownFromLine, Notebook, Tags, ListTodo, ChevronDownIcon, CircleCheck, Disc2, CirclePause } from 'lucide-react'
import { useState } from 'react'

interface SidebarSection {
  id: number;
  title: string;
  type: 'buttons' | 'dropdown',
  items?: { leble: string, icon: any }[],
  icons: any
}

interface DropdownProps {
  title: string
  options: { leble: string, icon: any }[]
  selectedOption: string
  onSelect: (option: string) => void
  sidebarOpen: boolean
  icons: any
}

const sections: SidebarSection[] = [
  { id: 1, title: 'All Notes', type: 'buttons', icons: <Notebook size={17} /> },
  {
    id: 2, title: 'Status', type: 'dropdown',
    items: [
      { leble: 'Active', icon: <Disc2 size={16} color="gray" /> },
      { leble: 'On Hold', icon: <CirclePause size={16} color="orange" /> },
      { leble: 'Completed', icon: <CircleCheck size={16} color="green" /> }
    ],
    icons: <ListTodo size={17} />
  },
];

export default function Notes() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)
  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const [selectedTags, setSelectedTags] = useState<string>("")

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleDropdown = () => setDropDownOpen(!dropDownOpen)

  return <div className={`${sidebarOpen ? 'w-64' : 'w-14'} p-2 text-white flex bg-[#121212] rounded-lg flex-col items-center`}>
    <div className="flex w-full flex-row justify-between items-center p-2">
      {sidebarOpen && (
        <h1 className="text-md font-bold">
          MarkNotes
        </h1>
      )}
      <div onClick={toggleSidebar} className="cursor-pointer">
        {sidebarOpen ? (
          <ArrowDownFromLine size={20} className="rotate-90" />
        ) : (
          <ArrowDownFromLine size={20} className="rotate-[-90deg]" />
        )}
      </div>
    </div>

    <div className={`${sidebarOpen && 'dark:bg-[#1f1f1f]'} p-2 space-y-6 rounded-lg w-full mt-6`}>
      {sections.map((item) => (
        <div
          key={item.id}
          className={`flex flex-row gap-2 justify-start items-center`}
          onClick={sidebarOpen ? toggleDropdown : undefined}
        >
          {item.type == 'buttons' ? (
            <div className="flex flex-row items-center gap-2">
              {item.icons}
              {sidebarOpen && (
                <h1>{item.title}</h1>
              )}
            </div>
          ) : (
            <Dropdown
              title={item.title}
              options={item.items || []}
              selectedOption={item.id === 2 ? selectedStatus : selectedTags} // Adjust according to the dropdown
              onSelect={item.id === 2 ? setSelectedStatus : setSelectedTags} // Adjust accordingly
              sidebarOpen={sidebarOpen}
              icons={item.icons}
            />
          )}
        </div>
      ))}
    </div>
  </div>
}

function Dropdown({ title, options, selectedOption, onSelect, sidebarOpen, icons }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const selectOption = (option: string) => {
    onSelect(option)
    setIsOpen(false)
  }

  return (
    <div className="w-full">
      <div
        onClick={toggleDropdown}
        className={clsx(`text-left cursor-pointer`,
          sidebarOpen && "dark:hover:bg-yellow-400 hover:text-neutral-800 hover:p-2 hover:rounded-md"
        )}
      >
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2 justify-between items-center">
            {icons}
            {sidebarOpen && (
              <h1>{title}</h1>
            )}
          </div>
          {sidebarOpen && (
            <ChevronDownIcon
              className={clsx("h-4 w-4 transition-transform", isOpen ? "transform rotate-180" : "")}
            />
          )}
        </div>
        <div>
          {isOpen && (
            <div className="mt-1">
              {options.map((option) => (
                <button
                  key={option.leble}
                  onClick={() => selectOption(option.leble)}
                  className="w-full flex gap-2 items-center text-left px-3 py-2 text-sm hover:bg-white/60 transition-colors"
                >
                  {option.icon}
                  {option.leble}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


