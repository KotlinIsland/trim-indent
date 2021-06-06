export default function trimIndent(
  strings: TemplateStringsArray,
  ...expressions: string[]
): string {
  const indent = Math.min(
    ...strings
      .flatMap((it) =>
        it
          .split("\n")
          // don't consider lines that are ws (line.trim() == "")
          //   unless it's lines[-1] because s string expression will follow it (and last-last line can set indent)
          .filter((_, i, lines) => i !== 0 && i === lines.length - 1)
          .map((line) => line.length - line.trimStart().length)
      ),
  );
  let result = strings
    .map((it, i) =>
      it
        .split("\n")
        .map((it) =>
          it.substring(0, indent).trim() === "" ? it.substring(indent) : it
        )
        .join("\n") +
      ((i < expressions.length) ? expressions[i] : "")
    )
    .join("");
  if (result.startsWith("\n")) result = result.substring(1);
  if (
    result.includes("\n") &&
    result.substring(result.lastIndexOf("\n")).trim() === ""
  ) {
    result = result.substring(0, result.lastIndexOf("\n"));
  }
  return result;
}
