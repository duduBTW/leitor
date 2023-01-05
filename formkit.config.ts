import { en } from "@formkit/i18n";
import { DefaultConfigOptions } from "@formkit/vue";
import { generateClasses } from "@formkit/themes";

const config: DefaultConfigOptions = {
  locales: { en },
  locale: "pt",
  config: {
    classes: generateClasses({
      text: {
        input: "input",
        outer: "flex-1",
        label: "text-gray-600 text-sm font-medium",
        message: "error",
      },
    }),
  },
};

export default config;
