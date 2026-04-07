import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface Task { id: string; title: string; description?: string; priority: string; status: string; }

const priorityDot: Record<string, string> = { high: "bg-red-500", medium: "bg-amber-500", low: "bg-emerald-500" };
const statusStyle: Record<string, string> = {
  completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "in-progress": "bg-blue-500/15 text-blue-400 border-blue-500/30",
};

export function NeonTasksCard({ tasks }: { tasks: Task[] }) {
  return (
    <Card className="bg-[#1F2937] border-[#374151] p-5">
      <h2 className="text-sm font-semibold text-[#F9FAFB] flex items-center gap-2 mb-4">
        <CheckCircle2 className="w-4 h-4 text-blue-400" />
        My Tasks
      </h2>

      {tasks.length === 0 ? (
        <div className="text-center py-10">
          <CheckCircle2 className="w-8 h-8 text-[#374151] mx-auto mb-2" />
          <p className="text-[#6B7280] text-sm">No tasks yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-[#111827] rounded-lg border border-[#374151] hover:border-[#4B5563] transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${priorityDot[task.priority] || priorityDot.low}`} />
                <div>
                  <p className="text-sm font-medium text-[#F9FAFB]">{task.title}</p>
                  {task.description && <p className="text-xs text-[#6B7280] line-clamp-1">{task.description}</p>}
                </div>
              </div>
              <Badge className={`border text-xs ${statusStyle[task.status] || statusStyle.pending}`}>{task.status}</Badge>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
