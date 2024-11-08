'use client'

import { AllTasks } from "@/components/ui/AllTasks";

const Page = () => {
  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
      <AllTasks />
    </div>
  );
};

export default Page;
