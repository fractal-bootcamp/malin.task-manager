import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Task } from "@/types/schemas"
import { useTaskStore } from "@/app/store/TaskStore"
import { useEpicStore } from "@/app/store/EpicStore"

export function CreateNewEpicModal() {
  const { tasks } = useTaskStore();
  const { createEpic, isCreateModalOpen, setCreateModalOpen } = useEpicStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedTasks = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="tasks"]:checked'))
      .map(checkbox => checkbox.value);
    console.log(selectedTasks)

    const newEpic = {
      description: (document.getElementById('description') as HTMLTextAreaElement).value,
      tasks: selectedTasks
    }
    console.log(newEpic)
    createEpic(newEpic);
    setCreateModalOpen(false);
  }

  // Filter tasks that don't belong to any epic
  const availableTasks = tasks.filter(task => !task.epic);

  return (
    <Dialog
      open={isCreateModalOpen}
      onOpenChange={setCreateModalOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Epic</DialogTitle>
          <DialogDescription>
            Create a new epic and assign tasks to it.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <textarea
                id="description"
                defaultValue={""}
                className="col-span-3 min-h-[100px] w-full text-sm rounded-md border border-input px-3 py-2" />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label className="mb-2">Select Tasks</Label>
              <div className="max-h-[200px] overflow-y-auto border rounded-md p-2">
                {availableTasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      id={`task-${task.id}`}
                      name="tasks"
                      value={task.id}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor={`task-${task.id}`}>{task.title}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Epic</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}