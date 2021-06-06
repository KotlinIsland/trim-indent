import { assertEquals } from "https://deno.land/std@0.95.0/testing/asserts.ts";
import trimIndent from "./mod.ts";

Deno.test({
  name: "it should trim",
  fn() {
    assertEquals(
      trimIndent`
      foo
      bar
      `,
      "foo\nbar",
    );
  },
});

Deno.test({
  name: "interpolation should be at the same level",
  fn() {
    assertEquals(
      trimIndent`
      foo
      ${"baz\nbat"}
      bar
      `,
      "foo\nbaz\nbat\nbar",
    );
  },
});

Deno.test({
  name: "interpolation should be at the same level after text",
  fn() {
    assertEquals(
      trimIndent`
      foo ${"baz\nbat"}
      bar
      `,
      "foo baz\nbat\nbar",
    );
  },
});

Deno.test({
  name: "interpolation should be at the same level3",
  fn() {
    assertEquals(
      trimIndent`
      foo
      bar
      ${"baz\nbat"}`,
      "foo\nbar\nbaz\nbat",
    );
  },
});

Deno.test({
  name: "interpolation should be at the same level4",
  fn() {
    assertEquals(
      trimIndent`
      foo
      bar
    ${"baz\nbat"}`,
      "  foo\n  bar\nbaz\nbat",
    );
    assertEquals(
      trimIndent`
      foo
    ${"baz\nbat"}
      bar
      `,
      "  foo\nbaz\nbat\n  bar",
    );
    assertEquals(
      trimIndent`
      foo
      bar
    a`,
      "  foo\n  bar\na",
    );
  },
});

Deno.test({
  name: "keeps whitespace between interpolations",
  fn() {
    assertEquals(
      trimIndent`
      foo ${"bar"} baz`,
      "foo bar baz",
    );
    assertEquals(
      trimIndent`
      foo ${"bar"} baz
      `,
      "foo bar baz",
    );
    assertEquals(
      trimIndent`foo ${"bar"} baz`,
      "foo bar baz",
    );
    assertEquals(
      trimIndent`foo ${"bar"} baz
`,
      "foo bar baz",
    );
  },
});

Deno.test({
  name: "an empty end line can set the indent",
  fn() {
    assertEquals(
      trimIndent`
        foo
      `,
      "  foo",
    );
  },
});

Deno.test({
  name: "start end end lines get trimmed",
  fn() {
    assertEquals(
      trimIndent`
      foo
      `,
      "foo",
    );
  },
});

Deno.test({
  name: "two interpolations on the same line",
  fn() {
    assertEquals(
      trimIndent`
      ${"foo\nbar"}${"foo\nbar"}
      `,
      "foo\nbarfoo\nbar",
    );
  },
});

Deno.test({
  name: "don't trim trailing expression whitespace",
  fn() {
    assertEquals(
      trimIndent`
      foo
    ${" "}  
      `,
      "  foo\n ",
    );
  },
});

Deno.test({
  name: "white space doesn't set indent",
  fn() {
    assertEquals(
      trimIndent`
      foo
    
      bar
      `,
      "foo\n\nbar",
    );
  },
});

Deno.test({
  ignore: true, // js doesn't differentiate between a literal newline and an escapped one, so this is impossible to implement
  name: "an escaped new line doesn't set the indent",
  fn() {
    assertEquals(
      trimIndent`
        foo\nbar
        `,
      "foo\nbar",
    );
  },
});
