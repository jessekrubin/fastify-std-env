import jsse from "@jsse/eslint-config";

export default jsse({
  ignores: ["**/dev"],
  debug: false,
  typescript: {
    tsconfig: "tsconfig.json",
  },
  reportUnusedDisableDirectives: true,
  off: [],
  prettier: true,
});
