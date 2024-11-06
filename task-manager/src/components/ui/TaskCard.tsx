'use client'

import * as React from "react"
import { MoreHorizontal, Pencil } from "lucide-react"
import { Draggable } from '@hello-pangea/dnd';

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

import type { TaskProps, TaskStatus, TaskCardProps } from "@/types/types";

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
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs">{description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
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
              />
            </CardFooter>
          </Card>
        </div>
      )}
    </Draggable>
  )
}