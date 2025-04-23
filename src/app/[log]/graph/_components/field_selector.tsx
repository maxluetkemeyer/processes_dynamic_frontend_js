import { ComboboxDemo } from "./box";

export function FieldSelector() {
  return (
    <>
      <p className="text-muted-foreground text-sm">Activity column</p>
      <ComboboxDemo key={"myKey-1"} />
      <p className="text-muted-foreground text-sm">Time column</p>
      <ComboboxDemo key={"myKey-2"} />
      <p className="text-muted-foreground text-sm">Activity column</p>
      <ComboboxDemo key={"myKey-3"} />
    </>
  );
}
