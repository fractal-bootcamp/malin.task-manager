import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TaskProps, TaskStatus } from "@/types/types"
import { taskStore } from "@/app/store/TaskStore"
import type { TaskCardProps, CreateTaskCard } from "@/types/types";  // Import the type

export function CreateNewTaskModal({
  title,
  description,
  status,
  onCreate
}: CreateTaskCard) {  // Use the imported type

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      id: task.id,
      title: (document.getElementById('title') as HTMLInputElement).value,
      description: (document.getElementById('description') as HTMLTextAreaElement).value,
      status: (document.getElementById('status') as HTMLSelectElement).value as TaskStatus
    }

    console.log('Submitting updated task:', updatedTask);
    onUpdate(task.id, updatedTask);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Make changes to the task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input id="title" defaultValue={task.title} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <textarea
                id="description"
                defaultValue={task.description}
                className="col-span-3 min-h-[100px] w-full text-sm rounded-md border border-input px-3 py-2" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <select
                id="status"
                defaultValue={task.status}
                className="col-span-3 w-full rounded-md border border-input px-3 py-2"
              >
                <option value="Pending">Pending</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Completed">Completed</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}