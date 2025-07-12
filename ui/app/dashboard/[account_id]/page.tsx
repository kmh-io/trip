import withDashboardHeader from "@/app/dashboard/[account_id]/components/dashboard-header";
import Metric from "@/app/dashboard/[account_id]/components/metric";
import { Icon } from "@/components/icon-factory";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Dashboard() {
  const Header = withDashboardHeader();

  return (
    <main className="flex flex-1 flex-col gap-4">
      <ScrollArea className={"w-full h-full"}>
        <Header />

        <section className="flex-1 pr-1 pl-1 grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
          <Metric
            title={"Total Posts"}
            description={"+20.1% from last month"}
            value={`${456} routes`}
            icon={Icon.route}
          />

          <Metric
            title={"Total Posts"}
            description={"+20.1% from last month"}
            value={`${456} routes`}
            icon={Icon.route}
          />

          <Metric
            title={"Total Posts"}
            description={"+20.1% from last month"}
            value={`${456} routes`}
            icon={Icon.route}
          />

          <Metric
            title={"Total Posts"}
            description={"+20.1% from last month"}
            value={`${456} routes`}
            icon={Icon.route}
          />
        </section>

        <footer className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"></footer>
      </ScrollArea>
    </main>
  );
}
