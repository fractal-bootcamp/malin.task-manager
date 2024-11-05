import { TaskList } from "@/components/ui/TaskList";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full">
      <TaskList byStatus="Pending" />
      <TaskList byStatus="In-Progress" />
      <TaskList byStatus="Completed" />
      <TaskList byStatus="Archived" />
    </main>
  );
}
