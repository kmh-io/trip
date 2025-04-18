import IconFactory, { Icon } from "@/components/icon-factory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface MetricProps {
  title: string;
  description: string;
  value: string;
  icon: Icon;
}

export default function Metric({
  title,
  description,
  value,
  icon,
}: MetricProps) {
  return (
    <Card className="aspect-video rounded-xl bg-muted/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <IconFactory icon={icon} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
