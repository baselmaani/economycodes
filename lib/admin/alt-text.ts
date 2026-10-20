/** Turns "Hadi-office_2026.jpg" into a starting alt text of "Hadi office 2026". */
export function altFromFilename(name: string): string {
  return (
    name
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .trim() || "Image"
  );
}
