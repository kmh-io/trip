import Metric from "@/app/[account_id]/components/metric";
import { Icon } from "@/components/icon-factory";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Dashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-1 pt-0 overflow-auto">
      <ScrollArea className={"w-full h-full"}>
        <header className="grid auto-rows-min gap-4 md:grid-cols-4 ">
          <Metric
            title={"Total Posts"}
            description={"+20.1% from last month"}
            value={`${456} posts`}
            icon={Icon.post}
          />
        </header>

        <section className="flex-1 grid gap-4 md:grid-cols-2 lg:grid-cols-8"></section>

        <footer className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"></footer>
      </ScrollArea>
    </main>
  );
}
