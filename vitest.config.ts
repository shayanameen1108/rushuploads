import { configDefaults, defineConfig } from "vite-plus";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    exclude: [...configDefaults.exclude, "tests/e2e/**"],
    // No tests yet — the scaffold ships no domain logic to assert on.
    passWithNoTests: true,
  },
});
