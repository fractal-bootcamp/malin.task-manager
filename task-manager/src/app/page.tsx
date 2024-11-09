import { DragDropTaskList } from "@/components/ui/DragDropTaskList";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full gap-4 p-4">
      <DragDropTaskList />
    </main>
  );
}
