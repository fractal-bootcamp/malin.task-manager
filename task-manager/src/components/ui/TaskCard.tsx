'use client'

import * as React from "react"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';

import { EditTaskModal } from "./EditTaskSubView";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { TaskSchema, TaskProps, TaskStatus, TaskCardProps } from "@/types/schemas";

import { useEpicStore } from "@/app/store/EpicStore"

const getColorFromString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  const saturation = 50 + (Math.abs(hash) % 30);
  const lightness = 25 + (Math.abs(hash) % 20);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  title,
  description,
  status,
  id,
  index,
  onEdit,
  onDelete,
  onUpdate,
  onUpdateStatus
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const epics = useEpicStore(state => state.epics);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-xl shadow-sm"
        >
          <Card className="w-full shadow-md hover:shadow-lg transition-shadow duration-200 dark:bg-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium line-clamp-2 min-h-[3rem] max-h-24 overflow-hidden">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs min-h-[3rem] max-h-24 overflow-y-auto line-clamp-3 mb-8">{description}</CardDescription>
              <div className=" min-h-[2rem]">
                {task.epic && (
                  <CardTitle
                    className="text-xs font-normal px-2 py-1 rounded-md truncate"
                    style={{
                      border: `1px solid ${getColorFromString(task.epic)}`,
                      color: getColorFromString(task.epic)
                    }}
                  >{`Epic: ${epics.find(epic => epic.id === task.epic)?.description}`}</CardTitle>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                className="text-neutral-500"
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit
              </Button>

              <EditTaskModal
                task={task}
                title={title}
                description={description}
                status={status}
                id={id}
                onEdit={onEdit}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onUpdateStatus={onUpdateStatus}
                open={isEditModalOpen}
                setOpen={setIsEditModalOpen}
              />

              <Button variant="outline" size="sm" onClick={() => onDelete(task.id)}>
                <Trash2 color="#f21d37" strokeWidth={1} />
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </Draggable>
  )
}