import { TaskList } from "@/components/ui/TaskList";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full gap-4 p-4">
      <TaskList byStatus="Pending" bgColor="bg-blue-100" />
      <TaskList byStatus="In-Progress" bgColor="bg-indigo-100" />
      <TaskList byStatus="Completed" bgColor="bg-purple-100" />
      <TaskList byStatus="Archived" bgColor="bg-violet-100" />
    </main>
  );
}
