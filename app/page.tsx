import { CloudDashboard } from "@/components/CloudDashboard";
import { ErrorState, LoadingState } from "@/components/States";
import { tokens } from "@/tokens/tokens";

function page() {
  return (
    <main>
      <h1 className="text-3xl font-bold text-black text-center py-2">
        Atomity Dashboard Challenge 🔥
      </h1>
      <CloudDashboard />
    </main>
  );
}

export default page;
