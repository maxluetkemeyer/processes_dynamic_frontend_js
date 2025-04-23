import { ComboboxDemo } from "./box";

export function WhatsInside() {
  return (
    <>
      <p className="text-muted-foreground text-sm">Whats inside the window</p>
      <ComboboxDemo key={"myKey-1"} />
    </>
  );
}
