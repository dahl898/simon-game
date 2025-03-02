import * as cyp from "cypress";

const defineConfig = cyp.defineConfig

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
