/* eslint-disable no-unused-vars */

// src/tailwindcss.worker.ts
import { initialize as initializeWorker } from "monaco-worker-manager/worker";
import postcss8 from "postcss";
import postcssSelectorParser from "postcss-selector-parser";

// node_modules/tailwindcss/src/lib/expandApplyAtRules.js
import postcss6 from "postcss";
import parser3 from "postcss-selector-parser";

// node_modules/tailwindcss/src/lib/generateRules.js
import postcss5 from "postcss";
import selectorParser3 from "postcss-selector-parser";

// node_modules/tailwindcss/src/util/parseObjectStyles.js
import postcss from "postcss";
import postcssNested from "postcss-nested";
import postcssJs from "postcss-js";
function parseObjectStyles(styles) {
  if (!Array.isArray(styles)) {
    return parseObjectStyles([styles]);
  }
  return styles.flatMap((style) => {
    return postcss([
      postcssNested({
        bubble: ["screen"],
      }),
    ]).process(style, {
      parser: postcssJs,
    }).root.nodes;
  });
}

// node_modules/tailwindcss/src/util/isPlainObject.js
function isPlainObject(value2) {
  if (Object.prototype.toString.call(value2) !== "[object Object]") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value2);
  return prototype === null || prototype === Object.prototype;
}

// node_modules/tailwindcss/src/util/prefixSelector.js
import parser from "postcss-selector-parser";
function prefixSelector_default(prefix3, selector, prependNegative = false) {
  if (prefix3 === "") {
    return selector;
  }
  let ast =
    typeof selector === "string" ? parser().astSync(selector) : selector;
  ast.walkClasses((classSelector) => {
    let baseClass = classSelector.value;
    let shouldPlaceNegativeBeforePrefix =
      prependNegative && baseClass.startsWith("-");
    classSelector.value = shouldPlaceNegativeBeforePrefix
      ? `-${prefix3}${baseClass.slice(1)}`
      : `${prefix3}${baseClass}`;
  });
  return typeof selector === "string" ? ast.toString() : ast;
}

// node_modules/tailwindcss/src/util/escapeCommas.js
function escapeCommas(className) {
  return className.replace(/\\,/g, "\\2c ");
}

// node_modules/tailwindcss/src/util/color.js
import namedColors from "color-name";
var HEX = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
var SHORT_HEX = /^#([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
var VALUE = /(?:\d+|\d*\.\d+)%?/;
var SEP = /(?:\s*,\s*|\s+)/;
var ALPHA_SEP = /\s*[,/]\s*/;
var CUSTOM_PROPERTY = /var\(--(?:[^ )]*?)\)/;
var RGB = new RegExp(
  `^(rgba?)\\(\\s*(${VALUE.source}|${CUSTOM_PROPERTY.source})(?:${SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?(?:${SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?(?:${ALPHA_SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?\\s*\\)$`
);
var HSL = new RegExp(
  `^(hsla?)\\(\\s*((?:${VALUE.source})(?:deg|rad|grad|turn)?|${CUSTOM_PROPERTY.source})(?:${SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?(?:${SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?(?:${ALPHA_SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?\\s*\\)$`
);
function parseColor(value2, { loose = false } = {}) {
  if (typeof value2 !== "string") {
    return null;
  }
  value2 = value2.trim();
  if (value2 === "transparent") {
    return { mode: "rgb", color: ["0", "0", "0"], alpha: "0" };
  }
  if (value2 in namedColors) {
    return { mode: "rgb", color: namedColors[value2].map((v) => v.toString()) };
  }
  let hex2 = value2
    .replace(SHORT_HEX, (_, r2, g, b, a) =>
      ["#", r2, r2, g, g, b, b, a ? a + a : ""].join("")
    )
    .match(HEX);
  if (hex2 !== null) {
    return {
      mode: "rgb",
      color: [
        parseInt(hex2[1], 16),
        parseInt(hex2[2], 16),
        parseInt(hex2[3], 16),
      ].map((v) => v.toString()),
      alpha: hex2[4] ? (parseInt(hex2[4], 16) / 255).toString() : void 0,
    };
  }
  let match = value2.match(RGB) ?? value2.match(HSL);
  if (match === null) {
    return null;
  }
  let color2 = [match[2], match[3], match[4]]
    .filter(Boolean)
    .map((v) => v.toString());
  if (color2.length === 2 && color2[0].startsWith("var(")) {
    return {
      mode: match[1],
      color: [color2[0]],
      alpha: color2[1],
    };
  }
  if (!loose && color2.length !== 3) {
    return null;
  }
  if (color2.length < 3 && !color2.some((part) => /^var\(.*?\)$/.test(part))) {
    return null;
  }
  return {
    mode: match[1],
    color: color2,
    alpha: match[5]?.toString?.(),
  };
}
function formatColor({ mode, color: color2, alpha }) {
  let hasAlpha = alpha !== void 0;
  if (mode === "rgba" || mode === "hsla") {
    return `${mode}(${color2.join(", ")}${hasAlpha ? `, ${alpha}` : ""})`;
  }
  return `${mode}(${color2.join(" ")}${hasAlpha ? ` / ${alpha}` : ""})`;
}

// node_modules/tailwindcss/src/util/withAlphaVariable.js
function withAlphaValue(color2, alphaValue, defaultValue) {
  if (typeof color2 === "function") {
    return color2({ opacityValue: alphaValue });
  }
  let parsed = parseColor(color2, { loose: true });
  if (parsed === null) {
    return defaultValue;
  }
  return formatColor({ ...parsed, alpha: alphaValue });
}
function withAlphaVariable({ color: color2, property, variable }) {
  let properties = [].concat(property);
  if (typeof color2 === "function") {
    return {
      [variable]: "1",
      ...Object.fromEntries(
        properties.map((p2) => {
          return [
            p2,
            color2({
              opacityVariable: variable,
              opacityValue: `var(${variable})`,
            }),
          ];
        })
      ),
    };
  }
  const parsed = parseColor(color2);
  if (parsed === null) {
    return Object.fromEntries(properties.map((p2) => [p2, color2]));
  }
  if (parsed.alpha !== void 0) {
    return Object.fromEntries(properties.map((p2) => [p2, color2]));
  }
  return {
    [variable]: "1",
    ...Object.fromEntries(
      properties.map((p2) => {
        return [p2, formatColor({ ...parsed, alpha: `var(${variable})` })];
      })
    ),
  };
}

// node_modules/tailwindcss/src/util/splitAtTopLevelOnly.js
function splitAtTopLevelOnly(input, separator) {
  let stack = [];
  let parts = [];
  let lastPos = 0;
  for (let idx = 0; idx < input.length; idx++) {
    let char = input[idx];
    if (stack.length === 0 && char === separator[0]) {
      if (
        separator.length === 1 ||
        input.slice(idx, idx + separator.length) === separator
      ) {
        parts.push(input.slice(lastPos, idx));
        lastPos = idx + separator.length;
      }
    }
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
    } else if (
      (char === ")" && stack[stack.length - 1] === "(") ||
      (char === "]" && stack[stack.length - 1] === "[") ||
      (char === "}" && stack[stack.length - 1] === "{")
    ) {
      stack.pop();
    }
  }
  parts.push(input.slice(lastPos));
  return parts;
}

// node_modules/tailwindcss/src/util/parseBoxShadowValue.js
var KEYWORDS = /* @__PURE__ */ new Set([
  "inset",
  "inherit",
  "initial",
  "revert",
  "unset",
]);
var SPACE = /\ +(?![^(]*\))/g;
var LENGTH = /^-?(\d+|\.\d+)(.*?)$/g;
function parseBoxShadowValue(input) {
  let shadows = splitAtTopLevelOnly(input, ",");
  return shadows.map((shadow2) => {
    let value2 = shadow2.trim();
    let result = { raw: value2 };
    let parts = value2.split(SPACE);
    let seen = /* @__PURE__ */ new Set();
    for (let part of parts) {
      LENGTH.lastIndex = 0;
      if (!seen.has("KEYWORD") && KEYWORDS.has(part)) {
        result.keyword = part;
        seen.add("KEYWORD");
      } else if (LENGTH.test(part)) {
        if (!seen.has("X")) {
          result.x = part;
          seen.add("X");
        } else if (!seen.has("Y")) {
          result.y = part;
          seen.add("Y");
        } else if (!seen.has("BLUR")) {
          result.blur = part;
          seen.add("BLUR");
        } else if (!seen.has("SPREAD")) {
          result.spread = part;
          seen.add("SPREAD");
        }
      } else {
        if (!result.color) {
          result.color = part;
        } else {
          if (!result.unknown) result.unknown = [];
          result.unknown.push(part);
        }
      }
    }
    result.valid = result.x !== void 0 && result.y !== void 0;
    return result;
  });
}
function formatBoxShadowValue(shadows) {
  return shadows
    .map((shadow2) => {
      if (!shadow2.valid) {
        return shadow2.raw;
      }
      return [
        shadow2.keyword,
        shadow2.x,
        shadow2.y,
        shadow2.blur,
        shadow2.spread,
        shadow2.color,
      ]
        .filter(Boolean)
        .join(" ");
    })
    .join(", ");
}

// node_modules/tailwindcss/src/util/dataTypes.js
var cssFunctions = ["min", "max", "clamp", "calc"];
function isCSSFunction(value2) {
  return cssFunctions.some((fn2) => new RegExp(`^${fn2}\\(.*\\)`).test(value2));
}
var placeholder = "--tw-placeholder";
var placeholderRe = new RegExp(placeholder, "g");
function normalize(value2, isRoot2 = true) {
  if (value2.includes("url(")) {
    return value2
      .split(/(url\(.*?\))/g)
      .filter(Boolean)
      .map((part) => {
        if (/^url\(.*?\)$/.test(part)) {
          return part;
        }
        return normalize(part, false);
      })
      .join("");
  }
  value2 = value2
    .replace(
      /([^\\])_+/g,
      (fullMatch, characterBefore) =>
        characterBefore + " ".repeat(fullMatch.length - 1)
    )
    .replace(/^_/g, " ")
    .replace(/\\_/g, "_");
  if (isRoot2) {
    value2 = value2.trim();
  }
  value2 = value2.replace(/(calc|min|max|clamp)\(.+\)/g, (match) => {
    let vars = [];
    return match
      .replace(/var\((--.+?)[,)]/g, (match2, g1) => {
        vars.push(g1);
        return match2.replace(g1, placeholder);
      })
      .replace(
        /(-?\d*\.?\d(?!\b-\d.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g,
        "$1 $2 "
      )
      .replace(placeholderRe, () => vars.shift());
  });
  return value2;
}
function url(value2) {
  return value2.startsWith("url(");
}
function number(value2) {
  return !isNaN(Number(value2)) || isCSSFunction(value2);
}
function percentage(value2) {
  return (
    (value2.endsWith("%") && number(value2.slice(0, -1))) ||
    isCSSFunction(value2)
  );
}
var lengthUnits = [
  "cm",
  "mm",
  "Q",
  "in",
  "pc",
  "pt",
  "px",
  "em",
  "ex",
  "ch",
  "rem",
  "lh",
  "rlh",
  "vw",
  "vh",
  "vmin",
  "vmax",
  "vb",
  "vi",
  "svw",
  "svh",
  "lvw",
  "lvh",
  "dvw",
  "dvh",
  "cqw",
  "cqh",
  "cqi",
  "cqb",
  "cqmin",
  "cqmax",
];
var lengthUnitsPattern = `(?:${lengthUnits.join("|")})`;
function length(value2) {
  return (
    value2 === "0" ||
    new RegExp(
      `^[+-]?[0-9]*.?[0-9]+(?:[eE][+-]?[0-9]+)?${lengthUnitsPattern}$`
    ).test(value2) ||
    isCSSFunction(value2)
  );
}
var lineWidths = /* @__PURE__ */ new Set(["thin", "medium", "thick"]);
function lineWidth(value2) {
  return lineWidths.has(value2);
}
function shadow(value2) {
  let parsedShadows = parseBoxShadowValue(normalize(value2));
  for (let parsedShadow of parsedShadows) {
    if (!parsedShadow.valid) {
      return false;
    }
  }
  return true;
}
function color(value2) {
  let colors = 0;
  let result = splitAtTopLevelOnly(value2, "_").every((part) => {
    part = normalize(part);
    if (part.startsWith("var(")) return true;
    if (parseColor(part, { loose: true }) !== null) return colors++, true;
    return false;
  });
  if (!result) return false;
  return colors > 0;
}
function image(value2) {
  let images = 0;
  let result = splitAtTopLevelOnly(value2, ",").every((part) => {
    part = normalize(part);
    if (part.startsWith("var(")) return true;
    if (
      url(part) ||
      gradient(part) ||
      ["element(", "image(", "cross-fade(", "image-set("].some((fn2) =>
        part.startsWith(fn2)
      )
    ) {
      images++;
      return true;
    }
    return false;
  });
  if (!result) return false;
  return images > 0;
}
var gradientTypes = /* @__PURE__ */ new Set([
  "linear-gradient",
  "radial-gradient",
  "repeating-linear-gradient",
  "repeating-radial-gradient",
  "conic-gradient",
]);
function gradient(value2) {
  value2 = normalize(value2);
  for (let type of gradientTypes) {
    if (value2.startsWith(`${type}(`)) {
      return true;
    }
  }
  return false;
}
var validPositions = /* @__PURE__ */ new Set([
  "center",
  "top",
  "right",
  "bottom",
  "left",
]);
function position(value2) {
  let positions = 0;
  let result = splitAtTopLevelOnly(value2, "_").every((part) => {
    part = normalize(part);
    if (part.startsWith("var(")) return true;
    if (validPositions.has(part) || length(part) || percentage(part)) {
      positions++;
      return true;
    }
    return false;
  });
  if (!result) return false;
  return positions > 0;
}
function familyName(value2) {
  let fonts = 0;
  let result = splitAtTopLevelOnly(value2, ",").every((part) => {
    part = normalize(part);
    if (part.startsWith("var(")) return true;
    if (part.includes(" ")) {
      if (!/(['"])([^"']+)\1/g.test(part)) {
        return false;
      }
    }
    if (/^\d/g.test(part)) {
      return false;
    }
    fonts++;
    return true;
  });
  if (!result) return false;
  return fonts > 0;
}
var genericNames = /* @__PURE__ */ new Set([
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui",
  "ui-serif",
  "ui-sans-serif",
  "ui-monospace",
  "ui-rounded",
  "math",
  "emoji",
  "fangsong",
]);
function genericName(value2) {
  return genericNames.has(value2);
}
var absoluteSizes = /* @__PURE__ */ new Set([
  "xx-small",
  "x-small",
  "small",
  "medium",
  "large",
  "x-large",
  "x-large",
  "xxx-large",
]);
function absoluteSize(value2) {
  return absoluteSizes.has(value2);
}
var relativeSizes = /* @__PURE__ */ new Set(["larger", "smaller"]);
function relativeSize(value2) {
  return relativeSizes.has(value2);
}

// node_modules/tailwindcss/src/util/negateValue.js
function negateValue(value2) {
  value2 = `${value2}`;
  if (value2 === "0") {
    return "0";
  }
  if (/^[+-]?(\d+|\d*\.\d+)(e[+-]?\d+)?(%|\w+)?$/.test(value2)) {
    return value2.replace(/^[+-]?/, (sign) => (sign === "-" ? "" : "-"));
  }
  let numericFunctions = ["var", "calc", "min", "max", "clamp"];
  for (const fn2 of numericFunctions) {
    if (value2.includes(`${fn2}(`)) {
      return `calc(${value2} * -1)`;
    }
  }
}

// node_modules/tailwindcss/src/util/validateFormalSyntax.js
function backgroundSize(value2) {
  let keywordValues = ["cover", "contain"];
  return splitAtTopLevelOnly(value2, ",").every((part) => {
    let sizes = splitAtTopLevelOnly(part, "_").filter(Boolean);
    if (sizes.length === 1 && keywordValues.includes(sizes[0])) return true;
    if (sizes.length !== 1 && sizes.length !== 2) return false;
    return sizes.every(
      (size) => length(size) || percentage(size) || size === "auto"
    );
  });
}

// src/stubs/picocolors.ts
var picocolors_default = {
  yellow: (input) => input,
};

// src/stubs/tailwindcss/utils/log.ts
function log() {}
function dim(input) {
  return input;
}
var log_default = {
  info: log,
  warn: log,
  risk: log,
};

// node_modules/tailwindcss/src/featureFlags.js
var defaults = {
  optimizeUniversalDefaults: false,
  generalizedModifiers: true,
};
var featureFlags = {
  future: [
    "hoverOnlyWhenSupported",
    "respectDefaultRingColorOpacity",
    "disableColorOpacityUtilitiesByDefault",
    "relativeContentPathsByDefault",
  ],
  experimental: [
    "optimizeUniversalDefaults",
    "generalizedModifiers",
    // 'variantGrouping',
  ],
};
function flagEnabled(config, flag) {
  if (featureFlags.future.includes(flag)) {
    return (
      config.future === "all" ||
      (config?.future?.[flag] ?? defaults[flag] ?? false)
    );
  }
  if (featureFlags.experimental.includes(flag)) {
    return (
      config.experimental === "all" ||
      (config?.experimental?.[flag] ?? defaults[flag] ?? false)
    );
  }
  return false;
}
function experimentalFlagsEnabled(config) {
  if (config.experimental === "all") {
    return featureFlags.experimental;
  }
  return Object.keys(config?.experimental ?? {}).filter(
    (flag) =>
      featureFlags.experimental.includes(flag) && config.experimental[flag]
  );
}
function issueFlagNotices(config) {
  if (true) {
    return;
  }
  if (experimentalFlagsEnabled(config).length > 0) {
    let changes = experimentalFlagsEnabled(config)
      .map((s2) => picocolors_default.yellow(s2))
      .join(", ");
    log_default.warn("experimental-flags-enabled", [
      `You have enabled experimental features: ${changes}`,
      "Experimental features in Tailwind CSS are not covered by semver, may introduce breaking changes, and can change at any time.",
    ]);
  }
}

// node_modules/tailwindcss/src/util/pluginUtils.js
function updateAllClasses(selectors, updateClass) {
  selectors.walkClasses((sel) => {
    sel.value = updateClass(sel.value);
    if (sel.raws && sel.raws.value) {
      sel.raws.value = escapeCommas(sel.raws.value);
    }
  });
}
function resolveArbitraryValue(modifier, validate) {
  if (!isArbitraryValue(modifier)) {
    return void 0;
  }
  let value2 = modifier.slice(1, -1);
  if (!validate(value2)) {
    return void 0;
  }
  return normalize(value2);
}
function asNegativeValue(modifier, lookup = {}, validate) {
  let positiveValue = lookup[modifier];
  if (positiveValue !== void 0) {
    return negateValue(positiveValue);
  }
  if (isArbitraryValue(modifier)) {
    let resolved = resolveArbitraryValue(modifier, validate);
    if (resolved === void 0) {
      return void 0;
    }
    return negateValue(resolved);
  }
}
function asValue(modifier, options = {}, { validate = () => true } = {}) {
  let value2 = options.values?.[modifier];
  if (value2 !== void 0) {
    return value2;
  }
  if (options.supportsNegativeValues && modifier.startsWith("-")) {
    return asNegativeValue(modifier.slice(1), options.values, validate);
  }
  return resolveArbitraryValue(modifier, validate);
}
function isArbitraryValue(input) {
  return input.startsWith("[") && input.endsWith("]");
}
function splitUtilityModifier(modifier) {
  let slashIdx = modifier.lastIndexOf("/");
  if (slashIdx === -1 || slashIdx === modifier.length - 1) {
    return [modifier, void 0];
  }
  let arbitrary = isArbitraryValue(modifier);
  if (arbitrary && !modifier.includes("]/[")) {
    return [modifier, void 0];
  }
  return [modifier.slice(0, slashIdx), modifier.slice(slashIdx + 1)];
}
function parseColorFormat(value2) {
  if (typeof value2 === "string" && value2.includes("<alpha-value>")) {
    let oldValue = value2;
    return ({ opacityValue = 1 }) =>
      oldValue.replace("<alpha-value>", opacityValue);
  }
  return value2;
}
function asColor(modifier, options = {}, { tailwindConfig = {} } = {}) {
  if (options.values?.[modifier] !== void 0) {
    return parseColorFormat(options.values?.[modifier]);
  }
  let [color2, alpha] = splitUtilityModifier(modifier);
  if (alpha !== void 0) {
    let normalizedColor =
      options.values?.[color2] ??
      (isArbitraryValue(color2) ? color2.slice(1, -1) : void 0);
    if (normalizedColor === void 0) {
      return void 0;
    }
    normalizedColor = parseColorFormat(normalizedColor);
    if (isArbitraryValue(alpha)) {
      return withAlphaValue(normalizedColor, alpha.slice(1, -1));
    }
    if (tailwindConfig.theme?.opacity?.[alpha] === void 0) {
      return void 0;
    }
    return withAlphaValue(normalizedColor, tailwindConfig.theme.opacity[alpha]);
  }
  return asValue(modifier, options, { validate: color });
}
function asLookupValue(modifier, options = {}) {
  return options.values?.[modifier];
}
function guess(validate) {
  return (modifier, options) => {
    return asValue(modifier, options, { validate });
  };
}
var typeMap = {
  any: asValue,
  color: asColor,
  url: guess(url),
  image: guess(image),
  length: guess(length),
  percentage: guess(percentage),
  position: guess(position),
  lookup: asLookupValue,
  "generic-name": guess(genericName),
  "family-name": guess(familyName),
  number: guess(number),
  "line-width": guess(lineWidth),
  "absolute-size": guess(absoluteSize),
  "relative-size": guess(relativeSize),
  shadow: guess(shadow),
  size: guess(backgroundSize),
};
var supportedTypes = Object.keys(typeMap);
function splitAtFirst(input, delim) {
  let idx = input.indexOf(delim);
  if (idx === -1) return [void 0, input];
  return [input.slice(0, idx), input.slice(idx + 1)];
}
function coerceValue(types2, modifier, options, tailwindConfig) {
  if (options.values && modifier in options.values) {
    for (let { type } of types2 ?? []) {
      let result = typeMap[type](modifier, options, {
        tailwindConfig,
      });
      if (result === void 0) {
        continue;
      }
      return [result, type, null];
    }
  }
  if (isArbitraryValue(modifier)) {
    let arbitraryValue = modifier.slice(1, -1);
    let [explicitType, value2] = splitAtFirst(arbitraryValue, ":");
    if (!/^[\w-_]+$/g.test(explicitType)) {
      value2 = arbitraryValue;
    } else if (
      explicitType !== void 0 &&
      !supportedTypes.includes(explicitType)
    ) {
      return [];
    }
    if (value2.length > 0 && supportedTypes.includes(explicitType)) {
      return [asValue(`[${value2}]`, options), explicitType, null];
    }
  }
  let matches = getMatchingTypes(types2, modifier, options, tailwindConfig);
  for (let match of matches) {
    return match;
  }
  return [];
}
function* getMatchingTypes(types2, rawModifier, options, tailwindConfig) {
  let modifiersEnabled = flagEnabled(tailwindConfig, "generalizedModifiers");
  let [modifier, utilityModifier] = splitUtilityModifier(rawModifier);
  let canUseUtilityModifier =
    modifiersEnabled &&
    options.modifiers != null &&
    (options.modifiers === "any" ||
      (typeof options.modifiers === "object" &&
        ((utilityModifier && isArbitraryValue(utilityModifier)) ||
          utilityModifier in options.modifiers)));
  if (!canUseUtilityModifier) {
    modifier = rawModifier;
    utilityModifier = void 0;
  }
  if (utilityModifier !== void 0 && modifier === "") {
    modifier = "DEFAULT";
  }
  if (utilityModifier !== void 0) {
    if (typeof options.modifiers === "object") {
      let configValue = options.modifiers?.[utilityModifier] ?? null;
      if (configValue !== null) {
        utilityModifier = configValue;
      } else if (isArbitraryValue(utilityModifier)) {
        utilityModifier = utilityModifier.slice(1, -1);
      }
    }
  }
  for (let { type } of types2 ?? []) {
    let result = typeMap[type](modifier, options, {
      tailwindConfig,
    });
    if (result === void 0) {
      continue;
    }
    yield [result, type, utilityModifier ?? null];
  }
}

// node_modules/tailwindcss/package.json
var version = "3.2.7";
var package_default = {
  name: "tailwindcss",
  version,
  description:
    "A utility-first CSS framework for rapidly building custom user interfaces.",
  license: "MIT",
  main: "lib/index.js",
  types: "types/index.d.ts",
  repository: "https://github.com/tailwindlabs/tailwindcss.git",
  bugs: "https://github.com/tailwindlabs/tailwindcss/issues",
  homepage: "https://tailwindcss.com",
  bin: {
    tailwind: "lib/cli.js",
    tailwindcss: "lib/cli.js",
  },
  tailwindcss: {
    engine: "stable",
  },
  scripts: {
    prebuild: "npm run generate && rimraf lib",
    build: "swc src --out-dir lib --copy-files",
    postbuild:
      "esbuild lib/cli-peer-dependencies.js --bundle --platform=node --outfile=peers/index.js --define:process.env.CSS_TRANSFORMER_WASM=false",
    "rebuild-fixtures":
      "npm run build && node -r @swc/register scripts/rebuildFixtures.js",
    style: "eslint .",
    pretest: "npm run generate",
    test: "jest",
    "test:integrations": "npm run test --prefix ./integrations",
    "install:integrations": "node scripts/install-integrations.js",
    "generate:plugin-list":
      "node -r @swc/register scripts/create-plugin-list.js",
    "generate:types": "node -r @swc/register scripts/generate-types.js",
    generate: "npm run generate:plugin-list && npm run generate:types",
    "release-channel": "node ./scripts/release-channel.js",
    "release-notes": "node ./scripts/release-notes.js",
    prepublishOnly: "npm install --force && npm run build",
  },
  files: [
    "src/*",
    "cli/*",
    "lib/*",
    "peers/*",
    "scripts/*.js",
    "stubs/*.stub.js",
    "nesting/*",
    "types/**/*",
    "*.d.ts",
    "*.css",
    "*.js",
  ],
  devDependencies: {
    "@swc/cli": "0.1.59",
    "@swc/core": "1.3.24",
    "@swc/jest": "0.2.24",
    "@swc/register": "0.1.10",
    autoprefixer: "^10.4.13",
    browserslist: "^4.21.4",
    concurrently: "^7.5.0",
    cssnano: "^5.1.14",
    esbuild: "^0.16.10",
    eslint: "^8.31.0",
    "eslint-config-prettier": "^8.6.0",
    "eslint-plugin-prettier": "^4.2.1",
    jest: "^28.1.3",
    "jest-diff": "^28.1.3",
    lightningcss: "^1.18.0",
    prettier: "^2.8.1",
    rimraf: "^3.0.0",
    "source-map-js": "^1.0.2",
    turbo: "^1.6.3",
  },
  peerDependencies: {
    postcss: "^8.0.9",
  },
  dependencies: {
    arg: "^5.0.2",
    chokidar: "^3.5.3",
    "color-name": "^1.1.4",
    detective: "^5.2.1",
    didyoumean: "^1.2.2",
    dlv: "^1.1.3",
    "fast-glob": "^3.2.12",
    "glob-parent": "^6.0.2",
    "is-glob": "^4.0.3",
    lilconfig: "^2.0.6",
    micromatch: "^4.0.5",
    "normalize-path": "^3.0.0",
    "object-hash": "^3.0.0",
    picocolors: "^1.0.0",
    postcss: "^8.0.9",
    "postcss-import": "^14.1.0",
    "postcss-js": "^4.0.0",
    "postcss-load-config": "^3.1.4",
    "postcss-nested": "6.0.0",
    "postcss-selector-parser": "^6.0.11",
    "postcss-value-parser": "^4.2.0",
    "quick-lru": "^5.1.1",
    resolve: "^1.22.1",
  },
  browserslist: ["> 1%", "not edge <= 18", "not ie 11", "not op_mini all"],
  jest: {
    testTimeout: 3e4,
    setupFilesAfterEnv: ["<rootDir>/jest/customMatchers.js"],
    testPathIgnorePatterns: [
      "/node_modules/",
      "/integrations/",
      "/standalone-cli/",
      "\\.test\\.skip\\.js$",
    ],
    transformIgnorePatterns: ["node_modules/(?!lightningcss)"],
    transform: {
      "\\.js$": "@swc/jest",
      "\\.ts$": "@swc/jest",
    },
  },
  engines: {
    node: ">=12.13.0",
  },
};

// node_modules/tailwindcss/src/lib/sharedState.js
var OXIDE_DEFAULT_ENABLED = package_default.tailwindcss.engine === "oxide";
var env = {
  NODE_ENV: "production",
  DEBUG: resolveDebug(void 0),
  ENGINE: package_default.tailwindcss.engine,
  OXIDE: resolveBoolean(void 0, OXIDE_DEFAULT_ENABLED),
};
var NOT_ON_DEMAND = new String("*");
var NONE = Symbol("__NONE__");
function resolveBoolean(value2, defaultValue) {
  if (value2 === void 0) {
    return defaultValue;
  }
  if (value2 === "0" || value2 === "false") {
    return false;
  }
  return true;
}
function resolveDebug(debug) {
  if (debug === void 0) {
    return false;
  }
  if (debug === "true" || debug === "1") {
    return true;
  }
  if (debug === "false" || debug === "0") {
    return false;
  }
  if (debug === "*") {
    return true;
  }
  let debuggers = debug.split(",").map((d) => d.split(":")[0]);
  if (debuggers.includes("-tailwindcss")) {
    return false;
  }
  if (debuggers.includes("tailwindcss")) {
    return true;
  }
  return false;
}

// node_modules/tailwindcss/src/util/formatVariantSelector.js
import selectorParser from "postcss-selector-parser";
import unescape from "postcss-selector-parser/dist/util/unesc.js";

// node_modules/tailwindcss/src/util/escapeClassName.js
import parser2 from "postcss-selector-parser";
function escapeClassName(className) {
  let node = parser2.className();
  node.value = className;
  return escapeCommas(node?.raws?.value ?? node.value);
}

// node_modules/tailwindcss/src/util/formatVariantSelector.js
var MERGE = ":merge";
function formatVariantSelector(formats, { context, candidate }) {
  let prefix3 = context?.tailwindConfig.prefix ?? "";
  let parsedFormats = formats.map((format) => {
    let ast = selectorParser().astSync(format.format);
    return {
      ...format,
      ast: format.isArbitraryVariant
        ? ast
        : prefixSelector_default(prefix3, ast),
    };
  });
  let formatAst = selectorParser.root({
    nodes: [
      selectorParser.selector({
        nodes: [
          selectorParser.className({ value: escapeClassName(candidate) }),
        ],
      }),
    ],
  });
  for (let { ast } of parsedFormats) {
    [formatAst, ast] = handleMergePseudo(formatAst, ast);
    ast.walkNesting((nesting) =>
      nesting.replaceWith(...formatAst.nodes[0].nodes)
    );
    formatAst = ast;
  }
  return formatAst;
}
function simpleSelectorForNode(node) {
  let nodes = [];
  while (node.prev() && node.prev().type !== "combinator") {
    node = node.prev();
  }
  while (node && node.type !== "combinator") {
    nodes.push(node);
    node = node.next();
  }
  return nodes;
}
function resortSelector(sel) {
  sel.sort((a, b) => {
    if (a.type === "tag" && b.type === "class") {
      return -1;
    } else if (a.type === "class" && b.type === "tag") {
      return 1;
    } else if (
      a.type === "class" &&
      b.type === "pseudo" &&
      b.value.startsWith("::")
    ) {
      return -1;
    } else if (
      a.type === "pseudo" &&
      a.value.startsWith("::") &&
      b.type === "class"
    ) {
      return 1;
    }
    return sel.index(a) - sel.index(b);
  });
  return sel;
}
function eliminateIrrelevantSelectors(sel, base) {
  let hasClassesMatchingCandidate = false;
  sel.walk((child) => {
    if (child.type === "class" && child.value === base) {
      hasClassesMatchingCandidate = true;
      return false;
    }
  });
  if (!hasClassesMatchingCandidate) {
    sel.remove();
  }
}
function finalizeSelector(current, formats, { context, candidate, base }) {
  let separator = context?.tailwindConfig?.separator ?? ":";
  base =
    base ?? candidate.split(new RegExp(`\\${separator}(?![^[]*\\])`)).pop();
  let selector = selectorParser().astSync(current);
  selector.walkClasses((node) => {
    if (node.raws && node.value.includes(base)) {
      node.raws.value = escapeClassName(unescape(node.raws.value));
    }
  });
  selector.each((sel) => eliminateIrrelevantSelectors(sel, base));
  let formatAst = Array.isArray(formats)
    ? formatVariantSelector(formats, { context, candidate })
    : formats;
  if (formatAst === null) {
    return selector.toString();
  }
  let simpleStart = selectorParser.comment({ value: "/*__simple__*/" });
  let simpleEnd = selectorParser.comment({ value: "/*__simple__*/" });
  selector.walkClasses((node) => {
    if (node.value !== base) {
      return;
    }
    let parent = node.parent;
    let formatNodes = formatAst.nodes[0].nodes;
    if (parent.nodes.length === 1) {
      node.replaceWith(...formatNodes);
      return;
    }
    let simpleSelector = simpleSelectorForNode(node);
    parent.insertBefore(simpleSelector[0], simpleStart);
    parent.insertAfter(simpleSelector[simpleSelector.length - 1], simpleEnd);
    for (let child of formatNodes) {
      parent.insertBefore(simpleSelector[0], child.clone());
    }
    node.remove();
    simpleSelector = simpleSelectorForNode(simpleStart);
    let firstNode = parent.index(simpleStart);
    parent.nodes.splice(
      firstNode,
      simpleSelector.length,
      ...resortSelector(selectorParser.selector({ nodes: simpleSelector }))
        .nodes
    );
    simpleStart.remove();
    simpleEnd.remove();
  });
  selector.walkPseudos((p2) => {
    if (p2.value === MERGE) {
      p2.replaceWith(p2.nodes);
    }
  });
  selector.each((sel) => {
    let pseudoElements = collectPseudoElements(sel);
    if (pseudoElements.length > 0) {
      sel.nodes.push(pseudoElements.sort(sortSelector));
    }
  });
  return selector.toString();
}
function handleMergePseudo(selector, format) {
  let merges = [];
  selector.walkPseudos((pseudo) => {
    if (pseudo.value === MERGE) {
      merges.push({
        pseudo,
        value: pseudo.nodes[0].toString(),
      });
    }
  });
  format.walkPseudos((pseudo) => {
    if (pseudo.value !== MERGE) {
      return;
    }
    let value2 = pseudo.nodes[0].toString();
    let existing = merges.find((merge) => merge.value === value2);
    if (!existing) {
      return;
    }
    let attachments = [];
    let next = pseudo.next();
    while (next && next.type !== "combinator") {
      attachments.push(next);
      next = next.next();
    }
    let combinator = next;
    existing.pseudo.parent.insertAfter(
      existing.pseudo,
      selectorParser.selector({
        nodes: attachments.map((node) => node.clone()),
      })
    );
    pseudo.remove();
    attachments.forEach((node) => node.remove());
    if (combinator && combinator.type === "combinator") {
      combinator.remove();
    }
  });
  return [selector, format];
}
var pseudoElementsBC = [":before", ":after", ":first-line", ":first-letter"];
var pseudoElementExceptions = [
  "::file-selector-button",
  // Webkit scroll bar pseudo elements can be combined with user-action pseudo classes
  "::-webkit-scrollbar",
  "::-webkit-scrollbar-button",
  "::-webkit-scrollbar-thumb",
  "::-webkit-scrollbar-track",
  "::-webkit-scrollbar-track-piece",
  "::-webkit-scrollbar-corner",
  "::-webkit-resizer",
];
function collectPseudoElements(selector) {
  let nodes = [];
  for (let node of selector.nodes) {
    if (isPseudoElement(node)) {
      nodes.push(node);
      selector.removeChild(node);
    }
    if (node?.nodes) {
      nodes.push(...collectPseudoElements(node));
    }
  }
  return nodes;
}
function sortSelector(a, z) {
  if (a.type !== "pseudo" && z.type !== "pseudo") {
    return 0;
  }
  if ((a.type === "combinator") ^ (z.type === "combinator")) {
    return 0;
  }
  if ((a.type === "pseudo") ^ (z.type === "pseudo")) {
    return (a.type === "pseudo") - (z.type === "pseudo");
  }
  return isPseudoElement(a) - isPseudoElement(z);
}
function isPseudoElement(node) {
  if (node.type !== "pseudo") return false;
  if (pseudoElementExceptions.includes(node.value)) return false;
  return node.value.startsWith("::") || pseudoElementsBC.includes(node.value);
}

// node_modules/tailwindcss/src/util/nameClass.js
function asClass(name) {
  return escapeCommas(`.${escapeClassName(name)}`);
}
function nameClass(classPrefix, key) {
  return asClass(formatClass(classPrefix, key));
}
function formatClass(classPrefix, key) {
  if (key === "DEFAULT") {
    return classPrefix;
  }
  if (key === "-" || key === "-DEFAULT") {
    return `-${classPrefix}`;
  }
  if (key.startsWith("-")) {
    return `-${classPrefix}${key}`;
  }
  if (key.startsWith("/")) {
    return `${classPrefix}${key}`;
  }
  return `${classPrefix}-${key}`;
}

// node_modules/tailwindcss/src/css/preflight.css
var preflight_default =
  "/*\n1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)\n*/\n\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: theme('borderColor.DEFAULT', currentColor); /* 2 */\n}\n\n::before,\n::after {\n  --tw-content: '';\n}\n\n/*\n1. Use a consistent sensible line-height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n3. Use a more readable tab size.\n4. Use the user's configured `sans` font-family by default.\n5. Use the user's configured `sans` font-feature-settings by default.\n*/\n\nhtml {\n  line-height: 1.5; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n  -moz-tab-size: 4; /* 3 */\n  tab-size: 4; /* 3 */\n  font-family: theme('fontFamily.sans', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"); /* 4 */\n  font-feature-settings: theme('fontFamily.sans[1].fontFeatureSettings', normal); /* 5 */\n}\n\n/*\n1. Remove the margin in all browsers.\n2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.\n*/\n\nbody {\n  margin: 0; /* 1 */\n  line-height: inherit; /* 2 */\n}\n\n/*\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n3. Ensure horizontal rules are visible by default.\n*/\n\nhr {\n  height: 0; /* 1 */\n  color: inherit; /* 2 */\n  border-top-width: 1px; /* 3 */\n}\n\n/*\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr:where([title]) {\n  text-decoration: underline dotted;\n}\n\n/*\nRemove the default font size and weight for headings.\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\nReset links to optimize for opt-in styling instead of opt-out.\n*/\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/*\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n1. Use the user's configured `mono` font family by default.\n2. Correct the odd `em` font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family: theme('fontFamily.mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace); /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/*\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/*\nPrevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n3. Remove gaps between table borders by default.\n*/\n\ntable {\n  text-indent: 0; /* 1 */\n  border-color: inherit; /* 2 */\n  border-collapse: collapse; /* 3 */\n}\n\n/*\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n3. Remove default padding in all browsers.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  font-weight: inherit; /* 1 */\n  line-height: inherit; /* 1 */\n  color: inherit; /* 1 */\n  margin: 0; /* 2 */\n  padding: 0; /* 3 */\n}\n\n/*\nRemove the inheritance of text transform in Edge and Firefox.\n*/\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Remove default button styles.\n*/\n\nbutton,\n[type='button'],\n[type='reset'],\n[type='submit'] {\n  -webkit-appearance: button; /* 1 */\n  background-color: transparent; /* 2 */\n  background-image: none; /* 2 */\n}\n\n/*\nUse the modern Firefox focus style for all focusable elements.\n*/\n\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\nRemove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/*\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type='search'] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/*\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to `inherit` in Safari.\n*/\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/*\nRemoves the default spacing and border for appropriate elements.\n*/\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nlegend {\n  padding: 0;\n}\n\nol,\nul,\nmenu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/*\nPrevent resizing textareas horizontally by default.\n*/\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n2. Set the default placeholder color to the user's configured gray 400 color.\n*/\n\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1; /* 1 */\n  color: theme('colors.gray.400', #9ca3af); /* 2 */\n}\n\n/*\nSet the default cursor for buttons.\n*/\n\nbutton,\n[role=\"button\"] {\n  cursor: pointer;\n}\n\n/*\nMake sure disabled buttons don't get the pointer cursor.\n*/\n:disabled {\n  cursor: default;\n}\n\n/*\n1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n   This can trigger a poorly considered lint error in some tools but is included by design.\n*/\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block; /* 1 */\n  vertical-align: middle; /* 2 */\n}\n\n/*\nConstrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n/* Make elements with the HTML hidden attribute stay hidden by default */\n[hidden] {\n  display: none;\n}\n";

// src/stubs/fs.ts
var fs_default = {
  // Reading the preflight CSS is the only use of fs at the moment of writing.
  readFileSync: () => preflight_default,
};

// node_modules/tailwindcss/src/lib/setupContextUtils.js
import postcss4 from "postcss";
import dlv from "dlv";
import selectorParser2 from "postcss-selector-parser";

// node_modules/tailwindcss/src/util/transformThemeValue.js
import postcss2 from "postcss";
function transformThemeValue(themeSection) {
  if (["fontSize", "outline"].includes(themeSection)) {
    return (value2) => {
      if (typeof value2 === "function") value2 = value2({});
      if (Array.isArray(value2)) value2 = value2[0];
      return value2;
    };
  }
  if (themeSection === "fontFamily") {
    return (value2) => {
      if (typeof value2 === "function") value2 = value2({});
      let families =
        Array.isArray(value2) && isPlainObject(value2[1]) ? value2[0] : value2;
      return Array.isArray(families) ? families.join(", ") : families;
    };
  }
  if (
    [
      "boxShadow",
      "transitionProperty",
      "transitionDuration",
      "transitionDelay",
      "transitionTimingFunction",
      "backgroundImage",
      "backgroundSize",
      "backgroundColor",
      "cursor",
      "animation",
    ].includes(themeSection)
  ) {
    return (value2) => {
      if (typeof value2 === "function") value2 = value2({});
      if (Array.isArray(value2)) value2 = value2.join(", ");
      return value2;
    };
  }
  if (
    ["gridTemplateColumns", "gridTemplateRows", "objectPosition"].includes(
      themeSection
    )
  ) {
    return (value2) => {
      if (typeof value2 === "function") value2 = value2({});
      if (typeof value2 === "string")
        value2 = postcss2.list.comma(value2).join(" ");
      return value2;
    };
  }
  return (value2, opts = {}) => {
    if (typeof value2 === "function") {
      value2 = value2(opts);
    }
    return value2;
  };
}

// src/stubs/path.ts
var join = () => "";

// node_modules/tailwindcss/src/corePlugins.js
import postcss3 from "postcss";

// node_modules/tailwindcss/src/util/createUtilityPlugin.js
function createUtilityPlugin(
  themeKey,
  utilityVariations = [[themeKey, [themeKey]]],
  { filterDefault = false, ...options } = {}
) {
  let transformValue = transformThemeValue(themeKey);
  return function ({ matchUtilities, theme }) {
    for (let utilityVariation of utilityVariations) {
      let group = Array.isArray(utilityVariation[0])
        ? utilityVariation
        : [utilityVariation];
      matchUtilities(
        group.reduce((obj, [classPrefix, properties]) => {
          return Object.assign(obj, {
            [classPrefix]: (value2) => {
              return properties.reduce((obj2, name) => {
                if (Array.isArray(name)) {
                  return Object.assign(obj2, { [name[0]]: name[1] });
                }
                return Object.assign(obj2, { [name]: transformValue(value2) });
              }, {});
            },
          });
        }, {}),
        {
          ...options,
          values: filterDefault
            ? Object.fromEntries(
                Object.entries(theme(themeKey) ?? {}).filter(
                  ([modifier]) => modifier !== "DEFAULT"
                )
              )
            : theme(themeKey),
        }
      );
    }
  };
}

// node_modules/tailwindcss/src/util/buildMediaQuery.js
function buildMediaQuery(screens) {
  screens = Array.isArray(screens) ? screens : [screens];
  return screens
    .map((screen) => {
      let values = screen.values.map((screen2) => {
        if (screen2.raw !== void 0) {
          return screen2.raw;
        }
        return [
          screen2.min && `(min-width: ${screen2.min})`,
          screen2.max && `(max-width: ${screen2.max})`,
        ]
          .filter(Boolean)
          .join(" and ");
      });
      return screen.not ? `not all and ${values}` : values;
    })
    .join(", ");
}

// node_modules/tailwindcss/src/util/parseAnimationValue.js
var DIRECTIONS = /* @__PURE__ */ new Set([
  "normal",
  "reverse",
  "alternate",
  "alternate-reverse",
]);
var PLAY_STATES = /* @__PURE__ */ new Set(["running", "paused"]);
var FILL_MODES = /* @__PURE__ */ new Set([
  "none",
  "forwards",
  "backwards",
  "both",
]);
var ITERATION_COUNTS = /* @__PURE__ */ new Set(["infinite"]);
var TIMINGS = /* @__PURE__ */ new Set([
  "linear",
  "ease",
  "ease-in",
  "ease-out",
  "ease-in-out",
  "step-start",
  "step-end",
]);
var TIMING_FNS = ["cubic-bezier", "steps"];
var COMMA = /\,(?![^(]*\))/g;
var SPACE2 = /\ +(?![^(]*\))/g;
var TIME = /^(-?[\d.]+m?s)$/;
var DIGIT = /^(\d+)$/;
function parseAnimationValue(input) {
  let animations = input.split(COMMA);
  return animations.map((animation) => {
    let value2 = animation.trim();
    let result = { value: value2 };
    let parts = value2.split(SPACE2);
    let seen = /* @__PURE__ */ new Set();
    for (let part of parts) {
      if (!seen.has("DIRECTIONS") && DIRECTIONS.has(part)) {
        result.direction = part;
        seen.add("DIRECTIONS");
      } else if (!seen.has("PLAY_STATES") && PLAY_STATES.has(part)) {
        result.playState = part;
        seen.add("PLAY_STATES");
      } else if (!seen.has("FILL_MODES") && FILL_MODES.has(part)) {
        result.fillMode = part;
        seen.add("FILL_MODES");
      } else if (
        !seen.has("ITERATION_COUNTS") &&
        (ITERATION_COUNTS.has(part) || DIGIT.test(part))
      ) {
        result.iterationCount = part;
        seen.add("ITERATION_COUNTS");
      } else if (!seen.has("TIMING_FUNCTION") && TIMINGS.has(part)) {
        result.timingFunction = part;
        seen.add("TIMING_FUNCTION");
      } else if (
        !seen.has("TIMING_FUNCTION") &&
        TIMING_FNS.some((f2) => part.startsWith(`${f2}(`))
      ) {
        result.timingFunction = part;
        seen.add("TIMING_FUNCTION");
      } else if (!seen.has("DURATION") && TIME.test(part)) {
        result.duration = part;
        seen.add("DURATION");
      } else if (!seen.has("DELAY") && TIME.test(part)) {
        result.delay = part;
        seen.add("DELAY");
      } else if (!seen.has("NAME")) {
        result.name = part;
        seen.add("NAME");
      } else {
        if (!result.unknown) result.unknown = [];
        result.unknown.push(part);
      }
    }
    return result;
  });
}

// node_modules/tailwindcss/src/util/flattenColorPalette.js
var flattenColorPalette = (colors) =>
  Object.assign(
    {},
    ...Object.entries(colors ?? {}).flatMap(([color2, values]) =>
      typeof values == "object"
        ? Object.entries(flattenColorPalette(values)).map(
            ([number2, hex2]) => ({
              [color2 + (number2 === "DEFAULT" ? "" : `-${number2}`)]: hex2,
            })
          )
        : [{ [`${color2}`]: values }]
    )
  );
var flattenColorPalette_default = flattenColorPalette;

// node_modules/tailwindcss/src/util/toColorValue.js
function toColorValue(maybeFunction) {
  return typeof maybeFunction === "function"
    ? maybeFunction({})
    : maybeFunction;
}

// node_modules/tailwindcss/src/util/normalizeScreens.js
function normalizeScreens(screens, root = true) {
  if (Array.isArray(screens)) {
    return screens.map((screen) => {
      if (root && Array.isArray(screen)) {
        throw new Error("The tuple syntax is not supported for `screens`.");
      }
      if (typeof screen === "string") {
        return {
          name: screen.toString(),
          not: false,
          values: [{ min: screen, max: void 0 }],
        };
      }
      let [name, options] = screen;
      name = name.toString();
      if (typeof options === "string") {
        return { name, not: false, values: [{ min: options, max: void 0 }] };
      }
      if (Array.isArray(options)) {
        return {
          name,
          not: false,
          values: options.map((option) => resolveValue(option)),
        };
      }
      return { name, not: false, values: [resolveValue(options)] };
    });
  }
  return normalizeScreens(Object.entries(screens ?? {}), false);
}
function isScreenSortable(screen) {
  if (screen.values.length !== 1) {
    return { result: false, reason: "multiple-values" };
  } else if (screen.values[0].raw !== void 0) {
    return { result: false, reason: "raw-values" };
  } else if (
    screen.values[0].min !== void 0 &&
    screen.values[0].max !== void 0
  ) {
    return { result: false, reason: "min-and-max" };
  }
  return { result: true, reason: null };
}
function compareScreens(type, a, z) {
  let aScreen = toScreen(a, type);
  let zScreen = toScreen(z, type);
  let aSorting = isScreenSortable(aScreen);
  let bSorting = isScreenSortable(zScreen);
  if (
    aSorting.reason === "multiple-values" ||
    bSorting.reason === "multiple-values"
  ) {
    throw new Error(
      "Attempted to sort a screen with multiple values. This should never happen. Please open a bug report."
    );
  } else if (
    aSorting.reason === "raw-values" ||
    bSorting.reason === "raw-values"
  ) {
    throw new Error(
      "Attempted to sort a screen with raw values. This should never happen. Please open a bug report."
    );
  } else if (
    aSorting.reason === "min-and-max" ||
    bSorting.reason === "min-and-max"
  ) {
    throw new Error(
      "Attempted to sort a screen with both min and max values. This should never happen. Please open a bug report."
    );
  }
  let { min: aMin, max: aMax } = aScreen.values[0];
  let { min: zMin, max: zMax } = zScreen.values[0];
  if (a.not) [aMin, aMax] = [aMax, aMin];
  if (z.not) [zMin, zMax] = [zMax, zMin];
  aMin = aMin === void 0 ? aMin : parseFloat(aMin);
  aMax = aMax === void 0 ? aMax : parseFloat(aMax);
  zMin = zMin === void 0 ? zMin : parseFloat(zMin);
  zMax = zMax === void 0 ? zMax : parseFloat(zMax);
  let [aValue, zValue] = type === "min" ? [aMin, zMin] : [zMax, aMax];
  return aValue - zValue;
}
function toScreen(value2, type) {
  if (typeof value2 === "object") {
    return value2;
  }
  return {
    name: "arbitrary-screen",
    values: [{ [type]: value2 }],
  };
}
function resolveValue({
  "min-width": _minWidth,
  min = _minWidth,
  max: max2,
  raw,
} = {}) {
  return { min, max: max2, raw };
}

// node_modules/tailwindcss/src/util/removeAlphaVariables.js
function removeAlphaVariables(container, toRemove) {
  container.walkDecls((decl) => {
    if (toRemove.includes(decl.prop)) {
      decl.remove();
      return;
    }
    for (let varName of toRemove) {
      if (decl.value.includes(`/ var(${varName})`)) {
        decl.value = decl.value.replace(`/ var(${varName})`, "");
      }
    }
  });
}

// node_modules/tailwindcss/src/corePlugins.js
var variantPlugins = {
  pseudoElementVariants: ({ addVariant }) => {
    addVariant("first-letter", "&::first-letter");
    addVariant("first-line", "&::first-line");
    addVariant("marker", [
      ({ container }) => {
        removeAlphaVariables(container, ["--tw-text-opacity"]);
        return "& *::marker";
      },
      ({ container }) => {
        removeAlphaVariables(container, ["--tw-text-opacity"]);
        return "&::marker";
      },
    ]);
    addVariant("selection", ["& *::selection", "&::selection"]);
    addVariant("file", "&::file-selector-button");
    addVariant("placeholder", "&::placeholder");
    addVariant("backdrop", "&::backdrop");
    addVariant("before", ({ container }) => {
      container.walkRules((rule) => {
        let foundContent = false;
        rule.walkDecls("content", () => {
          foundContent = true;
        });
        if (!foundContent) {
          rule.prepend(
            postcss3.decl({ prop: "content", value: "var(--tw-content)" })
          );
        }
      });
      return "&::before";
    });
    addVariant("after", ({ container }) => {
      container.walkRules((rule) => {
        let foundContent = false;
        rule.walkDecls("content", () => {
          foundContent = true;
        });
        if (!foundContent) {
          rule.prepend(
            postcss3.decl({ prop: "content", value: "var(--tw-content)" })
          );
        }
      });
      return "&::after";
    });
  },
  pseudoClassVariants: ({ addVariant, matchVariant, config }) => {
    let pseudoVariants = [
      // Positional
      ["first", "&:first-child"],
      ["last", "&:last-child"],
      ["only", "&:only-child"],
      ["odd", "&:nth-child(odd)"],
      ["even", "&:nth-child(even)"],
      "first-of-type",
      "last-of-type",
      "only-of-type",
      // State
      [
        "visited",
        ({ container }) => {
          removeAlphaVariables(container, [
            "--tw-text-opacity",
            "--tw-border-opacity",
            "--tw-bg-opacity",
          ]);
          return "&:visited";
        },
      ],
      "target",
      ["open", "&[open]"],
      // Forms
      "default",
      "checked",
      "indeterminate",
      "placeholder-shown",
      "autofill",
      "optional",
      "required",
      "valid",
      "invalid",
      "in-range",
      "out-of-range",
      "read-only",
      // Content
      "empty",
      // Interactive
      "focus-within",
      [
        "hover",
        !flagEnabled(config(), "hoverOnlyWhenSupported")
          ? "&:hover"
          : "@media (hover: hover) and (pointer: fine) { &:hover }",
      ],
      "focus",
      "focus-visible",
      "active",
      "enabled",
      "disabled",
    ].map((variant) =>
      Array.isArray(variant) ? variant : [variant, `&:${variant}`]
    );
    for (let [variantName, state] of pseudoVariants) {
      addVariant(variantName, (ctx) => {
        let result = typeof state === "function" ? state(ctx) : state;
        return result;
      });
    }
    let variants = {
      group: (_, { modifier }) =>
        modifier
          ? [`:merge(.group\\/${escapeClassName(modifier)})`, " &"]
          : [`:merge(.group)`, " &"],
      peer: (_, { modifier }) =>
        modifier
          ? [`:merge(.peer\\/${escapeClassName(modifier)})`, " ~ &"]
          : [`:merge(.peer)`, " ~ &"],
    };
    for (let [name, fn2] of Object.entries(variants)) {
      matchVariant(
        name,
        (value2 = "", extra) => {
          let result = normalize(
            typeof value2 === "function" ? value2(extra) : value2
          );
          if (!result.includes("&")) result = "&" + result;
          let [a, b] = fn2("", extra);
          let start = null;
          let end = null;
          let quotes2 = 0;
          for (let i = 0; i < result.length; ++i) {
            let c4 = result[i];
            if (c4 === "&") {
              start = i;
            } else if (c4 === "'" || c4 === '"') {
              quotes2 += 1;
            } else if (start !== null && c4 === " " && !quotes2) {
              end = i;
            }
          }
          if (start !== null && end === null) {
            end = result.length;
          }
          return (
            result.slice(0, start) +
            a +
            result.slice(start + 1, end) +
            b +
            result.slice(end)
          );
        },
        { values: Object.fromEntries(pseudoVariants) }
      );
    }
  },
  directionVariants: ({ addVariant }) => {
    addVariant("ltr", () => {
      log_default.warn("rtl-experimental", [
        "The RTL features in Tailwind CSS are currently in preview.",
        "Preview features are not covered by semver, and may be improved in breaking ways at any time.",
      ]);
      return '[dir="ltr"] &';
    });
    addVariant("rtl", () => {
      log_default.warn("rtl-experimental", [
        "The RTL features in Tailwind CSS are currently in preview.",
        "Preview features are not covered by semver, and may be improved in breaking ways at any time.",
      ]);
      return '[dir="rtl"] &';
    });
  },
  reducedMotionVariants: ({ addVariant }) => {
    addVariant("motion-safe", "@media (prefers-reduced-motion: no-preference)");
    addVariant("motion-reduce", "@media (prefers-reduced-motion: reduce)");
  },
  darkVariants: ({ config, addVariant }) => {
    let [mode, className = ".dark"] = [].concat(config("darkMode", "media"));
    if (mode === false) {
      mode = "media";
      log_default.warn("darkmode-false", [
        "The `darkMode` option in your Tailwind CSS configuration is set to `false`, which now behaves the same as `media`.",
        "Change `darkMode` to `media` or remove it entirely.",
        "https://tailwindcss.com/docs/upgrade-guide#remove-dark-mode-configuration",
      ]);
    }
    if (mode === "class") {
      addVariant("dark", `${className} &`);
    } else if (mode === "media") {
      addVariant("dark", "@media (prefers-color-scheme: dark)");
    }
  },
  printVariant: ({ addVariant }) => {
    addVariant("print", "@media print");
  },
  screenVariants: ({ theme, addVariant, matchVariant }) => {
    let rawScreens = theme("screens") ?? {};
    let areSimpleScreens = Object.values(rawScreens).every(
      (v) => typeof v === "string"
    );
    let screens = normalizeScreens(theme("screens"));
    let unitCache = /* @__PURE__ */ new Set([]);
    function units(value2) {
      return value2.match(/(\D+)$/)?.[1] ?? "(none)";
    }
    function recordUnits(value2) {
      if (value2 !== void 0) {
        unitCache.add(units(value2));
      }
    }
    function canUseUnits(value2) {
      recordUnits(value2);
      return unitCache.size === 1;
    }
    for (const screen of screens) {
      for (const value2 of screen.values) {
        recordUnits(value2.min);
        recordUnits(value2.max);
      }
    }
    let screensUseConsistentUnits = unitCache.size <= 1;
    function buildScreenValues(type) {
      return Object.fromEntries(
        screens
          .filter((screen) => isScreenSortable(screen).result)
          .map((screen) => {
            let { min, max: max2 } = screen.values[0];
            if (type === "min" && min !== void 0) {
              return screen;
            } else if (type === "min" && max2 !== void 0) {
              return { ...screen, not: !screen.not };
            } else if (type === "max" && max2 !== void 0) {
              return screen;
            } else if (type === "max" && min !== void 0) {
              return { ...screen, not: !screen.not };
            }
          })
          .map((screen) => [screen.name, screen])
      );
    }
    function buildSort(type) {
      return (a, z) => compareScreens(type, a.value, z.value);
    }
    let maxSort = buildSort("max");
    let minSort = buildSort("min");
    function buildScreenVariant(type) {
      return (value2) => {
        if (!areSimpleScreens) {
          log_default.warn("complex-screen-config", [
            "The `min-*` and `max-*` variants are not supported with a `screens` configuration containing objects.",
          ]);
          return [];
        } else if (!screensUseConsistentUnits) {
          log_default.warn("mixed-screen-units", [
            "The `min-*` and `max-*` variants are not supported with a `screens` configuration containing mixed units.",
          ]);
          return [];
        } else if (typeof value2 === "string" && !canUseUnits(value2)) {
          log_default.warn("minmax-have-mixed-units", [
            "The `min-*` and `max-*` variants are not supported with a `screens` configuration containing mixed units.",
          ]);
          return [];
        }
        return [`@media ${buildMediaQuery(toScreen(value2, type))}`];
      };
    }
    matchVariant("max", buildScreenVariant("max"), {
      sort: maxSort,
      values: areSimpleScreens ? buildScreenValues("max") : {},
    });
    let id = "min-screens";
    for (let screen of screens) {
      addVariant(screen.name, `@media ${buildMediaQuery(screen)}`, {
        id,
        sort: areSimpleScreens && screensUseConsistentUnits ? minSort : void 0,
        value: screen,
      });
    }
    matchVariant("min", buildScreenVariant("min"), {
      id,
      sort: minSort,
    });
  },
  supportsVariants: ({ matchVariant, theme }) => {
    matchVariant(
      "supports",
      (value2 = "") => {
        let check = normalize(value2);
        let isRaw = /^\w*\s*\(/.test(check);
        check = isRaw ? check.replace(/\b(and|or|not)\b/g, " $1 ") : check;
        if (isRaw) {
          return `@supports ${check}`;
        }
        if (!check.includes(":")) {
          check = `${check}: var(--tw)`;
        }
        if (!(check.startsWith("(") && check.endsWith(")"))) {
          check = `(${check})`;
        }
        return `@supports ${check}`;
      },
      { values: theme("supports") ?? {} }
    );
  },
  ariaVariants: ({ matchVariant, theme }) => {
    matchVariant("aria", (value2) => `&[aria-${normalize(value2)}]`, {
      values: theme("aria") ?? {},
    });
    matchVariant(
      "group-aria",
      (value2, { modifier }) =>
        modifier
          ? `:merge(.group\\/${modifier})[aria-${normalize(value2)}] &`
          : `:merge(.group)[aria-${normalize(value2)}] &`,
      { values: theme("aria") ?? {} }
    );
    matchVariant(
      "peer-aria",
      (value2, { modifier }) =>
        modifier
          ? `:merge(.peer\\/${modifier})[aria-${normalize(value2)}] ~ &`
          : `:merge(.peer)[aria-${normalize(value2)}] ~ &`,
      { values: theme("aria") ?? {} }
    );
  },
  dataVariants: ({ matchVariant, theme }) => {
    matchVariant("data", (value2) => `&[data-${normalize(value2)}]`, {
      values: theme("data") ?? {},
    });
    matchVariant(
      "group-data",
      (value2, { modifier }) =>
        modifier
          ? `:merge(.group\\/${modifier})[data-${normalize(value2)}] &`
          : `:merge(.group)[data-${normalize(value2)}] &`,
      { values: theme("data") ?? {} }
    );
    matchVariant(
      "peer-data",
      (value2, { modifier }) =>
        modifier
          ? `:merge(.peer\\/${modifier})[data-${normalize(value2)}] ~ &`
          : `:merge(.peer)[data-${normalize(value2)}] ~ &`,
      { values: theme("data") ?? {} }
    );
  },
  orientationVariants: ({ addVariant }) => {
    addVariant("portrait", "@media (orientation: portrait)");
    addVariant("landscape", "@media (orientation: landscape)");
  },
  prefersContrastVariants: ({ addVariant }) => {
    addVariant("contrast-more", "@media (prefers-contrast: more)");
    addVariant("contrast-less", "@media (prefers-contrast: less)");
  },
};
var cssTransformValue = [
  "translate(var(--tw-translate-x), var(--tw-translate-y))",
  "rotate(var(--tw-rotate))",
  "skewX(var(--tw-skew-x))",
  "skewY(var(--tw-skew-y))",
  "scaleX(var(--tw-scale-x))",
  "scaleY(var(--tw-scale-y))",
].join(" ");
var cssFilterValue = [
  "var(--tw-blur)",
  "var(--tw-brightness)",
  "var(--tw-contrast)",
  "var(--tw-grayscale)",
  "var(--tw-hue-rotate)",
  "var(--tw-invert)",
  "var(--tw-saturate)",
  "var(--tw-sepia)",
  "var(--tw-drop-shadow)",
].join(" ");
var cssBackdropFilterValue = [
  "var(--tw-backdrop-blur)",
  "var(--tw-backdrop-brightness)",
  "var(--tw-backdrop-contrast)",
  "var(--tw-backdrop-grayscale)",
  "var(--tw-backdrop-hue-rotate)",
  "var(--tw-backdrop-invert)",
  "var(--tw-backdrop-opacity)",
  "var(--tw-backdrop-saturate)",
  "var(--tw-backdrop-sepia)",
].join(" ");
var corePlugins = {
  preflight: ({ addBase }) => {
    let preflightStyles = postcss3.parse(
      fs_default.readFileSync(join("/", "./css/preflight.css"), "utf8")
    );
    addBase([
      postcss3.comment({
        text: `! tailwindcss v${version} | MIT License | https://tailwindcss.com`,
      }),
      ...preflightStyles.nodes,
    ]);
  },
  container: (() => {
    function extractMinWidths(breakpoints = []) {
      return breakpoints
        .flatMap((breakpoint) =>
          breakpoint.values.map((breakpoint2) => breakpoint2.min)
        )
        .filter((v) => v !== void 0);
    }
    function mapMinWidthsToPadding(minWidths, screens, paddings) {
      if (typeof paddings === "undefined") {
        return [];
      }
      if (!(typeof paddings === "object" && paddings !== null)) {
        return [
          {
            screen: "DEFAULT",
            minWidth: 0,
            padding: paddings,
          },
        ];
      }
      let mapping = [];
      if (paddings.DEFAULT) {
        mapping.push({
          screen: "DEFAULT",
          minWidth: 0,
          padding: paddings.DEFAULT,
        });
      }
      for (let minWidth of minWidths) {
        for (let screen of screens) {
          for (let { min } of screen.values) {
            if (min === minWidth) {
              mapping.push({ minWidth, padding: paddings[screen.name] });
            }
          }
        }
      }
      return mapping;
    }
    return function ({ addComponents, theme }) {
      let screens = normalizeScreens(
        theme("container.screens", theme("screens"))
      );
      let minWidths = extractMinWidths(screens);
      let paddings = mapMinWidthsToPadding(
        minWidths,
        screens,
        theme("container.padding")
      );
      let generatePaddingFor = (minWidth) => {
        let paddingConfig = paddings.find(
          (padding) => padding.minWidth === minWidth
        );
        if (!paddingConfig) {
          return {};
        }
        return {
          paddingRight: paddingConfig.padding,
          paddingLeft: paddingConfig.padding,
        };
      };
      let atRules = Array.from(
        new Set(minWidths.slice().sort((a, z) => parseInt(a) - parseInt(z)))
      ).map((minWidth) => ({
        [`@media (min-width: ${minWidth})`]: {
          ".container": {
            "max-width": minWidth,
            ...generatePaddingFor(minWidth),
          },
        },
      }));
      addComponents([
        {
          ".container": Object.assign(
            { width: "100%" },
            theme("container.center", false)
              ? { marginRight: "auto", marginLeft: "auto" }
              : {},
            generatePaddingFor(0)
          ),
        },
        ...atRules,
      ]);
    };
  })(),
  accessibility: ({ addUtilities }) => {
    addUtilities({
      ".sr-only": {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: "0",
      },
      ".not-sr-only": {
        position: "static",
        width: "auto",
        height: "auto",
        padding: "0",
        margin: "0",
        overflow: "visible",
        clip: "auto",
        whiteSpace: "normal",
      },
    });
  },
  pointerEvents: ({ addUtilities }) => {
    addUtilities({
      ".pointer-events-none": { "pointer-events": "none" },
      ".pointer-events-auto": { "pointer-events": "auto" },
    });
  },
  visibility: ({ addUtilities }) => {
    addUtilities({
      ".visible": { visibility: "visible" },
      ".invisible": { visibility: "hidden" },
      ".collapse": { visibility: "collapse" },
    });
  },
  position: ({ addUtilities }) => {
    addUtilities({
      ".static": { position: "static" },
      ".fixed": { position: "fixed" },
      ".absolute": { position: "absolute" },
      ".relative": { position: "relative" },
      ".sticky": { position: "sticky" },
    });
  },
  inset: createUtilityPlugin(
    "inset",
    [
      ["inset", ["top", "right", "bottom", "left"]],
      [
        ["inset-x", ["left", "right"]],
        ["inset-y", ["top", "bottom"]],
      ],
      [
        ["top", ["top"]],
        ["right", ["right"]],
        ["bottom", ["bottom"]],
        ["left", ["left"]],
      ],
    ],
    { supportsNegativeValues: true }
  ),
  isolation: ({ addUtilities }) => {
    addUtilities({
      ".isolate": { isolation: "isolate" },
      ".isolation-auto": { isolation: "auto" },
    });
  },
  zIndex: createUtilityPlugin("zIndex", [["z", ["zIndex"]]], {
    supportsNegativeValues: true,
  }),
  order: createUtilityPlugin("order", void 0, { supportsNegativeValues: true }),
  gridColumn: createUtilityPlugin("gridColumn", [["col", ["gridColumn"]]]),
  gridColumnStart: createUtilityPlugin("gridColumnStart", [
    ["col-start", ["gridColumnStart"]],
  ]),
  gridColumnEnd: createUtilityPlugin("gridColumnEnd", [
    ["col-end", ["gridColumnEnd"]],
  ]),
  gridRow: createUtilityPlugin("gridRow", [["row", ["gridRow"]]]),
  gridRowStart: createUtilityPlugin("gridRowStart", [
    ["row-start", ["gridRowStart"]],
  ]),
  gridRowEnd: createUtilityPlugin("gridRowEnd", [["row-end", ["gridRowEnd"]]]),
  float: ({ addUtilities }) => {
    addUtilities({
      ".float-right": { float: "right" },
      ".float-left": { float: "left" },
      ".float-none": { float: "none" },
    });
  },
  clear: ({ addUtilities }) => {
    addUtilities({
      ".clear-left": { clear: "left" },
      ".clear-right": { clear: "right" },
      ".clear-both": { clear: "both" },
      ".clear-none": { clear: "none" },
    });
  },
  margin: createUtilityPlugin(
    "margin",
    [
      ["m", ["margin"]],
      [
        ["mx", ["margin-left", "margin-right"]],
        ["my", ["margin-top", "margin-bottom"]],
      ],
      [
        ["mt", ["margin-top"]],
        ["mr", ["margin-right"]],
        ["mb", ["margin-bottom"]],
        ["ml", ["margin-left"]],
      ],
    ],
    { supportsNegativeValues: true }
  ),
  boxSizing: ({ addUtilities }) => {
    addUtilities({
      ".box-border": { "box-sizing": "border-box" },
      ".box-content": { "box-sizing": "content-box" },
    });
  },
  display: ({ addUtilities }) => {
    addUtilities({
      ".block": { display: "block" },
      ".inline-block": { display: "inline-block" },
      ".inline": { display: "inline" },
      ".flex": { display: "flex" },
      ".inline-flex": { display: "inline-flex" },
      ".table": { display: "table" },
      ".inline-table": { display: "inline-table" },
      ".table-caption": { display: "table-caption" },
      ".table-cell": { display: "table-cell" },
      ".table-column": { display: "table-column" },
      ".table-column-group": { display: "table-column-group" },
      ".table-footer-group": { display: "table-footer-group" },
      ".table-header-group": { display: "table-header-group" },
      ".table-row-group": { display: "table-row-group" },
      ".table-row": { display: "table-row" },
      ".flow-root": { display: "flow-root" },
      ".grid": { display: "grid" },
      ".inline-grid": { display: "inline-grid" },
      ".contents": { display: "contents" },
      ".list-item": { display: "list-item" },
      ".hidden": { display: "none" },
    });
  },
  aspectRatio: createUtilityPlugin("aspectRatio", [
    ["aspect", ["aspect-ratio"]],
  ]),
  height: createUtilityPlugin("height", [["h", ["height"]]]),
  maxHeight: createUtilityPlugin("maxHeight", [["max-h", ["maxHeight"]]]),
  minHeight: createUtilityPlugin("minHeight", [["min-h", ["minHeight"]]]),
  width: createUtilityPlugin("width", [["w", ["width"]]]),
  minWidth: createUtilityPlugin("minWidth", [["min-w", ["minWidth"]]]),
  maxWidth: createUtilityPlugin("maxWidth", [["max-w", ["maxWidth"]]]),
  flex: createUtilityPlugin("flex"),
  flexShrink: createUtilityPlugin("flexShrink", [
    ["flex-shrink", ["flex-shrink"]],
    // Deprecated
    ["shrink", ["flex-shrink"]],
  ]),
  flexGrow: createUtilityPlugin("flexGrow", [
    ["flex-grow", ["flex-grow"]],
    // Deprecated
    ["grow", ["flex-grow"]],
  ]),
  flexBasis: createUtilityPlugin("flexBasis", [["basis", ["flex-basis"]]]),
  tableLayout: ({ addUtilities }) => {
    addUtilities({
      ".table-auto": { "table-layout": "auto" },
      ".table-fixed": { "table-layout": "fixed" },
    });
  },
  borderCollapse: ({ addUtilities }) => {
    addUtilities({
      ".border-collapse": { "border-collapse": "collapse" },
      ".border-separate": { "border-collapse": "separate" },
    });
  },
  borderSpacing: ({ addDefaults, matchUtilities, theme }) => {
    addDefaults("border-spacing", {
      "--tw-border-spacing-x": 0,
      "--tw-border-spacing-y": 0,
    });
    matchUtilities(
      {
        "border-spacing": (value2) => {
          return {
            "--tw-border-spacing-x": value2,
            "--tw-border-spacing-y": value2,
            "@defaults border-spacing": {},
            "border-spacing":
              "var(--tw-border-spacing-x) var(--tw-border-spacing-y)",
          };
        },
        "border-spacing-x": (value2) => {
          return {
            "--tw-border-spacing-x": value2,
            "@defaults border-spacing": {},
            "border-spacing":
              "var(--tw-border-spacing-x) var(--tw-border-spacing-y)",
          };
        },
        "border-spacing-y": (value2) => {
          return {
            "--tw-border-spacing-y": value2,
            "@defaults border-spacing": {},
            "border-spacing":
              "var(--tw-border-spacing-x) var(--tw-border-spacing-y)",
          };
        },
      },
      { values: theme("borderSpacing") }
    );
  },
  transformOrigin: createUtilityPlugin("transformOrigin", [
    ["origin", ["transformOrigin"]],
  ]),
  translate: createUtilityPlugin(
    "translate",
    [
      [
        [
          "translate-x",
          [
            ["@defaults transform", {}],
            "--tw-translate-x",
            ["transform", cssTransformValue],
          ],
        ],
        [
          "translate-y",
          [
            ["@defaults transform", {}],
            "--tw-translate-y",
            ["transform", cssTransformValue],
          ],
        ],
      ],
    ],
    { supportsNegativeValues: true }
  ),
  rotate: createUtilityPlugin(
    "rotate",
    [
      [
        "rotate",
        [
          ["@defaults transform", {}],
          "--tw-rotate",
          ["transform", cssTransformValue],
        ],
      ],
    ],
    { supportsNegativeValues: true }
  ),
  skew: createUtilityPlugin(
    "skew",
    [
      [
        [
          "skew-x",
          [
            ["@defaults transform", {}],
            "--tw-skew-x",
            ["transform", cssTransformValue],
          ],
        ],
        [
          "skew-y",
          [
            ["@defaults transform", {}],
            "--tw-skew-y",
            ["transform", cssTransformValue],
          ],
        ],
      ],
    ],
    { supportsNegativeValues: true }
  ),
  scale: createUtilityPlugin(
    "scale",
    [
      [
        "scale",
        [
          ["@defaults transform", {}],
          "--tw-scale-x",
          "--tw-scale-y",
          ["transform", cssTransformValue],
        ],
      ],
      [
        [
          "scale-x",
          [
            ["@defaults transform", {}],
            "--tw-scale-x",
            ["transform", cssTransformValue],
          ],
        ],
        [
          "scale-y",
          [
            ["@defaults transform", {}],
            "--tw-scale-y",
            ["transform", cssTransformValue],
          ],
        ],
      ],
    ],
    { supportsNegativeValues: true }
  ),
  transform: ({ addDefaults, addUtilities }) => {
    addDefaults("transform", {
      "--tw-translate-x": "0",
      "--tw-translate-y": "0",
      "--tw-rotate": "0",
      "--tw-skew-x": "0",
      "--tw-skew-y": "0",
      "--tw-scale-x": "1",
      "--tw-scale-y": "1",
    });
    addUtilities({
      ".transform": { "@defaults transform": {}, transform: cssTransformValue },
      ".transform-cpu": {
        transform: cssTransformValue,
      },
      ".transform-gpu": {
        transform: cssTransformValue.replace(
          "translate(var(--tw-translate-x), var(--tw-translate-y))",
          "translate3d(var(--tw-translate-x), var(--tw-translate-y), 0)"
        ),
      },
      ".transform-none": { transform: "none" },
    });
  },
  animation: ({ matchUtilities, theme, config }) => {
    let prefixName = (name) => `${config("prefix")}${escapeClassName(name)}`;
    let keyframes = Object.fromEntries(
      Object.entries(theme("keyframes") ?? {}).map(([key, value2]) => {
        return [key, { [`@keyframes ${prefixName(key)}`]: value2 }];
      })
    );
    matchUtilities(
      {
        animate: (value2) => {
          let animations = parseAnimationValue(value2);
          return [
            ...animations.flatMap((animation) => keyframes[animation.name]),
            {
              animation: animations
                .map(({ name, value: value3 }) => {
                  if (name === void 0 || keyframes[name] === void 0) {
                    return value3;
                  }
                  return value3.replace(name, prefixName(name));
                })
                .join(", "),
            },
          ];
        },
      },
      { values: theme("animation") }
    );
  },
  cursor: createUtilityPlugin("cursor"),
  touchAction: ({ addDefaults, addUtilities }) => {
    addDefaults("touch-action", {
      "--tw-pan-x": " ",
      "--tw-pan-y": " ",
      "--tw-pinch-zoom": " ",
    });
    let cssTouchActionValue =
      "var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom)";
    addUtilities({
      ".touch-auto": { "touch-action": "auto" },
      ".touch-none": { "touch-action": "none" },
      ".touch-pan-x": {
        "@defaults touch-action": {},
        "--tw-pan-x": "pan-x",
        "touch-action": cssTouchActionValue,
      },
      ".touch-pan-left": {
        "@defaults touch-action": {},
        "--tw-pan-x": "pan-left",
        "touch-action": cssTouchActionValue,
      },
      ".touch-pan-right": {
        "@defaults touch-action": {},
        "--tw-pan-x": "pan-right",
        "touch-action": cssTouchActionValue,
      },
      ".touch-pan-y": {
        "@defaults touch-action": {},
        "--tw-pan-y": "pan-y",
        "touch-action": cssTouchActionValue,
      },
      ".touch-pan-up": {
        "@defaults touch-action": {},
        "--tw-pan-y": "pan-up",
        "touch-action": cssTouchActionValue,
      },
      ".touch-pan-down": {
        "@defaults touch-action": {},
        "--tw-pan-y": "pan-down",
        "touch-action": cssTouchActionValue,
      },
      ".touch-pinch-zoom": {
        "@defaults touch-action": {},
        "--tw-pinch-zoom": "pinch-zoom",
        "touch-action": cssTouchActionValue,
      },
      ".touch-manipulation": { "touch-action": "manipulation" },
    });
  },
  userSelect: ({ addUtilities }) => {
    addUtilities({
      ".select-none": { "user-select": "none" },
      ".select-text": { "user-select": "text" },
      ".select-all": { "user-select": "all" },
      ".select-auto": { "user-select": "auto" },
    });
  },
  resize: ({ addUtilities }) => {
    addUtilities({
      ".resize-none": { resize: "none" },
      ".resize-y": { resize: "vertical" },
      ".resize-x": { resize: "horizontal" },
      ".resize": { resize: "both" },
    });
  },
  scrollSnapType: ({ addDefaults, addUtilities }) => {
    addDefaults("scroll-snap-type", {
      "--tw-scroll-snap-strictness": "proximity",
    });
    addUtilities({
      ".snap-none": { "scroll-snap-type": "none" },
      ".snap-x": {
        "@defaults scroll-snap-type": {},
        "scroll-snap-type": "x var(--tw-scroll-snap-strictness)",
      },
      ".snap-y": {
        "@defaults scroll-snap-type": {},
        "scroll-snap-type": "y var(--tw-scroll-snap-strictness)",
      },
      ".snap-both": {
        "@defaults scroll-snap-type": {},
        "scroll-snap-type": "both var(--tw-scroll-snap-strictness)",
      },
      ".snap-mandatory": { "--tw-scroll-snap-strictness": "mandatory" },
      ".snap-proximity": { "--tw-scroll-snap-strictness": "proximity" },
    });
  },
  scrollSnapAlign: ({ addUtilities }) => {
    addUtilities({
      ".snap-start": { "scroll-snap-align": "start" },
      ".snap-end": { "scroll-snap-align": "end" },
      ".snap-center": { "scroll-snap-align": "center" },
      ".snap-align-none": { "scroll-snap-align": "none" },
    });
  },
  scrollSnapStop: ({ addUtilities }) => {
    addUtilities({
      ".snap-normal": { "scroll-snap-stop": "normal" },
      ".snap-always": { "scroll-snap-stop": "always" },
    });
  },
  scrollMargin: createUtilityPlugin(
    "scrollMargin",
    [
      ["scroll-m", ["scroll-margin"]],
      [
        ["scroll-mx", ["scroll-margin-left", "scroll-margin-right"]],
        ["scroll-my", ["scroll-margin-top", "scroll-margin-bottom"]],
      ],
      [
        ["scroll-mt", ["scroll-margin-top"]],
        ["scroll-mr", ["scroll-margin-right"]],
        ["scroll-mb", ["scroll-margin-bottom"]],
        ["scroll-ml", ["scroll-margin-left"]],
      ],
    ],
    { supportsNegativeValues: true }
  ),
  scrollPadding: createUtilityPlugin("scrollPadding", [
    ["scroll-p", ["scroll-padding"]],
    [
      ["scroll-px", ["scroll-padding-left", "scroll-padding-right"]],
      ["scroll-py", ["scroll-padding-top", "scroll-padding-bottom"]],
    ],
    [
      ["scroll-pt", ["scroll-padding-top"]],
      ["scroll-pr", ["scroll-padding-right"]],
      ["scroll-pb", ["scroll-padding-bottom"]],
      ["scroll-pl", ["scroll-padding-left"]],
    ],
  ]),
  listStylePosition: ({ addUtilities }) => {
    addUtilities({
      ".list-inside": { "list-style-position": "inside" },
      ".list-outside": { "list-style-position": "outside" },
    });
  },
  listStyleType: createUtilityPlugin("listStyleType", [
    ["list", ["listStyleType"]],
  ]),
  appearance: ({ addUtilities }) => {
    addUtilities({
      ".appearance-none": { appearance: "none" },
    });
  },
  columns: createUtilityPlugin("columns", [["columns", ["columns"]]]),
  breakBefore: ({ addUtilities }) => {
    addUtilities({
      ".break-before-auto": { "break-before": "auto" },
      ".break-before-avoid": { "break-before": "avoid" },
      ".break-before-all": { "break-before": "all" },
      ".break-before-avoid-page": { "break-before": "avoid-page" },
      ".break-before-page": { "break-before": "page" },
      ".break-before-left": { "break-before": "left" },
      ".break-before-right": { "break-before": "right" },
      ".break-before-column": { "break-before": "column" },
    });
  },
  breakInside: ({ addUtilities }) => {
    addUtilities({
      ".break-inside-auto": { "break-inside": "auto" },
      ".break-inside-avoid": { "break-inside": "avoid" },
      ".break-inside-avoid-page": { "break-inside": "avoid-page" },
      ".break-inside-avoid-column": { "break-inside": "avoid-column" },
    });
  },
  breakAfter: ({ addUtilities }) => {
    addUtilities({
      ".break-after-auto": { "break-after": "auto" },
      ".break-after-avoid": { "break-after": "avoid" },
      ".break-after-all": { "break-after": "all" },
      ".break-after-avoid-page": { "break-after": "avoid-page" },
      ".break-after-page": { "break-after": "page" },
      ".break-after-left": { "break-after": "left" },
      ".break-after-right": { "break-after": "right" },
      ".break-after-column": { "break-after": "column" },
    });
  },
  gridAutoColumns: createUtilityPlugin("gridAutoColumns", [
    ["auto-cols", ["gridAutoColumns"]],
  ]),
  gridAutoFlow: ({ addUtilities }) => {
    addUtilities({
      ".grid-flow-row": { gridAutoFlow: "row" },
      ".grid-flow-col": { gridAutoFlow: "column" },
      ".grid-flow-dense": { gridAutoFlow: "dense" },
      ".grid-flow-row-dense": { gridAutoFlow: "row dense" },
      ".grid-flow-col-dense": { gridAutoFlow: "column dense" },
    });
  },
  gridAutoRows: createUtilityPlugin("gridAutoRows", [
    ["auto-rows", ["gridAutoRows"]],
  ]),
  gridTemplateColumns: createUtilityPlugin("gridTemplateColumns", [
    ["grid-cols", ["gridTemplateColumns"]],
  ]),
  gridTemplateRows: createUtilityPlugin("gridTemplateRows", [
    ["grid-rows", ["gridTemplateRows"]],
  ]),
  flexDirection: ({ addUtilities }) => {
    addUtilities({
      ".flex-row": { "flex-direction": "row" },
      ".flex-row-reverse": { "flex-direction": "row-reverse" },
      ".flex-col": { "flex-direction": "column" },
      ".flex-col-reverse": { "flex-direction": "column-reverse" },
    });
  },
  flexWrap: ({ addUtilities }) => {
    addUtilities({
      ".flex-wrap": { "flex-wrap": "wrap" },
      ".flex-wrap-reverse": { "flex-wrap": "wrap-reverse" },
      ".flex-nowrap": { "flex-wrap": "nowrap" },
    });
  },
  placeContent: ({ addUtilities }) => {
    addUtilities({
      ".place-content-center": { "place-content": "center" },
      ".place-content-start": { "place-content": "start" },
      ".place-content-end": { "place-content": "end" },
      ".place-content-between": { "place-content": "space-between" },
      ".place-content-around": { "place-content": "space-around" },
      ".place-content-evenly": { "place-content": "space-evenly" },
      ".place-content-baseline": { "place-content": "baseline" },
      ".place-content-stretch": { "place-content": "stretch" },
    });
  },
  placeItems: ({ addUtilities }) => {
    addUtilities({
      ".place-items-start": { "place-items": "start" },
      ".place-items-end": { "place-items": "end" },
      ".place-items-center": { "place-items": "center" },
      ".place-items-baseline": { "place-items": "baseline" },
      ".place-items-stretch": { "place-items": "stretch" },
    });
  },
  alignContent: ({ addUtilities }) => {
    addUtilities({
      ".content-center": { "align-content": "center" },
      ".content-start": { "align-content": "flex-start" },
      ".content-end": { "align-content": "flex-end" },
      ".content-between": { "align-content": "space-between" },
      ".content-around": { "align-content": "space-around" },
      ".content-evenly": { "align-content": "space-evenly" },
      ".content-baseline": { "align-content": "baseline" },
    });
  },
  alignItems: ({ addUtilities }) => {
    addUtilities({
      ".items-start": { "align-items": "flex-start" },
      ".items-end": { "align-items": "flex-end" },
      ".items-center": { "align-items": "center" },
      ".items-baseline": { "align-items": "baseline" },
      ".items-stretch": { "align-items": "stretch" },
    });
  },
  justifyContent: ({ addUtilities }) => {
    addUtilities({
      ".justify-start": { "justify-content": "flex-start" },
      ".justify-end": { "justify-content": "flex-end" },
      ".justify-center": { "justify-content": "center" },
      ".justify-between": { "justify-content": "space-between" },
      ".justify-around": { "justify-content": "space-around" },
      ".justify-evenly": { "justify-content": "space-evenly" },
    });
  },
  justifyItems: ({ addUtilities }) => {
    addUtilities({
      ".justify-items-start": { "justify-items": "start" },
      ".justify-items-end": { "justify-items": "end" },
      ".justify-items-center": { "justify-items": "center" },
      ".justify-items-stretch": { "justify-items": "stretch" },
    });
  },
  gap: createUtilityPlugin("gap", [
    ["gap", ["gap"]],
    [
      ["gap-x", ["columnGap"]],
      ["gap-y", ["rowGap"]],
    ],
  ]),
  space: ({ matchUtilities, addUtilities, theme }) => {
    matchUtilities(
      {
        "space-x": (value2) => {
          value2 = value2 === "0" ? "0px" : value2;
          return {
            "& > :not([hidden]) ~ :not([hidden])": {
              "--tw-space-x-reverse": "0",
              "margin-right": `calc(${value2} * var(--tw-space-x-reverse))`,
              "margin-left": `calc(${value2} * calc(1 - var(--tw-space-x-reverse)))`,
            },
          };
        },
        "space-y": (value2) => {
          value2 = value2 === "0" ? "0px" : value2;
          return {
            "& > :not([hidden]) ~ :not([hidden])": {
              "--tw-space-y-reverse": "0",
              "margin-top": `calc(${value2} * calc(1 - var(--tw-space-y-reverse)))`,
              "margin-bottom": `calc(${value2} * var(--tw-space-y-reverse))`,
            },
          };
        },
      },
      { values: theme("space"), supportsNegativeValues: true }
    );
    addUtilities({
      ".space-y-reverse > :not([hidden]) ~ :not([hidden])": {
        "--tw-space-y-reverse": "1",
      },
      ".space-x-reverse > :not([hidden]) ~ :not([hidden])": {
        "--tw-space-x-reverse": "1",
      },
    });
  },
  divideWidth: ({ matchUtilities, addUtilities, theme }) => {
    matchUtilities(
      {
        "divide-x": (value2) => {
          value2 = value2 === "0" ? "0px" : value2;
          return {
            "& > :not([hidden]) ~ :not([hidden])": {
              "@defaults border-width": {},
              "--tw-divide-x-reverse": "0",
              "border-right-width": `calc(${value2} * var(--tw-divide-x-reverse))`,
              "border-left-width": `calc(${value2} * calc(1 - var(--tw-divide-x-reverse)))`,
            },
          };
        },
        "divide-y": (value2) => {
          value2 = value2 === "0" ? "0px" : value2;
          return {
            "& > :not([hidden]) ~ :not([hidden])": {
              "@defaults border-width": {},
              "--tw-divide-y-reverse": "0",
              "border-top-width": `calc(${value2} * calc(1 - var(--tw-divide-y-reverse)))`,
              "border-bottom-width": `calc(${value2} * var(--tw-divide-y-reverse))`,
            },
          };
        },
      },
      { values: theme("divideWidth"), type: ["line-width", "length", "any"] }
    );
    addUtilities({
      ".divide-y-reverse > :not([hidden]) ~ :not([hidden])": {
        "@defaults border-width": {},
        "--tw-divide-y-reverse": "1",
      },
      ".divide-x-reverse > :not([hidden]) ~ :not([hidden])": {
        "@defaults border-width": {},
        "--tw-divide-x-reverse": "1",
      },
    });
  },
  divideStyle: ({ addUtilities }) => {
    addUtilities({
      ".divide-solid > :not([hidden]) ~ :not([hidden])": {
        "border-style": "solid",
      },
      ".divide-dashed > :not([hidden]) ~ :not([hidden])": {
        "border-style": "dashed",
      },
      ".divide-dotted > :not([hidden]) ~ :not([hidden])": {
        "border-style": "dotted",
      },
      ".divide-double > :not([hidden]) ~ :not([hidden])": {
        "border-style": "double",
      },
      ".divide-none > :not([hidden]) ~ :not([hidden])": {
        "border-style": "none",
      },
    });
  },
  divideColor: ({ matchUtilities, theme, corePlugins: corePlugins2 }) => {
    matchUtilities(
      {
        divide: (value2) => {
          if (!corePlugins2("divideOpacity")) {
            return {
              ["& > :not([hidden]) ~ :not([hidden])"]: {
                "border-color": toColorValue(value2),
              },
            };
          }
          return {
            ["& > :not([hidden]) ~ :not([hidden])"]: withAlphaVariable({
              color: value2,
              property: "border-color",
              variable: "--tw-divide-opacity",
            }),
          };
        },
      },
      {
        values: (({ DEFAULT: _, ...colors }) => colors)(
          flattenColorPalette_default(theme("divideColor"))
        ),
        type: ["color", "any"],
      }
    );
  },
  divideOpacity: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "divide-opacity": (value2) => {
          return {
            [`& > :not([hidden]) ~ :not([hidden])`]: {
              "--tw-divide-opacity": value2,
            },
          };
        },
      },
      { values: theme("divideOpacity") }
    );
  },
  placeSelf: ({ addUtilities }) => {
    addUtilities({
      ".place-self-auto": { "place-self": "auto" },
      ".place-self-start": { "place-self": "start" },
      ".place-self-end": { "place-self": "end" },
      ".place-self-center": { "place-self": "center" },
      ".place-self-stretch": { "place-self": "stretch" },
    });
  },
  alignSelf: ({ addUtilities }) => {
    addUtilities({
      ".self-auto": { "align-self": "auto" },
      ".self-start": { "align-self": "flex-start" },
      ".self-end": { "align-self": "flex-end" },
      ".self-center": { "align-self": "center" },
      ".self-stretch": { "align-self": "stretch" },
      ".self-baseline": { "align-self": "baseline" },
    });
  },
  justifySelf: ({ addUtilities }) => {
    addUtilities({
      ".justify-self-auto": { "justify-self": "auto" },
      ".justify-self-start": { "justify-self": "start" },
      ".justify-self-end": { "justify-self": "end" },
      ".justify-self-center": { "justify-self": "center" },
      ".justify-self-stretch": { "justify-self": "stretch" },
    });
  },
  overflow: ({ addUtilities }) => {
    addUtilities({
      ".overflow-auto": { overflow: "auto" },
      ".overflow-hidden": { overflow: "hidden" },
      ".overflow-clip": { overflow: "clip" },
      ".overflow-visible": { overflow: "visible" },
      ".overflow-scroll": { overflow: "scroll" },
      ".overflow-x-auto": { "overflow-x": "auto" },
      ".overflow-y-auto": { "overflow-y": "auto" },
      ".overflow-x-hidden": { "overflow-x": "hidden" },
      ".overflow-y-hidden": { "overflow-y": "hidden" },
      ".overflow-x-clip": { "overflow-x": "clip" },
      ".overflow-y-clip": { "overflow-y": "clip" },
      ".overflow-x-visible": { "overflow-x": "visible" },
      ".overflow-y-visible": { "overflow-y": "visible" },
      ".overflow-x-scroll": { "overflow-x": "scroll" },
      ".overflow-y-scroll": { "overflow-y": "scroll" },
    });
  },
  overscrollBehavior: ({ addUtilities }) => {
    addUtilities({
      ".overscroll-auto": { "overscroll-behavior": "auto" },
      ".overscroll-contain": { "overscroll-behavior": "contain" },
      ".overscroll-none": { "overscroll-behavior": "none" },
      ".overscroll-y-auto": { "overscroll-behavior-y": "auto" },
      ".overscroll-y-contain": { "overscroll-behavior-y": "contain" },
      ".overscroll-y-none": { "overscroll-behavior-y": "none" },
      ".overscroll-x-auto": { "overscroll-behavior-x": "auto" },
      ".overscroll-x-contain": { "overscroll-behavior-x": "contain" },
      ".overscroll-x-none": { "overscroll-behavior-x": "none" },
    });
  },
  scrollBehavior: ({ addUtilities }) => {
    addUtilities({
      ".scroll-auto": { "scroll-behavior": "auto" },
      ".scroll-smooth": { "scroll-behavior": "smooth" },
    });
  },
  textOverflow: ({ addUtilities }) => {
    addUtilities({
      ".truncate": {
        overflow: "hidden",
        "text-overflow": "ellipsis",
        "white-space": "nowrap",
      },
      ".overflow-ellipsis": { "text-overflow": "ellipsis" },
      // Deprecated
      ".text-ellipsis": { "text-overflow": "ellipsis" },
      ".text-clip": { "text-overflow": "clip" },
    });
  },
  whitespace: ({ addUtilities }) => {
    addUtilities({
      ".whitespace-normal": { "white-space": "normal" },
      ".whitespace-nowrap": { "white-space": "nowrap" },
      ".whitespace-pre": { "white-space": "pre" },
      ".whitespace-pre-line": { "white-space": "pre-line" },
      ".whitespace-pre-wrap": { "white-space": "pre-wrap" },
    });
  },
  wordBreak: ({ addUtilities }) => {
    addUtilities({
      ".break-normal": { "overflow-wrap": "normal", "word-break": "normal" },
      ".break-words": { "overflow-wrap": "break-word" },
      ".break-all": { "word-break": "break-all" },
      ".break-keep": { "word-break": "keep-all" },
    });
  },
  borderRadius: createUtilityPlugin("borderRadius", [
    ["rounded", ["border-radius"]],
    [
      ["rounded-t", ["border-top-left-radius", "border-top-right-radius"]],
      ["rounded-r", ["border-top-right-radius", "border-bottom-right-radius"]],
      [
        "rounded-b",
        ["border-bottom-right-radius", "border-bottom-left-radius"],
      ],
      ["rounded-l", ["border-top-left-radius", "border-bottom-left-radius"]],
    ],
    [
      ["rounded-tl", ["border-top-left-radius"]],
      ["rounded-tr", ["border-top-right-radius"]],
      ["rounded-br", ["border-bottom-right-radius"]],
      ["rounded-bl", ["border-bottom-left-radius"]],
    ],
  ]),
  borderWidth: createUtilityPlugin(
    "borderWidth",
    [
      ["border", [["@defaults border-width", {}], "border-width"]],
      [
        [
          "border-x",
          [
            ["@defaults border-width", {}],
            "border-left-width",
            "border-right-width",
          ],
        ],
        [
          "border-y",
          [
            ["@defaults border-width", {}],
            "border-top-width",
            "border-bottom-width",
          ],
        ],
      ],
      [
        ["border-t", [["@defaults border-width", {}], "border-top-width"]],
        ["border-r", [["@defaults border-width", {}], "border-right-width"]],
        ["border-b", [["@defaults border-width", {}], "border-bottom-width"]],
        ["border-l", [["@defaults border-width", {}], "border-left-width"]],
      ],
    ],
    { type: ["line-width", "length"] }
  ),
  borderStyle: ({ addUtilities }) => {
    addUtilities({
      ".border-solid": { "border-style": "solid" },
      ".border-dashed": { "border-style": "dashed" },
      ".border-dotted": { "border-style": "dotted" },
      ".border-double": { "border-style": "double" },
      ".border-hidden": { "border-style": "hidden" },
      ".border-none": { "border-style": "none" },
    });
  },
  borderColor: ({ matchUtilities, theme, corePlugins: corePlugins2 }) => {
    matchUtilities(
      {
        border: (value2) => {
          if (!corePlugins2("borderOpacity")) {
            return {
              "border-color": toColorValue(value2),
            };
          }
          return withAlphaVariable({
            color: value2,
            property: "border-color",
            variable: "--tw-border-opacity",
          });
        },
      },
      {
        values: (({ DEFAULT: _, ...colors }) => colors)(
          flattenColorPalette_default(theme("borderColor"))
        ),
        type: ["color", "any"],
      }
    );
    matchUtilities(
      {
        "border-x": (value2) => {
          if (!corePlugins2("borderOpacity")) {
            return {
              "border-left-color": toColorValue(value2),
              "border-right-color": toColorValue(value2),
            };
          }
          return withAlphaVariable({
            color: value2,
            property: ["border-left-color", "border-right-color"],
            variable: "--tw-border-opacity",
          });
        },
        "border-y": (value2) => {
          if (!corePlugins2("borderOpacity")) {
            return {
              "border-top-color": toColorValue(value2),
              "border-bottom-color": toColorValue(value2),
            };
          }
          return withAlphaVariable({
            color: value2,
            property: ["border-top-color", "border-bottom-color"],
            variable: "--tw-border-opacity",
          });
        },
      },
      {
        values: (({ DEFAULT: _, ...colors }) => colors)(
          flattenColorPalette_default(theme("borderColor"))
        ),
        type: ["color", "any"],
      }
    );
    matchUtilities(
      {
        "border-t": (value2) => {
          if (!corePlugins2("borderOpacity")) {
            return {
              "border-top-color": toColorValue(value2),
            };
          }
          return withAlphaVariable({
            color: value2,
            property: "border-top-color",
            variable: "--tw-border-opacity",
          });
        },
        "border-r": (value2) => {
          if (!corePlugins2("borderOpacity")) {
            return {
              "border-right-color": toColorValue(value2),
            };
          }
          return withAlphaVariable({
            color: value2,
            property: "border-right-color",
            variable: "--tw-border-opacity",
          });
        },
        "border-b": (value2) => {
          if (!corePlugins2("borderOpacity")) {
            return {
              "border-bottom-color": toColorValue(value2),
            };
          }
          return withAlphaVariable({
            color: value2,
            property: "border-bottom-color",
            variable: "--tw-border-opacity",
          });
        },
        "border-l": (value2) => {
          if (!corePlugins2("borderOpacity")) {
            return {
              "border-left-color": toColorValue(value2),
            };
          }
          return withAlphaVariable({
            color: value2,
            property: "border-left-color",
            variable: "--tw-border-opacity",
          });
        },
      },
      {
        values: (({ DEFAULT: _, ...colors }) => colors)(
          flattenColorPalette_default(theme("borderColor"))
        ),
        type: ["color", "any"],
      }
    );
  },
  borderOpacity: createUtilityPlugin("borderOpacity", [
    ["border-opacity", ["--tw-border-opacity"]],
  ]),
  backgroundColor: ({ matchUtilities, theme, corePlugins: corePlugins2 }) => {
    matchUtilities(
      {
        bg: (value2) => {
          if (!corePlugins2("backgroundOpacity")) {
            return {
              "background-color": toColorValue(value2),
            };
          }
          return withAlphaVariable({
            color: value2,
            property: "background-color",
            variable: "--tw-bg-opacity",
          });
        },
      },
      {
        values: flattenColorPalette_default(theme("backgroundColor")),
        type: ["color", "any"],
      }
    );
  },
  backgroundOpacity: createUtilityPlugin("backgroundOpacity", [
    ["bg-opacity", ["--tw-bg-opacity"]],
  ]),
  backgroundImage: createUtilityPlugin(
    "backgroundImage",
    [["bg", ["background-image"]]],
    {
      type: ["lookup", "image", "url"],
    }
  ),
  gradientColorStops: (() => {
    function transparentTo(value2) {
      return withAlphaValue(value2, 0, "rgb(255 255 255 / 0)");
    }
    return function ({ matchUtilities, theme }) {
      let options = {
        values: flattenColorPalette_default(theme("gradientColorStops")),
        type: ["color", "any"],
      };
      matchUtilities(
        {
          from: (value2) => {
            let transparentToValue = transparentTo(value2);
            return {
              "--tw-gradient-from": toColorValue(value2, "from"),
              "--tw-gradient-to": transparentToValue,
              "--tw-gradient-stops": `var(--tw-gradient-from), var(--tw-gradient-to)`,
            };
          },
        },
        options
      );
      matchUtilities(
        {
          via: (value2) => {
            let transparentToValue = transparentTo(value2);
            return {
              "--tw-gradient-to": transparentToValue,
              "--tw-gradient-stops": `var(--tw-gradient-from), ${toColorValue(
                value2,
                "via"
              )}, var(--tw-gradient-to)`,
            };
          },
        },
        options
      );
      matchUtilities(
        {
          to: (value2) => ({ "--tw-gradient-to": toColorValue(value2, "to") }),
        },
        options
      );
    };
  })(),
  boxDecorationBreak: ({ addUtilities }) => {
    addUtilities({
      ".decoration-slice": { "box-decoration-break": "slice" },
      // Deprecated
      ".decoration-clone": { "box-decoration-break": "clone" },
      // Deprecated
      ".box-decoration-slice": { "box-decoration-break": "slice" },
      ".box-decoration-clone": { "box-decoration-break": "clone" },
    });
  },
  backgroundSize: createUtilityPlugin(
    "backgroundSize",
    [["bg", ["background-size"]]],
    {
      type: ["lookup", "length", "percentage", "size"],
    }
  ),
  backgroundAttachment: ({ addUtilities }) => {
    addUtilities({
      ".bg-fixed": { "background-attachment": "fixed" },
      ".bg-local": { "background-attachment": "local" },
      ".bg-scroll": { "background-attachment": "scroll" },
    });
  },
  backgroundClip: ({ addUtilities }) => {
    addUtilities({
      ".bg-clip-border": { "background-clip": "border-box" },
      ".bg-clip-padding": { "background-clip": "padding-box" },
      ".bg-clip-content": { "background-clip": "content-box" },
      ".bg-clip-text": { "background-clip": "text" },
    });
  },
  backgroundPosition: createUtilityPlugin(
    "backgroundPosition",
    [["bg", ["background-position"]]],
    {
      type: ["lookup", ["position", { preferOnConflict: true }]],
    }
  ),
  backgroundRepeat: ({ addUtilities }) => {
    addUtilities({
      ".bg-repeat": { "background-repeat": "repeat" },
      ".bg-no-repeat": { "background-repeat": "no-repeat" },
      ".bg-repeat-x": { "background-repeat": "repeat-x" },
      ".bg-repeat-y": { "background-repeat": "repeat-y" },
      ".bg-repeat-round": { "background-repeat": "round" },
      ".bg-repeat-space": { "background-repeat": "space" },
    });
  },
  backgroundOrigin: ({ addUtilities }) => {
    addUtilities({
      ".bg-origin-border": { "background-origin": "border-box" },
      ".bg-origin-padding": { "background-origin": "padding-box" },
      ".bg-origin-content": { "background-origin": "content-box" },
    });
  },
  fill: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        fill: (value2) => {
          return { fill: toColorValue(value2) };
        },
      },
      {
        values: flattenColorPalette_default(theme("fill")),
        type: ["color", "any"],
      }
    );
  },
  stroke: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        stroke: (value2) => {
          return { stroke: toColorValue(value2) };
        },
      },
      {
        values: flattenColorPalette_default(theme("stroke")),
        type: ["color", "url", "any"],
      }
    );
  },
  strokeWidth: createUtilityPlugin(
    "strokeWidth",
    [["stroke", ["stroke-width"]]],
    {
      type: ["length", "number", "percentage"],
    }
  ),
  objectFit: ({ addUtilities }) => {
    addUtilities({
      ".object-contain": { "object-fit": "contain" },
      ".object-cover": { "object-fit": "cover" },
      ".object-fill": { "object-fit": "fill" },
      ".object-none": { "object-fit": "none" },
      ".object-scale-down": { "object-fit": "scale-down" },
    });
  },
  objectPosition: createUtilityPlugin("objectPosition", [
    ["object", ["object-position"]],
  ]),
  padding: createUtilityPlugin("padding", [
    ["p", ["padding"]],
    [
      ["px", ["padding-left", "padding-right"]],
      ["py", ["padding-top", "padding-bottom"]],
    ],
    [
      ["pt", ["padding-top"]],
      ["pr", ["padding-right"]],
      ["pb", ["padding-bottom"]],
      ["pl", ["padding-left"]],
    ],
  ]),
  textAlign: ({ addUtilities }) => {
    addUtilities({
      ".text-left": { "text-align": "left" },
      ".text-center": { "text-align": "center" },
      ".text-right": { "text-align": "right" },
      ".text-justify": { "text-align": "justify" },
      ".text-start": { "text-align": "start" },
      ".text-end": { "text-align": "end" },
    });
  },
  textIndent: createUtilityPlugin("textIndent", [["indent", ["text-indent"]]], {
    supportsNegativeValues: true,
  }),
  verticalAlign: ({ addUtilities, matchUtilities }) => {
    addUtilities({
      ".align-baseline": { "vertical-align": "baseline" },
      ".align-top": { "vertical-align": "top" },
      ".align-middle": { "vertical-align": "middle" },
      ".align-bottom": { "vertical-align": "bottom" },
      ".align-text-top": { "vertical-align": "text-top" },
      ".align-text-bottom": { "vertical-align": "text-bottom" },
      ".align-sub": { "vertical-align": "sub" },
      ".align-super": { "vertical-align": "super" },
    });
    matchUtilities({ align: (value2) => ({ "vertical-align": value2 }) });
  },
  fontFamily: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        font: (value2) => {
          let [families, options = {}] =
            Array.isArray(value2) && isPlainObject(value2[1])
              ? value2
              : [value2];
          let { fontFeatureSettings } = options;
          return {
            "font-family": Array.isArray(families)
              ? families.join(", ")
              : families,
            ...(fontFeatureSettings === void 0
              ? {}
              : { "font-feature-settings": fontFeatureSettings }),
          };
        },
      },
      {
        values: theme("fontFamily"),
        type: ["lookup", "generic-name", "family-name"],
      }
    );
  },
  fontSize: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        text: (value2) => {
          let [fontSize, options] = Array.isArray(value2) ? value2 : [value2];
          let { lineHeight, letterSpacing, fontWeight } = isPlainObject(options)
            ? options
            : { lineHeight: options };
          return {
            "font-size": fontSize,
            ...(lineHeight === void 0 ? {} : { "line-height": lineHeight }),
            ...(letterSpacing === void 0
              ? {}
              : { "letter-spacing": letterSpacing }),
            ...(fontWeight === void 0 ? {} : { "font-weight": fontWeight }),
          };
        },
      },
      {
        values: theme("fontSize"),
        type: ["absolute-size", "relative-size", "length", "percentage"],
      }
    );
  },
  fontWeight: createUtilityPlugin("fontWeight", [["font", ["fontWeight"]]], {
    type: ["lookup", "number", "any"],
  }),
  textTransform: ({ addUtilities }) => {
    addUtilities({
      ".uppercase": { "text-transform": "uppercase" },
      ".lowercase": { "text-transform": "lowercase" },
      ".capitalize": { "text-transform": "capitalize" },
      ".normal-case": { "text-transform": "none" },
    });
  },
  fontStyle: ({ addUtilities }) => {
    addUtilities({
      ".italic": { "font-style": "italic" },
      ".not-italic": { "font-style": "normal" },
    });
  },
  fontVariantNumeric: ({ addDefaults, addUtilities }) => {
    let cssFontVariantNumericValue =
      "var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)";
    addDefaults("font-variant-numeric", {
      "--tw-ordinal": " ",
      "--tw-slashed-zero": " ",
      "--tw-numeric-figure": " ",
      "--tw-numeric-spacing": " ",
      "--tw-numeric-fraction": " ",
    });
    addUtilities({
      ".normal-nums": { "font-variant-numeric": "normal" },
      ".ordinal": {
        "@defaults font-variant-numeric": {},
        "--tw-ordinal": "ordinal",
        "font-variant-numeric": cssFontVariantNumericValue,
      },
      ".slashed-zero": {
        "@defaults font-variant-numeric": {},
        "--tw-slashed-zero": "slashed-zero",
        "font-variant-numeric": cssFontVariantNumericValue,
      },
      ".lining-nums": {
        "@defaults font-variant-numeric": {},
        "--tw-numeric-figure": "lining-nums",
        "font-variant-numeric": cssFontVariantNumericValue,
      },
      ".oldstyle-nums": {
        "@defaults font-variant-numeric": {},
        "--tw-numeric-figure": "oldstyle-nums",
        "font-variant-numeric": cssFontVariantNumericValue,
      },
      ".proportional-nums": {
        "@defaults font-variant-numeric": {},
        "--tw-numeric-spacing": "proportional-nums",
        "font-variant-numeric": cssFontVariantNumericValue,
      },
      ".tabular-nums": {
        "@defaults font-variant-numeric": {},
        "--tw-numeric-spacing": "tabular-nums",
        "font-variant-numeric": cssFontVariantNumericValue,
      },
      ".diagonal-fractions": {
        "@defaults font-variant-numeric": {},
        "--tw-numeric-fraction": "diagonal-fractions",
        "font-variant-numeric": cssFontVariantNumericValue,
      },
      ".stacked-fractions": {
        "@defaults font-variant-numeric": {},
        "--tw-numeric-fraction": "stacked-fractions",
        "font-variant-numeric": cssFontVariantNumericValue,
      },
    });
  },
  lineHeight: createUtilityPlugin("lineHeight", [["leading", ["lineHeight"]]]),
  letterSpacing: createUtilityPlugin(
    "letterSpacing",
    [["tracking", ["letterSpacing"]]],
    {
      supportsNegativeValues: true,
    }
  ),
  textColor: ({ matchUtilities, theme, corePlugins: corePlugins2 }) => {
    matchUtilities(
      {
        text: (value2) => {
          if (!corePlugins2("textOpacity")) {
            return { color: toColorValue(value2) };
          }
          return withAlphaVariable({
            color: value2,
            property: "color",
            variable: "--tw-text-opacity",
          });
        },
      },
      {
        values: flattenColorPalette_default(theme("textColor")),
        type: ["color", "any"],
      }
    );
  },
  textOpacity: createUtilityPlugin("textOpacity", [
    ["text-opacity", ["--tw-text-opacity"]],
  ]),
  textDecoration: ({ addUtilities }) => {
    addUtilities({
      ".underline": { "text-decoration-line": "underline" },
      ".overline": { "text-decoration-line": "overline" },
      ".line-through": { "text-decoration-line": "line-through" },
      ".no-underline": { "text-decoration-line": "none" },
    });
  },
  textDecorationColor: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        decoration: (value2) => {
          return { "text-decoration-color": toColorValue(value2) };
        },
      },
      {
        values: flattenColorPalette_default(theme("textDecorationColor")),
        type: ["color", "any"],
      }
    );
  },
  textDecorationStyle: ({ addUtilities }) => {
    addUtilities({
      ".decoration-solid": { "text-decoration-style": "solid" },
      ".decoration-double": { "text-decoration-style": "double" },
      ".decoration-dotted": { "text-decoration-style": "dotted" },
      ".decoration-dashed": { "text-decoration-style": "dashed" },
      ".decoration-wavy": { "text-decoration-style": "wavy" },
    });
  },
  textDecorationThickness: createUtilityPlugin(
    "textDecorationThickness",
    [["decoration", ["text-decoration-thickness"]]],
    { type: ["length", "percentage"] }
  ),
  textUnderlineOffset: createUtilityPlugin(
    "textUnderlineOffset",
    [["underline-offset", ["text-underline-offset"]]],
    { type: ["length", "percentage", "any"] }
  ),
  fontSmoothing: ({ addUtilities }) => {
    addUtilities({
      ".antialiased": {
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
      },
      ".subpixel-antialiased": {
        "-webkit-font-smoothing": "auto",
        "-moz-osx-font-smoothing": "auto",
      },
    });
  },
  placeholderColor: ({ matchUtilities, theme, corePlugins: corePlugins2 }) => {
    matchUtilities(
      {
        placeholder: (value2) => {
          if (!corePlugins2("placeholderOpacity")) {
            return {
              "&::placeholder": {
                color: toColorValue(value2),
              },
            };
          }
          return {
            "&::placeholder": withAlphaVariable({
              color: value2,
              property: "color",
              variable: "--tw-placeholder-opacity",
            }),
          };
        },
      },
      {
        values: flattenColorPalette_default(theme("placeholderColor")),
        type: ["color", "any"],
      }
    );
  },
  placeholderOpacity: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "placeholder-opacity": (value2) => {
          return { ["&::placeholder"]: { "--tw-placeholder-opacity": value2 } };
        },
      },
      { values: theme("placeholderOpacity") }
    );
  },
  caretColor: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        caret: (value2) => {
          return { "caret-color": toColorValue(value2) };
        },
      },
      {
        values: flattenColorPalette_default(theme("caretColor")),
        type: ["color", "any"],
      }
    );
  },
  accentColor: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        accent: (value2) => {
          return { "accent-color": toColorValue(value2) };
        },
      },
      {
        values: flattenColorPalette_default(theme("accentColor")),
        type: ["color", "any"],
      }
    );
  },
  opacity: createUtilityPlugin("opacity", [["opacity", ["opacity"]]]),
  backgroundBlendMode: ({ addUtilities }) => {
    addUtilities({
      ".bg-blend-normal": { "background-blend-mode": "normal" },
      ".bg-blend-multiply": { "background-blend-mode": "multiply" },
      ".bg-blend-screen": { "background-blend-mode": "screen" },
      ".bg-blend-overlay": { "background-blend-mode": "overlay" },
      ".bg-blend-darken": { "background-blend-mode": "darken" },
      ".bg-blend-lighten": { "background-blend-mode": "lighten" },
      ".bg-blend-color-dodge": { "background-blend-mode": "color-dodge" },
      ".bg-blend-color-burn": { "background-blend-mode": "color-burn" },
      ".bg-blend-hard-light": { "background-blend-mode": "hard-light" },
      ".bg-blend-soft-light": { "background-blend-mode": "soft-light" },
      ".bg-blend-difference": { "background-blend-mode": "difference" },
      ".bg-blend-exclusion": { "background-blend-mode": "exclusion" },
      ".bg-blend-hue": { "background-blend-mode": "hue" },
      ".bg-blend-saturation": { "background-blend-mode": "saturation" },
      ".bg-blend-color": { "background-blend-mode": "color" },
      ".bg-blend-luminosity": { "background-blend-mode": "luminosity" },
    });
  },
  mixBlendMode: ({ addUtilities }) => {
    addUtilities({
      ".mix-blend-normal": { "mix-blend-mode": "normal" },
      ".mix-blend-multiply": { "mix-blend-mode": "multiply" },
      ".mix-blend-screen": { "mix-blend-mode": "screen" },
      ".mix-blend-overlay": { "mix-blend-mode": "overlay" },
      ".mix-blend-darken": { "mix-blend-mode": "darken" },
      ".mix-blend-lighten": { "mix-blend-mode": "lighten" },
      ".mix-blend-color-dodge": { "mix-blend-mode": "color-dodge" },
      ".mix-blend-color-burn": { "mix-blend-mode": "color-burn" },
      ".mix-blend-hard-light": { "mix-blend-mode": "hard-light" },
      ".mix-blend-soft-light": { "mix-blend-mode": "soft-light" },
      ".mix-blend-difference": { "mix-blend-mode": "difference" },
      ".mix-blend-exclusion": { "mix-blend-mode": "exclusion" },
      ".mix-blend-hue": { "mix-blend-mode": "hue" },
      ".mix-blend-saturation": { "mix-blend-mode": "saturation" },
      ".mix-blend-color": { "mix-blend-mode": "color" },
      ".mix-blend-luminosity": { "mix-blend-mode": "luminosity" },
      ".mix-blend-plus-lighter": { "mix-blend-mode": "plus-lighter" },
    });
  },
  boxShadow: (() => {
    let transformValue = transformThemeValue("boxShadow");
    let defaultBoxShadow = [
      `var(--tw-ring-offset-shadow, 0 0 #0000)`,
      `var(--tw-ring-shadow, 0 0 #0000)`,
      `var(--tw-shadow)`,
    ].join(", ");
    return function ({ matchUtilities, addDefaults, theme }) {
      addDefaults(" box-shadow", {
        "--tw-ring-offset-shadow": "0 0 #0000",
        "--tw-ring-shadow": "0 0 #0000",
        "--tw-shadow": "0 0 #0000",
        "--tw-shadow-colored": "0 0 #0000",
      });
      matchUtilities(
        {
          shadow: (value2) => {
            value2 = transformValue(value2);
            let ast = parseBoxShadowValue(value2);
            for (let shadow2 of ast) {
              if (!shadow2.valid) {
                continue;
              }
              shadow2.color = "var(--tw-shadow-color)";
            }
            return {
              "@defaults box-shadow": {},
              "--tw-shadow": value2 === "none" ? "0 0 #0000" : value2,
              "--tw-shadow-colored":
                value2 === "none" ? "0 0 #0000" : formatBoxShadowValue(ast),
              "box-shadow": defaultBoxShadow,
            };
          },
        },
        { values: theme("boxShadow"), type: ["shadow"] }
      );
    };
  })(),
  boxShadowColor: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        shadow: (value2) => {
          return {
            "--tw-shadow-color": toColorValue(value2),
            "--tw-shadow": "var(--tw-shadow-colored)",
          };
        },
      },
      {
        values: flattenColorPalette_default(theme("boxShadowColor")),
        type: ["color", "any"],
      }
    );
  },
  outlineStyle: ({ addUtilities }) => {
    addUtilities({
      ".outline-none": {
        outline: "2px solid transparent",
        "outline-offset": "2px",
      },
      ".outline": { "outline-style": "solid" },
      ".outline-dashed": { "outline-style": "dashed" },
      ".outline-dotted": { "outline-style": "dotted" },
      ".outline-double": { "outline-style": "double" },
    });
  },
  outlineWidth: createUtilityPlugin(
    "outlineWidth",
    [["outline", ["outline-width"]]],
    {
      type: ["length", "number", "percentage"],
    }
  ),
  outlineOffset: createUtilityPlugin(
    "outlineOffset",
    [["outline-offset", ["outline-offset"]]],
    {
      type: ["length", "number", "percentage", "any"],
      supportsNegativeValues: true,
    }
  ),
  outlineColor: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        outline: (value2) => {
          return { "outline-color": toColorValue(value2) };
        },
      },
      {
        values: flattenColorPalette_default(theme("outlineColor")),
        type: ["color", "any"],
      }
    );
  },
  ringWidth: ({ matchUtilities, addDefaults, addUtilities, theme, config }) => {
    let ringColorDefault = (() => {
      if (flagEnabled(config(), "respectDefaultRingColorOpacity")) {
        return theme("ringColor.DEFAULT");
      }
      let ringOpacityDefault = theme("ringOpacity.DEFAULT", "0.5");
      if (!theme("ringColor")?.DEFAULT) {
        return `rgb(147 197 253 / ${ringOpacityDefault})`;
      }
      return withAlphaValue(
        theme("ringColor")?.DEFAULT,
        ringOpacityDefault,
        `rgb(147 197 253 / ${ringOpacityDefault})`
      );
    })();
    addDefaults("ring-width", {
      "--tw-ring-inset": " ",
      "--tw-ring-offset-width": theme("ringOffsetWidth.DEFAULT", "0px"),
      "--tw-ring-offset-color": theme("ringOffsetColor.DEFAULT", "#fff"),
      "--tw-ring-color": ringColorDefault,
      "--tw-ring-offset-shadow": "0 0 #0000",
      "--tw-ring-shadow": "0 0 #0000",
      "--tw-shadow": "0 0 #0000",
      "--tw-shadow-colored": "0 0 #0000",
    });
    matchUtilities(
      {
        ring: (value2) => {
          return {
            "@defaults ring-width": {},
            "--tw-ring-offset-shadow": `var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
            "--tw-ring-shadow": `var(--tw-ring-inset) 0 0 0 calc(${value2} + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
            "box-shadow": [
              `var(--tw-ring-offset-shadow)`,
              `var(--tw-ring-shadow)`,
              `var(--tw-shadow, 0 0 #0000)`,
            ].join(", "),
          };
        },
      },
      { values: theme("ringWidth"), type: "length" }
    );
    addUtilities({
      ".ring-inset": { "@defaults ring-width": {}, "--tw-ring-inset": "inset" },
    });
  },
  ringColor: ({ matchUtilities, theme, corePlugins: corePlugins2 }) => {
    matchUtilities(
      {
        ring: (value2) => {
          if (!corePlugins2("ringOpacity")) {
            return {
              "--tw-ring-color": toColorValue(value2),
            };
          }
          return withAlphaVariable({
            color: value2,
            property: "--tw-ring-color",
            variable: "--tw-ring-opacity",
          });
        },
      },
      {
        values: Object.fromEntries(
          Object.entries(
            flattenColorPalette_default(theme("ringColor"))
          ).filter(([modifier]) => modifier !== "DEFAULT")
        ),
        type: ["color", "any"],
      }
    );
  },
  ringOpacity: (helpers) => {
    let { config } = helpers;
    return createUtilityPlugin(
      "ringOpacity",
      [["ring-opacity", ["--tw-ring-opacity"]]],
      {
        filterDefault: !flagEnabled(config(), "respectDefaultRingColorOpacity"),
      }
    )(helpers);
  },
  ringOffsetWidth: createUtilityPlugin(
    "ringOffsetWidth",
    [["ring-offset", ["--tw-ring-offset-width"]]],
    { type: "length" }
  ),
  ringOffsetColor: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "ring-offset": (value2) => {
          return {
            "--tw-ring-offset-color": toColorValue(value2),
          };
        },
      },
      {
        values: flattenColorPalette_default(theme("ringOffsetColor")),
        type: ["color", "any"],
      }
    );
  },
  blur: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        blur: (value2) => {
          return {
            "--tw-blur": `blur(${value2})`,
            "@defaults filter": {},
            filter: cssFilterValue,
          };
        },
      },
      { values: theme("blur") }
    );
  },
  brightness: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        brightness: (value2) => {
          return {
            "--tw-brightness": `brightness(${value2})`,
            "@defaults filter": {},
            filter: cssFilterValue,
          };
        },
      },
      { values: theme("brightness") }
    );
  },
  contrast: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        contrast: (value2) => {
          return {
            "--tw-contrast": `contrast(${value2})`,
            "@defaults filter": {},
            filter: cssFilterValue,
          };
        },
      },
      { values: theme("contrast") }
    );
  },
  dropShadow: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "drop-shadow": (value2) => {
          return {
            "--tw-drop-shadow": Array.isArray(value2)
              ? value2.map((v) => `drop-shadow(${v})`).join(" ")
              : `drop-shadow(${value2})`,
            "@defaults filter": {},
            filter: cssFilterValue,
          };
        },
      },
      { values: theme("dropShadow") }
    );
  },
  grayscale: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        grayscale: (value2) => {
          return {
            "--tw-grayscale": `grayscale(${value2})`,
            "@defaults filter": {},
            filter: cssFilterValue,
          };
        },
      },
      { values: theme("grayscale") }
    );
  },
  hueRotate: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "hue-rotate": (value2) => {
          return {
            "--tw-hue-rotate": `hue-rotate(${value2})`,
            "@defaults filter": {},
            filter: cssFilterValue,
          };
        },
      },
      { values: theme("hueRotate"), supportsNegativeValues: true }
    );
  },
  invert: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        invert: (value2) => {
          return {
            "--tw-invert": `invert(${value2})`,
            "@defaults filter": {},
            filter: cssFilterValue,
          };
        },
      },
      { values: theme("invert") }
    );
  },
  saturate: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        saturate: (value2) => {
          return {
            "--tw-saturate": `saturate(${value2})`,
            "@defaults filter": {},
            filter: cssFilterValue,
          };
        },
      },
      { values: theme("saturate") }
    );
  },
  sepia: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        sepia: (value2) => {
          return {
            "--tw-sepia": `sepia(${value2})`,
            "@defaults filter": {},
            filter: cssFilterValue,
          };
        },
      },
      { values: theme("sepia") }
    );
  },
  filter: ({ addDefaults, addUtilities }) => {
    addDefaults("filter", {
      "--tw-blur": " ",
      "--tw-brightness": " ",
      "--tw-contrast": " ",
      "--tw-grayscale": " ",
      "--tw-hue-rotate": " ",
      "--tw-invert": " ",
      "--tw-saturate": " ",
      "--tw-sepia": " ",
      "--tw-drop-shadow": " ",
    });
    addUtilities({
      ".filter": { "@defaults filter": {}, filter: cssFilterValue },
      ".filter-none": { filter: "none" },
    });
  },
  backdropBlur: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "backdrop-blur": (value2) => {
          return {
            "--tw-backdrop-blur": `blur(${value2})`,
            "@defaults backdrop-filter": {},
            "backdrop-filter": cssBackdropFilterValue,
          };
        },
      },
      { values: theme("backdropBlur") }
    );
  },
  backdropBrightness: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "backdrop-brightness": (value2) => {
          return {
            "--tw-backdrop-brightness": `brightness(${value2})`,
            "@defaults backdrop-filter": {},
            "backdrop-filter": cssBackdropFilterValue,
          };
        },
      },
      { values: theme("backdropBrightness") }
    );
  },
  backdropContrast: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "backdrop-contrast": (value2) => {
          return {
            "--tw-backdrop-contrast": `contrast(${value2})`,
            "@defaults backdrop-filter": {},
            "backdrop-filter": cssBackdropFilterValue,
          };
        },
      },
      { values: theme("backdropContrast") }
    );
  },
  backdropGrayscale: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "backdrop-grayscale": (value2) => {
          return {
            "--tw-backdrop-grayscale": `grayscale(${value2})`,
            "@defaults backdrop-filter": {},
            "backdrop-filter": cssBackdropFilterValue,
          };
        },
      },
      { values: theme("backdropGrayscale") }
    );
  },
  backdropHueRotate: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "backdrop-hue-rotate": (value2) => {
          return {
            "--tw-backdrop-hue-rotate": `hue-rotate(${value2})`,
            "@defaults backdrop-filter": {},
            "backdrop-filter": cssBackdropFilterValue,
          };
        },
      },
      { values: theme("backdropHueRotate"), supportsNegativeValues: true }
    );
  },
  backdropInvert: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "backdrop-invert": (value2) => {
          return {
            "--tw-backdrop-invert": `invert(${value2})`,
            "@defaults backdrop-filter": {},
            "backdrop-filter": cssBackdropFilterValue,
          };
        },
      },
      { values: theme("backdropInvert") }
    );
  },
  backdropOpacity: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "backdrop-opacity": (value2) => {
          return {
            "--tw-backdrop-opacity": `opacity(${value2})`,
            "@defaults backdrop-filter": {},
            "backdrop-filter": cssBackdropFilterValue,
          };
        },
      },
      { values: theme("backdropOpacity") }
    );
  },
  backdropSaturate: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "backdrop-saturate": (value2) => {
          return {
            "--tw-backdrop-saturate": `saturate(${value2})`,
            "@defaults backdrop-filter": {},
            "backdrop-filter": cssBackdropFilterValue,
          };
        },
      },
      { values: theme("backdropSaturate") }
    );
  },
  backdropSepia: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "backdrop-sepia": (value2) => {
          return {
            "--tw-backdrop-sepia": `sepia(${value2})`,
            "@defaults backdrop-filter": {},
            "backdrop-filter": cssBackdropFilterValue,
          };
        },
      },
      { values: theme("backdropSepia") }
    );
  },
  backdropFilter: ({ addDefaults, addUtilities }) => {
    addDefaults("backdrop-filter", {
      "--tw-backdrop-blur": " ",
      "--tw-backdrop-brightness": " ",
      "--tw-backdrop-contrast": " ",
      "--tw-backdrop-grayscale": " ",
      "--tw-backdrop-hue-rotate": " ",
      "--tw-backdrop-invert": " ",
      "--tw-backdrop-opacity": " ",
      "--tw-backdrop-saturate": " ",
      "--tw-backdrop-sepia": " ",
    });
    addUtilities({
      ".backdrop-filter": {
        "@defaults backdrop-filter": {},
        "backdrop-filter": cssBackdropFilterValue,
      },
      ".backdrop-filter-none": { "backdrop-filter": "none" },
    });
  },
  transitionProperty: ({ matchUtilities, theme }) => {
    let defaultTimingFunction = theme("transitionTimingFunction.DEFAULT");
    let defaultDuration = theme("transitionDuration.DEFAULT");
    matchUtilities(
      {
        transition: (value2) => {
          return {
            "transition-property": value2,
            ...(value2 === "none"
              ? {}
              : {
                  "transition-timing-function": defaultTimingFunction,
                  "transition-duration": defaultDuration,
                }),
          };
        },
      },
      { values: theme("transitionProperty") }
    );
  },
  transitionDelay: createUtilityPlugin("transitionDelay", [
    ["delay", ["transitionDelay"]],
  ]),
  transitionDuration: createUtilityPlugin(
    "transitionDuration",
    [["duration", ["transitionDuration"]]],
    { filterDefault: true }
  ),
  transitionTimingFunction: createUtilityPlugin(
    "transitionTimingFunction",
    [["ease", ["transitionTimingFunction"]]],
    { filterDefault: true }
  ),
  willChange: createUtilityPlugin("willChange", [
    ["will-change", ["will-change"]],
  ]),
  content: createUtilityPlugin("content", [
    ["content", ["--tw-content", ["content", "var(--tw-content)"]]],
  ]),
};

// node_modules/tailwindcss/src/util/toPath.js
function toPath(path) {
  if (Array.isArray(path)) return path;
  let openBrackets = path.split("[").length - 1;
  let closedBrackets = path.split("]").length - 1;
  if (openBrackets !== closedBrackets) {
    throw new Error(`Path is invalid. Has unbalanced brackets: ${path}`);
  }
  return path.split(/\.(?![^\[]*\])|[\[\]]/g).filter(Boolean);
}

// node_modules/tailwindcss/src/util/isSyntacticallyValidPropertyValue.js
var matchingBrackets = /* @__PURE__ */ new Map([
  ["{", "}"],
  ["[", "]"],
  ["(", ")"],
]);
var inverseMatchingBrackets = new Map(
  Array.from(matchingBrackets.entries()).map(([k2, v]) => [v, k2])
);
var quotes = /* @__PURE__ */ new Set(['"', "'", "`"]);
function isSyntacticallyValidPropertyValue(value2) {
  let stack = [];
  let inQuotes = false;
  for (let i = 0; i < value2.length; i++) {
    let char = value2[i];
    if (char === ":" && !inQuotes && stack.length === 0) {
      return false;
    }
    if (quotes.has(char) && value2[i - 1] !== "\\") {
      inQuotes = !inQuotes;
    }
    if (inQuotes) continue;
    if (value2[i - 1] === "\\") continue;
    if (matchingBrackets.has(char)) {
      stack.push(char);
    } else if (inverseMatchingBrackets.has(char)) {
      let inverse = inverseMatchingBrackets.get(char);
      if (stack.length <= 0) {
        return false;
      }
      if (stack.pop() !== inverse) {
        return false;
      }
    }
  }
  if (stack.length > 0) {
    return false;
  }
  return true;
}

// node_modules/tailwindcss/src/util/bigSign.js
function bigSign(bigIntValue) {
  return (bigIntValue > 0n) - (bigIntValue < 0n);
}

// node_modules/tailwindcss/src/lib/remap-bitfield.js
function remapBitfield(num2, mapping) {
  let oldMask = 0n;
  let newMask = 0n;
  for (let [oldBit, newBit] of mapping) {
    if (num2 & oldBit) {
      oldMask = oldMask | oldBit;
      newMask = newMask | newBit;
    }
  }
  return (num2 & ~oldMask) | newMask;
}

// node_modules/tailwindcss/src/lib/offsets.js
var Offsets = class {
  constructor() {
    this.offsets = {
      defaults: 0n,
      base: 0n,
      components: 0n,
      utilities: 0n,
      variants: 0n,
      user: 0n,
    };
    this.layerPositions = {
      defaults: 0n,
      base: 1n,
      components: 2n,
      utilities: 3n,
      // There isn't technically a "user" layer, but we need to give it a position
      // Because it's used for ordering user-css from @apply
      user: 4n,
      variants: 5n,
    };
    this.reservedVariantBits = 0n;
    this.variantOffsets = /* @__PURE__ */ new Map();
  }
  /**
   * @param {Layer} layer
   * @returns {RuleOffset}
   */
  create(layer) {
    return {
      layer,
      parentLayer: layer,
      arbitrary: 0n,
      variants: 0n,
      parallelIndex: 0n,
      index: this.offsets[layer]++,
      options: [],
    };
  }
  /**
   * @returns {RuleOffset}
   */
  arbitraryProperty() {
    return {
      ...this.create("utilities"),
      arbitrary: 1n,
    };
  }
  /**
   * Get the offset for a variant
   *
   * @param {string} variant
   * @param {number} index
   * @returns {RuleOffset}
   */
  forVariant(variant, index = 0) {
    let offset = this.variantOffsets.get(variant);
    if (offset === void 0) {
      throw new Error(`Cannot find offset for unknown variant ${variant}`);
    }
    return {
      ...this.create("variants"),
      variants: offset << BigInt(index),
    };
  }
  /**
   * @param {RuleOffset} rule
   * @param {RuleOffset} variant
   * @param {VariantOption} options
   * @returns {RuleOffset}
   */
  applyVariantOffset(rule, variant, options) {
    options.variant = variant.variants;
    return {
      ...rule,
      layer: "variants",
      parentLayer: rule.layer === "variants" ? rule.parentLayer : rule.layer,
      variants: rule.variants | variant.variants,
      options: options.sort ? [].concat(options, rule.options) : rule.options,
      // TODO: Technically this is wrong. We should be handling parallel index on a per variant basis.
      // We'll take the max of all the parallel indexes for now.
      // @ts-ignore
      parallelIndex: max([rule.parallelIndex, variant.parallelIndex]),
    };
  }
  /**
   * @param {RuleOffset} offset
   * @param {number} parallelIndex
   * @returns {RuleOffset}
   */
  applyParallelOffset(offset, parallelIndex) {
    return {
      ...offset,
      parallelIndex: BigInt(parallelIndex),
    };
  }
  /**
   * Each variant gets 1 bit per function / rule registered.
   * This is because multiple variants can be applied to a single rule and we need to know which ones are present and which ones are not.
   * Additionally, every unique group of variants is grouped together in the stylesheet.
   *
   * This grouping is order-independent. For instance, we do not differentiate between `hover:focus` and `focus:hover`.
   *
   * @param {string[]} variants
   * @param {(name: string) => number} getLength
   */
  recordVariants(variants, getLength) {
    for (let variant of variants) {
      this.recordVariant(variant, getLength(variant));
    }
  }
  /**
   * The same as `recordVariants` but for a single arbitrary variant at runtime.
   * @param {string} variant
   * @param {number} fnCount
   *
   * @returns {RuleOffset} The highest offset for this variant
   */
  recordVariant(variant, fnCount = 1) {
    this.variantOffsets.set(variant, 1n << this.reservedVariantBits);
    this.reservedVariantBits += BigInt(fnCount);
    return {
      ...this.create("variants"),
      variants: this.variantOffsets.get(variant),
    };
  }
  /**
   * @param {RuleOffset} a
   * @param {RuleOffset} b
   * @returns {bigint}
   */
  compare(a, b) {
    if (a.layer !== b.layer) {
      return this.layerPositions[a.layer] - this.layerPositions[b.layer];
    }
    if (a.parentLayer !== b.parentLayer) {
      return (
        this.layerPositions[a.parentLayer] - this.layerPositions[b.parentLayer]
      );
    }
    for (let aOptions of a.options) {
      for (let bOptions of b.options) {
        if (aOptions.id !== bOptions.id) continue;
        if (!aOptions.sort || !bOptions.sort) continue;
        let maxFnVariant = max([aOptions.variant, bOptions.variant]) ?? 0n;
        let mask = ~(maxFnVariant | (maxFnVariant - 1n));
        let aVariantsAfterFn = a.variants & mask;
        let bVariantsAfterFn = b.variants & mask;
        if (aVariantsAfterFn !== bVariantsAfterFn) {
          continue;
        }
        let result = aOptions.sort(
          {
            value: aOptions.value,
            modifier: aOptions.modifier,
          },
          {
            value: bOptions.value,
            modifier: bOptions.modifier,
          }
        );
        if (result !== 0) return result;
      }
    }
    if (a.variants !== b.variants) {
      return a.variants - b.variants;
    }
    if (a.parallelIndex !== b.parallelIndex) {
      return a.parallelIndex - b.parallelIndex;
    }
    if (a.arbitrary !== b.arbitrary) {
      return a.arbitrary - b.arbitrary;
    }
    return a.index - b.index;
  }
  /**
   * Arbitrary variants are recorded in the order they're encountered.
   * This means that the order is not stable between environments and sets of content files.
   *
   * In order to make the order stable, we need to remap the arbitrary variant offsets to
   * be in alphabetical order starting from the offset of the first arbitrary variant.
   */
  recalculateVariantOffsets() {
    let variants = Array.from(this.variantOffsets.entries())
      .filter(([v]) => v.startsWith("["))
      .sort(([a], [z]) => fastCompare(a, z));
    let newOffsets = variants
      .map(([, offset]) => offset)
      .sort((a, z) => bigSign(a - z));
    let mapping = variants.map(([, oldOffset], i) => [
      oldOffset,
      newOffsets[i],
    ]);
    return mapping.filter(([a, z]) => a !== z);
  }
  /**
   * @template T
   * @param {[RuleOffset, T][]} list
   * @returns {[RuleOffset, T][]}
   */
  remapArbitraryVariantOffsets(list2) {
    let mapping = this.recalculateVariantOffsets();
    if (mapping.length === 0) {
      return list2;
    }
    return list2.map((item) => {
      let [offset, rule] = item;
      offset = {
        ...offset,
        variants: remapBitfield(offset.variants, mapping),
      };
      return [offset, rule];
    });
  }
  /**
   * @template T
   * @param {[RuleOffset, T][]} list
   * @returns {[RuleOffset, T][]}
   */
  sort(list2) {
    list2 = this.remapArbitraryVariantOffsets(list2);
    return list2.sort(([a], [b]) => bigSign(this.compare(a, b)));
  }
};
function max(nums) {
  let max2 = null;
  for (const num2 of nums) {
    max2 = max2 ?? num2;
    max2 = max2 > num2 ? max2 : num2;
  }
  return max2;
}
function fastCompare(a, b) {
  let aLen = a.length;
  let bLen = b.length;
  let minLen = aLen < bLen ? aLen : bLen;
  for (let i = 0; i < minLen; i++) {
    let cmp = a.charCodeAt(i) - b.charCodeAt(i);
    if (cmp !== 0) return cmp;
  }
  return aLen - bLen;
}

// node_modules/tailwindcss/src/lib/setupContextUtils.js
var VARIANT_TYPES = {
  AddVariant: Symbol.for("ADD_VARIANT"),
  MatchVariant: Symbol.for("MATCH_VARIANT"),
};
var VARIANT_INFO = {
  Base: 1 << 0,
  Dynamic: 1 << 1,
};
function prefix(context, selector) {
  let prefix3 = context.tailwindConfig.prefix;
  return typeof prefix3 === "function" ? prefix3(selector) : prefix3 + selector;
}
function normalizeOptionTypes({ type = "any", ...options }) {
  let types2 = [].concat(type);
  return {
    ...options,
    types: types2.map((type2) => {
      if (Array.isArray(type2)) {
        return { type: type2[0], ...type2[1] };
      }
      return { type: type2, preferOnConflict: false };
    }),
  };
}
function parseVariantFormatString(input) {
  let parts = [];
  let current = "";
  let depth = 0;
  for (let idx = 0; idx < input.length; idx++) {
    let char = input[idx];
    if (char === "\\") {
      current += "\\" + input[++idx];
    } else if (char === "{") {
      ++depth;
      parts.push(current.trim());
      current = "";
    } else if (char === "}") {
      if (--depth < 0) {
        throw new Error(`Your { and } are unbalanced.`);
      }
      parts.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  if (current.length > 0) {
    parts.push(current.trim());
  }
  parts = parts.filter((part) => part !== "");
  return parts;
}
function insertInto(list2, value2, { before = [] } = {}) {
  before = [].concat(before);
  if (before.length <= 0) {
    list2.push(value2);
    return;
  }
  let idx = list2.length - 1;
  for (let other of before) {
    let iidx = list2.indexOf(other);
    if (iidx === -1) continue;
    idx = Math.min(idx, iidx);
  }
  list2.splice(idx, 0, value2);
}
function parseStyles(styles) {
  if (!Array.isArray(styles)) {
    return parseStyles([styles]);
  }
  return styles.flatMap((style) => {
    let isNode = !Array.isArray(style) && !isPlainObject(style);
    return isNode ? style : parseObjectStyles(style);
  });
}
function getClasses(selector, mutate) {
  let parser4 = selectorParser2((selectors) => {
    let allClasses = [];
    if (mutate) {
      mutate(selectors);
    }
    selectors.walkClasses((classNode) => {
      allClasses.push(classNode.value);
    });
    return allClasses;
  });
  return parser4.transformSync(selector);
}
function extractCandidates(
  node,
  state = { containsNonOnDemandable: false },
  depth = 0
) {
  let classes = [];
  if (node.type === "rule") {
    let ignoreNot = function (selectors) {
      selectors.walkPseudos((pseudo) => {
        if (pseudo.value === ":not") {
          pseudo.remove();
        }
      });
    };
    for (let selector of node.selectors) {
      let classCandidates = getClasses(selector, ignoreNot);
      if (classCandidates.length === 0) {
        state.containsNonOnDemandable = true;
      }
      for (let classCandidate of classCandidates) {
        classes.push(classCandidate);
      }
    }
  } else if (node.type === "atrule") {
    node.walkRules((rule) => {
      for (let classCandidate of rule.selectors.flatMap((selector) =>
        getClasses(selector)
      )) {
        classes.push(classCandidate);
      }
    });
  }
  if (depth === 0) {
    return [state.containsNonOnDemandable || classes.length === 0, classes];
  }
  return classes;
}
function withIdentifiers(styles) {
  return parseStyles(styles).flatMap((node) => {
    let nodeMap = /* @__PURE__ */ new Map();
    let [containsNonOnDemandableSelectors, candidates] =
      extractCandidates(node);
    if (containsNonOnDemandableSelectors) {
      candidates.unshift(NOT_ON_DEMAND);
    }
    return candidates.map((c4) => {
      if (!nodeMap.has(node)) {
        nodeMap.set(node, node);
      }
      return [c4, nodeMap.get(node)];
    });
  });
}
function isValidVariantFormatString(format) {
  return format.startsWith("@") || format.includes("&");
}
function parseVariant(variant) {
  variant = variant
    .replace(/\n+/g, "")
    .replace(/\s{1,}/g, " ")
    .trim();
  let fns = parseVariantFormatString(variant)
    .map((str) => {
      if (!str.startsWith("@")) {
        return ({ format }) => format(str);
      }
      let [, name, params] = /@(.*?)( .+|[({].*)/g.exec(str);
      return ({ wrap }) =>
        wrap(postcss4.atRule({ name, params: params.trim() }));
    })
    .reverse();
  return (api) => {
    for (let fn2 of fns) {
      fn2(api);
    }
  };
}
function buildPluginApi(
  tailwindConfig,
  context,
  { variantList, variantMap, offsets, classList }
) {
  function getConfigValue(path, defaultValue) {
    return path ? dlv(tailwindConfig, path, defaultValue) : tailwindConfig;
  }
  function applyConfiguredPrefix(selector) {
    return prefixSelector_default(tailwindConfig.prefix, selector);
  }
  function prefixIdentifier(identifier, options) {
    if (identifier === NOT_ON_DEMAND) {
      return NOT_ON_DEMAND;
    }
    if (!options.respectPrefix) {
      return identifier;
    }
    return context.tailwindConfig.prefix + identifier;
  }
  function resolveThemeValue(path, defaultValue, opts = {}) {
    let parts = toPath(path);
    let value2 = getConfigValue(["theme", ...parts], defaultValue);
    return transformThemeValue(parts[0])(value2, opts);
  }
  let variantIdentifier = 0;
  let api = {
    postcss: postcss4,
    prefix: applyConfiguredPrefix,
    e: escapeClassName,
    config: getConfigValue,
    theme: resolveThemeValue,
    corePlugins: (path) => {
      if (Array.isArray(tailwindConfig.corePlugins)) {
        return tailwindConfig.corePlugins.includes(path);
      }
      return getConfigValue(["corePlugins", path], true);
    },
    variants: () => {
      return [];
    },
    addBase(base) {
      for (let [identifier, rule] of withIdentifiers(base)) {
        let prefixedIdentifier = prefixIdentifier(identifier, {});
        let offset = offsets.create("base");
        if (!context.candidateRuleMap.has(prefixedIdentifier)) {
          context.candidateRuleMap.set(prefixedIdentifier, []);
        }
        context.candidateRuleMap
          .get(prefixedIdentifier)
          .push([{ sort: offset, layer: "base" }, rule]);
      }
    },
    /**
     * @param {string} group
     * @param {Record<string, string | string[]>} declarations
     */
    addDefaults(group, declarations) {
      const groups = {
        [`@defaults ${group}`]: declarations,
      };
      for (let [identifier, rule] of withIdentifiers(groups)) {
        let prefixedIdentifier = prefixIdentifier(identifier, {});
        if (!context.candidateRuleMap.has(prefixedIdentifier)) {
          context.candidateRuleMap.set(prefixedIdentifier, []);
        }
        context.candidateRuleMap
          .get(prefixedIdentifier)
          .push([
            { sort: offsets.create("defaults"), layer: "defaults" },
            rule,
          ]);
      }
    },
    addComponents(components, options) {
      let defaultOptions = {
        preserveSource: false,
        respectPrefix: true,
        respectImportant: false,
      };
      options = Object.assign(
        {},
        defaultOptions,
        Array.isArray(options) ? {} : options
      );
      for (let [identifier, rule] of withIdentifiers(components)) {
        let prefixedIdentifier = prefixIdentifier(identifier, options);
        classList.add(prefixedIdentifier);
        if (!context.candidateRuleMap.has(prefixedIdentifier)) {
          context.candidateRuleMap.set(prefixedIdentifier, []);
        }
        context.candidateRuleMap.get(prefixedIdentifier).push([
          {
            sort: offsets.create("components"),
            layer: "components",
            options,
          },
          rule,
        ]);
      }
    },
    addUtilities(utilities, options) {
      let defaultOptions = {
        preserveSource: false,
        respectPrefix: true,
        respectImportant: true,
      };
      options = Object.assign(
        {},
        defaultOptions,
        Array.isArray(options) ? {} : options
      );
      for (let [identifier, rule] of withIdentifiers(utilities)) {
        let prefixedIdentifier = prefixIdentifier(identifier, options);
        classList.add(prefixedIdentifier);
        if (!context.candidateRuleMap.has(prefixedIdentifier)) {
          context.candidateRuleMap.set(prefixedIdentifier, []);
        }
        context.candidateRuleMap
          .get(prefixedIdentifier)
          .push([
            { sort: offsets.create("utilities"), layer: "utilities", options },
            rule,
          ]);
      }
    },
    matchUtilities: function (utilities, options) {
      let defaultOptions = {
        respectPrefix: true,
        respectImportant: true,
        modifiers: false,
      };
      options = normalizeOptionTypes({ ...defaultOptions, ...options });
      let offset = offsets.create("utilities");
      for (let identifier in utilities) {
        let wrapped = function (modifier, { isOnlyPlugin }) {
          let [value2, coercedType, utilityModifier] = coerceValue(
            options.types,
            modifier,
            options,
            tailwindConfig
          );
          if (value2 === void 0) {
            return [];
          }
          if (!options.types.some(({ type }) => type === coercedType)) {
            if (isOnlyPlugin) {
              log_default.warn([
                `Unnecessary typehint \`${coercedType}\` in \`${identifier}-${modifier}\`.`,
                `You can safely update it to \`${identifier}-${modifier.replace(
                  coercedType + ":",
                  ""
                )}\`.`,
              ]);
            } else {
              return [];
            }
          }
          if (!isSyntacticallyValidPropertyValue(value2)) {
            return [];
          }
          let extras = {
            get modifier() {
              if (!options.modifiers) {
                log_default.warn(
                  `modifier-used-without-options-for-${identifier}`,
                  [
                    "Your plugin must set `modifiers: true` in its options to support modifiers.",
                  ]
                );
              }
              return utilityModifier;
            },
          };
          let modifiersEnabled = flagEnabled(
            tailwindConfig,
            "generalizedModifiers"
          );
          let ruleSets = []
            .concat(modifiersEnabled ? rule(value2, extras) : rule(value2))
            .filter(Boolean)
            .map((declaration) => ({
              [nameClass(identifier, modifier)]: declaration,
            }));
          return ruleSets;
        };
        let prefixedIdentifier = prefixIdentifier(identifier, options);
        let rule = utilities[identifier];
        classList.add([prefixedIdentifier, options]);
        let withOffsets = [
          { sort: offset, layer: "utilities", options },
          wrapped,
        ];
        if (!context.candidateRuleMap.has(prefixedIdentifier)) {
          context.candidateRuleMap.set(prefixedIdentifier, []);
        }
        context.candidateRuleMap.get(prefixedIdentifier).push(withOffsets);
      }
    },
    matchComponents: function (components, options) {
      let defaultOptions = {
        respectPrefix: true,
        respectImportant: false,
        modifiers: false,
      };
      options = normalizeOptionTypes({ ...defaultOptions, ...options });
      let offset = offsets.create("components");
      for (let identifier in components) {
        let wrapped = function (modifier, { isOnlyPlugin }) {
          let [value2, coercedType, utilityModifier] = coerceValue(
            options.types,
            modifier,
            options,
            tailwindConfig
          );
          if (value2 === void 0) {
            return [];
          }
          if (!options.types.some(({ type }) => type === coercedType)) {
            if (isOnlyPlugin) {
              log_default.warn([
                `Unnecessary typehint \`${coercedType}\` in \`${identifier}-${modifier}\`.`,
                `You can safely update it to \`${identifier}-${modifier.replace(
                  coercedType + ":",
                  ""
                )}\`.`,
              ]);
            } else {
              return [];
            }
          }
          if (!isSyntacticallyValidPropertyValue(value2)) {
            return [];
          }
          let extras = {
            get modifier() {
              if (!options.modifiers) {
                log_default.warn(
                  `modifier-used-without-options-for-${identifier}`,
                  [
                    "Your plugin must set `modifiers: true` in its options to support modifiers.",
                  ]
                );
              }
              return utilityModifier;
            },
          };
          let modifiersEnabled = flagEnabled(
            tailwindConfig,
            "generalizedModifiers"
          );
          let ruleSets = []
            .concat(modifiersEnabled ? rule(value2, extras) : rule(value2))
            .filter(Boolean)
            .map((declaration) => ({
              [nameClass(identifier, modifier)]: declaration,
            }));
          return ruleSets;
        };
        let prefixedIdentifier = prefixIdentifier(identifier, options);
        let rule = components[identifier];
        classList.add([prefixedIdentifier, options]);
        let withOffsets = [
          { sort: offset, layer: "components", options },
          wrapped,
        ];
        if (!context.candidateRuleMap.has(prefixedIdentifier)) {
          context.candidateRuleMap.set(prefixedIdentifier, []);
        }
        context.candidateRuleMap.get(prefixedIdentifier).push(withOffsets);
      }
    },
    addVariant(variantName, variantFunctions, options = {}) {
      variantFunctions = [].concat(variantFunctions).map((variantFunction) => {
        if (typeof variantFunction !== "string") {
          return (api2 = {}) => {
            let { args, modifySelectors, container, separator, wrap, format } =
              api2;
            let result = variantFunction(
              Object.assign(
                { modifySelectors, container, separator },
                options.type === VARIANT_TYPES.MatchVariant && {
                  args,
                  wrap,
                  format,
                }
              )
            );
            if (
              typeof result === "string" &&
              !isValidVariantFormatString(result)
            ) {
              throw new Error(
                `Your custom variant \`${variantName}\` has an invalid format string. Make sure it's an at-rule or contains a \`&\` placeholder.`
              );
            }
            if (Array.isArray(result)) {
              return result
                .filter((variant) => typeof variant === "string")
                .map((variant) => parseVariant(variant));
            }
            return (
              result && typeof result === "string" && parseVariant(result)(api2)
            );
          };
        }
        if (!isValidVariantFormatString(variantFunction)) {
          throw new Error(
            `Your custom variant \`${variantName}\` has an invalid format string. Make sure it's an at-rule or contains a \`&\` placeholder.`
          );
        }
        return parseVariant(variantFunction);
      });
      insertInto(variantList, variantName, options);
      variantMap.set(variantName, variantFunctions);
      context.variantOptions.set(variantName, options);
    },
    matchVariant(variant, variantFn, options) {
      let id = options?.id ?? ++variantIdentifier;
      let isSpecial = variant === "@";
      let modifiersEnabled = flagEnabled(
        tailwindConfig,
        "generalizedModifiers"
      );
      for (let [key, value2] of Object.entries(options?.values ?? {})) {
        if (key === "DEFAULT") continue;
        api.addVariant(
          isSpecial ? `${variant}${key}` : `${variant}-${key}`,
          ({ args, container }) => {
            return variantFn(
              value2,
              modifiersEnabled
                ? { modifier: args?.modifier, container }
                : { container }
            );
          },
          {
            ...options,
            value: value2,
            id,
            type: VARIANT_TYPES.MatchVariant,
            variantInfo: VARIANT_INFO.Base,
          }
        );
      }
      let hasDefault = "DEFAULT" in (options?.values ?? {});
      api.addVariant(
        variant,
        ({ args, container }) => {
          if (args?.value === NONE && !hasDefault) {
            return null;
          }
          return variantFn(
            args?.value === NONE
              ? options.values.DEFAULT
              : // Falling back to args if it is a string, otherwise '' for older intellisense
                // (JetBrains) plugins.
                args?.value ?? (typeof args === "string" ? args : ""),
            modifiersEnabled
              ? { modifier: args?.modifier, container }
              : { container }
          );
        },
        {
          ...options,
          id,
          type: VARIANT_TYPES.MatchVariant,
          variantInfo: VARIANT_INFO.Dynamic,
        }
      );
    },
  };
  return api;
}
function extractVariantAtRules(node) {
  node.walkAtRules((atRule) => {
    if (["responsive", "variants"].includes(atRule.name)) {
      extractVariantAtRules(atRule);
      atRule.before(atRule.nodes);
      atRule.remove();
    }
  });
}
function collectLayerPlugins(root) {
  let layerPlugins = [];
  root.each((node) => {
    if (
      node.type === "atrule" &&
      ["responsive", "variants"].includes(node.name)
    ) {
      node.name = "layer";
      node.params = "utilities";
    }
  });
  root.walkAtRules("layer", (layerRule) => {
    extractVariantAtRules(layerRule);
    if (layerRule.params === "base") {
      for (let node of layerRule.nodes) {
        layerPlugins.push(function ({ addBase }) {
          addBase(node, { respectPrefix: false });
        });
      }
      layerRule.remove();
    } else if (layerRule.params === "components") {
      for (let node of layerRule.nodes) {
        layerPlugins.push(function ({ addComponents }) {
          addComponents(node, { respectPrefix: false, preserveSource: true });
        });
      }
      layerRule.remove();
    } else if (layerRule.params === "utilities") {
      for (let node of layerRule.nodes) {
        layerPlugins.push(function ({ addUtilities }) {
          addUtilities(node, { respectPrefix: false, preserveSource: true });
        });
      }
      layerRule.remove();
    }
  });
  return layerPlugins;
}
function resolvePlugins(context, root) {
  let corePluginList = Object.entries({ ...variantPlugins, ...corePlugins })
    .map(([name, plugin]) => {
      if (!context.tailwindConfig.corePlugins.includes(name)) {
        return null;
      }
      return plugin;
    })
    .filter(Boolean);
  let userPlugins = context.tailwindConfig.plugins.map((plugin) => {
    if (plugin.__isOptionsFunction) {
      plugin = plugin();
    }
    return typeof plugin === "function" ? plugin : plugin.handler;
  });
  let layerPlugins = collectLayerPlugins(root);
  let beforeVariants = [
    variantPlugins["pseudoElementVariants"],
    variantPlugins["pseudoClassVariants"],
    variantPlugins["ariaVariants"],
    variantPlugins["dataVariants"],
  ];
  let afterVariants = [
    variantPlugins["supportsVariants"],
    variantPlugins["directionVariants"],
    variantPlugins["reducedMotionVariants"],
    variantPlugins["prefersContrastVariants"],
    variantPlugins["darkVariants"],
    variantPlugins["printVariant"],
    variantPlugins["screenVariants"],
    variantPlugins["orientationVariants"],
  ];
  return [
    ...corePluginList,
    ...beforeVariants,
    ...userPlugins,
    ...afterVariants,
    ...layerPlugins,
  ];
}
function registerPlugins(plugins, context) {
  let variantList = [];
  let variantMap = /* @__PURE__ */ new Map();
  context.variantMap = variantMap;
  let offsets = new Offsets();
  context.offsets = offsets;
  let classList = /* @__PURE__ */ new Set();
  let pluginApi = buildPluginApi(context.tailwindConfig, context, {
    variantList,
    variantMap,
    offsets,
    classList,
  });
  for (let plugin of plugins) {
    if (Array.isArray(plugin)) {
      for (let pluginItem of plugin) {
        pluginItem(pluginApi);
      }
    } else {
      plugin?.(pluginApi);
    }
  }
  offsets.recordVariants(
    variantList,
    (variant) => variantMap.get(variant).length
  );
  for (let [variantName, variantFunctions] of variantMap.entries()) {
    context.variantMap.set(
      variantName,
      variantFunctions.map((variantFunction, idx) => [
        offsets.forVariant(variantName, idx),
        variantFunction,
      ])
    );
  }
  let safelist = (context.tailwindConfig.safelist ?? []).filter(Boolean);
  if (safelist.length > 0) {
    let checks = [];
    for (let value2 of safelist) {
      if (typeof value2 === "string") {
        context.changedContent.push({ content: value2, extension: "html" });
        continue;
      }
      if (value2 instanceof RegExp) {
        log_default.warn("root-regex", [
          "Regular expressions in `safelist` work differently in Tailwind CSS v3.0.",
          "Update your `safelist` configuration to eliminate this warning.",
          "https://tailwindcss.com/docs/content-configuration#safelisting-classes",
        ]);
        continue;
      }
      checks.push(value2);
    }
    if (checks.length > 0) {
      let patternMatchingCount = /* @__PURE__ */ new Map();
      let prefixLength = context.tailwindConfig.prefix.length;
      let checkImportantUtils = checks.some((check) =>
        check.pattern.source.includes("!")
      );
      for (let util of classList) {
        let utils = Array.isArray(util)
          ? (() => {
              let [utilName, options] = util;
              let values = Object.keys(options?.values ?? {});
              let classes = values.map((value2) =>
                formatClass(utilName, value2)
              );
              if (options?.supportsNegativeValues) {
                classes = [...classes, ...classes.map((cls) => "-" + cls)];
                classes = [
                  ...classes,
                  ...classes.map(
                    (cls) =>
                      cls.slice(0, prefixLength) + "-" + cls.slice(prefixLength)
                  ),
                ];
              }
              if (options.types.some(({ type }) => type === "color")) {
                classes = [
                  ...classes,
                  ...classes.flatMap((cls) =>
                    Object.keys(context.tailwindConfig.theme.opacity).map(
                      (opacity) => `${cls}/${opacity}`
                    )
                  ),
                ];
              }
              if (checkImportantUtils && options?.respectImportant) {
                classes = [...classes, ...classes.map((cls) => "!" + cls)];
              }
              return classes;
            })()
          : [util];
        for (let util2 of utils) {
          for (let { pattern: pattern2, variants = [] } of checks) {
            pattern2.lastIndex = 0;
            if (!patternMatchingCount.has(pattern2)) {
              patternMatchingCount.set(pattern2, 0);
            }
            if (!pattern2.test(util2)) continue;
            patternMatchingCount.set(
              pattern2,
              patternMatchingCount.get(pattern2) + 1
            );
            context.changedContent.push({ content: util2, extension: "html" });
            for (let variant of variants) {
              context.changedContent.push({
                content: variant + context.tailwindConfig.separator + util2,
                extension: "html",
              });
            }
          }
        }
      }
      for (let [regex, count] of patternMatchingCount.entries()) {
        if (count !== 0) continue;
        log_default.warn([
          `The safelist pattern \`${regex}\` doesn't match any Tailwind CSS classes.`,
          "Fix this pattern or remove it from your `safelist` configuration.",
          "https://tailwindcss.com/docs/content-configuration#safelisting-classes",
        ]);
      }
    }
  }
  let darkClassName =
    [].concat(context.tailwindConfig.darkMode ?? "media")[1] ?? "dark";
  let parasiteUtilities = [
    prefix(context, darkClassName),
    prefix(context, "group"),
    prefix(context, "peer"),
  ];
  context.getClassOrder = function getClassOrder(classes) {
    let sortedClassNames = new Map(
      classes.map((className) => [className, null])
    );
    let rules = generateRules(new Set(classes), context);
    rules = context.offsets.sort(rules);
    let idx = BigInt(parasiteUtilities.length);
    for (const [, rule] of rules) {
      sortedClassNames.set(rule.raws.tailwind.candidate, idx++);
    }
    return classes.map((className) => {
      let order = sortedClassNames.get(className) ?? null;
      let parasiteIndex = parasiteUtilities.indexOf(className);
      if (order === null && parasiteIndex !== -1) {
        order = BigInt(parasiteIndex);
      }
      return [className, order];
    });
  };
  context.getClassList = function getClassList(options = {}) {
    let output = [];
    for (let util of classList) {
      if (Array.isArray(util)) {
        let [utilName, utilOptions] = util;
        let negativeClasses = [];
        let modifiers = Object.keys(utilOptions?.modifiers ?? {});
        if (utilOptions?.types?.some(({ type }) => type === "color")) {
          modifiers.push(
            ...Object.keys(context.tailwindConfig.theme.opacity ?? {})
          );
        }
        let metadata = { modifiers };
        let includeMetadata = options.includeMetadata && modifiers.length > 0;
        for (let [key, value2] of Object.entries(utilOptions?.values ?? {})) {
          if (value2 == null) {
            continue;
          }
          let cls = formatClass(utilName, key);
          output.push(includeMetadata ? [cls, metadata] : cls);
          if (utilOptions?.supportsNegativeValues && negateValue(value2)) {
            let cls2 = formatClass(utilName, `-${key}`);
            negativeClasses.push(includeMetadata ? [cls2, metadata] : cls2);
          }
        }
        output.push(...negativeClasses);
      } else {
        output.push(util);
      }
    }
    return output;
  };
  context.getVariants = function getVariants() {
    let result = [];
    for (let [name, options] of context.variantOptions.entries()) {
      if (options.variantInfo === VARIANT_INFO.Base) continue;
      result.push({
        name,
        isArbitrary: options.type === Symbol.for("MATCH_VARIANT"),
        values: Object.keys(options.values ?? {}),
        hasDash: name !== "@",
        selectors({ modifier, value: value2 } = {}) {
          let candidate = "__TAILWIND_PLACEHOLDER__";
          let rule = postcss4.rule({ selector: `.${candidate}` });
          let container = postcss4.root({ nodes: [rule.clone()] });
          let before = container.toString();
          let fns = (context.variantMap.get(name) ?? []).flatMap(
            ([_, fn2]) => fn2
          );
          let formatStrings = [];
          for (let fn2 of fns) {
            let localFormatStrings = [];
            let api = {
              args: { modifier, value: options.values?.[value2] ?? value2 },
              separator: context.tailwindConfig.separator,
              modifySelectors(modifierFunction) {
                container.each((rule2) => {
                  if (rule2.type !== "rule") {
                    return;
                  }
                  rule2.selectors = rule2.selectors.map((selector) => {
                    return modifierFunction({
                      get className() {
                        return getClassNameFromSelector(selector);
                      },
                      selector,
                    });
                  });
                });
                return container;
              },
              format(str) {
                localFormatStrings.push(str);
              },
              wrap(wrapper) {
                localFormatStrings.push(
                  `@${wrapper.name} ${wrapper.params} { & }`
                );
              },
              container,
            };
            let ruleWithVariant = fn2(api);
            if (localFormatStrings.length > 0) {
              formatStrings.push(localFormatStrings);
            }
            if (Array.isArray(ruleWithVariant)) {
              for (let variantFunction of ruleWithVariant) {
                localFormatStrings = [];
                variantFunction(api);
                formatStrings.push(localFormatStrings);
              }
            }
          }
          let manualFormatStrings = [];
          let after = container.toString();
          if (before !== after) {
            container.walkRules((rule2) => {
              let modified = rule2.selector;
              let rebuiltBase = selectorParser2((selectors) => {
                selectors.walkClasses((classNode) => {
                  classNode.value = `${name}${context.tailwindConfig.separator}${classNode.value}`;
                });
              }).processSync(modified);
              manualFormatStrings.push(
                modified.replace(rebuiltBase, "&").replace(candidate, "&")
              );
            });
            container.walkAtRules((atrule) => {
              manualFormatStrings.push(
                `@${atrule.name} (${atrule.params}) { & }`
              );
            });
          }
          let isArbitraryVariant = !(value2 in (options.values ?? {}));
          formatStrings = formatStrings.map((format) =>
            format.map((str) => ({
              format: str,
              isArbitraryVariant,
            }))
          );
          manualFormatStrings = manualFormatStrings.map((format) => ({
            format,
            isArbitraryVariant,
          }));
          let opts = {
            candidate,
            context,
          };
          let result2 = formatStrings.map((formats) =>
            finalizeSelector(
              `.${candidate}`,
              formatVariantSelector(formats, opts),
              opts
            )
              .replace(`.${candidate}`, "&")
              .replace("{ & }", "")
              .trim()
          );
          if (manualFormatStrings.length > 0) {
            result2.push(
              formatVariantSelector(manualFormatStrings, opts)
                .toString()
                .replace(`.${candidate}`, "&")
            );
          }
          return result2;
        },
      });
    }
    return result;
  };
}
function markInvalidUtilityCandidate(context, candidate) {
  if (!context.classCache.has(candidate)) {
    return;
  }
  context.notClassCache.add(candidate);
  context.classCache.delete(candidate);
  context.applyClassCache.delete(candidate);
  context.candidateRuleMap.delete(candidate);
  context.candidateRuleCache.delete(candidate);
  context.stylesheetCache = null;
}
function markInvalidUtilityNode(context, node) {
  let candidate = node.raws.tailwind.candidate;
  if (!candidate) {
    return;
  }
  for (const entry of context.ruleCache) {
    if (entry[1].raws.tailwind.candidate === candidate) {
      context.ruleCache.delete(entry);
    }
  }
  markInvalidUtilityCandidate(context, candidate);
}
function createContext(
  tailwindConfig,
  changedContent = [],
  root = postcss4.root()
) {
  let context = {
    disposables: [],
    ruleCache: /* @__PURE__ */ new Set(),
    candidateRuleCache: /* @__PURE__ */ new Map(),
    classCache: /* @__PURE__ */ new Map(),
    applyClassCache: /* @__PURE__ */ new Map(),
    // Seed the not class cache with the blocklist (which is only strings)
    notClassCache: new Set(tailwindConfig.blocklist ?? []),
    postCssNodeCache: /* @__PURE__ */ new Map(),
    candidateRuleMap: /* @__PURE__ */ new Map(),
    tailwindConfig,
    changedContent,
    variantMap: /* @__PURE__ */ new Map(),
    stylesheetCache: null,
    variantOptions: /* @__PURE__ */ new Map(),
    markInvalidUtilityCandidate: (candidate) =>
      markInvalidUtilityCandidate(context, candidate),
    markInvalidUtilityNode: (node) => markInvalidUtilityNode(context, node),
  };
  let resolvedPlugins = resolvePlugins(context, root);
  registerPlugins(resolvedPlugins, context);
  return context;
}

// node_modules/tailwindcss/src/lib/generateRules.js
var classNameParser = selectorParser3((selectors) => {
  return selectors.first.filter(({ type }) => type === "class").pop().value;
});
function getClassNameFromSelector(selector) {
  return classNameParser.transformSync(selector);
}
function* candidatePermutations(candidate) {
  let lastIndex = Infinity;
  while (lastIndex >= 0) {
    let dashIdx;
    let wasSlash = false;
    if (lastIndex === Infinity && candidate.endsWith("]")) {
      let bracketIdx = candidate.indexOf("[");
      if (candidate[bracketIdx - 1] === "-") {
        dashIdx = bracketIdx - 1;
      } else if (candidate[bracketIdx - 1] === "/") {
        dashIdx = bracketIdx - 1;
        wasSlash = true;
      } else {
        dashIdx = -1;
      }
    } else if (lastIndex === Infinity && candidate.includes("/")) {
      dashIdx = candidate.lastIndexOf("/");
      wasSlash = true;
    } else {
      dashIdx = candidate.lastIndexOf("-", lastIndex);
    }
    if (dashIdx < 0) {
      break;
    }
    let prefix3 = candidate.slice(0, dashIdx);
    let modifier = candidate.slice(wasSlash ? dashIdx : dashIdx + 1);
    lastIndex = dashIdx - 1;
    if (prefix3 === "" || modifier === "/") {
      continue;
    }
    yield [prefix3, modifier];
  }
}
function applyPrefix(matches, context) {
  if (matches.length === 0 || context.tailwindConfig.prefix === "") {
    return matches;
  }
  for (let match of matches) {
    let [meta] = match;
    if (meta.options.respectPrefix) {
      let container = postcss5.root({ nodes: [match[1].clone()] });
      let classCandidate = match[1].raws.tailwind.classCandidate;
      container.walkRules((r2) => {
        let shouldPrependNegative = classCandidate.startsWith("-");
        r2.selector = prefixSelector_default(
          context.tailwindConfig.prefix,
          r2.selector,
          shouldPrependNegative
        );
      });
      match[1] = container.nodes[0];
    }
  }
  return matches;
}
function applyImportant(matches, classCandidate) {
  if (matches.length === 0) {
    return matches;
  }
  let result = [];
  for (let [meta, rule] of matches) {
    let container = postcss5.root({ nodes: [rule.clone()] });
    container.walkRules((r2) => {
      let ast = selectorParser3().astSync(r2.selector);
      ast.each((sel) => eliminateIrrelevantSelectors(sel, classCandidate));
      updateAllClasses(ast, (className) =>
        className === classCandidate ? `!${className}` : className
      );
      r2.selector = ast.toString();
      r2.walkDecls((d) => (d.important = true));
    });
    result.push([{ ...meta, important: true }, container.nodes[0]]);
  }
  return result;
}
function applyVariant(variant, matches, context) {
  if (matches.length === 0) {
    return matches;
  }
  let args = { modifier: null, value: NONE };
  {
    let [baseVariant, ...modifiers] = splitAtTopLevelOnly(variant, "/");
    if (modifiers.length > 1) {
      baseVariant = baseVariant + "/" + modifiers.slice(0, -1).join("/");
      modifiers = modifiers.slice(-1);
    }
    if (modifiers.length && !context.variantMap.has(variant)) {
      variant = baseVariant;
      args.modifier = modifiers[0];
      if (!flagEnabled(context.tailwindConfig, "generalizedModifiers")) {
        return [];
      }
    }
  }
  if (variant.endsWith("]") && !variant.startsWith("[")) {
    let match = /(.)(-?)\[(.*)\]/g.exec(variant);
    if (match) {
      let [, char, seperator, value2] = match;
      if (char === "@" && seperator === "-") return [];
      if (char !== "@" && seperator === "") return [];
      variant = variant.replace(`${seperator}[${value2}]`, "");
      args.value = value2;
    }
  }
  if (isArbitraryValue2(variant) && !context.variantMap.has(variant)) {
    let selector = normalize(variant.slice(1, -1));
    if (!isValidVariantFormatString(selector)) {
      return [];
    }
    let fn2 = parseVariant(selector);
    let sort = context.offsets.recordVariant(variant);
    context.variantMap.set(variant, [[sort, fn2]]);
  }
  if (context.variantMap.has(variant)) {
    let isArbitraryVariant = isArbitraryValue2(variant);
    let variantFunctionTuples = context.variantMap.get(variant).slice();
    let result = [];
    for (let [meta, rule] of matches) {
      if (meta.layer === "user") {
        continue;
      }
      let container = postcss5.root({ nodes: [rule.clone()] });
      for (let [
        variantSort,
        variantFunction,
        containerFromArray,
      ] of variantFunctionTuples) {
        let prepareBackup = function () {
            if (clone.raws.neededBackup) {
              return;
            }
            clone.raws.neededBackup = true;
            clone.walkRules(
              (rule2) => (rule2.raws.originalSelector = rule2.selector)
            );
          },
          modifySelectors = function (modifierFunction) {
            prepareBackup();
            clone.each((rule2) => {
              if (rule2.type !== "rule") {
                return;
              }
              rule2.selectors = rule2.selectors.map((selector) => {
                return modifierFunction({
                  get className() {
                    return getClassNameFromSelector(selector);
                  },
                  selector,
                });
              });
            });
            return clone;
          };
        let clone = (containerFromArray ?? container).clone();
        let collectedFormats = [];
        let ruleWithVariant = variantFunction({
          // Public API
          get container() {
            prepareBackup();
            return clone;
          },
          separator: context.tailwindConfig.separator,
          modifySelectors,
          // Private API for now
          wrap(wrapper) {
            let nodes = clone.nodes;
            clone.removeAll();
            wrapper.append(nodes);
            clone.append(wrapper);
          },
          format(selectorFormat) {
            collectedFormats.push({
              format: selectorFormat,
              isArbitraryVariant,
            });
          },
          args,
        });
        if (Array.isArray(ruleWithVariant)) {
          for (let [idx, variantFunction2] of ruleWithVariant.entries()) {
            variantFunctionTuples.push([
              context.offsets.applyParallelOffset(variantSort, idx),
              variantFunction2,
              // If the clone has been modified we have to pass that back
              // though so each rule can use the modified container
              clone.clone(),
            ]);
          }
          continue;
        }
        if (typeof ruleWithVariant === "string") {
          collectedFormats.push({
            format: ruleWithVariant,
            isArbitraryVariant,
          });
        }
        if (ruleWithVariant === null) {
          continue;
        }
        if (clone.raws.neededBackup) {
          delete clone.raws.neededBackup;
          clone.walkRules((rule2) => {
            let before = rule2.raws.originalSelector;
            if (!before) return;
            delete rule2.raws.originalSelector;
            if (before === rule2.selector) return;
            let modified = rule2.selector;
            let rebuiltBase = selectorParser3((selectors) => {
              selectors.walkClasses((classNode) => {
                classNode.value = `${variant}${context.tailwindConfig.separator}${classNode.value}`;
              });
            }).processSync(before);
            collectedFormats.push({
              format: modified.replace(rebuiltBase, "&"),
              isArbitraryVariant,
            });
            rule2.selector = before;
          });
        }
        clone.nodes[0].raws.tailwind = {
          ...clone.nodes[0].raws.tailwind,
          parentLayer: meta.layer,
        };
        let withOffset = [
          {
            ...meta,
            sort: context.offsets.applyVariantOffset(
              meta.sort,
              variantSort,
              Object.assign(args, context.variantOptions.get(variant))
            ),
            collectedFormats: (meta.collectedFormats ?? []).concat(
              collectedFormats
            ),
          },
          clone.nodes[0],
        ];
        result.push(withOffset);
      }
    }
    return result;
  }
  return [];
}
function parseRules(rule, cache3, options = {}) {
  if (!isPlainObject(rule) && !Array.isArray(rule)) {
    return [[rule], options];
  }
  if (Array.isArray(rule)) {
    return parseRules(rule[0], cache3, rule[1]);
  }
  if (!cache3.has(rule)) {
    cache3.set(rule, parseObjectStyles(rule));
  }
  return [cache3.get(rule), options];
}
var IS_VALID_PROPERTY_NAME = /^[a-z_-]/;
function isValidPropName(name) {
  return IS_VALID_PROPERTY_NAME.test(name);
}
function looksLikeUri(declaration) {
  if (!declaration.includes("://")) {
    return false;
  }
  try {
    const url2 = new URL(declaration);
    return url2.scheme !== "" && url2.host !== "";
  } catch (err) {
    return false;
  }
}
function isParsableNode(node) {
  let isParsable = true;
  node.walkDecls((decl) => {
    if (!isParsableCssValue(decl.prop, decl.value)) {
      isParsable = false;
      return false;
    }
  });
  return isParsable;
}
function isParsableCssValue(property, value2) {
  if (looksLikeUri(`${property}:${value2}`)) {
    return false;
  }
  try {
    postcss5.parse(`a{${property}:${value2}}`).toResult();
    return true;
  } catch (err) {
    return false;
  }
}
function extractArbitraryProperty(classCandidate, context) {
  let [, property, value2] =
    classCandidate.match(/^\[([a-zA-Z0-9-_]+):(\S+)\]$/) ?? [];
  if (value2 === void 0) {
    return null;
  }
  if (!isValidPropName(property)) {
    return null;
  }
  if (!isSyntacticallyValidPropertyValue(value2)) {
    return null;
  }
  let normalized = normalize(value2);
  if (!isParsableCssValue(property, normalized)) {
    return null;
  }
  let sort = context.offsets.arbitraryProperty();
  return [
    [
      { sort, layer: "utilities" },
      () => ({
        [asClass(classCandidate)]: {
          [property]: normalized,
        },
      }),
    ],
  ];
}
function* resolveMatchedPlugins(classCandidate, context) {
  if (context.candidateRuleMap.has(classCandidate)) {
    yield [context.candidateRuleMap.get(classCandidate), "DEFAULT"];
  }
  yield* (function* (arbitraryPropertyRule) {
    if (arbitraryPropertyRule !== null) {
      yield [arbitraryPropertyRule, "DEFAULT"];
    }
  })(extractArbitraryProperty(classCandidate, context));
  let candidatePrefix = classCandidate;
  let negative = false;
  const twConfigPrefix = context.tailwindConfig.prefix;
  const twConfigPrefixLen = twConfigPrefix.length;
  const hasMatchingPrefix =
    candidatePrefix.startsWith(twConfigPrefix) ||
    candidatePrefix.startsWith(`-${twConfigPrefix}`);
  if (candidatePrefix[twConfigPrefixLen] === "-" && hasMatchingPrefix) {
    negative = true;
    candidatePrefix =
      twConfigPrefix + candidatePrefix.slice(twConfigPrefixLen + 1);
  }
  if (negative && context.candidateRuleMap.has(candidatePrefix)) {
    yield [context.candidateRuleMap.get(candidatePrefix), "-DEFAULT"];
  }
  for (let [prefix3, modifier] of candidatePermutations(candidatePrefix)) {
    if (context.candidateRuleMap.has(prefix3)) {
      yield [
        context.candidateRuleMap.get(prefix3),
        negative ? `-${modifier}` : modifier,
      ];
    }
  }
}
function splitWithSeparator(input, separator) {
  if (input === NOT_ON_DEMAND) {
    return [NOT_ON_DEMAND];
  }
  return splitAtTopLevelOnly(input, separator);
}
function* recordCandidates(matches, classCandidate) {
  for (const match of matches) {
    match[1].raws.tailwind = {
      ...match[1].raws.tailwind,
      classCandidate,
      preserveSource: match[0].options?.preserveSource ?? false,
    };
    yield match;
  }
}
function* resolveMatches(candidate, context, original = candidate) {
  let separator = context.tailwindConfig.separator;
  let [classCandidate, ...variants] = splitWithSeparator(
    candidate,
    separator
  ).reverse();
  let important = false;
  if (classCandidate.startsWith("!")) {
    important = true;
    classCandidate = classCandidate.slice(1);
  }
  if (flagEnabled(context.tailwindConfig, "variantGrouping")) {
    if (classCandidate.startsWith("(") && classCandidate.endsWith(")")) {
      let base = variants.slice().reverse().join(separator);
      for (let part of splitAtTopLevelOnly(classCandidate.slice(1, -1), ",")) {
        yield* resolveMatches(base + separator + part, context, original);
      }
    }
  }
  for (let matchedPlugins of resolveMatchedPlugins(classCandidate, context)) {
    let matches = [];
    let typesByMatches = /* @__PURE__ */ new Map();
    let [plugins, modifier] = matchedPlugins;
    let isOnlyPlugin = plugins.length === 1;
    for (let [sort, plugin] of plugins) {
      let matchesPerPlugin = [];
      if (typeof plugin === "function") {
        for (let ruleSet of [].concat(plugin(modifier, { isOnlyPlugin }))) {
          let [rules, options] = parseRules(ruleSet, context.postCssNodeCache);
          for (let rule of rules) {
            matchesPerPlugin.push([
              { ...sort, options: { ...sort.options, ...options } },
              rule,
            ]);
          }
        }
      } else if (modifier === "DEFAULT" || modifier === "-DEFAULT") {
        let ruleSet = plugin;
        let [rules, options] = parseRules(ruleSet, context.postCssNodeCache);
        for (let rule of rules) {
          matchesPerPlugin.push([
            { ...sort, options: { ...sort.options, ...options } },
            rule,
          ]);
        }
      }
      if (matchesPerPlugin.length > 0) {
        let matchingTypes = Array.from(
          getMatchingTypes(
            sort.options?.types ?? [],
            modifier,
            sort.options ?? {},
            context.tailwindConfig
          )
        ).map(([_, type]) => type);
        if (matchingTypes.length > 0) {
          typesByMatches.set(matchesPerPlugin, matchingTypes);
        }
        matches.push(matchesPerPlugin);
      }
    }
    if (isArbitraryValue2(modifier)) {
      if (matches.length > 1) {
        let findFallback = function (matches2) {
          if (matches2.length === 1) {
            return matches2[0];
          }
          return matches2.find((rules) => {
            let matchingTypes = typesByMatches.get(rules);
            return rules.some(([{ options }, rule]) => {
              if (!isParsableNode(rule)) {
                return false;
              }
              return options.types.some(
                ({ type, preferOnConflict }) =>
                  matchingTypes.includes(type) && preferOnConflict
              );
            });
          });
        };
        let [withAny, withoutAny] = matches.reduce(
          (group, plugin) => {
            let hasAnyType = plugin.some(([{ options }]) =>
              options.types.some(({ type }) => type === "any")
            );
            if (hasAnyType) {
              group[0].push(plugin);
            } else {
              group[1].push(plugin);
            }
            return group;
          },
          [[], []]
        );
        let fallback = findFallback(withoutAny) ?? findFallback(withAny);
        if (fallback) {
          matches = [fallback];
        } else {
          let typesPerPlugin = matches.map(
            (match) =>
              /* @__PURE__ */ new Set([...(typesByMatches.get(match) ?? [])])
          );
          for (let pluginTypes of typesPerPlugin) {
            for (let type of pluginTypes) {
              let removeFromOwnGroup = false;
              for (let otherGroup of typesPerPlugin) {
                if (pluginTypes === otherGroup) continue;
                if (otherGroup.has(type)) {
                  otherGroup.delete(type);
                  removeFromOwnGroup = true;
                }
              }
              if (removeFromOwnGroup) pluginTypes.delete(type);
            }
          }
          let messages = [];
          for (let [idx, group] of typesPerPlugin.entries()) {
            for (let type of group) {
              let rules = matches[idx]
                .map(([, rule]) => rule)
                .flat()
                .map((rule) =>
                  rule
                    .toString()
                    .split("\n")
                    .slice(1, -1)
                    .map((line) => line.trim())
                    .map((x) => `      ${x}`)
                    .join("\n")
                )
                .join("\n\n");
              messages.push(
                `  Use \`${candidate.replace(
                  "[",
                  `[${type}:`
                )}\` for \`${rules.trim()}\``
              );
              break;
            }
          }
          log_default.warn([
            `The class \`${candidate}\` is ambiguous and matches multiple utilities.`,
            ...messages,
            `If this is content and not a class, replace it with \`${candidate
              .replace("[", "&lsqb;")
              .replace("]", "&rsqb;")}\` to silence this warning.`,
          ]);
          continue;
        }
      }
      matches = matches.map((list2) =>
        list2.filter((match) => isParsableNode(match[1]))
      );
    }
    matches = matches.flat();
    matches = Array.from(recordCandidates(matches, classCandidate));
    matches = applyPrefix(matches, context);
    if (important) {
      matches = applyImportant(matches, classCandidate);
    }
    for (let variant of variants) {
      matches = applyVariant(variant, matches, context);
    }
    for (let match of matches) {
      match[1].raws.tailwind = { ...match[1].raws.tailwind, candidate };
      match = applyFinalFormat(match, { context, candidate, original });
      if (match === null) {
        continue;
      }
      yield match;
    }
  }
}
function applyFinalFormat(match, { context, candidate, original }) {
  if (!match[0].collectedFormats) {
    return match;
  }
  let isValid = true;
  let finalFormat;
  try {
    finalFormat = formatVariantSelector(match[0].collectedFormats, {
      context,
      candidate,
    });
  } catch {
    return null;
  }
  let container = postcss5.root({ nodes: [match[1].clone()] });
  container.walkRules((rule) => {
    if (inKeyframes(rule)) {
      return;
    }
    try {
      rule.selector = finalizeSelector(rule.selector, finalFormat, {
        candidate: original,
        context,
      });
    } catch {
      isValid = false;
      return false;
    }
  });
  if (!isValid) {
    return null;
  }
  match[1] = container.nodes[0];
  return match;
}
function inKeyframes(rule) {
  return (
    rule.parent &&
    rule.parent.type === "atrule" &&
    rule.parent.name === "keyframes"
  );
}
function getImportantStrategy(important) {
  if (important === true) {
    return (rule) => {
      if (inKeyframes(rule)) {
        return;
      }
      rule.walkDecls((d) => {
        if (d.parent.type === "rule" && !inKeyframes(d.parent)) {
          d.important = true;
        }
      });
    };
  }
  if (typeof important === "string") {
    return (rule) => {
      if (inKeyframes(rule)) {
        return;
      }
      rule.selectors = rule.selectors.map((selector) => {
        return `${important} ${selector}`;
      });
    };
  }
}
function generateRules(candidates, context) {
  let allRules = [];
  let strategy = getImportantStrategy(context.tailwindConfig.important);
  for (let candidate of candidates) {
    if (context.notClassCache.has(candidate)) {
      continue;
    }
    if (context.candidateRuleCache.has(candidate)) {
      allRules = allRules.concat(
        Array.from(context.candidateRuleCache.get(candidate))
      );
      continue;
    }
    let matches = Array.from(resolveMatches(candidate, context));
    if (matches.length === 0) {
      context.notClassCache.add(candidate);
      continue;
    }
    context.classCache.set(candidate, matches);
    let rules =
      context.candidateRuleCache.get(candidate) ?? /* @__PURE__ */ new Set();
    context.candidateRuleCache.set(candidate, rules);
    for (const match of matches) {
      let [{ sort, options }, rule] = match;
      if (options.respectImportant && strategy) {
        let container = postcss5.root({ nodes: [rule.clone()] });
        container.walkRules(strategy);
        rule = container.nodes[0];
      }
      let newEntry = [sort, rule];
      rules.add(newEntry);
      context.ruleCache.add(newEntry);
      allRules.push(newEntry);
    }
  }
  return allRules;
}
function isArbitraryValue2(input) {
  return input.startsWith("[") && input.endsWith("]");
}

// node_modules/tailwindcss/src/lib/expandApplyAtRules.js
function extractClasses(node) {
  let groups = /* @__PURE__ */ new Map();
  let container = postcss6.root({ nodes: [node.clone()] });
  container.walkRules((rule) => {
    parser3((selectors) => {
      selectors.walkClasses((classSelector) => {
        let parentSelector = classSelector.parent.toString();
        let classes2 = groups.get(parentSelector);
        if (!classes2) {
          groups.set(parentSelector, (classes2 = /* @__PURE__ */ new Set()));
        }
        classes2.add(classSelector.value);
      });
    }).processSync(rule.selector);
  });
  let normalizedGroups = Array.from(groups.values(), (classes2) =>
    Array.from(classes2)
  );
  let classes = normalizedGroups.flat();
  return Object.assign(classes, { groups: normalizedGroups });
}
var selectorExtractor = parser3();
function extractSelectors(ruleSelectors) {
  return selectorExtractor.astSync(ruleSelectors);
}
function extractBaseCandidates(candidates, separator) {
  let baseClasses = /* @__PURE__ */ new Set();
  for (let candidate of candidates) {
    baseClasses.add(candidate.split(separator).pop());
  }
  return Array.from(baseClasses);
}
function prefix2(context, selector) {
  let prefix3 = context.tailwindConfig.prefix;
  return typeof prefix3 === "function" ? prefix3(selector) : prefix3 + selector;
}
function* pathToRoot(node) {
  yield node;
  while (node.parent) {
    yield node.parent;
    node = node.parent;
  }
}
function shallowClone(node, overrides = {}) {
  let children = node.nodes;
  node.nodes = [];
  let tmp = node.clone(overrides);
  node.nodes = children;
  return tmp;
}
function nestedClone(node) {
  for (let parent of pathToRoot(node)) {
    if (node === parent) {
      continue;
    }
    if (parent.type === "root") {
      break;
    }
    node = shallowClone(parent, {
      nodes: [node],
    });
  }
  return node;
}
function buildLocalApplyCache(root, context) {
  let cache3 = /* @__PURE__ */ new Map();
  root.walkRules((rule) => {
    for (let node of pathToRoot(rule)) {
      if (node.raws.tailwind?.layer !== void 0) {
        return;
      }
    }
    let container = nestedClone(rule);
    let sort = context.offsets.create("user");
    for (let className of extractClasses(rule)) {
      let list2 = cache3.get(className) || [];
      cache3.set(className, list2);
      list2.push([
        {
          layer: "user",
          sort,
          important: false,
        },
        container,
      ]);
    }
  });
  return cache3;
}
function buildApplyCache(applyCandidates, context) {
  for (let candidate of applyCandidates) {
    if (
      context.notClassCache.has(candidate) ||
      context.applyClassCache.has(candidate)
    ) {
      continue;
    }
    if (context.classCache.has(candidate)) {
      context.applyClassCache.set(
        candidate,
        context.classCache
          .get(candidate)
          .map(([meta, rule]) => [meta, rule.clone()])
      );
      continue;
    }
    let matches = Array.from(resolveMatches(candidate, context));
    if (matches.length === 0) {
      context.notClassCache.add(candidate);
      continue;
    }
    context.applyClassCache.set(candidate, matches);
  }
  return context.applyClassCache;
}
function lazyCache(buildCacheFn) {
  let cache3 = null;
  return {
    get: (name) => {
      cache3 = cache3 || buildCacheFn();
      return cache3.get(name);
    },
    has: (name) => {
      cache3 = cache3 || buildCacheFn();
      return cache3.has(name);
    },
  };
}
function combineCaches(caches) {
  return {
    get: (name) => caches.flatMap((cache3) => cache3.get(name) || []),
    has: (name) => caches.some((cache3) => cache3.has(name)),
  };
}
function extractApplyCandidates(params) {
  let candidates = params.split(/[\s\t\n]+/g);
  if (candidates[candidates.length - 1] === "!important") {
    return [candidates.slice(0, -1), true];
  }
  return [candidates, false];
}
function processApply(root, context, localCache) {
  let applyCandidates = /* @__PURE__ */ new Set();
  let applies = [];
  root.walkAtRules("apply", (rule) => {
    let [candidates] = extractApplyCandidates(rule.params);
    for (let util of candidates) {
      applyCandidates.add(util);
    }
    applies.push(rule);
  });
  if (applies.length === 0) {
    return;
  }
  let applyClassCache = combineCaches([
    localCache,
    buildApplyCache(applyCandidates, context),
  ]);
  function replaceSelector(selector, utilitySelectors, candidate) {
    let selectorList = extractSelectors(selector);
    let utilitySelectorsList = extractSelectors(utilitySelectors);
    let candidateList = extractSelectors(`.${escapeClassName(candidate)}`);
    let candidateClass = candidateList.nodes[0].nodes[0];
    selectorList.each((sel) => {
      let replaced = /* @__PURE__ */ new Set();
      utilitySelectorsList.each((utilitySelector) => {
        let hasReplaced = false;
        utilitySelector = utilitySelector.clone();
        utilitySelector.walkClasses((node) => {
          if (node.value !== candidateClass.value) {
            return;
          }
          if (hasReplaced) {
            return;
          }
          node.replaceWith(...sel.nodes.map((node2) => node2.clone()));
          replaced.add(utilitySelector);
          hasReplaced = true;
        });
      });
      for (let sel2 of replaced) {
        let groups = [[]];
        for (let node of sel2.nodes) {
          if (node.type === "combinator") {
            groups.push(node);
            groups.push([]);
          } else {
            let last = groups[groups.length - 1];
            last.push(node);
          }
        }
        sel2.nodes = [];
        for (let group of groups) {
          if (Array.isArray(group)) {
            group.sort((a, b) => {
              if (a.type === "tag" && b.type === "class") {
                return -1;
              } else if (a.type === "class" && b.type === "tag") {
                return 1;
              } else if (
                a.type === "class" &&
                b.type === "pseudo" &&
                b.value.startsWith("::")
              ) {
                return -1;
              } else if (
                a.type === "pseudo" &&
                a.value.startsWith("::") &&
                b.type === "class"
              ) {
                return 1;
              }
              return 0;
            });
          }
          sel2.nodes = sel2.nodes.concat(group);
        }
      }
      sel.replaceWith(...replaced);
    });
    return selectorList.toString();
  }
  let perParentApplies = /* @__PURE__ */ new Map();
  for (let apply of applies) {
    let [candidates] = perParentApplies.get(apply.parent) || [[], apply.source];
    perParentApplies.set(apply.parent, [candidates, apply.source]);
    let [applyCandidates2, important] = extractApplyCandidates(apply.params);
    if (apply.parent.type === "atrule") {
      if (apply.parent.name === "screen") {
        let screenType = apply.parent.params;
        throw apply.error(
          `@apply is not supported within nested at-rules like @screen. We suggest you write this as @apply ${applyCandidates2
            .map((c4) => `${screenType}:${c4}`)
            .join(" ")} instead.`
        );
      }
      throw apply.error(
        `@apply is not supported within nested at-rules like @${apply.parent.name}. You can fix this by un-nesting @${apply.parent.name}.`
      );
    }
    for (let applyCandidate of applyCandidates2) {
      if (
        [prefix2(context, "group"), prefix2(context, "peer")].includes(
          applyCandidate
        )
      ) {
        throw apply.error(
          `@apply should not be used with the '${applyCandidate}' utility`
        );
      }
      if (!applyClassCache.has(applyCandidate)) {
        throw apply.error(
          `The \`${applyCandidate}\` class does not exist. If \`${applyCandidate}\` is a custom class, make sure it is defined within a \`@layer\` directive.`
        );
      }
      let rules = applyClassCache.get(applyCandidate);
      candidates.push([applyCandidate, important, rules]);
    }
  }
  for (let [parent, [candidates, atApplySource]] of perParentApplies) {
    let siblings = [];
    for (let [applyCandidate, important, rules] of candidates) {
      let potentialApplyCandidates = [
        applyCandidate,
        ...extractBaseCandidates(
          [applyCandidate],
          context.tailwindConfig.separator
        ),
      ];
      for (let [meta, node] of rules) {
        let parentClasses = extractClasses(parent);
        let nodeClasses = extractClasses(node);
        nodeClasses = nodeClasses.groups
          .filter((classList) =>
            classList.some((className) =>
              potentialApplyCandidates.includes(className)
            )
          )
          .flat();
        nodeClasses = nodeClasses.concat(
          extractBaseCandidates(nodeClasses, context.tailwindConfig.separator)
        );
        let intersects = parentClasses.some((selector) =>
          nodeClasses.includes(selector)
        );
        if (intersects) {
          throw node.error(
            `You cannot \`@apply\` the \`${applyCandidate}\` utility here because it creates a circular dependency.`
          );
        }
        let root2 = postcss6.root({ nodes: [node.clone()] });
        root2.walk((node2) => {
          node2.source = atApplySource;
        });
        let canRewriteSelector =
          node.type !== "atrule" ||
          (node.type === "atrule" && node.name !== "keyframes");
        if (canRewriteSelector) {
          root2.walkRules((rule) => {
            if (
              !extractClasses(rule).some(
                (candidate) => candidate === applyCandidate
              )
            ) {
              rule.remove();
              return;
            }
            let importantSelector =
              typeof context.tailwindConfig.important === "string"
                ? context.tailwindConfig.important
                : null;
            let isGenerated = parent.raws.tailwind !== void 0;
            let parentSelector =
              isGenerated &&
              importantSelector &&
              parent.selector.indexOf(importantSelector) === 0
                ? parent.selector.slice(importantSelector.length)
                : parent.selector;
            rule.selector = replaceSelector(
              parentSelector,
              rule.selector,
              applyCandidate
            );
            if (importantSelector && parentSelector !== parent.selector) {
              rule.selector = `${importantSelector} ${rule.selector}`;
            }
            rule.walkDecls((d) => {
              d.important = meta.important || important;
            });
          });
        }
        if (!root2.nodes[0]) {
          continue;
        }
        siblings.push([meta.sort, root2.nodes[0]]);
      }
    }
    let nodes = context.offsets.sort(siblings).map((s2) => s2[1]);
    parent.after(nodes);
  }
  for (let apply of applies) {
    if (apply.parent.nodes.length > 1) {
      apply.remove();
    } else {
      apply.parent.remove();
    }
  }
  processApply(root, context, localCache);
}
function expandApplyAtRules(context) {
  return (root) => {
    let localCache = lazyCache(() => buildLocalApplyCache(root, context));
    processApply(root, context, localCache);
  };
}

// node_modules/tailwindcss/src/lib/normalizeTailwindDirectives.js
function normalizeTailwindDirectives(root) {
  let tailwindDirectives = /* @__PURE__ */ new Set();
  let layerDirectives = /* @__PURE__ */ new Set();
  let applyDirectives = /* @__PURE__ */ new Set();
  root.walkAtRules((atRule) => {
    if (atRule.name === "apply") {
      applyDirectives.add(atRule);
    }
    if (atRule.name === "import") {
      if (
        atRule.params === '"tailwindcss/base"' ||
        atRule.params === "'tailwindcss/base'"
      ) {
        atRule.name = "tailwind";
        atRule.params = "base";
      } else if (
        atRule.params === '"tailwindcss/components"' ||
        atRule.params === "'tailwindcss/components'"
      ) {
        atRule.name = "tailwind";
        atRule.params = "components";
      } else if (
        atRule.params === '"tailwindcss/utilities"' ||
        atRule.params === "'tailwindcss/utilities'"
      ) {
        atRule.name = "tailwind";
        atRule.params = "utilities";
      } else if (
        atRule.params === '"tailwindcss/screens"' ||
        atRule.params === "'tailwindcss/screens'" ||
        atRule.params === '"tailwindcss/variants"' ||
        atRule.params === "'tailwindcss/variants'"
      ) {
        atRule.name = "tailwind";
        atRule.params = "variants";
      }
    }
    if (atRule.name === "tailwind") {
      if (atRule.params === "screens") {
        atRule.params = "variants";
      }
      tailwindDirectives.add(atRule.params);
    }
    if (["layer", "responsive", "variants"].includes(atRule.name)) {
      if (["responsive", "variants"].includes(atRule.name)) {
        log_default.warn(`${atRule.name}-at-rule-deprecated`, [
          `The \`@${atRule.name}\` directive has been deprecated in Tailwind CSS v3.0.`,
          `Use \`@layer utilities\` or \`@layer components\` instead.`,
          "https://tailwindcss.com/docs/upgrade-guide#replace-variants-with-layer",
        ]);
      }
      layerDirectives.add(atRule);
    }
  });
  if (
    !tailwindDirectives.has("base") ||
    !tailwindDirectives.has("components") ||
    !tailwindDirectives.has("utilities")
  ) {
    for (let rule of layerDirectives) {
      if (
        rule.name === "layer" &&
        ["base", "components", "utilities"].includes(rule.params)
      ) {
        if (!tailwindDirectives.has(rule.params)) {
          throw rule.error(
            `\`@layer ${rule.params}\` is used but no matching \`@tailwind ${rule.params}\` directive is present.`
          );
        }
      } else if (rule.name === "responsive") {
        if (!tailwindDirectives.has("utilities")) {
          throw rule.error(
            "`@responsive` is used but `@tailwind utilities` is missing."
          );
        }
      } else if (rule.name === "variants") {
        if (!tailwindDirectives.has("utilities")) {
          throw rule.error(
            "`@variants` is used but `@tailwind utilities` is missing."
          );
        }
      }
    }
  }
  return { tailwindDirectives, applyDirectives };
}

// node_modules/tailwindcss/src/lib/expandTailwindAtRules.js
import LRU from "quick-lru";

// node_modules/tailwindcss/src/util/cloneNodes.js
function cloneNodes(nodes, source = void 0, raws = void 0) {
  return nodes.map((node) => {
    let cloned = node.clone();
    let shouldOverwriteSource =
      node.raws.tailwind?.preserveSource !== true || !cloned.source;
    if (source !== void 0 && shouldOverwriteSource) {
      cloned.source = source;
      if ("walk" in cloned) {
        cloned.walk((child) => {
          child.source = source;
        });
      }
    }
    if (raws !== void 0) {
      cloned.raws.tailwind = {
        ...cloned.raws.tailwind,
        ...raws,
      };
    }
    return cloned;
  });
}

// node_modules/tailwindcss/src/lib/regex.js
var REGEX_SPECIAL = /[\\^$.*+?()[\]{}|]/g;
var REGEX_HAS_SPECIAL = RegExp(REGEX_SPECIAL.source);
function toSource(source) {
  source = Array.isArray(source) ? source : [source];
  source = source.map((item) => (item instanceof RegExp ? item.source : item));
  return source.join("");
}
function pattern(source) {
  return new RegExp(toSource(source), "g");
}
function any(sources) {
  return `(?:${sources.map(toSource).join("|")})`;
}
function optional(source) {
  return `(?:${toSource(source)})?`;
}
function zeroOrMore(source) {
  return `(?:${toSource(source)})*`;
}
function escape(string) {
  return string && REGEX_HAS_SPECIAL.test(string)
    ? string.replace(REGEX_SPECIAL, "\\$&")
    : string || "";
}

// node_modules/tailwindcss/src/lib/defaultExtractor.js
function defaultExtractor(context) {
  let patterns = Array.from(buildRegExps(context));
  return (content) => {
    let results = [];
    for (let pattern2 of patterns) {
      results = [...results, ...(content.match(pattern2) ?? [])];
    }
    return results.filter((v) => v !== void 0).map(clipAtBalancedParens);
  };
}
function* buildRegExps(context) {
  let separator = context.tailwindConfig.separator;
  let variantGroupingEnabled = flagEnabled(
    context.tailwindConfig,
    "variantGrouping"
  );
  let prefix3 =
    context.tailwindConfig.prefix !== ""
      ? optional(pattern([/-?/, escape(context.tailwindConfig.prefix)]))
      : "";
  let utility = any([
    // Arbitrary properties (without square brackets)
    /\[[^\s:'"`]+:[^\s\[\]]+\]/,
    // Arbitrary properties with balanced square brackets
    // This is a targeted fix to continue to allow theme()
    // with square brackets to work in arbitrary properties
    // while fixing a problem with the regex matching too much
    /\[[^\s:'"`]+:[^\s]+?\[[^\s]+?\][^\s]+?\]/,
    // Utilities
    pattern([
      // Utility Name / Group Name
      /-?(?:\w+)/,
      // Normal/Arbitrary values
      optional(
        any([
          pattern([
            // Arbitrary values
            /-(?:\w+-)*\[[^\s:]+\]/,
            // Not immediately followed by an `{[(`
            /(?![{([]])/,
            // optionally followed by an opacity modifier
            /(?:\/[^\s'"`\\><$]*)?/,
          ]),
          pattern([
            // Arbitrary values
            /-(?:\w+-)*\[[^\s]+\]/,
            // Not immediately followed by an `{[(`
            /(?![{([]])/,
            // optionally followed by an opacity modifier
            /(?:\/[^\s'"`\\$]*)?/,
          ]),
          // Normal values w/o quotes — may include an opacity modifier
          /[-\/][^\s'"`\\$={><]*/,
        ])
      ),
    ]),
  ]);
  let variantPatterns = [
    // Without quotes
    any([
      // This is here to provide special support for the `@` variant
      pattern([/@\[[^\s"'`]+\](\/[^\s"'`]+)?/, separator]),
      pattern([/([^\s"'`\[\\]+-)?\[[^\s"'`]+\]/, separator]),
      pattern([/[^\s"'`\[\\]+/, separator]),
    ]),
    // With quotes allowed
    any([
      pattern([/([^\s"'`\[\\]+-)?\[[^\s`]+\]/, separator]),
      pattern([/[^\s`\[\\]+/, separator]),
    ]),
  ];
  for (const variantPattern of variantPatterns) {
    yield pattern([
      // Variants
      "((?=((",
      variantPattern,
      ")+))\\2)?",
      // Important (optional)
      /!?/,
      prefix3,
      variantGroupingEnabled
        ? any([
            // Or any of those things but grouped separated by commas
            pattern([/\(/, utility, zeroOrMore([/,/, utility]), /\)/]),
            // Arbitrary properties, constrained utilities, arbitrary values, etc…
            utility,
          ])
        : utility,
    ]);
  }
  yield /[^<>"'`\s.(){}[\]#=%$]*[^<>"'`\s.(){}[\]#=%:$]/g;
}
var SPECIALS = /([\[\]'"`])([^\[\]'"`])?/g;
var ALLOWED_CLASS_CHARACTERS = /[^"'`\s<>\]]+/;
function clipAtBalancedParens(input) {
  if (!input.includes("-[")) {
    return input;
  }
  let depth = 0;
  let openStringTypes = [];
  let matches = input.matchAll(SPECIALS);
  matches = Array.from(matches).flatMap((match) => {
    const [, ...groups] = match;
    return groups.map((group, idx) =>
      Object.assign([], match, {
        index: match.index + idx,
        0: group,
      })
    );
  });
  for (let match of matches) {
    let char = match[0];
    let inStringType = openStringTypes[openStringTypes.length - 1];
    if (char === inStringType) {
      openStringTypes.pop();
    } else if (char === "'" || char === '"' || char === "`") {
      openStringTypes.push(char);
    }
    if (inStringType) {
      continue;
    } else if (char === "[") {
      depth++;
      continue;
    } else if (char === "]") {
      depth--;
      continue;
    }
    if (depth < 0) {
      return input.substring(0, match.index - 1);
    }
    if (depth === 0 && !ALLOWED_CLASS_CHARACTERS.test(char)) {
      return input.substring(0, match.index);
    }
  }
  return input;
}

// node_modules/tailwindcss/src/lib/expandTailwindAtRules.js
var builtInExtractors = {
  DEFAULT: defaultExtractor,
};
var builtInTransformers = {
  DEFAULT: (content) => content,
  svelte: (content) => content.replace(/(?:^|\s)class:/g, " "),
};
function getExtractor(context, fileExtension) {
  let extractors = context.tailwindConfig.content.extract;
  return (
    extractors[fileExtension] ||
    extractors.DEFAULT ||
    builtInExtractors[fileExtension] ||
    builtInExtractors.DEFAULT(context)
  );
}
function getTransformer(tailwindConfig, fileExtension) {
  let transformers = tailwindConfig.content.transform;
  return (
    transformers[fileExtension] ||
    transformers.DEFAULT ||
    builtInTransformers[fileExtension] ||
    builtInTransformers.DEFAULT
  );
}
var extractorCache = /* @__PURE__ */ new WeakMap();
function getClassCandidates(content, extractor, candidates, seen) {
  if (!extractorCache.has(extractor)) {
    extractorCache.set(extractor, new LRU({ maxSize: 25e3 }));
  }
  for (let line of content.split("\n")) {
    line = line.trim();
    if (seen.has(line)) {
      continue;
    }
    seen.add(line);
    if (extractorCache.get(extractor).has(line)) {
      for (let match of extractorCache.get(extractor).get(line)) {
        candidates.add(match);
      }
    } else {
      let extractorMatches = extractor(line).filter((s2) => s2 !== "!*");
      let lineMatchesSet = new Set(extractorMatches);
      for (let match of lineMatchesSet) {
        candidates.add(match);
      }
      extractorCache.get(extractor).set(line, lineMatchesSet);
    }
  }
}
function buildStylesheet(rules, context) {
  let sortedRules = context.offsets.sort(rules);
  let returnValue = {
    base: /* @__PURE__ */ new Set(),
    defaults: /* @__PURE__ */ new Set(),
    components: /* @__PURE__ */ new Set(),
    utilities: /* @__PURE__ */ new Set(),
    variants: /* @__PURE__ */ new Set(),
  };
  for (let [sort, rule] of sortedRules) {
    returnValue[sort.layer].add(rule);
  }
  return returnValue;
}
function expandTailwindAtRules(context) {
  return (root) => {
    let layerNodes = {
      base: null,
      components: null,
      utilities: null,
      variants: null,
    };
    root.walkAtRules((rule) => {
      if (rule.name === "tailwind") {
        if (Object.keys(layerNodes).includes(rule.params)) {
          layerNodes[rule.params] = rule;
        }
      }
    });
    if (Object.values(layerNodes).every((n2) => n2 === null)) {
      return root;
    }
    let candidates = /* @__PURE__ */ new Set([
      ...(context.candidates ?? []),
      NOT_ON_DEMAND,
    ]);
    let seen = /* @__PURE__ */ new Set();
    if (void 0) {
      for (let candidate of null.parseCandidateStringsFromFiles(
        context.changedContent
        // Object.assign({}, builtInTransformers, context.tailwindConfig.content.transform)
      )) {
        candidates.add(candidate);
      }
    } else {
      for (let { file, content, extension } of context.changedContent) {
        let transformer = getTransformer(context.tailwindConfig, extension);
        let extractor = getExtractor(context, extension);
        content = file ? fs_default.readFileSync(file, "utf8") : content;
        getClassCandidates(transformer(content), extractor, candidates, seen);
      }
    }
    let classCacheCount = context.classCache.size;
    let sortedCandidates = void 0
      ? candidates
      : new Set(
          [...candidates].sort((a, z) => {
            if (a === z) return 0;
            if (a < z) return -1;
            return 1;
          })
        );
    generateRules(sortedCandidates, context);
    if (
      context.stylesheetCache === null ||
      context.classCache.size !== classCacheCount
    ) {
      context.stylesheetCache = buildStylesheet(
        [...context.ruleCache],
        context
      );
    }
    let {
      defaults: defaultNodes,
      base: baseNodes,
      components: componentNodes,
      utilities: utilityNodes,
      variants: screenNodes,
    } = context.stylesheetCache;
    if (layerNodes.base) {
      layerNodes.base.before(
        cloneNodes([...baseNodes, ...defaultNodes], layerNodes.base.source, {
          layer: "base",
        })
      );
      layerNodes.base.remove();
    }
    if (layerNodes.components) {
      layerNodes.components.before(
        cloneNodes([...componentNodes], layerNodes.components.source, {
          layer: "components",
        })
      );
      layerNodes.components.remove();
    }
    if (layerNodes.utilities) {
      layerNodes.utilities.before(
        cloneNodes([...utilityNodes], layerNodes.utilities.source, {
          layer: "utilities",
        })
      );
      layerNodes.utilities.remove();
    }
    const variantNodes = Array.from(screenNodes).filter((node) => {
      const parentLayer = node.raws.tailwind?.parentLayer;
      if (parentLayer === "components") {
        return layerNodes.components !== null;
      }
      if (parentLayer === "utilities") {
        return layerNodes.utilities !== null;
      }
      return true;
    });
    if (layerNodes.variants) {
      layerNodes.variants.before(
        cloneNodes(variantNodes, layerNodes.variants.source, {
          layer: "variants",
        })
      );
      layerNodes.variants.remove();
    } else if (variantNodes.length > 0) {
      root.append(
        cloneNodes(variantNodes, root.source, {
          layer: "variants",
        })
      );
    }
    const hasUtilityVariants = variantNodes.some(
      (node) => node.raws.tailwind?.parentLayer === "utilities"
    );
    if (
      layerNodes.utilities &&
      utilityNodes.size === 0 &&
      !hasUtilityVariants
    ) {
      log_default.warn("content-problems", [
        "No utility classes were detected in your source files. If this is unexpected, double-check the `content` option in your Tailwind CSS configuration.",
        "https://tailwindcss.com/docs/content-configuration",
      ]);
    }
    if (void 0) {
      console.log("Potential classes: ", candidates.size);
      console.log("Active contexts: ", contextSourcesMap.size);
    }
    context.changedContent = [];
    root.walkAtRules("layer", (rule) => {
      if (Object.keys(layerNodes).includes(rule.params)) {
        rule.remove();
      }
    });
  };
}

// node_modules/tailwindcss/src/lib/evaluateTailwindFunctions.js
import dlv2 from "dlv";
import didYouMean from "didyoumean";
import parseValue from "postcss-value-parser";
function isObject(input) {
  return typeof input === "object" && input !== null;
}
function findClosestExistingPath(theme, path) {
  let parts = toPath(path);
  do {
    parts.pop();
    if (dlv2(theme, parts) !== void 0) break;
  } while (parts.length);
  return parts.length ? parts : void 0;
}
function pathToString(path) {
  if (typeof path === "string") return path;
  return path.reduce((acc, cur, i) => {
    if (cur.includes(".")) return `${acc}[${cur}]`;
    return i === 0 ? cur : `${acc}.${cur}`;
  }, "");
}
function list(items) {
  return items.map((key) => `'${key}'`).join(", ");
}
function listKeys(obj) {
  return list(Object.keys(obj));
}
function validatePath(config, path, defaultValue, themeOpts = {}) {
  const pathString = Array.isArray(path)
    ? pathToString(path)
    : path.replace(/^['"]+|['"]+$/g, "");
  const pathSegments = Array.isArray(path) ? path : toPath(pathString);
  const value2 = dlv2(config.theme, pathSegments, defaultValue);
  if (value2 === void 0) {
    let error = `'${pathString}' does not exist in your theme config.`;
    const parentSegments = pathSegments.slice(0, -1);
    const parentValue = dlv2(config.theme, parentSegments);
    if (isObject(parentValue)) {
      const validKeys = Object.keys(parentValue).filter(
        (key) => validatePath(config, [...parentSegments, key]).isValid
      );
      const suggestion = didYouMean(
        pathSegments[pathSegments.length - 1],
        validKeys
      );
      if (suggestion) {
        error += ` Did you mean '${pathToString([
          ...parentSegments,
          suggestion,
        ])}'?`;
      } else if (validKeys.length > 0) {
        error += ` '${pathToString(
          parentSegments
        )}' has the following valid keys: ${list(validKeys)}`;
      }
    } else {
      const closestPath = findClosestExistingPath(config.theme, pathString);
      if (closestPath) {
        const closestValue = dlv2(config.theme, closestPath);
        if (isObject(closestValue)) {
          error += ` '${pathToString(
            closestPath
          )}' has the following keys: ${listKeys(closestValue)}`;
        } else {
          error += ` '${pathToString(closestPath)}' is not an object.`;
        }
      } else {
        error += ` Your theme has the following top-level keys: ${listKeys(
          config.theme
        )}`;
      }
    }
    return {
      isValid: false,
      error,
    };
  }
  if (
    !(
      typeof value2 === "string" ||
      typeof value2 === "number" ||
      typeof value2 === "function" ||
      value2 instanceof String ||
      value2 instanceof Number ||
      Array.isArray(value2)
    )
  ) {
    let error = `'${pathString}' was found but does not resolve to a string.`;
    if (isObject(value2)) {
      let validKeys = Object.keys(value2).filter(
        (key) => validatePath(config, [...pathSegments, key]).isValid
      );
      if (validKeys.length) {
        error += ` Did you mean something like '${pathToString([
          ...pathSegments,
          validKeys[0],
        ])}'?`;
      }
    }
    return {
      isValid: false,
      error,
    };
  }
  const [themeSection] = pathSegments;
  return {
    isValid: true,
    value: transformThemeValue(themeSection)(value2, themeOpts),
  };
}
function extractArgs(node, vNodes, functions) {
  vNodes = vNodes.map((vNode) => resolveVNode(node, vNode, functions));
  let args = [""];
  for (let vNode of vNodes) {
    if (vNode.type === "div" && vNode.value === ",") {
      args.push("");
    } else {
      args[args.length - 1] += parseValue.stringify(vNode);
    }
  }
  return args;
}
function resolveVNode(node, vNode, functions) {
  if (vNode.type === "function" && functions[vNode.value] !== void 0) {
    let args = extractArgs(node, vNode.nodes, functions);
    vNode.type = "word";
    vNode.value = functions[vNode.value](node, ...args);
  }
  return vNode;
}
function resolveFunctions(node, input, functions) {
  return parseValue(input)
    .walk((vNode) => {
      resolveVNode(node, vNode, functions);
    })
    .toString();
}
var nodeTypePropertyMap = {
  atrule: "params",
  decl: "value",
};
function* toPaths(path) {
  path = path.replace(/^['"]+|['"]+$/g, "");
  let matches = path.match(/^([^\s]+)(?![^\[]*\])(?:\s*\/\s*([^\/\s]+))$/);
  let alpha = void 0;
  yield [path, void 0];
  if (matches) {
    path = matches[1];
    alpha = matches[2];
    yield [path, alpha];
  }
}
function resolvePath(config, path, defaultValue) {
  const results = Array.from(toPaths(path)).map(([path2, alpha]) => {
    return Object.assign(
      validatePath(config, path2, defaultValue, { opacityValue: alpha }),
      {
        resolvedPath: path2,
        alpha,
      }
    );
  });
  return results.find((result) => result.isValid) ?? results[0];
}
function evaluateTailwindFunctions_default(context) {
  let config = context.tailwindConfig;
  let functions = {
    theme: (node, path, ...defaultValue) => {
      let {
        isValid,
        value: value2,
        error,
        alpha,
      } = resolvePath(
        config,
        path,
        defaultValue.length ? defaultValue : void 0
      );
      if (!isValid) {
        let parentNode = node.parent;
        let candidate = parentNode?.raws.tailwind?.candidate;
        if (parentNode && candidate !== void 0) {
          context.markInvalidUtilityNode(parentNode);
          parentNode.remove();
          log_default.warn("invalid-theme-key-in-class", [
            `The utility \`${candidate}\` contains an invalid theme value and was not generated.`,
          ]);
          return;
        }
        throw node.error(error);
      }
      let maybeColor = parseColorFormat(value2);
      let isColorFunction =
        maybeColor !== void 0 && typeof maybeColor === "function";
      if (alpha !== void 0 || isColorFunction) {
        if (alpha === void 0) {
          alpha = 1;
        }
        value2 = withAlphaValue(maybeColor, alpha, maybeColor);
      }
      return value2;
    },
    screen: (node, screen) => {
      screen = screen.replace(/^['"]+/g, "").replace(/['"]+$/g, "");
      let screens = normalizeScreens(config.theme.screens);
      let screenDefinition = screens.find(({ name }) => name === screen);
      if (!screenDefinition) {
        throw node.error(
          `The '${screen}' screen does not exist in your theme.`
        );
      }
      return buildMediaQuery(screenDefinition);
    },
  };
  return (root) => {
    root.walk((node) => {
      let property = nodeTypePropertyMap[node.type];
      if (property === void 0) {
        return;
      }
      node[property] = resolveFunctions(node, node[property], functions);
    });
  };
}

// node_modules/tailwindcss/src/lib/substituteScreenAtRules.js
function substituteScreenAtRules_default({ tailwindConfig: { theme } }) {
  return function (css) {
    css.walkAtRules("screen", (atRule) => {
      let screen = atRule.params;
      let screens = normalizeScreens(theme.screens);
      let screenDefinition = screens.find(({ name }) => name === screen);
      if (!screenDefinition) {
        throw atRule.error(`No \`${screen}\` screen found.`);
      }
      atRule.name = "media";
      atRule.params = buildMediaQuery(screenDefinition);
    });
  };
}

// node_modules/tailwindcss/src/lib/resolveDefaultsAtRules.js
import postcss7 from "postcss";
import selectorParser4 from "postcss-selector-parser";
var getNode = {
  id(node) {
    return selectorParser4.attribute({
      attribute: "id",
      operator: "=",
      value: node.value,
      quoteMark: '"',
    });
  },
};
function minimumImpactSelector(nodes) {
  let rest = nodes
    .filter((node2) => {
      if (node2.type !== "pseudo") return true;
      if (node2.nodes.length > 0) return true;
      return (
        node2.value.startsWith("::") ||
        [":before", ":after", ":first-line", ":first-letter"].includes(
          node2.value
        )
      );
    })
    .reverse();
  let searchFor = /* @__PURE__ */ new Set(["tag", "class", "id", "attribute"]);
  let splitPointIdx = rest.findIndex((n2) => searchFor.has(n2.type));
  if (splitPointIdx === -1) return rest.reverse().join("").trim();
  let node = rest[splitPointIdx];
  let bestNode = getNode[node.type] ? getNode[node.type](node) : node;
  rest = rest.slice(0, splitPointIdx);
  let combinatorIdx = rest.findIndex(
    (n2) => n2.type === "combinator" && n2.value === ">"
  );
  if (combinatorIdx !== -1) {
    rest.splice(0, combinatorIdx);
    rest.unshift(selectorParser4.universal());
  }
  return [bestNode, ...rest.reverse()].join("").trim();
}
var elementSelectorParser = selectorParser4((selectors) => {
  return selectors.map((s2) => {
    let nodes = s2
      .split((n2) => n2.type === "combinator" && n2.value === " ")
      .pop();
    return minimumImpactSelector(nodes);
  });
});
var cache = /* @__PURE__ */ new Map();
function extractElementSelector(selector) {
  if (!cache.has(selector)) {
    cache.set(selector, elementSelectorParser.transformSync(selector));
  }
  return cache.get(selector);
}
function resolveDefaultsAtRules({ tailwindConfig }) {
  return (root) => {
    let variableNodeMap = /* @__PURE__ */ new Map();
    let universals = /* @__PURE__ */ new Set();
    root.walkAtRules("defaults", (rule) => {
      if (rule.nodes && rule.nodes.length > 0) {
        universals.add(rule);
        return;
      }
      let variable = rule.params;
      if (!variableNodeMap.has(variable)) {
        variableNodeMap.set(variable, /* @__PURE__ */ new Set());
      }
      variableNodeMap.get(variable).add(rule.parent);
      rule.remove();
    });
    if (flagEnabled(tailwindConfig, "optimizeUniversalDefaults")) {
      for (let universal of universals) {
        let selectorGroups = /* @__PURE__ */ new Map();
        let rules = variableNodeMap.get(universal.params) ?? [];
        for (let rule of rules) {
          for (let selector of extractElementSelector(rule.selector)) {
            let selectorGroupName =
              selector.includes(":-") || selector.includes("::-")
                ? selector
                : "__DEFAULT__";
            let selectors =
              selectorGroups.get(selectorGroupName) ??
              /* @__PURE__ */ new Set();
            selectorGroups.set(selectorGroupName, selectors);
            selectors.add(selector);
          }
        }
        if (flagEnabled(tailwindConfig, "optimizeUniversalDefaults")) {
          if (selectorGroups.size === 0) {
            universal.remove();
            continue;
          }
          for (let [, selectors] of selectorGroups) {
            let universalRule = postcss7.rule({
              source: universal.source,
            });
            universalRule.selectors = [...selectors];
            universalRule.append(universal.nodes.map((node) => node.clone()));
            universal.before(universalRule);
          }
        }
        universal.remove();
      }
    } else if (universals.size) {
      let universalRule = postcss7.rule({
        selectors: ["*", "::before", "::after"],
      });
      for (let universal of universals) {
        universalRule.append(universal.nodes);
        if (!universalRule.parent) {
          universal.before(universalRule);
        }
        if (!universalRule.source) {
          universalRule.source = universal.source;
        }
        universal.remove();
      }
      let backdropRule = universalRule.clone({
        selectors: ["::backdrop"],
      });
      universalRule.after(backdropRule);
    }
  };
}

// node_modules/tailwindcss/src/lib/collapseAdjacentRules.js
var comparisonMap = {
  atrule: ["name", "params"],
  rule: ["selector"],
};
var types = new Set(Object.keys(comparisonMap));
function collapseAdjacentRules() {
  function collapseRulesIn(root) {
    let currentRule = null;
    root.each((node) => {
      if (!types.has(node.type)) {
        currentRule = null;
        return;
      }
      if (currentRule === null) {
        currentRule = node;
        return;
      }
      let properties = comparisonMap[node.type];
      if (node.type === "atrule" && node.name === "font-face") {
        currentRule = node;
      } else if (
        properties.every(
          (property) =>
            (node[property] ?? "").replace(/\s+/g, " ") ===
            (currentRule[property] ?? "").replace(/\s+/g, " ")
        )
      ) {
        if (node.nodes) {
          currentRule.append(node.nodes);
        }
        node.remove();
      } else {
        currentRule = node;
      }
    });
    root.each((node) => {
      if (node.type === "atrule") {
        collapseRulesIn(node);
      }
    });
  }
  return (root) => {
    collapseRulesIn(root);
  };
}

// node_modules/tailwindcss/src/lib/collapseDuplicateDeclarations.js
function collapseDuplicateDeclarations() {
  return (root) => {
    root.walkRules((node) => {
      let seen = /* @__PURE__ */ new Map();
      let droppable = /* @__PURE__ */ new Set([]);
      let byProperty = /* @__PURE__ */ new Map();
      node.walkDecls((decl) => {
        if (decl.parent !== node) {
          return;
        }
        if (seen.has(decl.prop)) {
          if (seen.get(decl.prop).value === decl.value) {
            droppable.add(seen.get(decl.prop));
            seen.set(decl.prop, decl);
            return;
          }
          if (!byProperty.has(decl.prop)) {
            byProperty.set(decl.prop, /* @__PURE__ */ new Set());
          }
          byProperty.get(decl.prop).add(seen.get(decl.prop));
          byProperty.get(decl.prop).add(decl);
        }
        seen.set(decl.prop, decl);
      });
      for (let decl of droppable) {
        decl.remove();
      }
      for (let declarations of byProperty.values()) {
        let byUnit = /* @__PURE__ */ new Map();
        for (let decl of declarations) {
          let unit = resolveUnit(decl.value);
          if (unit === null) {
            continue;
          }
          if (!byUnit.has(unit)) {
            byUnit.set(unit, /* @__PURE__ */ new Set());
          }
          byUnit.get(unit).add(decl);
        }
        for (let declarations2 of byUnit.values()) {
          let removableDeclarations = Array.from(declarations2).slice(0, -1);
          for (let decl of removableDeclarations) {
            decl.remove();
          }
        }
      }
    });
  };
}
var UNITLESS_NUMBER = Symbol("unitless-number");
function resolveUnit(input) {
  let result = /^-?\d*.?\d+([\w%]+)?$/g.exec(input);
  if (result) {
    return result[1] ?? UNITLESS_NUMBER;
  }
  return null;
}

// node_modules/tailwindcss/src/lib/partitionApplyAtRules.js
function partitionRules(root) {
  if (!root.walkAtRules) return;
  let applyParents = /* @__PURE__ */ new Set();
  root.walkAtRules("apply", (rule) => {
    applyParents.add(rule.parent);
  });
  if (applyParents.size === 0) {
    return;
  }
  for (let rule of applyParents) {
    let nodeGroups = [];
    let lastGroup = [];
    for (let node of rule.nodes) {
      if (node.type === "atrule" && node.name === "apply") {
        if (lastGroup.length > 0) {
          nodeGroups.push(lastGroup);
          lastGroup = [];
        }
        nodeGroups.push([node]);
      } else {
        lastGroup.push(node);
      }
    }
    if (lastGroup.length > 0) {
      nodeGroups.push(lastGroup);
    }
    if (nodeGroups.length === 1) {
      continue;
    }
    for (let group of [...nodeGroups].reverse()) {
      let clone = rule.clone({ nodes: [] });
      clone.append(group);
      rule.after(clone);
    }
    rule.remove();
  }
}
function expandApplyAtRules2() {
  return (root) => {
    partitionRules(root);
  };
}

// node_modules/tailwindcss/src/lib/detectNesting.js
function isRoot(node) {
  return node.type === "root";
}
function isAtLayer(node) {
  return node.type === "atrule" && node.name === "layer";
}
function detectNesting_default(_context) {
  return (root, result) => {
    let found = false;
    root.walkAtRules("tailwind", (node) => {
      if (found) return false;
      if (node.parent && !(isRoot(node.parent) || isAtLayer(node.parent))) {
        found = true;
        node.warn(
          result,
          [
            "Nested @tailwind rules were detected, but are not supported.",
            "Consider using a prefix to scope Tailwind's classes: https://tailwindcss.com/docs/configuration#prefix",
            "Alternatively, use the important selector strategy: https://tailwindcss.com/docs/configuration#selector-strategy",
          ].join("\n")
        );
        return false;
      }
    });
    root.walkRules((rule) => {
      if (found) return false;
      rule.walkRules((nestedRule) => {
        found = true;
        nestedRule.warn(
          result,
          [
            "Nested CSS was detected, but CSS nesting has not been configured correctly.",
            "Please enable a CSS nesting plugin *before* Tailwind in your configuration.",
            "See how here: https://tailwindcss.com/docs/using-with-preprocessors#nesting",
          ].join("\n")
        );
        return false;
      });
    });
  };
}

// node_modules/tailwindcss/src/processTailwindFeatures.js
function processTailwindFeatures(setupContext) {
  return function (root, result) {
    let { tailwindDirectives, applyDirectives } =
      normalizeTailwindDirectives(root);
    detectNesting_default()(root, result);
    expandApplyAtRules2()(root, result);
    let context = setupContext({
      tailwindDirectives,
      applyDirectives,
      registerDependency(dependency) {
        result.messages.push({
          plugin: "tailwindcss",
          parent: result.opts.from,
          ...dependency,
        });
      },
      createContext(tailwindConfig, changedContent) {
        return createContext(tailwindConfig, changedContent, root);
      },
    })(root, result);
    if (context.tailwindConfig.separator === "-") {
      throw new Error(
        "The '-' character cannot be used as a custom separator in JIT mode due to parsing ambiguity. Please use another character like '_' instead."
      );
    }
    issueFlagNotices(context.tailwindConfig);
    expandTailwindAtRules(context)(root, result);
    expandApplyAtRules2()(root, result);
    expandApplyAtRules(context)(root, result);
    evaluateTailwindFunctions_default(context)(root, result);
    substituteScreenAtRules_default(context)(root, result);
    resolveDefaultsAtRules(context)(root, result);
    collapseAdjacentRules(context)(root, result);
    collapseDuplicateDeclarations(context)(root, result);
  };
}

// node_modules/tailwindcss/src/corePluginList.js
var corePluginList_default = [
  "preflight",
  "container",
  "accessibility",
  "pointerEvents",
  "visibility",
  "position",
  "inset",
  "isolation",
  "zIndex",
  "order",
  "gridColumn",
  "gridColumnStart",
  "gridColumnEnd",
  "gridRow",
  "gridRowStart",
  "gridRowEnd",
  "float",
  "clear",
  "margin",
  "boxSizing",
  "display",
  "aspectRatio",
  "height",
  "maxHeight",
  "minHeight",
  "width",
  "minWidth",
  "maxWidth",
  "flex",
  "flexShrink",
  "flexGrow",
  "flexBasis",
  "tableLayout",
  "borderCollapse",
  "borderSpacing",
  "transformOrigin",
  "translate",
  "rotate",
  "skew",
  "scale",
  "transform",
  "animation",
  "cursor",
  "touchAction",
  "userSelect",
  "resize",
  "scrollSnapType",
  "scrollSnapAlign",
  "scrollSnapStop",
  "scrollMargin",
  "scrollPadding",
  "listStylePosition",
  "listStyleType",
  "appearance",
  "columns",
  "breakBefore",
  "breakInside",
  "breakAfter",
  "gridAutoColumns",
  "gridAutoFlow",
  "gridAutoRows",
  "gridTemplateColumns",
  "gridTemplateRows",
  "flexDirection",
  "flexWrap",
  "placeContent",
  "placeItems",
  "alignContent",
  "alignItems",
  "justifyContent",
  "justifyItems",
  "gap",
  "space",
  "divideWidth",
  "divideStyle",
  "divideColor",
  "divideOpacity",
  "placeSelf",
  "alignSelf",
  "justifySelf",
  "overflow",
  "overscrollBehavior",
  "scrollBehavior",
  "textOverflow",
  "whitespace",
  "wordBreak",
  "borderRadius",
  "borderWidth",
  "borderStyle",
  "borderColor",
  "borderOpacity",
  "backgroundColor",
  "backgroundOpacity",
  "backgroundImage",
  "gradientColorStops",
  "boxDecorationBreak",
  "backgroundSize",
  "backgroundAttachment",
  "backgroundClip",
  "backgroundPosition",
  "backgroundRepeat",
  "backgroundOrigin",
  "fill",
  "stroke",
  "strokeWidth",
  "objectFit",
  "objectPosition",
  "padding",
  "textAlign",
  "textIndent",
  "verticalAlign",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "textTransform",
  "fontStyle",
  "fontVariantNumeric",
  "lineHeight",
  "letterSpacing",
  "textColor",
  "textOpacity",
  "textDecoration",
  "textDecorationColor",
  "textDecorationStyle",
  "textDecorationThickness",
  "textUnderlineOffset",
  "fontSmoothing",
  "placeholderColor",
  "placeholderOpacity",
  "caretColor",
  "accentColor",
  "opacity",
  "backgroundBlendMode",
  "mixBlendMode",
  "boxShadow",
  "boxShadowColor",
  "outlineStyle",
  "outlineWidth",
  "outlineOffset",
  "outlineColor",
  "ringWidth",
  "ringColor",
  "ringOpacity",
  "ringOffsetWidth",
  "ringOffsetColor",
  "blur",
  "brightness",
  "contrast",
  "dropShadow",
  "grayscale",
  "hueRotate",
  "invert",
  "saturate",
  "sepia",
  "filter",
  "backdropBlur",
  "backdropBrightness",
  "backdropContrast",
  "backdropGrayscale",
  "backdropHueRotate",
  "backdropInvert",
  "backdropOpacity",
  "backdropSaturate",
  "backdropSepia",
  "backdropFilter",
  "transitionProperty",
  "transitionDelay",
  "transitionDuration",
  "transitionTimingFunction",
  "willChange",
  "content",
];

// node_modules/tailwindcss/src/util/configurePlugins.js
function configurePlugins_default(pluginConfig, plugins) {
  if (pluginConfig === void 0) {
    return plugins;
  }
  const pluginNames = Array.isArray(pluginConfig)
    ? pluginConfig
    : [
        ...new Set(
          plugins
            .filter((pluginName) => {
              return (
                pluginConfig !== false && pluginConfig[pluginName] !== false
              );
            })
            .concat(
              Object.keys(pluginConfig).filter((pluginName) => {
                return pluginConfig[pluginName] !== false;
              })
            )
        ),
      ];
  return pluginNames;
}

// node_modules/tailwindcss/src/public/colors.js
function warn({ version: version2, from, to }) {
  log_default.warn(`${from}-color-renamed`, [
    `As of Tailwind CSS ${version2}, \`${from}\` has been renamed to \`${to}\`.`,
    "Update your configuration file to silence this warning.",
  ]);
}
var colors_default = {
  inherit: "inherit",
  current: "currentColor",
  transparent: "transparent",
  black: "#000",
  white: "#fff",
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },
  stone: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  yellow: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12",
  },
  lime: {
    50: "#f7fee7",
    100: "#ecfccb",
    200: "#d9f99d",
    300: "#bef264",
    400: "#a3e635",
    500: "#84cc16",
    600: "#65a30d",
    700: "#4d7c0f",
    800: "#3f6212",
    900: "#365314",
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
  },
  teal: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
  },
  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
  },
  sky: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
  },
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
  },
  fuchsia: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
  },
  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
  },
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
  },
  get lightBlue() {
    warn({ version: "v2.2", from: "lightBlue", to: "sky" });
    return this.sky;
  },
  get warmGray() {
    warn({ version: "v3.0", from: "warmGray", to: "stone" });
    return this.stone;
  },
  get trueGray() {
    warn({ version: "v3.0", from: "trueGray", to: "neutral" });
    return this.neutral;
  },
  get coolGray() {
    warn({ version: "v3.0", from: "coolGray", to: "gray" });
    return this.gray;
  },
  get blueGray() {
    warn({ version: "v3.0", from: "blueGray", to: "slate" });
    return this.slate;
  },
};

// node_modules/tailwindcss/src/util/defaults.js
function defaults2(target, ...sources) {
  for (let source of sources) {
    for (let k2 in source) {
      if (!target?.hasOwnProperty?.(k2)) {
        target[k2] = source[k2];
      }
    }
    for (let k2 of Object.getOwnPropertySymbols(source)) {
      if (!target?.hasOwnProperty?.(k2)) {
        target[k2] = source[k2];
      }
    }
  }
  return target;
}

// node_modules/tailwindcss/src/util/normalizeConfig.js
function normalizeConfig(config) {
  let valid = (() => {
    if (config.purge) {
      return false;
    }
    if (!config.content) {
      return false;
    }
    if (
      !Array.isArray(config.content) &&
      !(typeof config.content === "object" && config.content !== null)
    ) {
      return false;
    }
    if (Array.isArray(config.content)) {
      return config.content.every((path) => {
        if (typeof path === "string") return true;
        if (typeof path?.raw !== "string") return false;
        if (path?.extension && typeof path?.extension !== "string") {
          return false;
        }
        return true;
      });
    }
    if (typeof config.content === "object" && config.content !== null) {
      if (
        Object.keys(config.content).some(
          (key) => !["files", "relative", "extract", "transform"].includes(key)
        )
      ) {
        return false;
      }
      if (Array.isArray(config.content.files)) {
        if (
          !config.content.files.every((path) => {
            if (typeof path === "string") return true;
            if (typeof path?.raw !== "string") return false;
            if (path?.extension && typeof path?.extension !== "string") {
              return false;
            }
            return true;
          })
        ) {
          return false;
        }
        if (typeof config.content.extract === "object") {
          for (let value2 of Object.values(config.content.extract)) {
            if (typeof value2 !== "function") {
              return false;
            }
          }
        } else if (
          !(
            config.content.extract === void 0 ||
            typeof config.content.extract === "function"
          )
        ) {
          return false;
        }
        if (typeof config.content.transform === "object") {
          for (let value2 of Object.values(config.content.transform)) {
            if (typeof value2 !== "function") {
              return false;
            }
          }
        } else if (
          !(
            config.content.transform === void 0 ||
            typeof config.content.transform === "function"
          )
        ) {
          return false;
        }
        if (
          typeof config.content.relative !== "boolean" &&
          typeof config.content.relative !== "undefined"
        ) {
          return false;
        }
      }
      return true;
    }
    return false;
  })();
  if (!valid) {
    log_default.warn("purge-deprecation", [
      "The `purge`/`content` options have changed in Tailwind CSS v3.0.",
      "Update your configuration file to eliminate this warning.",
      "https://tailwindcss.com/docs/upgrade-guide#configure-content-sources",
    ]);
  }
  config.safelist = (() => {
    let { content, purge, safelist } = config;
    if (Array.isArray(safelist)) return safelist;
    if (Array.isArray(content?.safelist)) return content.safelist;
    if (Array.isArray(purge?.safelist)) return purge.safelist;
    if (Array.isArray(purge?.options?.safelist)) return purge.options.safelist;
    return [];
  })();
  config.blocklist = (() => {
    let { blocklist } = config;
    if (Array.isArray(blocklist)) {
      if (blocklist.every((item) => typeof item === "string")) {
        return blocklist;
      }
      log_default.warn("blocklist-invalid", [
        "The `blocklist` option must be an array of strings.",
        "https://tailwindcss.com/docs/content-configuration#discarding-classes",
      ]);
    }
    return [];
  })();
  if (typeof config.prefix === "function") {
    log_default.warn("prefix-function", [
      "As of Tailwind CSS v3.0, `prefix` cannot be a function.",
      "Update `prefix` in your configuration to be a string to eliminate this warning.",
      "https://tailwindcss.com/docs/upgrade-guide#prefix-cannot-be-a-function",
    ]);
    config.prefix = "";
  } else {
    config.prefix = config.prefix ?? "";
  }
  config.content = {
    relative: (() => {
      let { content } = config;
      if (content?.relative) {
        return content.relative;
      }
      return config.future?.relativeContentPathsByDefault ?? false;
    })(),
    files: (() => {
      let { content, purge } = config;
      if (Array.isArray(purge)) return purge;
      if (Array.isArray(purge?.content)) return purge.content;
      if (Array.isArray(content)) return content;
      if (Array.isArray(content?.content)) return content.content;
      if (Array.isArray(content?.files)) return content.files;
      return [];
    })(),
    extract: (() => {
      let extract = (() => {
        if (config.purge?.extract) return config.purge.extract;
        if (config.content?.extract) return config.content.extract;
        if (config.purge?.extract?.DEFAULT) return config.purge.extract.DEFAULT;
        if (config.content?.extract?.DEFAULT)
          return config.content.extract.DEFAULT;
        if (config.purge?.options?.extractors)
          return config.purge.options.extractors;
        if (config.content?.options?.extractors)
          return config.content.options.extractors;
        return {};
      })();
      let extractors = {};
      let defaultExtractor2 = (() => {
        if (config.purge?.options?.defaultExtractor) {
          return config.purge.options.defaultExtractor;
        }
        if (config.content?.options?.defaultExtractor) {
          return config.content.options.defaultExtractor;
        }
        return void 0;
      })();
      if (defaultExtractor2 !== void 0) {
        extractors.DEFAULT = defaultExtractor2;
      }
      if (typeof extract === "function") {
        extractors.DEFAULT = extract;
      } else if (Array.isArray(extract)) {
        for (let { extensions, extractor } of extract ?? []) {
          for (let extension of extensions) {
            extractors[extension] = extractor;
          }
        }
      } else if (typeof extract === "object" && extract !== null) {
        Object.assign(extractors, extract);
      }
      return extractors;
    })(),
    transform: (() => {
      let transform = (() => {
        if (config.purge?.transform) return config.purge.transform;
        if (config.content?.transform) return config.content.transform;
        if (config.purge?.transform?.DEFAULT)
          return config.purge.transform.DEFAULT;
        if (config.content?.transform?.DEFAULT)
          return config.content.transform.DEFAULT;
        return {};
      })();
      let transformers = {};
      if (typeof transform === "function") {
        transformers.DEFAULT = transform;
      }
      if (typeof transform === "object" && transform !== null) {
        Object.assign(transformers, transform);
      }
      return transformers;
    })(),
  };
  for (let file of config.content.files) {
    if (typeof file === "string" && /{([^,]*?)}/g.test(file)) {
      log_default.warn("invalid-glob-braces", [
        `The glob pattern ${dim(
          file
        )} in your Tailwind CSS configuration is invalid.`,
        `Update it to ${dim(
          file.replace(/{([^,]*?)}/g, "$1")
        )} to silence this warning.`,
        // TODO: Add https://tw.wtf/invalid-glob-braces
      ]);
      break;
    }
  }
  return config;
}

// node_modules/tailwindcss/src/util/cloneDeep.js
function cloneDeep(value2) {
  if (Array.isArray(value2)) {
    return value2.map((child) => cloneDeep(child));
  }
  if (typeof value2 === "object" && value2 !== null) {
    return Object.fromEntries(
      Object.entries(value2).map(([k2, v]) => [k2, cloneDeep(v)])
    );
  }
  return value2;
}

// node_modules/tailwindcss/src/util/resolveConfig.js
function isFunction(input) {
  return typeof input === "function";
}
function mergeWith(target, ...sources) {
  let customizer = sources.pop();
  for (let source of sources) {
    for (let k2 in source) {
      let merged = customizer(target[k2], source[k2]);
      if (merged === void 0) {
        if (isPlainObject(target[k2]) && isPlainObject(source[k2])) {
          target[k2] = mergeWith({}, target[k2], source[k2], customizer);
        } else {
          target[k2] = source[k2];
        }
      } else {
        target[k2] = merged;
      }
    }
  }
  return target;
}
var configUtils = {
  colors: colors_default,
  negative(scale) {
    return Object.keys(scale)
      .filter((key) => scale[key] !== "0")
      .reduce((negativeScale, key) => {
        let negativeValue = negateValue(scale[key]);
        if (negativeValue !== void 0) {
          negativeScale[`-${key}`] = negativeValue;
        }
        return negativeScale;
      }, {});
  },
  breakpoints(screens) {
    return Object.keys(screens)
      .filter((key) => typeof screens[key] === "string")
      .reduce(
        (breakpoints, key) => ({
          ...breakpoints,
          [`screen-${key}`]: screens[key],
        }),
        {}
      );
  },
};
function value(valueToResolve, ...args) {
  return isFunction(valueToResolve) ? valueToResolve(...args) : valueToResolve;
}
function collectExtends(items) {
  return items.reduce((merged, { extend }) => {
    return mergeWith(merged, extend, (mergedValue, extendValue) => {
      if (mergedValue === void 0) {
        return [extendValue];
      }
      if (Array.isArray(mergedValue)) {
        return [extendValue, ...mergedValue];
      }
      return [extendValue, mergedValue];
    });
  }, {});
}
function mergeThemes(themes) {
  return {
    ...themes.reduce((merged, theme) => defaults2(merged, theme), {}),
    // In order to resolve n config objects, we combine all of their `extend` properties
    // into arrays instead of objects so they aren't overridden.
    extend: collectExtends(themes),
  };
}
function mergeExtensionCustomizer(merged, value2) {
  if (Array.isArray(merged) && isPlainObject(merged[0])) {
    return merged.concat(value2);
  }
  if (
    Array.isArray(value2) &&
    isPlainObject(value2[0]) &&
    isPlainObject(merged)
  ) {
    return [merged, ...value2];
  }
  if (Array.isArray(value2)) {
    return value2;
  }
  return void 0;
}
function mergeExtensions({ extend, ...theme }) {
  return mergeWith(theme, extend, (themeValue, extensions) => {
    if (!isFunction(themeValue) && !extensions.some(isFunction)) {
      return mergeWith({}, themeValue, ...extensions, mergeExtensionCustomizer);
    }
    return (resolveThemePath, utils) =>
      mergeWith(
        {},
        ...[themeValue, ...extensions].map((e2) =>
          value(e2, resolveThemePath, utils)
        ),
        mergeExtensionCustomizer
      );
  });
}
function* toPaths2(key) {
  let path = toPath(key);
  if (path.length === 0) {
    return;
  }
  yield path;
  if (Array.isArray(key)) {
    return;
  }
  let pattern2 = /^(.*?)\s*\/\s*([^/]+)$/;
  let matches = key.match(pattern2);
  if (matches !== null) {
    let [, prefix3, alpha] = matches;
    let newPath = toPath(prefix3);
    newPath.alpha = alpha;
    yield newPath;
  }
}
function resolveFunctionKeys(object) {
  const resolvePath2 = (key, defaultValue) => {
    for (const path of toPaths2(key)) {
      let index = 0;
      let val = object;
      while (val !== void 0 && val !== null && index < path.length) {
        val = val[path[index++]];
        let shouldResolveAsFn =
          isFunction(val) &&
          (path.alpha === void 0 || index <= path.length - 1);
        val = shouldResolveAsFn ? val(resolvePath2, configUtils) : val;
      }
      if (val !== void 0) {
        if (path.alpha !== void 0) {
          let normalized = parseColorFormat(val);
          return withAlphaValue(
            normalized,
            path.alpha,
            toColorValue(normalized)
          );
        }
        if (isPlainObject(val)) {
          return cloneDeep(val);
        }
        return val;
      }
    }
    return defaultValue;
  };
  Object.assign(resolvePath2, {
    theme: resolvePath2,
    ...configUtils,
  });
  return Object.keys(object).reduce((resolved, key) => {
    resolved[key] = isFunction(object[key])
      ? object[key](resolvePath2, configUtils)
      : object[key];
    return resolved;
  }, {});
}
function extractPluginConfigs(configs) {
  let allConfigs = [];
  configs.forEach((config) => {
    allConfigs = [...allConfigs, config];
    const plugins = config?.plugins ?? [];
    if (plugins.length === 0) {
      return;
    }
    plugins.forEach((plugin) => {
      if (plugin.__isOptionsFunction) {
        plugin = plugin();
      }
      allConfigs = [
        ...allConfigs,
        ...extractPluginConfigs([plugin?.config ?? {}]),
      ];
    });
  });
  return allConfigs;
}
function resolveCorePlugins(corePluginConfigs) {
  const result = [...corePluginConfigs].reduceRight(
    (resolved, corePluginConfig) => {
      if (isFunction(corePluginConfig)) {
        return corePluginConfig({ corePlugins: resolved });
      }
      return configurePlugins_default(corePluginConfig, resolved);
    },
    corePluginList_default
  );
  return result;
}
function resolvePluginLists(pluginLists) {
  const result = [...pluginLists].reduceRight((resolved, pluginList) => {
    return [...resolved, ...pluginList];
  }, []);
  return result;
}
function resolveConfig(configs) {
  let allConfigs = [
    ...extractPluginConfigs(configs),
    {
      prefix: "",
      important: false,
      separator: ":",
    },
  ];
  return normalizeConfig(
    defaults2(
      {
        theme: resolveFunctionKeys(
          mergeExtensions(mergeThemes(allConfigs.map((t) => t?.theme ?? {})))
        ),
        corePlugins: resolveCorePlugins(allConfigs.map((c4) => c4.corePlugins)),
        plugins: resolvePluginLists(configs.map((c4) => c4?.plugins ?? [])),
      },
      ...allConfigs
    )
  );
}

// node_modules/tailwindcss/stubs/defaultConfig.stub.js
var defaultConfig_stub_default = {
  content: [],
  presets: [],
  darkMode: "media",
  // or 'class'
  theme: {
    accentColor: ({ theme }) => ({
      ...theme("colors"),
      auto: "auto",
    }),
    animation: {
      none: "none",
      spin: "spin 1s linear infinite",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      bounce: "bounce 1s infinite",
    },
    aria: {
      checked: 'checked="true"',
      disabled: 'disabled="true"',
      expanded: 'expanded="true"',
      hidden: 'hidden="true"',
      pressed: 'pressed="true"',
      readonly: 'readonly="true"',
      required: 'required="true"',
      selected: 'selected="true"',
    },
    aspectRatio: {
      auto: "auto",
      square: "1 / 1",
      video: "16 / 9",
    },
    backdropBlur: ({ theme }) => theme("blur"),
    backdropBrightness: ({ theme }) => theme("brightness"),
    backdropContrast: ({ theme }) => theme("contrast"),
    backdropGrayscale: ({ theme }) => theme("grayscale"),
    backdropHueRotate: ({ theme }) => theme("hueRotate"),
    backdropInvert: ({ theme }) => theme("invert"),
    backdropOpacity: ({ theme }) => theme("opacity"),
    backdropSaturate: ({ theme }) => theme("saturate"),
    backdropSepia: ({ theme }) => theme("sepia"),
    backgroundColor: ({ theme }) => theme("colors"),
    backgroundImage: {
      none: "none",
      "gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))",
      "gradient-to-tr":
        "linear-gradient(to top right, var(--tw-gradient-stops))",
      "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
      "gradient-to-br":
        "linear-gradient(to bottom right, var(--tw-gradient-stops))",
      "gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))",
      "gradient-to-bl":
        "linear-gradient(to bottom left, var(--tw-gradient-stops))",
      "gradient-to-l": "linear-gradient(to left, var(--tw-gradient-stops))",
      "gradient-to-tl":
        "linear-gradient(to top left, var(--tw-gradient-stops))",
    },
    backgroundOpacity: ({ theme }) => theme("opacity"),
    backgroundPosition: {
      bottom: "bottom",
      center: "center",
      left: "left",
      "left-bottom": "left bottom",
      "left-top": "left top",
      right: "right",
      "right-bottom": "right bottom",
      "right-top": "right top",
      top: "top",
    },
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
    },
    blur: {
      0: "0",
      none: "0",
      sm: "4px",
      DEFAULT: "8px",
      md: "12px",
      lg: "16px",
      xl: "24px",
      "2xl": "40px",
      "3xl": "64px",
    },
    borderColor: ({ theme }) => ({
      ...theme("colors"),
      DEFAULT: theme("colors.gray.200", "currentColor"),
    }),
    borderOpacity: ({ theme }) => theme("opacity"),
    borderRadius: {
      none: "0px",
      sm: "0.125rem",
      DEFAULT: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5rem",
      full: "9999px",
    },
    borderSpacing: ({ theme }) => ({
      ...theme("spacing"),
    }),
    borderWidth: {
      DEFAULT: "1px",
      0: "0px",
      2: "2px",
      4: "4px",
      8: "8px",
    },
    boxShadow: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
      none: "none",
    },
    boxShadowColor: ({ theme }) => theme("colors"),
    brightness: {
      0: "0",
      50: ".5",
      75: ".75",
      90: ".9",
      95: ".95",
      100: "1",
      105: "1.05",
      110: "1.1",
      125: "1.25",
      150: "1.5",
      200: "2",
    },
    caretColor: ({ theme }) => theme("colors"),
    colors: ({ colors }) => ({
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    }),
    columns: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
      "3xs": "16rem",
      "2xs": "18rem",
      xs: "20rem",
      sm: "24rem",
      md: "28rem",
      lg: "32rem",
      xl: "36rem",
      "2xl": "42rem",
      "3xl": "48rem",
      "4xl": "56rem",
      "5xl": "64rem",
      "6xl": "72rem",
      "7xl": "80rem",
    },
    container: {},
    content: {
      none: "none",
    },
    contrast: {
      0: "0",
      50: ".5",
      75: ".75",
      100: "1",
      125: "1.25",
      150: "1.5",
      200: "2",
    },
    cursor: {
      auto: "auto",
      default: "default",
      pointer: "pointer",
      wait: "wait",
      text: "text",
      move: "move",
      help: "help",
      "not-allowed": "not-allowed",
      none: "none",
      "context-menu": "context-menu",
      progress: "progress",
      cell: "cell",
      crosshair: "crosshair",
      "vertical-text": "vertical-text",
      alias: "alias",
      copy: "copy",
      "no-drop": "no-drop",
      grab: "grab",
      grabbing: "grabbing",
      "all-scroll": "all-scroll",
      "col-resize": "col-resize",
      "row-resize": "row-resize",
      "n-resize": "n-resize",
      "e-resize": "e-resize",
      "s-resize": "s-resize",
      "w-resize": "w-resize",
      "ne-resize": "ne-resize",
      "nw-resize": "nw-resize",
      "se-resize": "se-resize",
      "sw-resize": "sw-resize",
      "ew-resize": "ew-resize",
      "ns-resize": "ns-resize",
      "nesw-resize": "nesw-resize",
      "nwse-resize": "nwse-resize",
      "zoom-in": "zoom-in",
      "zoom-out": "zoom-out",
    },
    divideColor: ({ theme }) => theme("borderColor"),
    divideOpacity: ({ theme }) => theme("borderOpacity"),
    divideWidth: ({ theme }) => theme("borderWidth"),
    dropShadow: {
      sm: "0 1px 1px rgb(0 0 0 / 0.05)",
      DEFAULT: ["0 1px 2px rgb(0 0 0 / 0.1)", "0 1px 1px rgb(0 0 0 / 0.06)"],
      md: ["0 4px 3px rgb(0 0 0 / 0.07)", "0 2px 2px rgb(0 0 0 / 0.06)"],
      lg: ["0 10px 8px rgb(0 0 0 / 0.04)", "0 4px 3px rgb(0 0 0 / 0.1)"],
      xl: ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.08)"],
      "2xl": "0 25px 25px rgb(0 0 0 / 0.15)",
      none: "0 0 #0000",
    },
    fill: ({ theme }) => ({
      none: "none",
      ...theme("colors"),
    }),
    flex: {
      1: "1 1 0%",
      auto: "1 1 auto",
      initial: "0 1 auto",
      none: "none",
    },
    flexBasis: ({ theme }) => ({
      auto: "auto",
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/6": "16.666667%",
      "2/6": "33.333333%",
      "3/6": "50%",
      "4/6": "66.666667%",
      "5/6": "83.333333%",
      "1/12": "8.333333%",
      "2/12": "16.666667%",
      "3/12": "25%",
      "4/12": "33.333333%",
      "5/12": "41.666667%",
      "6/12": "50%",
      "7/12": "58.333333%",
      "8/12": "66.666667%",
      "9/12": "75%",
      "10/12": "83.333333%",
      "11/12": "91.666667%",
      full: "100%",
    }),
    flexGrow: {
      0: "0",
      DEFAULT: "1",
    },
    flexShrink: {
      0: "0",
      DEFAULT: "1",
    },
    fontFamily: {
      sans: [
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: [
        "ui-serif",
        "Georgia",
        "Cambria",
        '"Times New Roman"',
        "Times",
        "serif",
      ],
      mono: [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        '"Liberation Mono"',
        '"Courier New"',
        "monospace",
      ],
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "1" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
    fontWeight: {
      thin: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
    gap: ({ theme }) => theme("spacing"),
    gradientColorStops: ({ theme }) => theme("colors"),
    grayscale: {
      0: "0",
      DEFAULT: "100%",
    },
    gridAutoColumns: {
      auto: "auto",
      min: "min-content",
      max: "max-content",
      fr: "minmax(0, 1fr)",
    },
    gridAutoRows: {
      auto: "auto",
      min: "min-content",
      max: "max-content",
      fr: "minmax(0, 1fr)",
    },
    gridColumn: {
      auto: "auto",
      "span-1": "span 1 / span 1",
      "span-2": "span 2 / span 2",
      "span-3": "span 3 / span 3",
      "span-4": "span 4 / span 4",
      "span-5": "span 5 / span 5",
      "span-6": "span 6 / span 6",
      "span-7": "span 7 / span 7",
      "span-8": "span 8 / span 8",
      "span-9": "span 9 / span 9",
      "span-10": "span 10 / span 10",
      "span-11": "span 11 / span 11",
      "span-12": "span 12 / span 12",
      "span-full": "1 / -1",
    },
    gridColumnEnd: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
      13: "13",
    },
    gridColumnStart: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
      13: "13",
    },
    gridRow: {
      auto: "auto",
      "span-1": "span 1 / span 1",
      "span-2": "span 2 / span 2",
      "span-3": "span 3 / span 3",
      "span-4": "span 4 / span 4",
      "span-5": "span 5 / span 5",
      "span-6": "span 6 / span 6",
      "span-full": "1 / -1",
    },
    gridRowEnd: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
    },
    gridRowStart: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
    },
    gridTemplateColumns: {
      none: "none",
      1: "repeat(1, minmax(0, 1fr))",
      2: "repeat(2, minmax(0, 1fr))",
      3: "repeat(3, minmax(0, 1fr))",
      4: "repeat(4, minmax(0, 1fr))",
      5: "repeat(5, minmax(0, 1fr))",
      6: "repeat(6, minmax(0, 1fr))",
      7: "repeat(7, minmax(0, 1fr))",
      8: "repeat(8, minmax(0, 1fr))",
      9: "repeat(9, minmax(0, 1fr))",
      10: "repeat(10, minmax(0, 1fr))",
      11: "repeat(11, minmax(0, 1fr))",
      12: "repeat(12, minmax(0, 1fr))",
    },
    gridTemplateRows: {
      none: "none",
      1: "repeat(1, minmax(0, 1fr))",
      2: "repeat(2, minmax(0, 1fr))",
      3: "repeat(3, minmax(0, 1fr))",
      4: "repeat(4, minmax(0, 1fr))",
      5: "repeat(5, minmax(0, 1fr))",
      6: "repeat(6, minmax(0, 1fr))",
    },
    height: ({ theme }) => ({
      auto: "auto",
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/6": "16.666667%",
      "2/6": "33.333333%",
      "3/6": "50%",
      "4/6": "66.666667%",
      "5/6": "83.333333%",
      full: "100%",
      screen: "100vh",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
    }),
    hueRotate: {
      0: "0deg",
      15: "15deg",
      30: "30deg",
      60: "60deg",
      90: "90deg",
      180: "180deg",
    },
    inset: ({ theme }) => ({
      auto: "auto",
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      full: "100%",
    }),
    invert: {
      0: "0",
      DEFAULT: "100%",
    },
    keyframes: {
      spin: {
        to: {
          transform: "rotate(360deg)",
        },
      },
      ping: {
        "75%, 100%": {
          transform: "scale(2)",
          opacity: "0",
        },
      },
      pulse: {
        "50%": {
          opacity: ".5",
        },
      },
      bounce: {
        "0%, 100%": {
          transform: "translateY(-25%)",
          animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
        },
        "50%": {
          transform: "none",
          animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
        },
      },
    },
    letterSpacing: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0em",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
    lineHeight: {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
      3: ".75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
    },
    margin: ({ theme }) => ({
      auto: "auto",
      ...theme("spacing"),
    }),
    maxHeight: ({ theme }) => ({
      ...theme("spacing"),
      none: "none",
      full: "100%",
      screen: "100vh",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
    }),
    maxWidth: ({ theme, breakpoints }) => ({
      none: "none",
      0: "0rem",
      xs: "20rem",
      sm: "24rem",
      md: "28rem",
      lg: "32rem",
      xl: "36rem",
      "2xl": "42rem",
      "3xl": "48rem",
      "4xl": "56rem",
      "5xl": "64rem",
      "6xl": "72rem",
      "7xl": "80rem",
      full: "100%",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
      prose: "65ch",
      ...breakpoints(theme("screens")),
    }),
    minHeight: {
      0: "0px",
      full: "100%",
      screen: "100vh",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
    },
    minWidth: {
      0: "0px",
      full: "100%",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
    },
    objectPosition: {
      bottom: "bottom",
      center: "center",
      left: "left",
      "left-bottom": "left bottom",
      "left-top": "left top",
      right: "right",
      "right-bottom": "right bottom",
      "right-top": "right top",
      top: "top",
    },
    opacity: {
      0: "0",
      5: "0.05",
      10: "0.1",
      20: "0.2",
      25: "0.25",
      30: "0.3",
      40: "0.4",
      50: "0.5",
      60: "0.6",
      70: "0.7",
      75: "0.75",
      80: "0.8",
      90: "0.9",
      95: "0.95",
      100: "1",
    },
    order: {
      first: "-9999",
      last: "9999",
      none: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
    },
    outlineColor: ({ theme }) => theme("colors"),
    outlineOffset: {
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px",
    },
    outlineWidth: {
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px",
    },
    padding: ({ theme }) => theme("spacing"),
    placeholderColor: ({ theme }) => theme("colors"),
    placeholderOpacity: ({ theme }) => theme("opacity"),
    ringColor: ({ theme }) => ({
      DEFAULT: theme("colors.blue.500", "#3b82f6"),
      ...theme("colors"),
    }),
    ringOffsetColor: ({ theme }) => theme("colors"),
    ringOffsetWidth: {
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px",
    },
    ringOpacity: ({ theme }) => ({
      DEFAULT: "0.5",
      ...theme("opacity"),
    }),
    ringWidth: {
      DEFAULT: "3px",
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px",
    },
    rotate: {
      0: "0deg",
      1: "1deg",
      2: "2deg",
      3: "3deg",
      6: "6deg",
      12: "12deg",
      45: "45deg",
      90: "90deg",
      180: "180deg",
    },
    saturate: {
      0: "0",
      50: ".5",
      100: "1",
      150: "1.5",
      200: "2",
    },
    scale: {
      0: "0",
      50: ".5",
      75: ".75",
      90: ".9",
      95: ".95",
      100: "1",
      105: "1.05",
      110: "1.1",
      125: "1.25",
      150: "1.5",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    scrollMargin: ({ theme }) => ({
      ...theme("spacing"),
    }),
    scrollPadding: ({ theme }) => theme("spacing"),
    sepia: {
      0: "0",
      DEFAULT: "100%",
    },
    skew: {
      0: "0deg",
      1: "1deg",
      2: "2deg",
      3: "3deg",
      6: "6deg",
      12: "12deg",
    },
    space: ({ theme }) => ({
      ...theme("spacing"),
    }),
    spacing: {
      px: "1px",
      0: "0px",
      0.5: "0.125rem",
      1: "0.25rem",
      1.5: "0.375rem",
      2: "0.5rem",
      2.5: "0.625rem",
      3: "0.75rem",
      3.5: "0.875rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      11: "2.75rem",
      12: "3rem",
      14: "3.5rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      28: "7rem",
      32: "8rem",
      36: "9rem",
      40: "10rem",
      44: "11rem",
      48: "12rem",
      52: "13rem",
      56: "14rem",
      60: "15rem",
      64: "16rem",
      72: "18rem",
      80: "20rem",
      96: "24rem",
    },
    stroke: ({ theme }) => ({
      none: "none",
      ...theme("colors"),
    }),
    strokeWidth: {
      0: "0",
      1: "1",
      2: "2",
    },
    supports: {},
    data: {},
    textColor: ({ theme }) => theme("colors"),
    textDecorationColor: ({ theme }) => theme("colors"),
    textDecorationThickness: {
      auto: "auto",
      "from-font": "from-font",
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px",
    },
    textIndent: ({ theme }) => ({
      ...theme("spacing"),
    }),
    textOpacity: ({ theme }) => theme("opacity"),
    textUnderlineOffset: {
      auto: "auto",
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px",
    },
    transformOrigin: {
      center: "center",
      top: "top",
      "top-right": "top right",
      right: "right",
      "bottom-right": "bottom right",
      bottom: "bottom",
      "bottom-left": "bottom left",
      left: "left",
      "top-left": "top left",
    },
    transitionDelay: {
      75: "75ms",
      100: "100ms",
      150: "150ms",
      200: "200ms",
      300: "300ms",
      500: "500ms",
      700: "700ms",
      1e3: "1000ms",
    },
    transitionDuration: {
      DEFAULT: "150ms",
      75: "75ms",
      100: "100ms",
      150: "150ms",
      200: "200ms",
      300: "300ms",
      500: "500ms",
      700: "700ms",
      1e3: "1000ms",
    },
    transitionProperty: {
      none: "none",
      all: "all",
      DEFAULT:
        "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
      colors:
        "color, background-color, border-color, text-decoration-color, fill, stroke",
      opacity: "opacity",
      shadow: "box-shadow",
      transform: "transform",
    },
    transitionTimingFunction: {
      DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      linear: "linear",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    translate: ({ theme }) => ({
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      full: "100%",
    }),
    width: ({ theme }) => ({
      auto: "auto",
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/6": "16.666667%",
      "2/6": "33.333333%",
      "3/6": "50%",
      "4/6": "66.666667%",
      "5/6": "83.333333%",
      "1/12": "8.333333%",
      "2/12": "16.666667%",
      "3/12": "25%",
      "4/12": "33.333333%",
      "5/12": "41.666667%",
      "6/12": "50%",
      "7/12": "58.333333%",
      "8/12": "66.666667%",
      "9/12": "75%",
      "10/12": "83.333333%",
      "11/12": "91.666667%",
      full: "100%",
      screen: "100vw",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
    }),
    willChange: {
      auto: "auto",
      scroll: "scroll-position",
      contents: "contents",
      transform: "transform",
    },
    zIndex: {
      auto: "auto",
      0: "0",
      10: "10",
      20: "20",
      30: "30",
      40: "40",
      50: "50",
    },
  },
  plugins: [],
};

// node_modules/tailwindcss/src/util/getAllConfigs.js
function getAllConfigs(config) {
  const configs = (config?.presets ?? [defaultConfig_stub_default])
    .slice()
    .reverse()
    .flatMap((preset) =>
      getAllConfigs(preset instanceof Function ? preset() : preset)
    );
  const features = {
    // Add experimental configs here...
    respectDefaultRingColorOpacity: {
      theme: {
        ringColor: ({ theme }) => ({
          DEFAULT: "#3b82f67f",
          ...theme("colors"),
        }),
      },
    },
    disableColorOpacityUtilitiesByDefault: {
      corePlugins: {
        backgroundOpacity: false,
        borderOpacity: false,
        divideOpacity: false,
        placeholderOpacity: false,
        ringOpacity: false,
        textOpacity: false,
      },
    },
  };
  const experimentals = Object.keys(features)
    .filter((feature) => flagEnabled(config, feature))
    .map((feature) => features[feature]);
  return [config, ...experimentals, ...configs];
}

// node_modules/tailwindcss/src/public/resolve-config.js
function resolveConfig2(...configs) {
  let [, ...defaultConfigs] = getAllConfigs(configs[0]);
  return resolveConfig([...configs, ...defaultConfigs]);
}

// node_modules/tailwindcss-language-service/dist/tailwindcss-language-service.esm.js
import dlv3 from "dlv";

// node_modules/culori/build/culori.js
var parseNumber = function (color2, len) {
  if (typeof color2 !== "number") {
    return;
  }
  if (len === 3) {
    return {
      mode: "rgb",
      r: (((color2 >> 8) & 15) | ((color2 >> 4) & 240)) / 255,
      g: (((color2 >> 4) & 15) | (color2 & 240)) / 255,
      b: ((color2 & 15) | ((color2 << 4) & 240)) / 255,
    };
  }
  if (len === 4) {
    return {
      mode: "rgb",
      r: (((color2 >> 12) & 15) | ((color2 >> 8) & 240)) / 255,
      g: (((color2 >> 8) & 15) | ((color2 >> 4) & 240)) / 255,
      b: (((color2 >> 4) & 15) | (color2 & 240)) / 255,
      alpha: ((color2 & 15) | ((color2 << 4) & 240)) / 255,
    };
  }
  if (len === 6) {
    return {
      mode: "rgb",
      r: ((color2 >> 16) & 255) / 255,
      g: ((color2 >> 8) & 255) / 255,
      b: (color2 & 255) / 255,
    };
  }
  if (len === 8) {
    return {
      mode: "rgb",
      r: ((color2 >> 24) & 255) / 255,
      g: ((color2 >> 16) & 255) / 255,
      b: ((color2 >> 8) & 255) / 255,
      alpha: (color2 & 255) / 255,
    };
  }
};
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  // Added in CSS Colors Level 4:
  // https://drafts.csswg.org/css-color/#changes-from-3
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074,
};
var parseNamed = function (color2) {
  return parseNumber(named[color2.toLowerCase()], 6);
};
var num = (/([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)/ + "").replace(/^\/|\/$/g, "");
var per = num + "%";
var num_per = "(?:" + num + "%|" + num + ")";
var hue$2 = "(?:" + num + "(deg|grad|rad|turn)|" + num + ")";
var c = "\\s*,\\s*";
var so = "\\s*";
var s = "\\s+";
var rgb_num_old = new RegExp(
  "^rgba?\\(\\s*" +
    num +
    c +
    num +
    c +
    num +
    "\\s*(?:,\\s*" +
    num_per +
    "\\s*)?\\)$"
);
var rgb_per_old = new RegExp(
  "^rgba?\\(\\s*" +
    per +
    c +
    per +
    c +
    per +
    "\\s*(?:,\\s*" +
    num_per +
    "\\s*)?\\)$"
);
var rgb_num_new = new RegExp(
  "^rgba?\\(\\s*" +
    num +
    s +
    num +
    s +
    num +
    "\\s*(?:\\/\\s*" +
    num_per +
    "\\s*)?\\)$"
);
var rgb_per_new = new RegExp(
  "^rgba?\\(\\s*" +
    per +
    s +
    per +
    s +
    per +
    "\\s*(?:\\/\\s*" +
    num_per +
    "\\s*)?\\)$"
);
var hsl_old = new RegExp(
  "^hsla?\\(\\s*" +
    hue$2 +
    c +
    per +
    c +
    per +
    "\\s*(?:,\\s*" +
    num_per +
    "\\s*)?\\)$"
);
var hsl_new = new RegExp(
  "^hsla?\\(\\s*" +
    hue$2 +
    s +
    per +
    s +
    per +
    "\\s*(?:\\/\\s*" +
    num_per +
    "\\s*)?\\)$"
);
var hex = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i;
var hwb$1 = new RegExp(
  "^hwb\\(\\s*" +
    hue$2 +
    s +
    per +
    s +
    per +
    "\\s*(?:\\/\\s*" +
    num_per +
    "\\s*)?\\)$"
);
var lab$1 = new RegExp(
  "^lab\\(\\s*" +
    num +
    "%?" +
    s +
    num +
    s +
    num +
    "\\s*(?:\\/\\s*" +
    num_per +
    "\\s*)?\\)$"
);
var lch$1 = new RegExp(
  "^lch\\(\\s*" +
    num +
    "%?" +
    s +
    num +
    s +
    hue$2 +
    "\\s*(?:\\/\\s*" +
    num_per +
    "\\s*)?\\)$"
);
var profiled = new RegExp(
  "^color\\(" +
    so +
    "([a-z0-9\\-]+)" +
    s +
    num_per +
    s +
    num_per +
    s +
    num_per +
    so +
    "(?:\\/" +
    so +
    num_per +
    so +
    ")?\\)$"
);
var parseHex = function (color2) {
  var match;
  return (match = color2.match(hex))
    ? parseNumber(parseInt(match[1], 16), match[1].length)
    : void 0;
};
var parseRgb = function (color2) {
  var match, res;
  if ((match = color2.match(rgb_num_old) || color2.match(rgb_num_new))) {
    res = {
      mode: "rgb",
      r: match[1] / 255,
      g: match[2] / 255,
      b: match[3] / 255,
    };
  } else if ((match = color2.match(rgb_per_old) || color2.match(rgb_per_new))) {
    res = {
      mode: "rgb",
      r: match[1] / 100,
      g: match[2] / 100,
      b: match[3] / 100,
    };
  } else {
    return void 0;
  }
  if (match[4] !== void 0) {
    res.alpha = match[4] / 100;
  } else if (match[5] !== void 0) {
    res.alpha = +match[5];
  }
  return res;
};
var parseTransparent = function (c4) {
  return c4 === "transparent" ? parseNumber(0, 8) : void 0;
};
var lerp$1 = function (a, b, t) {
  return a + t * (b - a);
};
var get_classes = function (arr) {
  var classes = [];
  for (var i = 0; i < arr.length - 1; i++) {
    var a = arr[i];
    var b = arr[i + 1];
    if (a === void 0 && b === void 0) {
      classes.push(void 0);
    } else if (a !== void 0 && b !== void 0) {
      classes.push([a, b]);
    } else {
      classes.push(a !== void 0 ? [a, a] : [b, b]);
    }
  }
  return classes;
};
var interpolatorPiecewise = function (interpolator) {
  return function (arr) {
    var classes = get_classes(arr);
    return function (t) {
      var cls = t * classes.length;
      var idx = t >= 1 ? classes.length - 1 : Math.max(Math.floor(cls), 0);
      var pair = classes[idx];
      return pair === void 0
        ? void 0
        : interpolator(pair[0], pair[1], cls - idx);
    };
  };
};
var interpolatorLinear = interpolatorPiecewise(lerp$1);
var fixupAlpha = function (arr) {
  var some_defined = false;
  var res = arr.map(function (v) {
    if (v !== void 0) {
      some_defined = true;
      return v;
    }
    return 1;
  });
  return some_defined ? res : arr;
};
var definition$p = {
  mode: "rgb",
  channels: ["r", "g", "b", "alpha"],
  parsers: [parseHex, parseRgb, parseNamed, parseTransparent, "srgb"],
  serialize: "color(srgb ",
  interpolate: {
    r: interpolatorLinear,
    g: interpolatorLinear,
    b: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha },
  },
};
var fn$3 = function (c4) {
  var abs = Math.abs(c4);
  if (abs < 0.04045) {
    return c4 / 12.92;
  }
  return (Math.sign(c4) || 1) * Math.pow((abs + 0.055) / 1.055, 2.4);
};
var convertRgbToLrgb = function (ref) {
  var r2 = ref.r;
  var g = ref.g;
  var b = ref.b;
  var alpha = ref.alpha;
  var res = {
    mode: "lrgb",
    r: fn$3(r2),
    g: fn$3(g),
    b: fn$3(b),
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var fn$2 = function (c4) {
  var abs = Math.abs(c4);
  if (abs > 31308e-7) {
    return (Math.sign(c4) || 1) * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055);
  }
  return c4 * 12.92;
};
var convertLrgbToRgb = function (ref, mode) {
  var r2 = ref.r;
  var g = ref.g;
  var b = ref.b;
  var alpha = ref.alpha;
  if (mode === void 0) mode = "rgb";
  var res = {
    mode,
    r: fn$2(r2),
    g: fn$2(g),
    b: fn$2(b),
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var definition$o = Object.assign({}, definition$p, {
  mode: "lrgb",
  output: {
    rgb: convertLrgbToRgb,
  },
  input: {
    rgb: convertRgbToLrgb,
  },
  parsers: ["--srgb-linear"],
  serialize: "color(--srgb-linear ",
});
var linearize$2 = function (v) {
  return Math.pow(Math.abs(v), 563 / 256) * Math.sign(v);
};
var convertA98ToXyz65 = function (a982) {
  var r2 = linearize$2(a982.r);
  var g = linearize$2(a982.g);
  var b = linearize$2(a982.b);
  var res = {
    mode: "xyz65",
    x:
      0.5766690429101305 * r2 + 0.1855582379065463 * g + 0.1882286462349947 * b,
    y:
      0.29734497525053605 * r2 +
      0.6273635662554661 * g +
      0.07529145849399788 * b,
    z:
      0.02703136138641234 * r2 +
      0.07068885253582723 * g +
      0.9913375368376388 * b,
  };
  if (a982.alpha !== void 0) {
    res.alpha = a982.alpha;
  }
  return res;
};
var gamma$2 = function (v) {
  return Math.pow(Math.abs(v), 256 / 563) * Math.sign(v);
};
var convertXyz65ToA98 = function (ref) {
  var x = ref.x;
  var y = ref.y;
  var z = ref.z;
  var alpha = ref.alpha;
  var res = {
    mode: "a98",
    r: gamma$2(
      x * 2.0415879038107465 - y * 0.5650069742788596 - 0.34473135077832956 * z
    ),
    g: gamma$2(
      x * -0.9692436362808795 + y * 1.8759675015077202 + 0.04155505740717557 * z
    ),
    b: gamma$2(
      x * 0.013444280632031142 -
        y * 0.11836239223101838 +
        1.0151749943912054 * z
    ),
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertRgbToXyz65 = function (rgb2) {
  var ref = convertRgbToLrgb(rgb2);
  var r2 = ref.r;
  var g = ref.g;
  var b = ref.b;
  var alpha = ref.alpha;
  var res = {
    mode: "xyz65",
    x: 0.4124564 * r2 + 0.3575761 * g + 0.1804375 * b,
    y: 0.2126729 * r2 + 0.7151522 * g + 0.072175 * b,
    z: 0.0193339 * r2 + 0.119192 * g + 0.9503041 * b,
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertXyz65ToRgb = function (ref) {
  var x = ref.x;
  var y = ref.y;
  var z = ref.z;
  var alpha = ref.alpha;
  var res = convertLrgbToRgb({
    r: x * 3.2404542 - y * 1.5371385 - 0.4985314 * z,
    g: x * -0.969266 + y * 1.8760108 + 0.041556 * z,
    b: x * 0.0556434 - y * 0.2040259 + 1.0572252 * z,
  });
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var definition$n = Object.assign({}, definition$p, {
  mode: "a98",
  parsers: ["a98-rgb"],
  serialize: "color(a98-rgb ",
  input: {
    rgb: function (color2) {
      return convertXyz65ToA98(convertRgbToXyz65(color2));
    },
    xyz65: convertXyz65ToA98,
  },
  output: {
    rgb: function (color2) {
      return convertXyz65ToRgb(convertA98ToXyz65(color2));
    },
    xyz65: convertA98ToXyz65,
  },
});
var convertP3ToXyz65 = function (rgb2) {
  var ref = convertRgbToLrgb(rgb2);
  var r2 = ref.r;
  var g = ref.g;
  var b = ref.b;
  var alpha = ref.alpha;
  var res = {
    mode: "xyz65",
    x: 0.4865709 * r2 + 0.2656676 * g + 0.1982172 * b,
    y: 0.2289745 * r2 + 0.6917385 * g + 0.0792869 * b,
    z: 0 * r2 + 0.0451133 * g + 1.0439443 * b,
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertXyz65ToP3 = function (ref) {
  var x = ref.x;
  var y = ref.y;
  var z = ref.z;
  var alpha = ref.alpha;
  var res = convertLrgbToRgb(
    {
      r: x * 2.4934969 - y * 0.9313836 - 0.4027107 * z,
      g: x * -0.8294889 + y * 1.762664 + 0.0236246 * z,
      b: x * 0.0358458 - y * 0.0761723 + 0.9568845 * z,
    },
    "p3"
  );
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var definition$m = Object.assign({}, definition$p, {
  mode: "p3",
  parsers: ["display-p3"],
  serialize: "color(display-p3 ",
  input: {
    rgb: function (color2) {
      return convertXyz65ToP3(convertRgbToXyz65(color2));
    },
    xyz65: convertXyz65ToP3,
  },
  output: {
    rgb: function (color2) {
      return convertXyz65ToRgb(convertP3ToXyz65(color2));
    },
    xyz65: convertP3ToXyz65,
  },
});
var gamma$1 = function (v) {
  var abs = Math.abs(v);
  if (abs >= 1 / 512) {
    return Math.sign(v) * Math.pow(abs, 1 / 1.8);
  }
  return 16 * v;
};
var convertXyzToProphoto = function (ref) {
  var x = ref.x;
  var y = ref.y;
  var z = ref.z;
  var alpha = ref.alpha;
  var res = {
    mode: "prophoto",
    r: gamma$1(
      x * 1.3457989731028281 - y * 0.25558010007997534 - 0.05110628506753401 * z
    ),
    g: gamma$1(
      x * -0.5446224939028347 + y * 1.5082327413132781 + 0.02053603239147973 * z
    ),
    b: gamma$1(x * 0 + y * 0 + 1.2119675456389454 * z),
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var linearize$1 = function (v) {
  var abs = Math.abs(v);
  if (abs >= 16 / 512) {
    return Math.sign(v) * Math.pow(abs, 1.8);
  }
  return v / 16;
};
var convertProphotoToXyz = function (prophoto2) {
  var r2 = linearize$1(prophoto2.r);
  var g = linearize$1(prophoto2.g);
  var b = linearize$1(prophoto2.b);
  var res = {
    mode: "xyz65",
    x:
      0.7977604896723027 * r2 +
      0.13518583717574031 * g +
      0.0313493495815248 * b,
    y:
      0.2880711282292934 * r2 +
      0.7118432178101014 * g +
      8565396060525902e-20 * b,
    z: 0 * r2 + 0 * g + 0.8251046025104601 * b,
  };
  if (prophoto2.alpha !== void 0) {
    res.alpha = prophoto2.alpha;
  }
  return res;
};
var convertXyzToRgb = function (ref) {
  var x = ref.x;
  var y = ref.y;
  var z = ref.z;
  var alpha = ref.alpha;
  var res = convertLrgbToRgb({
    r: x * 3.1338561 - y * 1.6168667 - 0.4906146 * z,
    g: x * -0.9787684 + y * 1.9161415 + 0.033454 * z,
    b: x * 0.0719453 - y * 0.2289914 + 1.4052427 * z,
  });
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertRgbToXyz = function (rgb2) {
  var ref = convertRgbToLrgb(rgb2);
  var r2 = ref.r;
  var g = ref.g;
  var b = ref.b;
  var alpha = ref.alpha;
  var res = {
    mode: "xyz",
    x: 0.4360747 * r2 + 0.3850649 * g + 0.1430804 * b,
    y: 0.2225045 * r2 + 0.7168786 * g + 0.0606169 * b,
    z: 0.0139322 * r2 + 0.0971045 * g + 0.7141733 * b,
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var definition$l = Object.assign({}, definition$p, {
  mode: "prophoto",
  parsers: ["prophoto-rgb"],
  serialize: "color(prophoto-rgb ",
  input: {
    xyz: convertXyzToProphoto,
    rgb: function (color2) {
      return convertXyzToProphoto(convertRgbToXyz(color2));
    },
  },
  output: {
    xyz: convertProphotoToXyz,
    rgb: function (color2) {
      return convertXyzToRgb(convertProphotoToXyz(color2));
    },
  },
});
var α$1 = 1.09929682680944;
var β$1 = 0.018053968510807;
var gamma = function (v) {
  var abs = Math.abs(v);
  if (abs > β$1) {
    return (Math.sign(v) || 1) * (α$1 * Math.pow(abs, 0.45) - (α$1 - 1));
  }
  return 4.5 * v;
};
var convertXyz65ToRec2020 = function (ref) {
  var x = ref.x;
  var y = ref.y;
  var z = ref.z;
  var alpha = ref.alpha;
  var res = {
    mode: "rec2020",
    r: gamma(
      x * 1.7166511879712674 - y * 0.35567078377639233 - 0.25336628137365974 * z
    ),
    g: gamma(
      x * -0.6666843518324892 + y * 1.6164812366349395 + 0.01576854581391113 * z
    ),
    b: gamma(
      x * 0.017639857445310783 -
        y * 0.042770613257808524 +
        0.9421031212354738 * z
    ),
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var α = 1.09929682680944;
var β = 0.018053968510807;
var linearize = function (v) {
  var abs = Math.abs(v);
  if (abs < β * 4.5) {
    return v / 4.5;
  }
  return (Math.sign(v) || 1) * Math.pow((abs + α - 1) / α, 1 / 0.45);
};
var convertRec2020ToXyz65 = function (rec20202) {
  var r2 = linearize(rec20202.r);
  var g = linearize(rec20202.g);
  var b = linearize(rec20202.b);
  var res = {
    mode: "xyz65",
    x:
      0.6369580483012914 * r2 +
      0.14461690358620832 * g +
      0.1688809751641721 * b,
    y:
      0.2627002120112671 * r2 +
      0.6779980715188708 * g +
      0.05930171646986196 * b,
    z: 0 * r2 + 0.028072693049087428 * g + 1.060985057710791 * b,
  };
  if (rec20202.alpha !== void 0) {
    res.alpha = rec20202.alpha;
  }
  return res;
};
var definition$k = Object.assign({}, definition$p, {
  mode: "rec2020",
  input: {
    xyz: convertXyz65ToRec2020,
    rgb: function (color2) {
      return convertXyz65ToRec2020(convertRgbToXyz65(color2));
    },
  },
  output: {
    xyz: convertRec2020ToXyz65,
    rgb: function (color2) {
      return convertXyz65ToRgb(convertRec2020ToXyz65(color2));
    },
  },
  parsers: ["rec2020"],
  serialize: "color(rec2020 ",
});
var normalizeHue = function (hue2) {
  return (hue2 = hue2 % 360) < 0 ? hue2 + 360 : hue2;
};
function convertHslToRgb(ref) {
  var h = ref.h;
  var s2 = ref.s;
  var l = ref.l;
  var alpha = ref.alpha;
  h = normalizeHue(h);
  var m1 = l + s2 * (l < 0.5 ? l : 1 - l);
  var m2 = m1 - (m1 - l) * 2 * Math.abs(((h / 60) % 2) - 1);
  var res;
  switch (Math.floor(h / 60)) {
    case 0:
      res = { r: m1, g: m2, b: 2 * l - m1 };
      break;
    case 1:
      res = { r: m2, g: m1, b: 2 * l - m1 };
      break;
    case 2:
      res = { r: 2 * l - m1, g: m1, b: m2 };
      break;
    case 3:
      res = { r: 2 * l - m1, g: m2, b: m1 };
      break;
    case 4:
      res = { r: m2, g: 2 * l - m1, b: m1 };
      break;
    case 5:
      res = { r: m1, g: 2 * l - m1, b: m2 };
      break;
    default:
      res = { r: 2 * l - m1, g: 2 * l - m1, b: 2 * l - m1 };
  }
  res.mode = "rgb";
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
}
function convertRgbToHsl(ref) {
  var r2 = ref.r;
  var g = ref.g;
  var b = ref.b;
  var alpha = ref.alpha;
  var M2 = Math.max(r2, g, b),
    m = Math.min(r2, g, b);
  var res = {
    mode: "hsl",
    s: M2 === m ? 0 : (M2 - m) / (1 - Math.abs(M2 + m - 1)),
    l: 0.5 * (M2 + m),
  };
  if (M2 - m !== 0) {
    res.h =
      (M2 === r2
        ? (g - b) / (M2 - m) + (g < b) * 6
        : M2 === g
        ? (b - r2) / (M2 - m) + 2
        : (r2 - g) / (M2 - m) + 4) * 60;
  }
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
}
var hue$1 = function (val, unit) {
  switch (unit) {
    case "deg":
      return +val;
    case "rad":
      return (val / Math.PI) * 180;
    case "grad":
      return (val / 10) * 9;
    case "turn":
      return val * 360;
  }
};
var parseHsl = function (color2) {
  var match = color2.match(hsl_old) || color2.match(hsl_new);
  if (!match) {
    return;
  }
  var res = {
    mode: "hsl",
    h: match[3] === void 0 ? hue$1(match[1], match[2]) : +match[3],
    s: Math.min(Math.max(0, match[4] / 100), 1),
    l: Math.min(Math.max(0, match[5] / 100), 1),
  };
  if (match[6] !== void 0) {
    res.alpha = match[6] / 100;
  } else if (match[7] !== void 0) {
    res.alpha = +match[7];
  }
  return res;
};
var hue = function (hues, fn2) {
  return hues
    .map(function (hue2, idx, arr) {
      if (hue2 === void 0) {
        return hue2;
      }
      var normalized = normalizeHue(hue2);
      if (idx === 0 || hues[idx - 1] === void 0) {
        return normalized;
      }
      return fn2(normalized - normalizeHue(arr[idx - 1]));
    })
    .reduce(function (acc, curr) {
      if (!acc.length || curr === void 0 || acc[acc.length - 1] === void 0) {
        acc.push(curr);
        return acc;
      }
      acc.push(curr + acc[acc.length - 1]);
      return acc;
    }, []);
};
var fixupHueShorter = function (arr) {
  return hue(arr, function (d) {
    return Math.abs(d) <= 180 ? d : d - 360 * Math.sign(d);
  });
};
var converters = {};
var modes = {};
var parsers = [];
var colorProfiles = {};
var identity = function (v) {
  return v;
};
var defineMode = function (definition2) {
  converters[definition2.mode] = Object.assign(
    converters[definition2.mode] || {},
    definition2.output
  );
  Object.keys(definition2.input || {}).forEach(function (k2) {
    if (!converters[k2]) {
      converters[k2] = {};
    }
    converters[k2][definition2.mode] = definition2.input[k2];
  });
  if (!definition2.ranges) {
    definition2.ranges = {};
  }
  if (!definition2.difference) {
    definition2.difference = {};
  }
  definition2.channels.forEach(function (channel) {
    if (definition2.ranges[channel] === void 0) {
      definition2.ranges[channel] = [0, 1];
    }
    if (!definition2.interpolate[channel]) {
      throw new Error("Missing interpolator for: " + channel);
    }
    if (typeof definition2.interpolate[channel] === "function") {
      definition2.interpolate[channel] = {
        use: definition2.interpolate[channel],
      };
    }
    if (!definition2.interpolate[channel].fixup) {
      definition2.interpolate[channel].fixup = identity;
    }
  });
  modes[definition2.mode] = definition2;
  (definition2.parsers || []).forEach(function (parser4) {
    if (typeof parser4 === "function") {
      parsers.push(parser4);
    } else if (typeof parser4 === "string") {
      colorProfiles[parser4] = definition2.mode;
    }
  });
};
var getModeDefinition = function (mode) {
  return modes[mode];
};
var parseColorSyntax = function (color2) {
  var m = color2.match(profiled);
  if (!m) {
    return void 0;
  }
  var mode = colorProfiles[m[1]];
  if (!mode) {
    return void 0;
  }
  var res = { mode };
  var i = 2;
  getModeDefinition(mode).channels.forEach(function (ch) {
    if (m[i] !== void 0 || m[i + 1] !== void 0) {
      res[ch] = m[i] !== void 0 ? m[i] / 100 : +m[i + 1];
    }
    i += 2;
  });
  return res;
};
var parse = function (color2) {
  if (typeof color2 !== "string") {
    return void 0;
  }
  var result = void 0;
  var i = 0;
  var len = parsers.length;
  while (i < len) {
    if ((result = parsers[i++](color2)) !== void 0) {
      break;
    }
  }
  return result || parseColorSyntax(color2);
};
var prepare = function (color2, mode) {
  return color2 === void 0
    ? void 0
    : typeof color2 !== "object"
    ? parse(color2)
    : color2.mode !== void 0
    ? color2
    : mode
    ? Object.assign({}, color2, { mode })
    : void 0;
};
var converter = function (target_mode) {
  if (target_mode === void 0) target_mode = "rgb";
  return function (color2) {
    return (color2 = prepare(color2, target_mode)) !== void 0
      ? // if the color's mode corresponds to our target mode
        color2.mode === target_mode
        ? // then just return the color
          color2
        : // otherwise check to see if we have a dedicated
        // converter for the target mode
        converters[color2.mode][target_mode]
        ? // and return its result...
          converters[color2.mode][target_mode](color2)
        : // ...otherwise pass through RGB as an intermediary step.
        // if the target mode is RGB...
        target_mode === "rgb"
        ? // just return the RGB
          converters[color2.mode].rgb(color2)
        : // otherwise convert color.mode -> RGB -> target_mode
          converters.rgb[target_mode](converters[color2.mode].rgb(color2))
      : void 0;
  };
};
var differenceHueSaturation = function (std, smp) {
  if (std.h === void 0 || smp.h === void 0 || !std.s || !smp.s) {
    return 0;
  }
  var std_h = normalizeHue(std.h);
  var smp_h = normalizeHue(smp.h);
  var dH = Math.sin((((smp_h - std_h + 360) / 2) * Math.PI) / 180);
  return 2 * Math.sqrt(std.s * smp.s) * dH;
};
var differenceHueNaive = function (std, smp) {
  if (std.h === void 0 || smp.h === void 0) {
    return 0;
  }
  var std_h = normalizeHue(std.h);
  var smp_h = normalizeHue(smp.h);
  if (Math.abs(smp_h - std_h) > 180) {
    return std_h - (smp_h - 360 * Math.sign(smp_h - std_h));
  }
  return smp_h - std_h;
};
var differenceHueChroma = function (std, smp) {
  if (std.h === void 0 || smp.h === void 0 || !std.c || !smp.c) {
    return 0;
  }
  var std_h = normalizeHue(std.h);
  var smp_h = normalizeHue(smp.h);
  var dH = Math.sin((((smp_h - std_h + 360) / 2) * Math.PI) / 180);
  return 2 * Math.sqrt(std.c * smp.c) * dH;
};
var averageAngle = function (val) {
  var sum = val.reduce(
    function (sum2, val2) {
      if (val2 !== void 0) {
        var rad = (val2 * Math.PI) / 180;
        sum2.sin += Math.sin(rad);
        sum2.cos += Math.cos(rad);
      }
      return sum2;
    },
    { sin: 0, cos: 0 }
  );
  return (Math.atan2(sum.sin, sum.cos) * 180) / Math.PI;
};
var definition$j = {
  mode: "hsl",
  output: {
    rgb: convertHslToRgb,
  },
  input: {
    rgb: convertRgbToHsl,
  },
  channels: ["h", "s", "l", "alpha"],
  ranges: {
    h: [0, 360],
  },
  parsers: [parseHsl],
  serialize: function (c4) {
    return (
      "hsl(" +
      (c4.h || 0) +
      " " +
      c4.s * 100 +
      "% " +
      c4.l * 100 +
      "%" +
      (c4.alpha < 1 ? " / " + c4.alpha : "") +
      ")"
    );
  },
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    s: interpolatorLinear,
    l: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha },
  },
  difference: {
    h: differenceHueSaturation,
  },
  average: {
    h: averageAngle,
  },
};
function convertHsvToRgb(ref) {
  var h = ref.h;
  var s2 = ref.s;
  var v = ref.v;
  var alpha = ref.alpha;
  h = normalizeHue(h);
  var f2 = Math.abs(((h / 60) % 2) - 1);
  var res;
  switch (Math.floor(h / 60)) {
    case 0:
      res = { r: v, g: v * (1 - s2 * f2), b: v * (1 - s2) };
      break;
    case 1:
      res = { r: v * (1 - s2 * f2), g: v, b: v * (1 - s2) };
      break;
    case 2:
      res = { r: v * (1 - s2), g: v, b: v * (1 - s2 * f2) };
      break;
    case 3:
      res = { r: v * (1 - s2), g: v * (1 - s2 * f2), b: v };
      break;
    case 4:
      res = { r: v * (1 - s2 * f2), g: v * (1 - s2), b: v };
      break;
    case 5:
      res = { r: v, g: v * (1 - s2), b: v * (1 - s2 * f2) };
      break;
    default:
      res = { r: v * (1 - s2), g: v * (1 - s2), b: v * (1 - s2) };
  }
  res.mode = "rgb";
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
}
function convertRgbToHsv(ref) {
  var r2 = ref.r;
  var g = ref.g;
  var b = ref.b;
  var alpha = ref.alpha;
  var M2 = Math.max(r2, g, b),
    m = Math.min(r2, g, b);
  var res = {
    mode: "hsv",
    s: M2 === 0 ? 0 : 1 - m / M2,
    v: M2,
  };
  if (M2 - m !== 0) {
    res.h =
      (M2 === r2
        ? (g - b) / (M2 - m) + (g < b) * 6
        : M2 === g
        ? (b - r2) / (M2 - m) + 2
        : (r2 - g) / (M2 - m) + 4) * 60;
  }
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
}
var definition$i = {
  mode: "hsv",
  output: {
    rgb: convertHsvToRgb,
  },
  parsers: ["--hsv"],
  serialize: "color(--hsv ",
  input: {
    rgb: convertRgbToHsv,
  },
  channels: ["h", "s", "v", "alpha"],
  ranges: {
    h: [0, 360],
  },
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    s: interpolatorLinear,
    v: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha },
  },
  difference: {
    h: differenceHueSaturation,
  },
  average: {
    h: averageAngle,
  },
};
function convertHsiToRgb(ref) {
  var h = ref.h;
  var s2 = ref.s;
  var i = ref.i;
  var alpha = ref.alpha;
  h = normalizeHue(h);
  var f2 = Math.abs(((h / 60) % 2) - 1);
  var res;
  switch (Math.floor(h / 60)) {
    case 0:
      res = {
        r: i * (1 + s2 * (3 / (2 - f2) - 1)),
        g: i * (1 + s2 * ((3 * (1 - f2)) / (2 - f2) - 1)),
        b: i * (1 - s2),
      };
      break;
    case 1:
      res = {
        r: i * (1 + s2 * ((3 * (1 - f2)) / (2 - f2) - 1)),
        g: i * (1 + s2 * (3 / (2 - f2) - 1)),
        b: i * (1 - s2),
      };
      break;
    case 2:
      res = {
        r: i * (1 - s2),
        g: i * (1 + s2 * (3 / (2 - f2) - 1)),
        b: i * (1 + s2 * ((3 * (1 - f2)) / (2 - f2) - 1)),
      };
      break;
    case 3:
      res = {
        r: i * (1 - s2),
        g: i * (1 + s2 * ((3 * (1 - f2)) / (2 - f2) - 1)),
        b: i * (1 + s2 * (3 / (2 - f2) - 1)),
      };
      break;
    case 4:
      res = {
        r: i * (1 + s2 * ((3 * (1 - f2)) / (2 - f2) - 1)),
        g: i * (1 - s2),
        b: i * (1 + s2 * (3 / (2 - f2) - 1)),
      };
      break;
    case 5:
      res = {
        r: i * (1 + s2 * (3 / (2 - f2) - 1)),
        g: i * (1 - s2),
        b: i * (1 + s2 * ((3 * (1 - f2)) / (2 - f2) - 1)),
      };
      break;
    default:
      res = { r: i * (1 - s2), g: i * (1 - s2), b: i * (1 - s2) };
  }
  res.mode = "rgb";
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
}
function convertRgbToHsi(ref) {
  var r2 = ref.r;
  var g = ref.g;
  var b = ref.b;
  var alpha = ref.alpha;
  var M2 = Math.max(r2, g, b),
    m = Math.min(r2, g, b);
  var res = {
    mode: "hsi",
    s: r2 + g + b === 0 ? 0 : 1 - (3 * m) / (r2 + g + b),
    i: (r2 + g + b) / 3,
  };
  if (M2 - m !== 0) {
    res.h =
      (M2 === r2
        ? (g - b) / (M2 - m) + (g < b) * 6
        : M2 === g
        ? (b - r2) / (M2 - m) + 2
        : (r2 - g) / (M2 - m) + 4) * 60;
  }
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
}
var definition$h = {
  mode: "hsi",
  output: {
    rgb: convertHsiToRgb,
  },
  parsers: ["--hsi"],
  serialize: "color(--hsi ",
  input: {
    rgb: convertRgbToHsi,
  },
  channels: ["h", "s", "i", "alpha"],
  ranges: {
    h: [0, 360],
  },
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    s: interpolatorLinear,
    i: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha },
  },
  difference: {
    h: differenceHueSaturation,
  },
  average: {
    h: averageAngle,
  },
};
function convertHwbToRgb(ref) {
  var h = ref.h;
  var w = ref.w;
  var b = ref.b;
  var alpha = ref.alpha;
  if (w + b > 1) {
    var s2 = w + b;
    w /= s2;
    b /= s2;
  }
  return convertHsvToRgb({
    h,
    s: b === 1 ? 1 : 1 - w / (1 - b),
    v: 1 - b,
    alpha,
  });
}
function convertRgbToHwb(rgba) {
  var hsv2 = convertRgbToHsv(rgba);
  if (hsv2 === void 0) {
    return void 0;
  }
  var res = {
    mode: "hwb",
    w: (1 - hsv2.s) * hsv2.v,
    b: 1 - hsv2.v,
  };
  if (hsv2.h !== void 0) {
    res.h = hsv2.h;
  }
  if (hsv2.alpha !== void 0) {
    res.alpha = hsv2.alpha;
  }
  return res;
}
var parseHwb = function (color2) {
  var match = color2.match(hwb$1);
  if (!match) {
    return void 0;
  }
  var res = {
    mode: "hwb",
    h: match[3] === void 0 ? hue$1(match[1], match[2]) : +match[3],
    w: match[4] / 100,
    b: match[5] / 100,
  };
  if (match[6] !== void 0) {
    res.alpha = match[6] / 100;
  } else if (match[7] !== void 0) {
    res.alpha = +match[7];
  }
  return res;
};
var definition$g = {
  mode: "hwb",
  output: {
    rgb: convertHwbToRgb,
  },
  input: {
    rgb: convertRgbToHwb,
  },
  channels: ["h", "w", "b", "alpha"],
  ranges: {
    h: [0, 360],
  },
  parsers: [parseHwb],
  serialize: function (c4) {
    return (
      "hwb(" +
      (c4.h || 0) +
      " " +
      c4.w * 100 +
      "% " +
      c4.b * 100 +
      "%" +
      (c4.alpha < 1 ? " / " + c4.alpha : "") +
      ")"
    );
  },
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    w: interpolatorLinear,
    b: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha },
  },
  difference: {
    h: differenceHueNaive,
  },
  average: {
    h: averageAngle,
  },
};
var n$1 = 0.1593017578125;
var p$1 = 134.03437499999998;
var c1$1 = 0.8359375;
var c2$1 = 18.8515625;
var c3$1 = 18.6875;
var d0$1 = 16295499532821565e-27;
var pq = function (v) {
  var vn2 = Math.pow(v / 1e4, n$1);
  return Math.pow((c1$1 + c2$1 * vn2) / (1 + c3$1 * vn2), p$1) || 0;
};
var abs$1 = function (v) {
  return Math.max(v * 203, 0);
};
var convertXyz65ToJab = function (ref) {
  var x = ref.x;
  var y = ref.y;
  var z = ref.z;
  var alpha = ref.alpha;
  x = abs$1(x);
  y = abs$1(y);
  z = abs$1(z);
  var xp = 1.15 * x - 0.15 * z;
  var yp = 0.66 * y + 0.34 * x;
  var l = pq(0.41478972 * xp + 0.579999 * yp + 0.014648 * z);
  var m = pq(-0.20151 * xp + 1.120649 * yp + 0.0531008 * z);
  var s2 = pq(-0.0166008 * xp + 0.2648 * yp + 0.6684799 * z);
  var i = (l + m) / 2;
  var res = {
    mode: "jab",
    j: (0.44 * i) / (1 - 0.56 * i) - d0$1,
    a: 3.524 * l - 4.066708 * m + 0.542708 * s2,
    b: 0.199076 * l + 1.096799 * m - 1.295875 * s2,
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var n = 0.1593017578125;
var p = 134.03437499999998;
var c1 = 0.8359375;
var c2 = 18.8515625;
var c3 = 18.6875;
var d0 = 16295499532821565e-27;
var pq_inv = function (v) {
  var vp = Math.pow(v, 1 / p);
  return 1e4 * Math.pow((c1 - vp) / (c3 * vp - c2), 1 / n) || 0;
};
var rel = function (v) {
  return v / 203;
};
var convertJabToXyz65 = function (ref) {
  var j = ref.j;
  var a = ref.a;
  var b = ref.b;
  var alpha = ref.alpha;
  var i = (j + d0) / (0.44 + 0.56 * (j + d0));
  var l = pq_inv(i + 0.13860504 * a + 0.058047316 * b);
  var m = pq_inv(i - 0.13860504 * a - 0.058047316 * b);
  var s2 = pq_inv(i - 0.096019242 * a - 0.8118919 * b);
  var res = {
    mode: "xyz65",
    x: rel(
      1.661373024652174 * l - 0.914523081304348 * m + 0.23136208173913045 * s2
    ),
    y: rel(
      -0.3250758611844533 * l + 1.571847026732543 * m - 0.21825383453227928 * s2
    ),
    z: rel(-0.090982811 * l - 0.31272829 * m + 1.5227666 * s2),
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertRgbToJab = function (rgb2) {
  var res = convertXyz65ToJab(convertRgbToXyz65(rgb2));
  if (rgb2.r === rgb2.b && rgb2.b === rgb2.g) {
    res.a = res.b = 0;
  }
  return res;
};
var convertJabToRgb = function (color2) {
  return convertXyz65ToRgb(convertJabToXyz65(color2));
};
var definition$f = {
  mode: "jab",
  channels: ["j", "a", "b", "alpha"],
  parsers: ["--jzazbz"],
  serialize: "color(--jzazbz ",
  input: {
    rgb: convertRgbToJab,
    xyz65: convertXyz65ToJab,
  },
  output: {
    rgb: convertJabToRgb,
    xyz65: convertJabToXyz65,
  },
  ranges: {
    j: [0, 0.222],
    a: [-0.109, 0.129],
    b: [-0.185, 0.134],
  },
  interpolate: {
    j: interpolatorLinear,
    a: interpolatorLinear,
    b: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha },
  },
};
var convertJabToJch = function (ref) {
  var j = ref.j;
  var a = ref.a;
  var b = ref.b;
  var alpha = ref.alpha;
  var c4 = Math.sqrt(a * a + b * b);
  var res = {
    mode: "jch",
    j,
    c: c4,
  };
  if (c4) {
    res.h = normalizeHue((Math.atan2(b, a) * 180) / Math.PI);
  }
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertJchToJab = function (ref) {
  var j = ref.j;
  var c4 = ref.c;
  var h = ref.h;
  var alpha = ref.alpha;
  var res = {
    mode: "jab",
    j,
    a: c4 ? c4 * Math.cos((h / 180) * Math.PI) : 0,
    b: c4 ? c4 * Math.sin((h / 180) * Math.PI) : 0,
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var definition$e = {
  mode: "jch",
  parsers: ["--jzczhz"],
  serialize: "color(--jzczhz ",
  output: {
    jab: convertJchToJab,
    rgb: function (c4) {
      return convertJabToRgb(convertJchToJab(c4));
    },
  },
  input: {
    rgb: function (c4) {
      return convertJabToJch(convertRgbToJab(c4));
    },
    jab: convertJabToJch,
  },
  channels: ["j", "c", "h", "alpha"],
  ranges: {
    j: [0, 0.221],
    c: [0, 0.19],
    h: [0, 360],
  },
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    c: interpolatorLinear,
    j: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha },
  },
  difference: {
    h: differenceHueChroma,
  },
  average: {
    h: averageAngle,
  },
};
var Xn$1 = 0.96422;
var Yn$1 = 1;
var Zn$1 = 0.82521;
var k$1 = Math.pow(29, 3) / Math.pow(3, 3);
var e$1 = Math.pow(6, 3) / Math.pow(29, 3);
var fn$1 = function (v) {
  return Math.pow(v, 3) > e$1 ? Math.pow(v, 3) : (116 * v - 16) / k$1;
};
var convertLabToXyz = function (ref) {
  var l = ref.l;
  var a = ref.a;
  var b = ref.b;
  var alpha = ref.alpha;
  var fy = (l + 16) / 116;
  var fx = a / 500 + fy;
  var fz = fy - b / 200;
  var res = {
    mode: "xyz",
    x: fn$1(fx) * Xn$1,
    y: fn$1(fy) * Yn$1,
    z: fn$1(fz) * Zn$1,
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertLabToRgb = function (lab2) {
  return convertXyzToRgb(convertLabToXyz(lab2));
};
var f$1 = function (value2) {
  return value2 > e$1 ? Math.cbrt(value2) : (k$1 * value2 + 16) / 116;
};
var convertXyzToLab = function (ref) {
  var x = ref.x;
  var y = ref.y;
  var z = ref.z;
  var alpha = ref.alpha;
  var f0 = f$1(x / Xn$1);
  var f1 = f$1(y / Yn$1);
  var f2 = f$1(z / Zn$1);
  var res = {
    mode: "lab",
    l: 116 * f1 - 16,
    a: 500 * (f0 - f1),
    b: 200 * (f1 - f2),
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertRgbToLab = function (rgb2) {
  var res = convertXyzToLab(convertRgbToXyz(rgb2));
  if (rgb2.r === rgb2.b && rgb2.b === rgb2.g) {
    res.a = res.b = 0;
  }
  return res;
};
var parseLab = function (color2) {
  var match = color2.match(lab$1);
  if (!match) {
    return void 0;
  }
  var res = {
    mode: "lab",
    l: +match[1],
    a: +match[2],
    b: +match[3],
  };
  if (match[4] !== void 0) {
    res.alpha = match[4] / 100;
  } else if (match[5] !== void 0) {
    res.alpha = +match[5];
  }
  return res;
};
var definition$d = {
  mode: "lab",
  output: {
    xyz: convertLabToXyz,
    rgb: convertLabToRgb,
  },
  input: {
    xyz: convertXyzToLab,
    rgb: convertRgbToLab,
  },
  channels: ["l", "a", "b", "alpha"],
  ranges: {
    l: [0, 100],
    a: [-79.287, 93.55],
    b: [-112.029, 93.388],
  },
  parsers: [parseLab],
  serialize: function (c4) {
    return (
      "lab(" +
      c4.l +
      "% " +
      c4.a +
      " " +
      c4.b +
      (c4.alpha < 1 ? " / " + c4.alpha : "") +
      ")"
    );
  },
  interpolate: {
    l: interpolatorLinear,
    a: interpolatorLinear,
    b: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha },
  },
};
var Xn = 0.95047;
var Yn = 1;
var Zn = 1.08883;
var k = Math.pow(29, 3) / Math.pow(3, 3);
var e = Math.pow(6, 3) / Math.pow(29, 3);
var fn = function (v) {
  return Math.pow(v, 3) > e ? Math.pow(v, 3) : (116 * v - 16) / k;
};
var convertLab65ToXyz65 = function (ref) {
  var l = ref.l;
  var a = ref.a;
  var b = ref.b;
  var alpha = ref.alpha;
  var fy = (l + 16) / 116;
  var fx = a / 500 + fy;
  var fz = fy - b / 200;
  var res = {
    mode: "xyz65",
    x: fn(fx) * Xn,
    y: fn(fy) * Yn,
    z: fn(fz) * Zn,
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertLab65ToRgb = function (lab2) {
  return convertXyz65ToRgb(convertLab65ToXyz65(lab2));
};
var f = function (value2) {
  return value2 > e ? Math.cbrt(value2) : (k * value2 + 16) / 116;
};
var convertXyz65ToLab65 = function (ref) {
  var x = ref.x;
  var y = ref.y;
  var z = ref.z;
  var alpha = ref.alpha;
  var f0 = f(x / Xn);
  var f1 = f(y / Yn);
  var f2 = f(z / Zn);
  var res = {
    mode: "lab65",
    l: 116 * f1 - 16,
    a: 500 * (f0 - f1),
    b: 200 * (f1 - f2),
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertRgbToLab65 = function (rgb2) {
  var res = convertXyz65ToLab65(convertRgbToXyz65(rgb2));
  if (rgb2.r === rgb2.b && rgb2.b === rgb2.g) {
    res.a = res.b = 0;
  }
  return res;
};
var definition$c = Object.assign({}, definition$d, {
  mode: "lab65",
  parsers: ["--lab-d65"],
  serialize: "color(--lab-d65 ",
  output: {
    xyz65: convertLab65ToXyz65,
    rgb: convertLab65ToRgb,
  },
  input: {
    xyz65: convertXyz65ToLab65,
    rgb: convertRgbToLab65,
  },
  ranges: {
    l: [0, 100],
    a: [-86.182, 98.234],
    b: [-107.86, 94.477],
  },
});
var convertLabToLch = function (ref, mode) {
  var l = ref.l;
  var a = ref.a;
  var b = ref.b;
  var alpha = ref.alpha;
  if (mode === void 0) mode = "lch";
  var c4 = Math.sqrt(a * a + b * b);
  var res = { mode, l, c: c4 };
  if (c4) {
    res.h = normalizeHue((Math.atan2(b, a) * 180) / Math.PI);
  }
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertLchToLab = function (ref, mode) {
  var l = ref.l;
  var c4 = ref.c;
  var h = ref.h;
  var alpha = ref.alpha;
  if (mode === void 0) mode = "lab";
  var res = {
    mode,
    l,
    a: c4 ? c4 * Math.cos((h / 180) * Math.PI) : 0,
    b: c4 ? c4 * Math.sin((h / 180) * Math.PI) : 0,
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var parseLch = function (color2) {
  var match = color2.match(lch$1);
  if (!match) {
    return void 0;
  }
  var res = {
    mode: "lch",
    l: +match[1],
    c: Math.max(0, +match[2]),
    h: match[5] === void 0 ? hue$1(match[3], match[4]) : +match[5],
  };
  if (match[6] !== void 0) {
    res.alpha = match[6] / 100;
  } else if (match[7] !== void 0) {
    res.alpha = +match[7];
  }
  return res;
};
var definition$b = {
  mode: "lch",
  output: {
    lab: convertLchToLab,
    rgb: function (c4) {
      return convertLabToRgb(convertLchToLab(c4));
    },
  },
  input: {
    rgb: function (c4) {
      return convertLabToLch(convertRgbToLab(c4));
    },
    lab: convertLabToLch,
  },
  channels: ["l", "c", "h", "alpha"],
  ranges: {
    l: [0, 100],
    c: [0, 131.207],
    h: [0, 360],
  },
  parsers: [parseLch],
  serialize: function (c4) {
    return (
      "lch(" +
      c4.l +
      "% " +
      c4.c +
      " " +
      (c4.h || 0) +
      (c4.alpha < 1 ? " / " + c4.alpha : "") +
      ")"
    );
  },
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    c: interpolatorLinear,
    l: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha },
  },
  difference: {
    h: differenceHueChroma,
  },
  average: {
    h: averageAngle,
  },
};
var definition$a = Object.assign({}, definition$b, {
  mode: "lch65",
  parsers: ["--lch-d65"],
  serialize: "color(--lch-d65 ",
  output: {
    lab65: function (c4) {
      return convertLchToLab(c4, "lab65");
    },
    rgb: function (c4) {
      return convertLab65ToRgb(convertLchToLab(c4, "lab65"));
    },
  },
  input: {
    rgb: function (c4) {
      return convertLabToLch(convertRgbToLab65(c4), "lch65");
    },
    lab65: function (c4) {
      return convertLabToLch(c4, "lch65");
    },
  },
  ranges: {
    l: [0, 100],
    c: [0, 133.807],
    h: [0, 360],
  },
});
var u_fn$1 = function (x, y, z) {
  return (4 * x) / (x + 15 * y + 3 * z);
};
var v_fn$1 = function (x, y, z) {
  return (9 * y) / (x + 15 * y + 3 * z);
};
var un$1 = u_fn$1(Xn$1, Yn$1, Zn$1);
var vn$1 = v_fn$1(Xn$1, Yn$1, Zn$1);
var l_fn = function (value2) {
  return value2 <= e$1 ? k$1 * value2 : 116 * Math.cbrt(value2) - 16;
};
var convertXyzToLuv = function (ref) {
  var x = ref.x;
  var y = ref.y;
  var z = ref.z;
  var alpha = ref.alpha;
  var l = l_fn(y / Yn$1);
  var u = u_fn$1(x, y, z);
  var v = v_fn$1(x, y, z);
  if (!isFinite(u) || !isFinite(v)) {
    l = u = v = 0;
  } else {
    u = 13 * l * (u - un$1);
    v = 13 * l * (v - vn$1);
  }
  var res = {
    mode: "luv",
    l,
    u,
    v,
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertRgbToLuv = function (rgb2) {
  return convertXyzToLuv(convertRgbToXyz(rgb2));
};
var u_fn = function (x, y, z) {
  return (4 * x) / (x + 15 * y + 3 * z);
};
var v_fn = function (x, y, z) {
  return (9 * y) / (x + 15 * y + 3 * z);
};
var un = u_fn(Xn$1, Yn$1, Zn$1);
var vn = v_fn(Xn$1, Yn$1, Zn$1);
var convertLuvToXyz = function (ref) {
  var l = ref.l;
  var u = ref.u;
  var v = ref.v;
  var alpha = ref.alpha;
  var up = u / (13 * l) + un;
  var vp = v / (13 * l) + vn;
  var y = Yn$1 * (l <= 8 ? l / k$1 : Math.pow((l + 16) / 116, 3));
  var x = (y * (9 * up)) / (4 * vp);
  var z = (y * (12 - 3 * up - 20 * vp)) / (4 * vp);
  var res = { mode: "xyz", x, y, z };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertLuvToRgb = function (luv2) {
  return convertXyzToRgb(convertLuvToXyz(luv2));
};
var definition$9 = {
  mode: "luv",
  output: {
    xyz: convertLuvToXyz,
    rgb: convertLuvToRgb,
  },
  input: {
    xyz: convertXyzToLuv,
    rgb: convertRgbToLuv,
  },
  channels: ["l", "u", "v", "alpha"],
  parsers: ["--luv"],
  serialize: "color(--luv ",
  ranges: {
    l: [0, 100],
    u: [-84.936, 175.042],
    v: [-125.882, 87.243],
  },
  interpolate: {
    l: interpolatorLinear,
    u: interpolatorLinear,
    v: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha },
  },
};
var convertLuvToLchuv = function (ref) {
  var l = ref.l;
  var u = ref.u;
  var v = ref.v;
  var alpha = ref.alpha;
  var c4 = Math.sqrt(u * u + v * v);
  var res = {
    mode: "lchuv",
    l,
    c: c4,
  };
  if (c4) {
    res.h = normalizeHue((Math.atan2(v, u) * 180) / Math.PI);
  }
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertLchuvToLuv = function (ref) {
  var l = ref.l;
  var c4 = ref.c;
  var h = ref.h;
  var alpha = ref.alpha;
  var res = {
    mode: "luv",
    l,
    u: c4 ? c4 * Math.cos((h / 180) * Math.PI) : 0,
    v: c4 ? c4 * Math.sin((h / 180) * Math.PI) : 0,
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertLchuvToRgb = function (c4) {
  return convertLuvToRgb(convertLchuvToLuv(c4));
};
var convertRgbToLchuv = function (c4) {
  return convertLuvToLchuv(convertRgbToLuv(c4));
};
var definition$8 = {
  mode: "lchuv",
  output: {
    luv: convertLchuvToLuv,
    rgb: convertLchuvToRgb,
  },
  input: {
    rgb: convertRgbToLchuv,
    luv: convertLuvToLchuv,
  },
  channels: ["l", "c", "h", "alpha"],
  parsers: ["--lchuv"],
  serialize: "color(--lchuv ",
  ranges: {
    l: [0, 100],
    c: [0, 176.956],
    h: [0, 360],
  },
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    c: interpolatorLinear,
    l: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha },
  },
  difference: {
    h: differenceHueChroma,
  },
  average: {
    h: averageAngle,
  },
};
var M = [-0.14861, 1.78277, -0.29227, -0.90649, 1.97294, 0];
var degToRad = Math.PI / 180;
var radToDeg = 180 / Math.PI;
var DE = M[3] * M[4];
var BE = M[1] * M[4];
var BCAD = M[1] * M[2] - M[0] * M[3];
var convertRgbToCubehelix = function (ref) {
  var r2 = ref.r;
  var g = ref.g;
  var b = ref.b;
  var alpha = ref.alpha;
  var l = (BCAD * b + r2 * DE - g * BE) / (BCAD + DE - BE);
  var x = b - l;
  var y = (M[4] * (g - l) - M[2] * x) / M[3];
  var res = {
    mode: "cubehelix",
    l,
    s:
      l === 0 || l === 1
        ? void 0
        : Math.sqrt(x * x + y * y) / (M[4] * l * (1 - l)),
  };
  if (res.s) {
    res.h = Math.atan2(y, x) * radToDeg - 120;
  }
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertCubehelixToRgb = function (ref) {
  var h = ref.h;
  var s2 = ref.s;
  var l = ref.l;
  var alpha = ref.alpha;
  var res = { mode: "rgb" };
  h = (h === void 0 ? 0 : h + 120) * degToRad;
  var amp = s2 === void 0 ? 0 : s2 * l * (1 - l);
  var cosh = Math.cos(h);
  var sinh = Math.sin(h);
  res.r = l + amp * (M[0] * cosh + M[1] * sinh);
  res.g = l + amp * (M[2] * cosh + M[3] * sinh);
  res.b = l + amp * (M[4] * cosh + M[5] * sinh);
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var definition$7 = {
  mode: "cubehelix",
  channels: ["h", "s", "l", "alpha"],
  parsers: ["--cubehelix"],
  serialize: "color(--cubehelix ",
  ranges: {
    h: [0, 360],
    s: [0, 4.614],
    l: [0, 1],
  },
  input: {
    rgb: convertRgbToCubehelix,
  },
  output: {
    rgb: convertCubehelixToRgb,
  },
  interpolate: {
    h: {
      use: interpolatorLinear,
      fixup: fixupHueShorter,
    },
    s: interpolatorLinear,
    l: interpolatorLinear,
    alpha: {
      use: interpolatorLinear,
      fixup: fixupAlpha,
    },
  },
  difference: {
    h: differenceHueSaturation,
  },
  average: {
    h: averageAngle,
  },
};
var convertDlabToDlch = function (ref) {
  var l = ref.l;
  var a = ref.a;
  var b = ref.b;
  var alpha = ref.alpha;
  var c4 = Math.sqrt(a * a + b * b);
  var res = {
    mode: "dlch",
    l,
    c: c4,
  };
  if (c4) {
    res.h = normalizeHue((Math.atan2(b, a) * 180) / Math.PI);
  }
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var kE = 1;
var kCH = 1;
var θ = (26 / 180) * Math.PI;
var cosθ = Math.cos(θ);
var sinθ = Math.sin(θ);
var factor = 100 / Math.log(139 / 100);
var convertDlchToLab65 = function (ref) {
  var l = ref.l;
  var c4 = ref.c;
  var h = ref.h;
  var alpha = ref.alpha;
  var res = {
    mode: "lab65",
    l: (Math.exp((l * kE) / factor) - 1) / 39e-4,
  };
  if (h === void 0) {
    res.a = res.b = 0;
  } else {
    var G = (Math.exp(0.0435 * c4 * kCH * kE) - 1) / 0.075;
    var e2 = G * Math.cos((h / 180) * Math.PI - θ);
    var f2 = G * Math.sin((h / 180) * Math.PI - θ);
    res.a = e2 * cosθ - (f2 / 0.83) * sinθ;
    res.b = e2 * sinθ + (f2 / 0.83) * cosθ;
  }
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertDlabToLab65 = function (c4) {
  return convertDlchToLab65(convertDlabToDlch(c4));
};
var convertLab65ToDlch = function (ref) {
  var l = ref.l;
  var a = ref.a;
  var b = ref.b;
  var alpha = ref.alpha;
  var e2 = a * cosθ + b * sinθ;
  var f2 = 0.83 * (b * cosθ - a * sinθ);
  var G = Math.sqrt(e2 * e2 + f2 * f2);
  var res = {
    mode: "dlch",
    l: (factor / kE) * Math.log(1 + 39e-4 * l),
    c: Math.log(1 + 0.075 * G) / (0.0435 * kCH * kE),
  };
  if (res.c) {
    res.h = normalizeHue(((Math.atan2(f2, e2) + θ) / Math.PI) * 180);
  }
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertDlchToDlab = function (ref) {
  var l = ref.l;
  var c4 = ref.c;
  var h = ref.h;
  var alpha = ref.alpha;
  var res = {
    mode: "dlab",
    l,
    a: c4 === 0 ? 0 : c4 * Math.cos((h / 180) * Math.PI),
    b: c4 === 0 ? 0 : c4 * Math.sin((h / 180) * Math.PI),
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertLab65ToDlab = function (c4) {
  return convertDlchToDlab(convertLab65ToDlch(c4));
};
var definition$6 = {
  mode: "dlab",
  parsers: ["--din99o-lab"],
  serialize: "color(--din99o-lab ",
  output: {
    lab65: convertDlabToLab65,
    rgb: function (c4) {
      return convertLab65ToRgb(convertDlabToLab65(c4));
    },
  },
  input: {
    lab65: convertLab65ToDlab,
    rgb: function (c4) {
      return convertLab65ToDlab(convertRgbToLab65(c4));
    },
  },
  channels: ["l", "a", "b", "alpha"],
  ranges: {
    l: [0, 100],
    a: [-40.09, 45.501],
    b: [-40.469, 44.344],
  },
  interpolate: {
    l: interpolatorLinear,
    a: interpolatorLinear,
    b: interpolatorLinear,
    alpha: {
      use: interpolatorLinear,
      fixup: fixupAlpha,
    },
  },
};
var definition$5 = {
  mode: "dlch",
  parsers: ["--din99o-lch"],
  serialize: "color(--din99o-lch ",
  output: {
    lab65: convertDlchToLab65,
    dlab: convertDlchToDlab,
    rgb: function (c4) {
      return convertLab65ToRgb(convertDlchToLab65(c4));
    },
  },
  input: {
    lab65: convertLab65ToDlch,
    dlab: convertDlabToDlch,
    rgb: function (c4) {
      return convertLab65ToDlch(convertRgbToLab65(c4));
    },
  },
  channels: ["l", "c", "h", "alpha"],
  ranges: {
    l: [0, 100],
    c: [0, 51.484],
    h: [0, 360],
  },
  interpolate: {
    l: interpolatorLinear,
    c: interpolatorLinear,
    h: {
      use: interpolatorLinear,
      fixup: fixupHueShorter,
    },
    alpha: {
      use: interpolatorLinear,
      fixup: fixupAlpha,
    },
  },
  difference: {
    h: differenceHueChroma,
  },
  average: {
    h: averageAngle,
  },
};
var definition$4 = {
  mode: "xyz",
  parsers: ["xyz", "--xyz-d50"],
  serialize: "color(--xyz-d50 ",
  output: {
    rgb: convertXyzToRgb,
    lab: convertXyzToLab,
  },
  input: {
    rgb: convertRgbToXyz,
    lab: convertLabToXyz,
  },
  channels: ["x", "y", "z", "alpha"],
  ranges: {
    x: [0, 0.964],
    y: [0, 0.999],
    z: [0, 0.825],
  },
  interpolate: {
    x: interpolatorLinear,
    y: interpolatorLinear,
    z: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha },
  },
};
var convertXyz65ToXyz = function (xyz652) {
  var x = xyz652.x;
  var y = xyz652.y;
  var z = xyz652.z;
  var alpha = xyz652.alpha;
  var res = {
    mode: "xyz",
    x: 1.0478112 * x + 0.0228866 * y - 0.050127 * z,
    y: 0.0295424 * x + 0.9904844 * y - 0.0170491 * z,
    z: -92345e-7 * x + 0.0150436 * y + 0.7521316 * z,
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertXyzToXyz65 = function (xyz2) {
  var x = xyz2.x;
  var y = xyz2.y;
  var z = xyz2.z;
  var alpha = xyz2.alpha;
  var res = {
    mode: "xyz65",
    x: 0.9555766 * x - 0.0230393 * y + 0.0631636 * z,
    y: -0.0282895 * x + 1.0099416 * y + 0.0210077 * z,
    z: 0.0122982 * x - 0.020483 * y + 1.3299098 * z,
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var definition$3 = {
  mode: "xyz65",
  serialize: "color(--xyz-d65 ",
  output: {
    rgb: convertXyz65ToRgb,
    xyz: convertXyz65ToXyz,
  },
  input: {
    rgb: convertRgbToXyz65,
    xyz: convertXyzToXyz65,
  },
  ranges: {
    x: [0, 0.95],
    y: [0, 1],
    z: [0, 1.088],
  },
  channels: ["x", "y", "z", "alpha"],
  parsers: ["--xyz-d65"],
  interpolate: {
    x: interpolatorLinear,
    y: interpolatorLinear,
    z: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha },
  },
};
var convertRgbToYiq = function (rgb2) {
  var ref = convertRgbToLrgb(rgb2);
  var r2 = ref.r;
  var g = ref.g;
  var b = ref.b;
  var alpha = ref.alpha;
  var res = {
    mode: "yiq",
    y: 0.29889531 * r2 + 0.58662247 * g + 0.11448223 * b,
    i: 0.59597799 * r2 - 0.2741761 * g - 0.32180189 * b,
    q: 0.21147017 * r2 - 0.52261711 * g + 0.31114694 * b,
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertYiqToRgb = function (ref) {
  var y = ref.y;
  var i = ref.i;
  var q = ref.q;
  var alpha = ref.alpha;
  return convertLrgbToRgb({
    r: y + 0.95608445 * i + 0.6208885 * q,
    g: y - 0.27137664 * i - 0.6486059 * q,
    b: y - 1.10561724 * i + 1.70250126 * q,
    alpha,
  });
};
var definition$2 = {
  mode: "yiq",
  output: {
    rgb: convertYiqToRgb,
  },
  input: {
    rgb: convertRgbToYiq,
  },
  channels: ["y", "i", "q", "alpha"],
  parsers: ["--yiq"],
  serialize: "color(--yiq ",
  ranges: {
    i: [-0.595, 0.595],
    q: [-0.522, 0.522],
  },
  interpolate: {
    y: interpolatorLinear,
    i: interpolatorLinear,
    q: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha },
  },
};
var convertOklabToLrgb = function (ref) {
  var l = ref.l;
  var a = ref.a;
  var b = ref.b;
  var alpha = ref.alpha;
  var L = Math.pow(l + 0.3963377774 * a + 0.2158037573 * b, 3);
  var M2 = Math.pow(l - 0.1055613458 * a - 0.0638541728 * b, 3);
  var S = Math.pow(l - 0.0894841775 * a - 1.291485548 * b, 3);
  var res = {
    mode: "lrgb",
    r: 4.0767416621 * L - 3.3077115913 * M2 + 0.2309699292 * S,
    g: -1.2684380046 * L + 2.6097574011 * M2 - 0.3413193965 * S,
    b: -0.0041960863 * L - 0.7034186147 * M2 + 1.707614701 * S,
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertLrgbToOklab = function (ref) {
  var r2 = ref.r;
  var g = ref.g;
  var b = ref.b;
  var alpha = ref.alpha;
  var L = Math.cbrt(0.4122214708 * r2 + 0.5363325363 * g + 0.0514459929 * b);
  var M2 = Math.cbrt(0.2119034982 * r2 + 0.6806995451 * g + 0.1073969566 * b);
  var S = Math.cbrt(0.0883024619 * r2 + 0.2817188376 * g + 0.6299787005 * b);
  var res = {
    mode: "oklab",
    l: 0.2104542553 * L + 0.793617785 * M2 - 0.0040720468 * S,
    a: 1.9779984951 * L - 2.428592205 * M2 + 0.4505937099 * S,
    b: 0.0259040371 * L + 0.7827717662 * M2 - 0.808675766 * S,
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertRgbToOklab = function (rgb2) {
  var res = convertLrgbToOklab(convertRgbToLrgb(rgb2));
  if (rgb2.r === rgb2.b && rgb2.b === rgb2.g) {
    res.a = res.b = 0;
  }
  return res;
};
var convertOklabToRgb = function (c4) {
  return convertLrgbToRgb(convertOklabToLrgb(c4));
};
var definition$1 = Object.assign({}, definition$d, {
  mode: "oklab",
  output: {
    lrgb: convertOklabToLrgb,
    rgb: convertOklabToRgb,
  },
  input: {
    lrgb: convertLrgbToOklab,
    rgb: convertRgbToOklab,
  },
  ranges: {
    l: [0, 0.999],
    a: [-0.233, 0.276],
    b: [-0.311, 0.198],
  },
  parsers: ["--oklab"],
  serialize: "color(--oklab ",
});
var definition = Object.assign({}, definition$b, {
  mode: "oklch",
  output: {
    oklab: function (c4) {
      return convertLchToLab(c4, "oklab");
    },
    rgb: function (c4) {
      return convertOklabToRgb(convertLchToLab(c4, "oklab"));
    },
  },
  input: {
    rgb: function (c4) {
      return convertLabToLch(convertRgbToOklab(c4), "oklch");
    },
    oklab: function (c4) {
      return convertLabToLch(c4, "oklch");
    },
  },
  parsers: ["--oklch"],
  serialize: "color(--oklch ",
  ranges: {
    l: [0, 0.999],
    c: [0, 0.322],
    h: [0, 360],
  },
});
var r = function (value2, precision) {
  return Math.round(value2 * (precision = Math.pow(10, precision))) / precision;
};
var round = function (precision) {
  if (precision === void 0) precision = 4;
  return function (value2) {
    return typeof value2 === "number" ? r(value2, precision) : value2;
  };
};
var rgb$4 = converter("rgb");
var hsl$1 = converter("hsl");
var twoDecimals = round(2);
var clamp$2 = function (value2) {
  return Math.max(0, Math.min(1, value2));
};
var fixup = function (value2) {
  return Math.round(clamp$2(value2) * 255);
};
var formatRgb = function (c4) {
  var color2 = rgb$4(c4);
  if (color2 === void 0) {
    return void 0;
  }
  var r2 = fixup(color2.r);
  var g = fixup(color2.g);
  var b = fixup(color2.b);
  if (color2.alpha === void 0 || color2.alpha === 1) {
    return "rgb(" + r2 + ", " + g + ", " + b + ")";
  } else {
    return (
      "rgba(" +
      r2 +
      ", " +
      g +
      ", " +
      b +
      ", " +
      twoDecimals(clamp$2(color2.alpha)) +
      ")"
    );
  }
};
var normalizePositions = function (arr) {
  if (arr[0] === void 0) {
    arr[0] = 0;
  }
  if (arr[arr.length - 1] === void 0) {
    arr[arr.length - 1] = 1;
  }
  var i = 1;
  var j;
  var from_idx;
  var from_pos;
  var inc;
  while (i < arr.length) {
    if (arr[i] === void 0) {
      from_idx = i;
      from_pos = arr[i - 1];
      j = i;
      while (arr[j] === void 0) {
        j++;
      }
      inc = (arr[j] - from_pos) / (j - i + 1);
      while (i < j) {
        arr[i] = from_pos + (i + 1 - from_idx) * inc;
        i++;
      }
    } else if (arr[i] < arr[i - 1]) {
      arr[i] = arr[i - 1];
    }
    i++;
  }
  return arr;
};
var midpoint = function (H) {
  if (H === void 0) H = 0.5;
  return function (t) {
    return H <= 0 ? 1 : H >= 1 ? 0 : Math.pow(t, Math.log(0.5) / Math.log(H));
  };
};
var mapper = function (fn2, mode, preserve_mode) {
  if (mode === void 0) mode = "rgb";
  if (preserve_mode === void 0) preserve_mode = false;
  var channels = mode ? getModeDefinition(mode).channels : null;
  var conv = mode ? converter(mode) : prepare;
  return function (color2) {
    var conv_color = conv(color2);
    var res = (channels || getModeDefinition(color2.mode).channels).reduce(
      function (res2, ch) {
        var v = fn2(conv_color[ch], ch, conv_color, mode);
        if (v !== void 0 && !isNaN(v)) {
          res2[ch] = v;
        }
        return res2;
      },
      { mode }
    );
    if (!preserve_mode) {
      return res;
    }
    var prep = prepare(color2);
    if (prep && prep.mode !== res.mode) {
      return converter(prep.mode)(res);
    }
    return res;
  };
};
var mapAlphaMultiply = function (v, ch, c4) {
  if (ch !== "alpha") {
    return (v || 0) * (c4.alpha !== void 0 ? c4.alpha : 1);
  }
  return v;
};
var mapAlphaDivide = function (v, ch, c4) {
  if (ch !== "alpha" && c4.alpha !== 0) {
    return (v || 0) / (c4.alpha !== void 0 ? c4.alpha : 1);
  }
  return v;
};
var isfn = function (o) {
  return typeof o === "function";
};
var isobj = function (o) {
  return o && typeof o === "object";
};
var isnum = function (o) {
  return typeof o === "number";
};
var interpolate_fn = function (colors, mode, overrides, premap) {
  if (mode === void 0) mode = "rgb";
  var def = getModeDefinition(mode);
  var conv = converter(mode);
  var conv_colors = [];
  var positions = [];
  var fns = {};
  colors.forEach(function (val) {
    if (Array.isArray(val)) {
      conv_colors.push(conv(val[0]));
      positions.push(val[1]);
    } else if (isnum(val) || isfn(val)) {
      fns[positions.length] = val;
    } else {
      conv_colors.push(conv(val));
      positions.push(void 0);
    }
  });
  normalizePositions(positions);
  var fixed = def.channels.reduce(function (res, ch) {
    var ffn;
    if (isobj(overrides) && isobj(overrides[ch]) && overrides[ch].fixup) {
      ffn = overrides[ch].fixup;
    } else if (isobj(def.interpolate[ch]) && def.interpolate[ch].fixup) {
      ffn = def.interpolate[ch].fixup;
    } else {
      ffn = function (v) {
        return v;
      };
    }
    res[ch] = ffn(
      conv_colors.map(function (color2) {
        return color2[ch];
      })
    );
    return res;
  }, {});
  if (premap) {
    var ccolors = conv_colors.map(function (color2, idx) {
      return def.channels.reduce(
        function (c4, ch) {
          c4[ch] = fixed[ch][idx];
          return c4;
        },
        { mode }
      );
    });
    fixed = def.channels.reduce(function (res, ch) {
      res[ch] = ccolors.map(function (c4) {
        var v = premap(c4[ch], ch, c4, mode);
        return isNaN(v) ? void 0 : v;
      });
      return res;
    }, {});
  }
  var interpolators = def.channels.reduce(function (res, ch) {
    var ifn;
    if (isfn(overrides)) {
      ifn = overrides;
    } else if (isobj(overrides) && isfn(overrides[ch])) {
      ifn = overrides[ch];
    } else if (isobj(overrides) && isobj(overrides[ch]) && overrides[ch].use) {
      ifn = overrides[ch].use;
    } else if (isfn(def.interpolate[ch])) {
      ifn = def.interpolate[ch];
    } else if (isobj(def.interpolate[ch])) {
      ifn = def.interpolate[ch].use;
    }
    res[ch] = ifn(fixed[ch]);
    return res;
  }, {});
  var n2 = conv_colors.length - 1;
  return function (t) {
    t = Math.min(Math.max(0, t), 1);
    if (t <= positions[0]) {
      return conv_colors[0];
    }
    if (t > positions[n2]) {
      return conv_colors[n2];
    }
    var idx = 0;
    while (positions[idx] < t) {
      idx++;
    }
    var start = positions[idx - 1];
    var delta = positions[idx] - start;
    var P = (t - start) / delta;
    var fn2 = fns[idx] || fns[0];
    if (fn2 !== void 0) {
      if (isnum(fn2)) {
        fn2 = midpoint((fn2 - start) / delta);
      }
      P = fn2(P);
    }
    var t0 = (idx - 1 + P) / n2;
    return def.channels.reduce(
      function (res, channel) {
        var val = interpolators[channel](t0);
        if (val !== void 0) {
          res[channel] = val;
        }
        return res;
      },
      { mode }
    );
  };
};
var interpolateWith = function (premap, postmap) {
  return function (colors, mode, overrides) {
    if (mode === void 0) mode = "rgb";
    var post = postmap ? mapper(postmap, mode) : void 0;
    var it = interpolate_fn(colors, mode, overrides, premap);
    return post
      ? function (t) {
          return post(it(t));
        }
      : it;
  };
};
var interpolateWithPremultipliedAlpha = interpolateWith(
  mapAlphaMultiply,
  mapAlphaDivide
);
var rgb$3 = converter("rgb");
var rgb$2 = converter("rgb");
var rgb$1 = converter("rgb");
defineMode(definition$n);
defineMode(definition$7);
defineMode(definition$6);
defineMode(definition$5);
defineMode(definition$h);
defineMode(definition$j);
defineMode(definition$i);
defineMode(definition$g);
defineMode(definition$f);
defineMode(definition$e);
defineMode(definition$d);
defineMode(definition$c);
defineMode(definition$b);
defineMode(definition$a);
defineMode(definition$8);
defineMode(definition$o);
defineMode(definition$9);
defineMode(definition$m);
defineMode(definition$l);
defineMode(definition$k);
defineMode(definition$p);
defineMode(definition$3);
defineMode(definition$4);
defineMode(definition$2);
defineMode(definition$1);
defineMode(definition);
var a98 = converter("a98");
var cubehelix = converter("cubehelix");
var dlab = converter("dlab");
var dlch = converter("dlch");
var hsi = converter("hsi");
var hsl = converter("hsl");
var hsv = converter("hsv");
var hwb = converter("hwb");
var jab = converter("jab");
var jch = converter("jch");
var lab = converter("lab");
var lab65 = converter("lab65");
var lch = converter("lch");
var lch65 = converter("lch65");
var lchuv = converter("lchuv");
var lrgb = converter("lrgb");
var luv = converter("luv");
var p3 = converter("p3");
var prophoto = converter("prophoto");
var rec2020 = converter("rec2020");
var rgb = converter("rgb");
var xyz = converter("xyz");
var xyz65 = converter("xyz65");
var yiq = converter("yiq");
var oklab = converter("oklab");
var oklch = converter("oklch");

// node_modules/tailwindcss-language-service/dist/tailwindcss-language-service.esm.js
import namedColors2 from "color-name";
import lineColumn from "line-column";
import moo from "moo";
import Regex from "becke-ch--regex--s0-0-v1--base--pl--lib";
import Cache from "tmp-cache";
import escapeClassName2 from "css.escape";
import stringifyObject from "stringify-object";

// src/stubs/vscode-emmet-helper-bundled.ts
var doComplete = null;
var extractAbbreviation = null;
var isAbbreviationValid = null;

// node_modules/tailwindcss-language-service/dist/tailwindcss-language-service.esm.js
import semverGte from "semver/functions/gte.js";
import "semver/functions/lte.js";
import sift from "sift-string";
import selectorParser5 from "postcss-selector-parser";
function isObject2(variable) {
  return Object.prototype.toString.call(variable) === "[object Object]";
}
function removeMeta(obj) {
  let result = {};
  for (let key in obj) {
    if (key.substr(0, 2) === "__") continue;
    if (isObject2(obj[key])) {
      result[key] = removeMeta(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}
function rangesEqual(a, b) {
  return (
    a.start.line === b.start.line &&
    a.start.character === b.start.character &&
    a.end.line === b.end.line &&
    a.end.character === b.end.character
  );
}
function dedupe(arr) {
  return arr.filter((value2, index, self) => self.indexOf(value2) === index);
}
function dedupeByRange(arr) {
  return arr.filter(
    (classList, classListIndex) =>
      classListIndex ===
      arr.findIndex((c4) => rangesEqual(c4.range, classList.range))
  );
}
function ensureArray(value2) {
  return Array.isArray(value2) ? value2 : [value2];
}
function flatten(arrays) {
  return [].concat.apply([], arrays);
}
function equal(a, b) {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  let aSorted = a.concat().sort();
  let bSorted = b.concat().sort();
  for (let i = 0; i < aSorted.length; ++i) {
    if (aSorted[i] !== bSorted[i]) return false;
  }
  return true;
}
function equalExact(a, b) {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
function combinations(str) {
  let fn2 = function (active, rest, a) {
    if (!active && !rest) return void 0;
    if (!rest) {
      a.push(active);
    } else {
      fn2(active + rest[0], rest.slice(1), a);
      fn2(active, rest.slice(1), a);
    }
    return a;
  };
  return fn2("", str, []);
}
function getClassNameParts(state, className) {
  let separator = state.separator;
  className = className.replace(/^\./, "");
  let parts = className.split(separator);
  if (parts.length === 1) {
    return dlv3(state.classNames.classNames, [
      className,
      "__info",
      "__rule",
    ]) === true ||
      Array.isArray(dlv3(state.classNames.classNames, [className, "__info"]))
      ? [className]
      : null;
  }
  let points = combinations("123456789".substr(0, parts.length - 1)).map((x) =>
    x.split("").map((x2) => parseInt(x2, 10))
  );
  let possibilities = [
    [className],
    ...points.map((p2) => {
      let result = [];
      let i = 0;
      p2.forEach((x) => {
        result.push(parts.slice(i, x).join("-"));
        i = x;
      });
      result.push(parts.slice(i).join("-"));
      return result;
    }),
  ];
  return possibilities.find((key) => {
    if (
      dlv3(state.classNames.classNames, [...key, "__info", "__rule"]) ===
        true ||
      Array.isArray(dlv3(state.classNames.classNames, [...key, "__info"]))
    ) {
      return true;
    }
    return false;
  });
}
function remToPx(value2, rootSize) {
  if (rootSize === void 0) {
    rootSize = 16;
  }
  if (/^-?[0-9.]+rem$/.test(value2)) {
    let number2 = parseFloat(value2.substr(0, value2.length - 3));
    if (!isNaN(number2)) {
      return `${number2 * rootSize}px`;
    }
  }
  return void 0;
}
function bigSign2(bigIntValue) {
  return (bigIntValue > 0n) - (bigIntValue < 0n);
}
function generateRules2(state, classNames) {
  let rules = state.modules.jit.generateRules
    .module(new Set(classNames), state.jitContext)
    .sort((_ref, _ref2) => {
      let [a] = _ref;
      let [z] = _ref2;
      return bigSign2(a - z);
    });
  let root = state.modules.postcss.module.root({
    nodes: rules.map((_ref3) => {
      let [, rule] = _ref3;
      return rule;
    }),
  });
  state.modules.jit.expandApplyAtRules.module(state.jitContext)(root);
  let actualRules = [];
  root.walkRules((subRule) => {
    actualRules.push(subRule);
  });
  return {
    root,
    rules: actualRules,
  };
}
async function stringifyRoot(state, root, uri) {
  let settings = await state.editor.getConfiguration(uri);
  let clone = root.clone();
  clone.walkAtRules("defaults", (node) => {
    node.remove();
  });
  if (settings.tailwindCSS.showPixelEquivalents) {
    clone.walkDecls((decl) => {
      let px = remToPx(decl.value, settings.tailwindCSS.rootFontSize);
      if (px) {
        decl.value = `${decl.value}/* ${px} */`;
      }
    });
  }
  return clone
    .toString()
    .replace(
      /([^;{}\s])(\n\s*})/g,
      (_match, before, after) => `${before};${after}`
    )
    .replace(/^(?:    )+/gm, (indent) =>
      " ".repeat((indent.length / 4) * settings.editor.tabSize)
    );
}
async function stringifyDecls(state, rule, uri) {
  let settings = await state.editor.getConfiguration(uri);
  let result = [];
  rule.walkDecls((_ref4) => {
    let { prop, value: value2 } = _ref4;
    let px = settings.tailwindCSS.showPixelEquivalents
      ? remToPx(value2, settings.tailwindCSS.rootFontSize)
      : void 0;
    result.push(`${prop}: ${value2}${px ? `/* ${px} */` : ""};`);
  });
  return result.join(" ");
}
function replaceClassName(state, selector, find, replace2) {
  const transform = (selectors) => {
    selectors.walkClasses((className) => {
      if (className.value === find) {
        className.value = replace2;
      }
    });
  };
  return state.modules.postcssSelectorParser
    .module(transform)
    .processSync(selector);
}
function getRuleContext(state, rule, className) {
  let context = [
    replaceClassName(state, rule.selector, className, "__placeholder__"),
  ];
  let p2 = rule;
  while (p2.parent && p2.parent.type !== "root") {
    p2 = p2.parent;
    if (p2.type === "atrule") {
      context.unshift(`@${p2.name} ${p2.params}`);
    }
  }
  return context;
}
var COLOR_PROPS = [
  "accent-color",
  "caret-color",
  "color",
  "column-rule-color",
  "background-color",
  "border-color",
  "border-top-color",
  "border-right-color",
  "border-bottom-color",
  "border-left-color",
  "fill",
  "outline-color",
  "stop-color",
  "stroke",
  "text-decoration-color",
];
function getKeywordColor(value2) {
  if (typeof value2 !== "string") return null;
  let lowercased = value2.toLowerCase();
  if (lowercased === "transparent") {
    return "transparent";
  }
  if (lowercased === "currentcolor") {
    return "currentColor";
  }
  return null;
}
var colorRegex = /* @__PURE__ */ new RegExp(
  `(?:^|\\s|\\(|,)(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\\(\\s*(-?[\\d.]+%?(\\s*[,/]\\s*|\\s+)+){2,3}\\s*([\\d.]+%?|var\\([^)]+\\))?\\)|transparent|currentColor|${
    /* @__PURE__ */ Object.keys(namedColors2).join("|")
  })(?:$|\\s|\\)|,)`,
  "gi"
);
function replaceColorVarsWithTheirDefaults(str) {
  return str.replace(/((?:rgb|hsl)a?\(\s*)var\([^,]+,\s*([^)]+)\)/gi, "$1$2");
}
function getColorsInString(str) {
  if (/(?:box|drop)-shadow/.test(str)) return [];
  return Array.from(
    replaceColorVarsWithTheirDefaults(str).matchAll(colorRegex),
    (match) => {
      var _getKeywordColor;
      let color2 = match[1].replace(/var\([^)]+\)/, "1");
      return (_getKeywordColor = getKeywordColor(color2)) != null
        ? _getKeywordColor
        : parse(color2);
    }
  ).filter(Boolean);
}
function getColorFromDecls(decls) {
  let props = Object.keys(decls).filter((prop) => {
    if (
      prop === "content" &&
      (decls[prop] === '""' ||
        decls[prop] === "''" ||
        decls[prop] === "var(--tw-content)")
    ) {
      return false;
    }
    return true;
  });
  if (props.length === 0) return null;
  const nonCustomProps = props.filter((prop) => !prop.startsWith("--"));
  const areAllCustom = nonCustomProps.length === 0;
  if (
    !areAllCustom &&
    nonCustomProps.some((prop) => !COLOR_PROPS.includes(prop))
  ) {
    return null;
  }
  const propsToCheck = areAllCustom ? props : nonCustomProps;
  const colors = propsToCheck.flatMap((prop) =>
    ensureArray(decls[prop]).flatMap(getColorsInString)
  );
  const colorStrings = dedupe(
    colors.map((color2) =>
      typeof color2 === "string"
        ? color2
        : formatRgb({
            ...color2,
            alpha: void 0,
          })
    )
  );
  if (colorStrings.length !== 1) {
    return null;
  }
  let keyword = getKeywordColor(colorStrings[0]);
  if (keyword) {
    return keyword;
  }
  const nonKeywordColors = colors.filter(
    (color2) => typeof color2 !== "string"
  );
  const alphas = dedupe(
    nonKeywordColors.map((color2) => {
      var _color$alpha;
      return (_color$alpha = color2.alpha) != null ? _color$alpha : 1;
    })
  );
  if (alphas.length === 1) {
    return nonKeywordColors[0];
  }
  if (alphas.length === 2 && alphas.includes(0)) {
    return nonKeywordColors.find((color2) => {
      var _color$alpha2;
      return ((_color$alpha2 = color2.alpha) != null ? _color$alpha2 : 1) !== 0;
    });
  }
  return null;
}
function getColor(state, className) {
  if (state.jit) {
    if (state.classNames) {
      const item2 = dlv3(state.classNames.classNames, [className, "__info"]);
      if (item2 && item2.__rule) {
        return getColorFromDecls(removeMeta(item2));
      }
    }
    let { root, rules } = generateRules2(state, [className]);
    if (rules.length === 0) return null;
    let decls = {};
    root.walkDecls((decl) => {
      let value2 = decls[decl.prop];
      if (value2) {
        if (Array.isArray(value2)) {
          value2.push(decl.value);
        } else {
          decls[decl.prop] = [value2, decl.value];
        }
      } else {
        decls[decl.prop] = decl.value;
      }
    });
    return getColorFromDecls(decls);
  }
  let parts = getClassNameParts(state, className);
  if (!parts) return null;
  const item = dlv3(state.classNames.classNames, [...parts, "__info"]);
  if (!item.__rule) return null;
  return getColorFromDecls(removeMeta(item));
}
function getColorFromValue(value2) {
  if (typeof value2 !== "string") return null;
  const trimmedValue = value2.trim();
  if (trimmedValue.toLowerCase() === "transparent") {
    return "transparent";
  }
  if (trimmedValue.toLowerCase() === "currentcolor") {
    return "currentColor";
  }
  if (
    !/^\s*(?:rgba?|hsla?)\s*\([^)]+\)\s*$/.test(trimmedValue) &&
    !/^\s*#[0-9a-f]+\s*$/i.test(trimmedValue) &&
    !Object.keys(namedColors2).includes(trimmedValue)
  ) {
    return null;
  }
  const color2 = parse(trimmedValue);
  return color2 != null ? color2 : null;
}
var toRgb = /* @__PURE__ */ converter("rgb");
function culoriColorToVscodeColor(color2) {
  var _rgb$alpha;
  let rgb2 = toRgb(color2);
  return {
    red: rgb2.r,
    green: rgb2.g,
    blue: rgb2.b,
    alpha: (_rgb$alpha = rgb2.alpha) != null ? _rgb$alpha : 1,
  };
}
var htmlLanguages = [
  "aspnetcorerazor",
  "astro",
  "astro-markdown",
  "blade",
  "django-html",
  "edge",
  "ejs",
  "erb",
  "gohtml",
  "GoHTML",
  "gohtmltmpl",
  "haml",
  "handlebars",
  "hbs",
  "html",
  "HTML (Eex)",
  "HTML (EEx)",
  "html-eex",
  "htmldjango",
  "jade",
  "leaf",
  "liquid",
  "markdown",
  "mdx",
  "mustache",
  "njk",
  "nunjucks",
  "phoenix-heex",
  "php",
  "razor",
  "slim",
  "surface",
  "twig",
];
var cssLanguages = [
  "css",
  "less",
  "postcss",
  "sass",
  "scss",
  "stylus",
  "sugarss",
  "tailwindcss",
];
var jsLanguages = [
  "javascript",
  "javascriptreact",
  "reason",
  "rescript",
  "typescript",
  "typescriptreact",
];
function isJsDoc(state, doc) {
  const userJsLanguages = Object.keys(state.editor.userLanguages).filter(
    (lang) => jsLanguages.includes(state.editor.userLanguages[lang])
  );
  return [...jsLanguages, ...userJsLanguages].indexOf(doc.languageId) !== -1;
}
function isJsxContext(state, doc, position2) {
  let str = doc.getText({
    start: {
      line: 0,
      character: 0,
    },
    end: position2,
  });
  let boundaries = getLanguageBoundaries(state, doc, str);
  return boundaries ? boundaries[boundaries.length - 1].type === "jsx" : false;
}
function isCssDoc(state, doc) {
  const userCssLanguages = Object.keys(state.editor.userLanguages).filter(
    (lang) => cssLanguages.includes(state.editor.userLanguages[lang])
  );
  return [...cssLanguages, ...userCssLanguages].indexOf(doc.languageId) !== -1;
}
function isCssContext(state, doc, position2) {
  if (isCssDoc(state, doc)) {
    return true;
  }
  if (
    isHtmlDoc(state, doc) ||
    isVueDoc(doc) ||
    isSvelteDoc(doc) ||
    isJsDoc(state, doc)
  ) {
    let str = doc.getText({
      start: {
        line: 0,
        character: 0,
      },
      end: position2,
    });
    let boundaries = getLanguageBoundaries(state, doc, str);
    return boundaries
      ? boundaries[boundaries.length - 1].type === "css"
      : false;
  }
  return false;
}
function isWithinRange(position2, range) {
  if (
    position2.line === range.start.line &&
    position2.character >= range.start.character
  ) {
    if (
      position2.line === range.end.line &&
      position2.character > range.end.character
    ) {
      return false;
    } else {
      return true;
    }
  }
  if (
    position2.line === range.end.line &&
    position2.character <= range.end.character
  ) {
    if (
      position2.line === range.start.line &&
      position2.character < range.end.character
    ) {
      return false;
    } else {
      return true;
    }
  }
  if (position2.line > range.start.line && position2.line < range.end.line) {
    return true;
  }
  return false;
}
var lazy = (getter) => {
  let evaluated = false;
  let _res = null;
  const res = function () {
    if (evaluated) return _res;
    _res = getter.apply(this, arguments);
    evaluated = true;
    return _res;
  };
  res.isLazy = true;
  return res;
};
var classAttributeStates = () => ({
  doubleClassList: {
    arb: {
      match: new RegExp("(?<!\\\\)\\["),
      push: "arbitrary",
    },
    lbrace: {
      match: new RegExp("(?<!\\\\)\\{"),
      push: "interpBrace",
    },
    rbrace: {
      match: new RegExp("(?<!\\\\)\\}"),
      pop: 1,
    },
    end: {
      match: new RegExp('(?<!\\\\)"'),
      pop: 1,
    },
    classlist: {
      match: new RegExp("[\\s\\S]"),
      lineBreaks: true,
    },
  },
  singleClassList: {
    lbrace: {
      match: new RegExp("(?<!\\\\)\\{"),
      push: "interpBrace",
    },
    rbrace: {
      match: new RegExp("(?<!\\\\)\\}"),
      pop: 1,
    },
    end: {
      match: new RegExp("(?<!\\\\)'"),
      pop: 1,
    },
    classlist: {
      match: new RegExp("[\\s\\S]"),
      lineBreaks: true,
    },
  },
  tickClassList: {
    lbrace: {
      match: new RegExp("(?<=(?<!\\\\)\\$)\\{"),
      push: "interpBrace",
    },
    rbrace: {
      match: new RegExp("(?<!\\\\)\\}"),
      pop: 1,
    },
    end: {
      match: new RegExp("(?<!\\\\)`"),
      pop: 1,
    },
    classlist: {
      match: new RegExp("[\\s\\S]"),
      lineBreaks: true,
    },
  },
  interpBrace: {
    startSingle: {
      match: new RegExp("(?<!\\\\)'"),
      push: "singleClassList",
    },
    startDouble: {
      match: new RegExp('(?<!\\\\)"'),
      push: "doubleClassList",
    },
    startTick: {
      match: new RegExp("(?<!\\\\)`"),
      push: "tickClassList",
    },
    lbrace: {
      match: new RegExp("(?<!\\\\)\\{"),
      push: "interpBrace",
    },
    rbrace: {
      match: new RegExp("(?<!\\\\)\\}"),
      pop: 1,
    },
    text: {
      match: new RegExp("[\\s\\S]"),
      lineBreaks: true,
    },
  },
  interpSingle: {
    startDouble: {
      match: new RegExp('(?<!\\\\)"'),
      push: "doubleClassList",
    },
    startTick: {
      match: new RegExp("(?<!\\\\)`"),
      push: "tickClassList",
    },
    single: {
      match: new RegExp("(?<!\\\\)'"),
      pop: 1,
    },
    text: {
      match: new RegExp("[\\s\\S]"),
      lineBreaks: true,
    },
  },
  interpDouble: {
    startSingle: {
      match: new RegExp("(?<!\\\\)'"),
      push: "singleClassList",
    },
    startTick: {
      match: new RegExp("(?<!\\\\)`"),
      push: "tickClassList",
    },
    double: {
      match: new RegExp('(?<!\\\\)"'),
      pop: 1,
    },
    text: {
      match: new RegExp("[\\s\\S]"),
      lineBreaks: true,
    },
  },
  arbitrary: {
    arb: {
      match: new RegExp("(?<!\\\\)\\]"),
      pop: 1,
    },
    space: {
      match: /\s/,
      pop: 1,
      lineBreaks: true,
    },
    arb2: {
      match: new RegExp("[\\s\\S]"),
      lineBreaks: true,
    },
  },
});
var simpleClassAttributeStates = {
  main: {
    start: {
      match: '"',
      push: "doubleClassList",
    },
  },
  doubleClassList: {
    end: {
      match: '"',
      pop: 1,
    },
    classlist: {
      match: /[\s\S]/,
      lineBreaks: true,
    },
  },
};
var getClassAttributeLexer = /* @__PURE__ */ lazy(() => {
  let supportsNegativeLookbehind = true;
  try {
    new RegExp("(?<!)");
  } catch (_) {
    supportsNegativeLookbehind = false;
  }
  if (supportsNegativeLookbehind) {
    return moo.states({
      main: {
        start1: {
          match: '"',
          push: "doubleClassList",
        },
        start2: {
          match: "'",
          push: "singleClassList",
        },
        start3: {
          match: "{",
          push: "interpBrace",
        },
      },
      ...classAttributeStates(),
    });
  }
  return moo.states(simpleClassAttributeStates);
});
var getComputedClassAttributeLexer = /* @__PURE__ */ lazy(() => {
  let supportsNegativeLookbehind = true;
  try {
    new RegExp("(?<!)");
  } catch (_) {
    supportsNegativeLookbehind = false;
  }
  if (supportsNegativeLookbehind) {
    return moo.states({
      main: {
        lbrace: {
          match: "{",
          push: "interpBrace",
        },
        single: {
          match: "'",
          push: "interpSingle",
        },
        double: {
          match: '"',
          push: "interpDouble",
        },
      },
      ...classAttributeStates(),
    });
  }
  return moo.states(simpleClassAttributeStates);
});
function resolveRange(range, relativeTo) {
  return {
    start: {
      line:
        ((relativeTo == null ? void 0 : relativeTo.start.line) || 0) +
        range.start.line,
      character:
        (range.end.line === 0
          ? (relativeTo == null ? void 0 : relativeTo.start.character) || 0
          : 0) + range.start.character,
    },
    end: {
      line:
        ((relativeTo == null ? void 0 : relativeTo.start.line) || 0) +
        range.end.line,
      character:
        (range.end.line === 0
          ? (relativeTo == null ? void 0 : relativeTo.start.character) || 0
          : 0) + range.end.character,
    },
  };
}
function getTextWithoutComments(docOrText, type, range) {
  let text2 =
    typeof docOrText === "string" ? docOrText : docOrText.getText(range);
  if (type === "js" || type === "jsx") {
    return getJsWithoutComments(text2);
  }
  if (type === "css") {
    return text2.replace(/\/\*.*?\*\//gs, replace);
  }
  return text2.replace(/<!--.*?-->/gs, replace);
}
function replace(match) {
  return match.replace(/./gs, (char) => (char === "\n" ? "\n" : " "));
}
var jsLexer;
function getJsWithoutComments(text2) {
  if (!jsLexer) {
    jsLexer = moo.states({
      main: {
        commentLine: /\/\/.*?$/,
        commentBlock: {
          match: /\/\*[^]*?\*\//,
          lineBreaks: true,
        },
        stringDouble: /"(?:[^"\\]|\\.)*"/,
        stringSingle: /'(?:[^'\\]|\\.)*'/,
        stringBacktick: /`(?:[^`\\]|\\.)*`/,
        other: {
          match: /[^]/,
          lineBreaks: true,
        },
      },
    });
  }
  let str = "";
  jsLexer.reset(text2);
  for (let token of jsLexer) {
    if (token.type === "commentLine") {
      str += " ".repeat(token.value.length);
    } else if (token.type === "commentBlock") {
      str += token.value.replace(/./g, " ");
    } else {
      str += token.value;
    }
  }
  return str;
}
function findAll(re, str) {
  let match;
  let matches = [];
  while ((match = re.exec(str)) !== null) {
    matches.push({
      ...match,
    });
  }
  return matches;
}
function findLast(re, str) {
  const matches = findAll(re, str);
  if (matches.length === 0) {
    return null;
  }
  return matches[matches.length - 1];
}
function getClassNamesInClassList(_ref) {
  let { classList, range, important } = _ref;
  const parts = classList.split(/(\s+)/);
  const names = [];
  let index = 0;
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      const start = indexToPosition(classList, index);
      const end = indexToPosition(classList, index + parts[i].length);
      names.push({
        className: parts[i],
        classList: {
          classList,
          range,
          important,
        },
        relativeRange: {
          start,
          end,
        },
        range: {
          start: {
            line: range.start.line + start.line,
            character:
              (end.line === 0 ? range.start.character : 0) + start.character,
          },
          end: {
            line: range.start.line + end.line,
            character:
              (end.line === 0 ? range.start.character : 0) + end.character,
          },
        },
      });
    }
    index += parts[i].length;
  }
  return names;
}
async function findClassNamesInRange(state, doc, range, mode, includeCustom) {
  if (includeCustom === void 0) {
    includeCustom = true;
  }
  const classLists = await findClassListsInRange(
    state,
    doc,
    range,
    mode,
    includeCustom
  );
  return flatten(classLists.map(getClassNamesInClassList));
}
function findClassListsInCssRange(doc, range) {
  const text2 = getTextWithoutComments(doc, "css", range);
  const matches = findAll(
    /(@apply\s+)(?<classList>[^;}]+?)(?<important>\s*!important)?\s*[;}]/g,
    text2
  );
  const globalStart = range
    ? range.start
    : {
        line: 0,
        character: 0,
      };
  return matches.map((match) => {
    const start = indexToPosition(text2, match.index + match[1].length);
    const end = indexToPosition(
      text2,
      match.index + match[1].length + match.groups.classList.length
    );
    return {
      classList: match.groups.classList,
      important: Boolean(match.groups.important),
      range: {
        start: {
          line: globalStart.line + start.line,
          character:
            (end.line === 0 ? globalStart.character : 0) + start.character,
        },
        end: {
          line: globalStart.line + end.line,
          character:
            (end.line === 0 ? globalStart.character : 0) + end.character,
        },
      },
    };
  });
}
async function findCustomClassLists(state, doc, range) {
  const settings = await state.editor.getConfiguration(doc.uri);
  const regexes = settings.tailwindCSS.experimental.classRegex;
  if (!Array.isArray(regexes) || regexes.length === 0) return [];
  const text2 = doc.getText(range);
  const result = [];
  for (let i = 0; i < regexes.length; i++) {
    try {
      let [containerRegexString, classRegexString] = Array.isArray(regexes[i])
        ? regexes[i]
        : [regexes[i]];
      let containerRegex = new Regex(containerRegexString, "g");
      let containerMatch;
      while ((containerMatch = containerRegex.exec(text2)) !== null) {
        const searchStart = doc.offsetAt(
          (range == null ? void 0 : range.start) || {
            line: 0,
            character: 0,
          }
        );
        const matchStart = searchStart + containerMatch.index[1];
        const matchEnd = matchStart + containerMatch[1].length;
        if (classRegexString) {
          let classRegex = new Regex(classRegexString, "g");
          let classMatch;
          while ((classMatch = classRegex.exec(containerMatch[1])) !== null) {
            const classMatchStart = matchStart + classMatch.index[1];
            const classMatchEnd = classMatchStart + classMatch[1].length;
            result.push({
              classList: classMatch[1],
              range: {
                start: doc.positionAt(classMatchStart),
                end: doc.positionAt(classMatchEnd),
              },
            });
          }
        } else {
          result.push({
            classList: containerMatch[1],
            range: {
              start: doc.positionAt(matchStart),
              end: doc.positionAt(matchEnd),
            },
          });
        }
      }
    } catch (_) {}
  }
  return result;
}
function matchClassAttributes(text2, attributes) {
  const attrs = attributes
    .filter((x) => typeof x === "string")
    .flatMap((a) => [a, `\\[${a}\\]`]);
  const re = /(?:\s|:|\()(ATTRS)\s*=\s*['"`{]/;
  return findAll(
    new RegExp(re.source.replace("ATTRS", attrs.join("|")), "gi"),
    text2
  );
}
async function findClassListsInHtmlRange(state, doc, type, range) {
  const text2 = getTextWithoutComments(doc, type, range);
  const matches = matchClassAttributes(
    text2,
    (await state.editor.getConfiguration(doc.uri)).tailwindCSS.classAttributes
  );
  const result = [];
  matches.forEach((match) => {
    const subtext = text2.substr(match.index + match[0].length - 1);
    let lexer =
      match[0][0] === ":" ||
      (match[1].startsWith("[") && match[1].endsWith("]"))
        ? getComputedClassAttributeLexer()
        : getClassAttributeLexer();
    lexer.reset(subtext);
    let classLists = [];
    let currentClassList;
    try {
      for (let token of lexer) {
        if (token.type === "classlist" || token.type.startsWith("arb")) {
          if (currentClassList) {
            currentClassList.value += token.value;
          } else {
            currentClassList = {
              value: token.value,
              offset: token.offset,
            };
          }
        } else {
          if (currentClassList) {
            classLists.push({
              value: currentClassList.value,
              offset: currentClassList.offset,
            });
          }
          currentClassList = void 0;
        }
      }
    } catch (_) {}
    if (currentClassList) {
      classLists.push({
        value: currentClassList.value,
        offset: currentClassList.offset,
      });
    }
    result.push(
      ...classLists
        .map((_ref2) => {
          let { value: value2, offset } = _ref2;
          if (value2.trim() === "") {
            return null;
          }
          const before = value2.match(/^\s*/);
          const beforeOffset = before === null ? 0 : before[0].length;
          const after = value2.match(/\s*$/);
          const afterOffset = after === null ? 0 : -after[0].length;
          const start = indexToPosition(
            text2,
            match.index + match[0].length - 1 + offset + beforeOffset
          );
          const end = indexToPosition(
            text2,
            match.index +
              match[0].length -
              1 +
              offset +
              value2.length +
              afterOffset
          );
          return {
            classList: value2.substr(beforeOffset, value2.length + afterOffset),
            range: {
              start: {
                line:
                  ((range == null ? void 0 : range.start.line) || 0) +
                  start.line,
                character:
                  (end.line === 0
                    ? (range == null ? void 0 : range.start.character) || 0
                    : 0) + start.character,
              },
              end: {
                line:
                  ((range == null ? void 0 : range.start.line) || 0) + end.line,
                character:
                  (end.line === 0
                    ? (range == null ? void 0 : range.start.character) || 0
                    : 0) + end.character,
              },
            },
          };
        })
        .filter((x) => x !== null)
    );
  });
  return result;
}
async function findClassListsInRange(state, doc, range, mode, includeCustom) {
  if (includeCustom === void 0) {
    includeCustom = true;
  }
  let classLists;
  if (mode === "css") {
    classLists = findClassListsInCssRange(doc, range);
  } else {
    classLists = await findClassListsInHtmlRange(state, doc, mode, range);
  }
  return dedupeByRange([
    ...classLists,
    ...(includeCustom ? await findCustomClassLists(state, doc, range) : []),
  ]);
}
async function findClassListsInDocument(state, doc) {
  if (isCssDoc(state, doc)) {
    return findClassListsInCssRange(doc);
  }
  let boundaries = getLanguageBoundaries(state, doc);
  if (!boundaries) return [];
  return dedupeByRange(
    flatten([
      ...(await Promise.all(
        boundaries
          .filter((b) => b.type === "html" || b.type === "jsx")
          .map((_ref3) => {
            let { type, range } = _ref3;
            return findClassListsInHtmlRange(
              state,
              doc,
              type === "html" ? "html" : "jsx",
              range
            );
          })
      )),
      ...boundaries
        .filter((b) => b.type === "css")
        .map((_ref4) => {
          let { range } = _ref4;
          return findClassListsInCssRange(doc, range);
        }),
      await findCustomClassLists(state, doc),
    ])
  );
}
function findHelperFunctionsInDocument(state, doc) {
  if (isCssDoc(state, doc)) {
    return findHelperFunctionsInRange(doc);
  }
  let boundaries = getLanguageBoundaries(state, doc);
  if (!boundaries) return [];
  return flatten(
    boundaries
      .filter((b) => b.type === "css")
      .map((_ref5) => {
        let { range } = _ref5;
        return findHelperFunctionsInRange(doc, range);
      })
  );
}
function findHelperFunctionsInRange(doc, range) {
  const text2 = getTextWithoutComments(doc, "css", range);
  let matches = findAll(
    /(?<prefix>[\s:;/*(){}])(?<helper>config|theme)(?<innerPrefix>\(\s*)(?<path>[^)]*?)\s*\)/g,
    text2
  );
  return matches.map((match) => {
    let quotesBefore = "";
    let path = match.groups.path
      .replace(/['"]+$/, "")
      .replace(/^['"]+/, (m) => {
        quotesBefore = m;
        return "";
      });
    let matches2 = path.match(/^([^\s]+)(?![^\[]*\])(?:\s*\/\s*([^\/\s]+))$/);
    if (matches2) {
      path = matches2[1];
    }
    path = path.replace(/['"]*\s*$/, "");
    let startIndex =
      match.index +
      match.groups.prefix.length +
      match.groups.helper.length +
      match.groups.innerPrefix.length;
    return {
      helper: match.groups.helper === "theme" ? "theme" : "config",
      path,
      ranges: {
        full: resolveRange(
          {
            start: indexToPosition(text2, startIndex),
            end: indexToPosition(text2, startIndex + match.groups.path.length),
          },
          range
        ),
        path: resolveRange(
          {
            start: indexToPosition(text2, startIndex + quotesBefore.length),
            end: indexToPosition(
              text2,
              startIndex + quotesBefore.length + path.length
            ),
          },
          range
        ),
      },
    };
  });
}
function indexToPosition(str, index) {
  const { line, col } = lineColumn(str + "\n", index);
  return {
    line: line - 1,
    character: col - 1,
  };
}
async function findClassNameAtPosition(state, doc, position2) {
  let classNames = [];
  const positionOffset = doc.offsetAt(position2);
  const searchRange = {
    start: doc.positionAt(Math.max(0, positionOffset - 1e3)),
    end: doc.positionAt(positionOffset + 1e3),
  };
  if (isCssContext(state, doc, position2)) {
    classNames = await findClassNamesInRange(state, doc, searchRange, "css");
  } else if (isHtmlContext(state, doc, position2)) {
    classNames = await findClassNamesInRange(state, doc, searchRange, "html");
  } else if (isJsxContext(state, doc, position2)) {
    classNames = await findClassNamesInRange(state, doc, searchRange, "jsx");
  }
  if (classNames.length === 0) {
    return null;
  }
  const className = classNames.find((_ref6) => {
    let { range } = _ref6;
    return isWithinRange(position2, range);
  });
  if (!className) return null;
  return className;
}
var htmlScriptTypes = [
  // https://v3-migration.vuejs.org/breaking-changes/inline-template-attribute.html#option-1-use-script-tag
  "text/html",
  // https://vuejs.org/guide/essentials/component-basics.html#dom-template-parsing-caveats
  "text/x-template",
  // https://github.com/tailwindlabs/tailwindcss-intellisense/issues/722
  "text/x-handlebars-template",
];
var text = {
  text: {
    match: /[^]/,
    lineBreaks: true,
  },
};
var states = {
  main: {
    cssBlockStart: {
      match: /<style(?=[>\s])/,
      push: "cssBlock",
    },
    jsBlockStart: {
      match: "<script",
      push: "jsBlock",
    },
    ...text,
  },
  cssBlock: {
    styleStart: {
      match: ">",
      next: "style",
    },
    cssBlockEnd: {
      match: "/>",
      pop: 1,
    },
    attrStartDouble: {
      match: '"',
      push: "attrDouble",
    },
    attrStartSingle: {
      match: "'",
      push: "attrSingle",
    },
    interp: {
      match: "{",
      push: "interp",
    },
    ...text,
  },
  jsBlock: {
    scriptStart: {
      match: ">",
      next: "script",
    },
    jsBlockEnd: {
      match: "/>",
      pop: 1,
    },
    langAttrStartDouble: {
      match: 'lang="',
      push: "langAttrDouble",
    },
    langAttrStartSingle: {
      match: "lang='",
      push: "langAttrSingle",
    },
    typeAttrStartDouble: {
      match: 'type="',
      push: "typeAttrDouble",
    },
    typeAttrStartSingle: {
      match: "type='",
      push: "typeAttrSingle",
    },
    attrStartDouble: {
      match: '"',
      push: "attrDouble",
    },
    attrStartSingle: {
      match: "'",
      push: "attrSingle",
    },
    interp: {
      match: "{",
      push: "interp",
    },
    ...text,
  },
  interp: {
    interp: {
      match: "{",
      push: "interp",
    },
    end: {
      match: "}",
      pop: 1,
    },
    ...text,
  },
  langAttrDouble: {
    langAttrEnd: {
      match: '"',
      pop: 1,
    },
    lang: {
      match: /[^"]+/,
      lineBreaks: true,
    },
  },
  langAttrSingle: {
    langAttrEnd: {
      match: "'",
      pop: 1,
    },
    lang: {
      match: /[^']+/,
      lineBreaks: true,
    },
  },
  typeAttrDouble: {
    langAttrEnd: {
      match: '"',
      pop: 1,
    },
    type: {
      match: /[^"]+/,
      lineBreaks: true,
    },
  },
  typeAttrSingle: {
    langAttrEnd: {
      match: "'",
      pop: 1,
    },
    type: {
      match: /[^']+/,
      lineBreaks: true,
    },
  },
  attrDouble: {
    attrEnd: {
      match: '"',
      pop: 1,
    },
    ...text,
  },
  attrSingle: {
    attrEnd: {
      match: "'",
      pop: 1,
    },
    ...text,
  },
  style: {
    cssBlockEnd: {
      match: "</style>",
      pop: 1,
    },
    ...text,
  },
  script: {
    jsBlockEnd: {
      match: "</script>",
      pop: 1,
    },
    ...text,
  },
};
var vueStates = {
  ...states,
  main: {
    htmlBlockStart: {
      match: "<template",
      push: "htmlBlock",
    },
    ...states.main,
  },
  htmlBlock: {
    htmlStart: {
      match: ">",
      next: "html",
    },
    htmlBlockEnd: {
      match: "/>",
      pop: 1,
    },
    attrStartDouble: {
      match: '"',
      push: "attrDouble",
    },
    attrStartSingle: {
      match: "'",
      push: "attrSingle",
    },
    interp: {
      match: "{",
      push: "interp",
    },
    ...text,
  },
  html: {
    htmlBlockEnd: {
      match: "</template>",
      pop: 1,
    },
    nestedBlockStart: {
      match: "<template",
      push: "nestedBlock",
    },
    ...text,
  },
  nestedBlock: {
    nestedStart: {
      match: ">",
      next: "nested",
    },
    nestedBlockEnd: {
      match: "/>",
      pop: 1,
    },
    ...text,
  },
  nested: {
    nestedBlockEnd: {
      match: "</template>",
      pop: 1,
    },
    nestedBlockStart: {
      match: "<template",
      push: "nestedBlock",
    },
    ...text,
  },
};
var defaultLexer = /* @__PURE__ */ moo.states(states);
var vueLexer = /* @__PURE__ */ moo.states(vueStates);
var cache2 = /* @__PURE__ */ new Cache({
  max: 25,
  maxAge: 1e3,
});
function getLanguageBoundaries(state, doc, text2) {
  if (text2 === void 0) {
    text2 = doc.getText();
  }
  let cacheKey = `${doc.languageId}:${text2}`;
  let cachedBoundaries = cache2.get(cacheKey);
  if (cachedBoundaries !== void 0) {
    return cachedBoundaries;
  }
  let isJs = isJsDoc(state, doc);
  let defaultType = isVueDoc(doc)
    ? "none"
    : isHtmlDoc(state, doc) || isSvelteDoc(doc)
    ? "html"
    : isJs
    ? "jsx"
    : null;
  if (defaultType === null) {
    cache2.set(cacheKey, null);
    return null;
  }
  text2 = getTextWithoutComments(text2, isJs ? "js" : "html");
  let lexer = defaultType === "none" ? vueLexer : defaultLexer;
  lexer.reset(text2);
  let type = defaultType;
  let boundaries = [
    {
      type: defaultType,
      range: {
        start: {
          line: 0,
          character: 0,
        },
        end: void 0,
      },
    },
  ];
  let offset = 0;
  try {
    for (let token of lexer) {
      if (!token.type.startsWith("nested")) {
        if (token.type.endsWith("BlockStart")) {
          let position2 = indexToPosition(text2, offset);
          if (!boundaries[boundaries.length - 1].range.end) {
            boundaries[boundaries.length - 1].range.end = position2;
          }
          type = token.type.replace(/BlockStart$/, "");
          boundaries.push({
            type,
            range: {
              start: position2,
              end: void 0,
            },
          });
        } else if (token.type.endsWith("BlockEnd")) {
          let position2 = indexToPosition(text2, offset);
          boundaries[boundaries.length - 1].range.end = position2;
          boundaries.push({
            type: defaultType,
            range: {
              start: position2,
              end: void 0,
            },
          });
        } else if (token.type === "lang") {
          boundaries[boundaries.length - 1].type = token.text;
        } else if (
          token.type === "type" &&
          htmlScriptTypes.includes(token.text)
        ) {
          boundaries[boundaries.length - 1].type = "html";
        }
      }
      offset += token.text.length;
    }
  } catch {
    cache2.set(cacheKey, null);
    return null;
  }
  if (!boundaries[boundaries.length - 1].range.end) {
    boundaries[boundaries.length - 1].range.end = indexToPosition(
      text2,
      offset
    );
  }
  cache2.set(cacheKey, boundaries);
  return boundaries;
}
function isHtmlDoc(state, doc) {
  const userHtmlLanguages = Object.keys(state.editor.userLanguages).filter(
    (lang) => htmlLanguages.includes(state.editor.userLanguages[lang])
  );
  return (
    [...htmlLanguages, ...userHtmlLanguages].indexOf(doc.languageId) !== -1
  );
}
function isVueDoc(doc) {
  return doc.languageId === "vue";
}
function isSvelteDoc(doc) {
  return doc.languageId === "svelte";
}
function isHtmlContext(state, doc, position2) {
  let str = doc.getText({
    start: {
      line: 0,
      character: 0,
    },
    end: position2,
  });
  let boundaries = getLanguageBoundaries(state, doc, str);
  return boundaries ? boundaries[boundaries.length - 1].type === "html" : false;
}
function stringifyConfigValue(x) {
  if (isObject2(x)) return `${Object.keys(x).length} values`;
  if (typeof x === "function") return "\u0192";
  return stringifyObject(x, {
    inlineCharacterLimit: Infinity,
    singleQuotes: false,
    transform: (obj, prop, originalResult) => {
      if (typeof obj[prop] === "function") {
        return "\u0192";
      }
      return originalResult;
    },
  });
}
function stringifyCss(className, obj, settings) {
  if (obj.__rule !== true && !Array.isArray(obj)) return null;
  if (Array.isArray(obj)) {
    const rules = obj
      .map((x) => stringifyCss(className, x, settings))
      .filter(Boolean);
    if (rules.length === 0) return null;
    return rules.join("\n\n");
  }
  let css = ``;
  const indent = " ".repeat(settings.editor.tabSize);
  const context = dlv3(obj, "__context", []);
  const props = Object.keys(removeMeta(obj));
  if (props.length === 0) return null;
  for (let i = 0; i < context.length; i++) {
    css += `${indent.repeat(i)}${context[i]} {
`;
  }
  const indentStr = indent.repeat(context.length);
  const decls = props.reduce((acc, curr, i) => {
    const propStr = ensureArray(obj[curr])
      .map((val) => {
        const px = settings.tailwindCSS.showPixelEquivalents
          ? remToPx(val, settings.tailwindCSS.rootFontSize)
          : void 0;
        return `${indentStr + indent}${curr}: ${val}${
          px ? `/* ${px} */` : ""
        };`;
      })
      .join("\n");
    return `${acc}${i === 0 ? "" : "\n"}${propStr}`;
  }, "");
  css += `${indentStr}${augmentClassName(className, obj)} {
${decls}
${indentStr}}`;
  for (let i = context.length - 1; i >= 0; i--) {
    css += `${indent.repeat(i)}
}`;
  }
  return css;
}
function augmentClassName(className, obj) {
  const pseudo = obj.__pseudo.join("");
  const scope = obj.__scope ? `${obj.__scope} ` : "";
  return `${scope}.${escapeClassName2(className)}${pseudo}`;
}
function isRawScreen(screen) {
  return isObject2(screen) && screen.raw !== void 0;
}
function stringifyScreen(screen) {
  if (!screen) return void 0;
  if (typeof screen === "string") return `@media (min-width: ${screen})`;
  if (isRawScreen(screen)) {
    return `@media ${screen.raw}`;
  }
  let str = (Array.isArray(screen) ? screen : [screen])
    .map((range) => {
      return [
        typeof range.min === "string" ? `(min-width: ${range.min})` : null,
        typeof range.max === "string" ? `(max-width: ${range.max})` : null,
      ]
        .filter(Boolean)
        .join(" and ");
    })
    .join(", ");
  return str ? `@media ${str}` : void 0;
}
function isValidLocationForEmmetAbbreviation(document, abbreviationRange) {
  const startAngle = "<";
  const endAngle = ">";
  const escape2 = "\\";
  const question = "?";
  let start = {
    line: 0,
    character: 0,
  };
  let textToBackTrack = document.getText({
    start: {
      line: start.line,
      character: start.character,
    },
    end: {
      line: abbreviationRange.start.line,
      character: abbreviationRange.start.character,
    },
  });
  if (textToBackTrack.length > 500) {
    textToBackTrack = textToBackTrack.substr(textToBackTrack.length - 500);
  }
  if (!textToBackTrack.trim()) {
    return true;
  }
  let valid = true;
  let foundSpace = false;
  let i = textToBackTrack.length - 1;
  if (textToBackTrack[i] === startAngle) {
    return false;
  }
  while (i >= 0) {
    const char = textToBackTrack[i];
    i--;
    if (!foundSpace && /\s/.test(char)) {
      foundSpace = true;
      continue;
    }
    if (char === question && textToBackTrack[i] === startAngle) {
      i--;
      continue;
    }
    if (/\s/.test(char) && textToBackTrack[i] === startAngle) {
      i--;
      continue;
    }
    if (char !== startAngle && char !== endAngle) {
      continue;
    }
    if (i >= 0 && textToBackTrack[i] === escape2) {
      i--;
      continue;
    }
    if (char === endAngle) {
      if (i >= 0 && textToBackTrack[i] === "=") {
        continue;
      } else {
        break;
      }
    }
    if (char === startAngle) {
      valid = !foundSpace;
      break;
    }
  }
  return valid;
}
function naturalExpand(value2, total) {
  let length2 = typeof total === "number" ? total.toString().length : 8;
  return ("0".repeat(length2) + value2).slice(-length2);
}
function gte(v1, v2) {
  if (v1.startsWith("0.0.0-insiders")) {
    return true;
  }
  return semverGte(v1, v2);
}
function docsUrl(version2, paths) {
  let major = 0;
  let url2 = "https://tailwindcss-v0.netlify.app/docs/";
  if (gte(version2, "0.99.0")) {
    major = 1;
    url2 = "https://v1.tailwindcss.com/docs/";
  }
  if (gte(version2, "1.99.0")) {
    major = 2;
    url2 = "https://tailwindcss.com/docs/";
  }
  const path = Array.isArray(paths)
    ? paths[major] || paths[paths.length - 1]
    : paths;
  return `${url2}${path}`;
}
function getClassNameMeta(state, classNameOrParts) {
  const parts = Array.isArray(classNameOrParts)
    ? classNameOrParts
    : getClassNameParts(state, classNameOrParts);
  if (!parts) return null;
  const info = dlv3(state.classNames.classNames, [...parts, "__info"]);
  if (Array.isArray(info)) {
    return info.map((i) => ({
      source: i.__source,
      pseudo: i.__pseudo,
      scope: i.__scope,
      context: i.__context,
    }));
  }
  return {
    source: info.__source,
    pseudo: info.__pseudo,
    scope: info.__scope,
    context: info.__context,
  };
}
function flagEnabled2(state, flag) {
  if (state.featureFlags.future.includes(flag)) {
    return (
      state.config.future === "all" ||
      dlv3(state.config, ["future", flag], false)
    );
  }
  if (state.featureFlags.experimental.includes(flag)) {
    return (
      state.config.experimental === "all" ||
      dlv3(state.config, ["experimental", flag], false)
    );
  }
  return false;
}
function validateApply(state, classNameOrParts) {
  if (state.jit) {
    return {
      isApplyable: true,
    };
  }
  const meta = getClassNameMeta(state, classNameOrParts);
  if (!meta) return null;
  if (
    gte(state.version, "2.0.0-alpha.1") ||
    flagEnabled2(state, "applyComplexClasses")
  ) {
    return {
      isApplyable: true,
    };
  }
  const className = Array.isArray(classNameOrParts)
    ? classNameOrParts.join(state.separator)
    : classNameOrParts;
  let reason;
  if (Array.isArray(meta)) {
    reason = `'@apply' cannot be used with '${className}' because it is included in multiple rulesets.`;
  } else if (meta.source !== "utilities") {
    reason = `'@apply' cannot be used with '${className}' because it is not a utility.`;
  } else if (meta.context && meta.context.length > 0) {
    if (meta.context.length === 1) {
      reason = `'@apply' cannot be used with '${className}' because it is nested inside of an at-rule ('${meta.context[0]}').`;
    } else {
      reason = `'@apply' cannot be used with '${className}' because it is nested inside of at-rules (${meta.context
        .map((c4) => `'${c4}'`)
        .join(", ")}).`;
    }
  } else if (meta.pseudo && meta.pseudo.length > 0) {
    if (meta.pseudo.length === 1) {
      reason = `'@apply' cannot be used with '${className}' because its definition includes a pseudo-selector ('${meta.pseudo[0]}')`;
    } else {
      reason = `'@apply' cannot be used with '${className}' because its definition includes pseudo-selectors (${meta.pseudo
        .map((p2) => `'${p2}'`)
        .join(", ")}).`;
    }
  }
  if (reason) {
    return {
      isApplyable: false,
      reason,
    };
  }
  return {
    isApplyable: true,
  };
}
function getVariantsFromClassName(state, className) {
  let allVariants = state.variants.flatMap((variant) => {
    if (variant.values.length) {
      return variant.values.map((value2) =>
        value2 === "DEFAULT"
          ? variant.name
          : `${variant.name}${variant.hasDash ? "-" : ""}${value2}`
      );
    }
    return [variant.name];
  });
  let variants = /* @__PURE__ */ new Set();
  let offset = 0;
  let parts = splitAtTopLevelOnly2(className, state.separator);
  if (parts.length < 2) {
    return {
      variants: Array.from(variants),
      offset,
    };
  }
  parts = parts.filter(Boolean);
  for (let part of parts) {
    if (
      allVariants.includes(part) ||
      (state.jit &&
        ((part.includes("[") && part.endsWith("]")) || part.includes("/")) &&
        generateRules2(state, [`${part}${state.separator}[color:red]`]).rules
          .length > 0)
    ) {
      variants.add(part);
      offset += part.length + state.separator.length;
      continue;
    }
    break;
  }
  return {
    variants: Array.from(variants),
    offset,
  };
}
function splitAtTopLevelOnly2(input, separator) {
  let stack = [];
  let parts = [];
  let lastPos = 0;
  for (let idx = 0; idx < input.length; idx++) {
    let char = input[idx];
    if (stack.length === 0 && char === separator[0]) {
      if (
        separator.length === 1 ||
        input.slice(idx, idx + separator.length) === separator
      ) {
        parts.push(input.slice(lastPos, idx));
        lastPos = idx + separator.length;
      }
    }
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
    } else if (
      (char === ")" && stack[stack.length - 1] === "(") ||
      (char === "]" && stack[stack.length - 1] === "[") ||
      (char === "}" && stack[stack.length - 1] === "{")
    ) {
      stack.pop();
    }
  }
  parts.push(input.slice(lastPos));
  return parts;
}
var isUtil = (className) =>
  Array.isArray(className.__info)
    ? className.__info.some((x) => x.__source === "utilities")
    : className.__info.__source === "utilities";
function completionsFromClassList(
  state,
  classList,
  classListRange,
  filter,
  context
) {
  var _state$completionItem5;
  let classNames = classList.split(/[\s+]/);
  const partialClassName = classNames[classNames.length - 1];
  let sep = state.separator;
  let parts = partialClassName.split(sep);
  let subset;
  let subsetKey = [];
  let isSubset = false;
  let replacementRange = {
    ...classListRange,
    start: {
      ...classListRange.start,
      character: classListRange.end.character - partialClassName.length,
    },
  };
  if (state.jit) {
    var _state$completionItem3;
    let { variants: existingVariants, offset } = getVariantsFromClassName(
      state,
      partialClassName
    );
    if (
      context &&
      (context.triggerKind === 1 ||
        (context.triggerKind === 2 && context.triggerCharacter === "/")) &&
      partialClassName.includes("/")
    ) {
      let modifiers;
      let beforeSlash = partialClassName.split("/").slice(0, -1).join("/");
      if (state.classListContainsMetadata) {
        var _state$classList$find, _state$classList$find2;
        let baseClassName = beforeSlash.slice(offset);
        modifiers =
          (_state$classList$find = state.classList.find(
            (cls) => Array.isArray(cls) && cls[0] === baseClassName
          )) == null
            ? void 0
            : (_state$classList$find2 = _state$classList$find[1]) == null
            ? void 0
            : _state$classList$find2.modifiers;
      } else {
        let testClass = beforeSlash + "/[0]";
        let { rules } = generateRules2(state, [testClass]);
        if (rules.length > 0) {
          let opacities = dlv3(state.config, "theme.opacity", {});
          if (!isObject2(opacities)) {
            opacities = {};
          }
          modifiers = Object.keys(opacities);
        }
      }
      if (modifiers) {
        return withDefaults(
          {
            isIncomplete: false,
            items: modifiers.map((modifier, index) => {
              let className = `${beforeSlash}/${modifier}`;
              let kind = 21;
              let documentation;
              const color2 = getColor(state, className);
              if (color2 !== null) {
                var _color$alpha;
                kind = 16;
                if (
                  typeof color2 !== "string" &&
                  ((_color$alpha = color2.alpha) != null ? _color$alpha : 1) !==
                    0
                ) {
                  documentation = formatRgb(color2);
                }
              }
              return {
                label: className,
                ...(documentation
                  ? {
                      documentation,
                    }
                  : {}),
                kind,
                sortText: naturalExpand(index),
              };
            }),
          },
          {
            range: replacementRange,
            data: state.completionItemData,
          },
          state.editor.capabilities.itemDefaults
        );
      }
    }
    replacementRange.start.character += offset;
    let important = partialClassName.substr(offset).startsWith("!");
    if (important) {
      replacementRange.start.character += 1;
    }
    let items = [];
    if (!important) {
      let variantItem = function (item) {
        var _state$completionItem;
        return {
          kind: 9,
          data: {
            ...((_state$completionItem = state.completionItemData) != null
              ? _state$completionItem
              : {}),
            _type: "variant",
          },
          command:
            item.insertTextFormat === 2
              ? void 0
              : {
                  title: "",
                  command: "editor.action.triggerSuggest",
                },
          sortText: "-" + naturalExpand(variantOrder++),
          ...item,
        };
      };
      let variantOrder = 0;
      items.push(
        ...state.variants.flatMap((variant) => {
          let items2 = [];
          if (variant.isArbitrary) {
            items2.push(
              variantItem({
                label: `${variant.name}${variant.hasDash ? "-" : ""}[]${sep}`,
                insertTextFormat: 2,
                textEditText: `${variant.name}${
                  variant.hasDash ? "-" : ""
                }[\${1}]${sep}\${0}`,
              })
            );
          } else if (!existingVariants.includes(variant.name)) {
            let shouldSortVariants = !gte(state.version, "2.99.0");
            let resultingVariants = [...existingVariants, variant.name];
            if (shouldSortVariants) {
              let allVariants = state.variants.map((_ref) => {
                let { name } = _ref;
                return name;
              });
              resultingVariants = resultingVariants.sort(
                (a, b) => allVariants.indexOf(b) - allVariants.indexOf(a)
              );
            }
            items2.push(
              variantItem({
                label: `${variant.name}${sep}`,
                detail: variant.selectors().join(", "),
                textEditText:
                  resultingVariants[resultingVariants.length - 1] + sep,
                additionalTextEdits:
                  shouldSortVariants && resultingVariants.length > 1
                    ? [
                        {
                          newText:
                            resultingVariants
                              .slice(0, resultingVariants.length - 1)
                              .join(sep) + sep,
                          range: {
                            start: {
                              ...classListRange.start,
                              character:
                                classListRange.end.character -
                                partialClassName.length,
                            },
                            end: {
                              ...replacementRange.start,
                              character: replacementRange.start.character,
                            },
                          },
                        },
                      ]
                    : [],
              })
            );
          }
          if (variant.values.length) {
            items2.push(
              ...variant.values
                .filter(
                  (value2) =>
                    !existingVariants.includes(`${variant.name}-${value2}`)
                )
                .map((value2) =>
                  variantItem({
                    label:
                      value2 === "DEFAULT"
                        ? `${variant.name}${sep}`
                        : `${variant.name}${
                            variant.hasDash ? "-" : ""
                          }${value2}${sep}`,
                    detail: variant
                      .selectors({
                        value: value2,
                      })
                      .join(", "),
                  })
                )
            );
          }
          return items2;
        })
      );
    }
    if (state.classList) {
      var _state$completionItem2;
      return withDefaults(
        {
          isIncomplete: false,
          items: items.concat(
            state.classList.map((_ref2, index) => {
              let [className, { color: color2 }] = _ref2;
              let kind = color2 ? 16 : 21;
              let documentation;
              if (color2 && typeof color2 !== "string") {
                documentation = formatRgb(color2);
              }
              return {
                label: className,
                kind,
                ...(documentation
                  ? {
                      documentation,
                    }
                  : {}),
                sortText: naturalExpand(index, state.classList.length),
              };
            })
          ),
        },
        {
          data: {
            ...((_state$completionItem2 = state.completionItemData) != null
              ? _state$completionItem2
              : {}),
            ...(important
              ? {
                  important,
                }
              : {}),
            variants: existingVariants,
          },
          range: replacementRange,
        },
        state.editor.capabilities.itemDefaults
      );
    }
    return withDefaults(
      {
        isIncomplete: false,
        items: items
          .concat(
            Object.keys(state.classNames.classNames)
              .filter((className) => {
                let item = state.classNames.classNames[className];
                if (existingVariants.length === 0) {
                  return item.__info;
                }
                return item.__info && isUtil(item);
              })
              .map((className, index, classNames2) => {
                let kind = 21;
                let documentation;
                const color2 = getColor(state, className);
                if (color2 !== null) {
                  var _color$alpha2;
                  kind = 16;
                  if (
                    typeof color2 !== "string" &&
                    ((_color$alpha2 = color2.alpha) != null
                      ? _color$alpha2
                      : 1) !== 0
                  ) {
                    documentation = formatRgb(color2);
                  }
                }
                return {
                  label: className,
                  kind,
                  ...(documentation
                    ? {
                        documentation,
                      }
                    : {}),
                  sortText: naturalExpand(index, classNames2.length),
                };
              })
          )
          .filter((item) => {
            if (item === null) {
              return false;
            }
            if (filter && !filter(item)) {
              return false;
            }
            return true;
          }),
      },
      {
        range: replacementRange,
        data: {
          ...((_state$completionItem3 = state.completionItemData) != null
            ? _state$completionItem3
            : {}),
          variants: existingVariants,
          ...(important
            ? {
                important,
              }
            : {}),
        },
      },
      state.editor.capabilities.itemDefaults
    );
  }
  for (let i = parts.length - 1; i > 0; i--) {
    let keys = parts.slice(0, i).filter(Boolean);
    subset = dlv3(state.classNames.classNames, keys);
    if (
      typeof subset !== "undefined" &&
      typeof dlv3(subset, ["__info", "__rule"]) === "undefined"
    ) {
      isSubset = true;
      subsetKey = keys;
      replacementRange = {
        ...replacementRange,
        start: {
          ...replacementRange.start,
          character:
            replacementRange.start.character +
            keys.join(sep).length +
            sep.length,
        },
      };
      break;
    }
  }
  return withDefaults(
    {
      isIncomplete: false,
      items: Object.keys(isSubset ? subset : state.classNames.classNames)
        .filter((k2) => k2 !== "__info")
        .filter((className) => isContextItem(state, [...subsetKey, className]))
        .map((className, index, classNames2) => {
          var _state$completionItem4;
          return {
            label: className + sep,
            kind: 9,
            command: {
              title: "",
              command: "editor.action.triggerSuggest",
            },
            sortText: "-" + naturalExpand(index, classNames2.length),
            data: {
              ...((_state$completionItem4 = state.completionItemData) != null
                ? _state$completionItem4
                : {}),
              className,
              variants: subsetKey,
            },
          };
        })
        .concat(
          Object.keys(isSubset ? subset : state.classNames.classNames)
            .filter((className) =>
              dlv3(state.classNames.classNames, [
                ...subsetKey,
                className,
                "__info",
              ])
            )
            .map((className, index, classNames2) => {
              let kind = 21;
              let documentation;
              const color2 = getColor(state, className);
              if (color2 !== null) {
                var _color$alpha3;
                kind = 16;
                if (
                  typeof color2 !== "string" &&
                  ((_color$alpha3 = color2.alpha) != null
                    ? _color$alpha3
                    : 1) !== 0
                ) {
                  documentation = formatRgb(color2);
                }
              }
              return {
                label: className,
                kind,
                ...(documentation
                  ? {
                      documentation,
                    }
                  : {}),
                sortText: naturalExpand(index, classNames2.length),
              };
            })
        )
        .filter((item) => {
          if (item === null) {
            return false;
          }
          if (filter && !filter(item)) {
            return false;
          }
          return true;
        }),
    },
    {
      range: replacementRange,
      data: {
        ...((_state$completionItem5 = state.completionItemData) != null
          ? _state$completionItem5
          : {}),
        variants: subsetKey,
      },
    },
    state.editor.capabilities.itemDefaults
  );
}
async function provideClassAttributeCompletions(
  state,
  document,
  position2,
  context
) {
  let str = document.getText({
    start: document.positionAt(Math.max(0, document.offsetAt(position2) - 1e3)),
    end: position2,
  });
  let matches = matchClassAttributes(
    str,
    (await state.editor.getConfiguration(document.uri)).tailwindCSS
      .classAttributes
  );
  if (matches.length === 0) {
    return null;
  }
  let match = matches[matches.length - 1];
  const lexer =
    match[0][0] === ":" || (match[1].startsWith("[") && match[1].endsWith("]"))
      ? getComputedClassAttributeLexer()
      : getClassAttributeLexer();
  lexer.reset(str.substr(match.index + match[0].length - 1));
  try {
    let tokens = Array.from(lexer);
    let last = tokens[tokens.length - 1];
    if (
      last.type.startsWith("start") ||
      last.type === "classlist" ||
      last.type.startsWith("arb")
    ) {
      let classList = "";
      for (let i = tokens.length - 1; i >= 0; i--) {
        if (
          tokens[i].type === "classlist" ||
          tokens[i].type.startsWith("arb")
        ) {
          classList = tokens[i].value + classList;
        } else {
          break;
        }
      }
      return completionsFromClassList(
        state,
        classList,
        {
          start: {
            line: position2.line,
            character: position2.character - classList.length,
          },
          end: position2,
        },
        void 0,
        context
      );
    }
  } catch (_) {}
  return null;
}
async function provideCustomClassNameCompletions(
  state,
  document,
  position2,
  context
) {
  const settings = await state.editor.getConfiguration(document.uri);
  const regexes = settings.tailwindCSS.experimental.classRegex;
  if (regexes.length === 0) return null;
  const positionOffset = document.offsetAt(position2);
  const searchRange = {
    start: document.positionAt(Math.max(0, positionOffset - 1e3)),
    end: document.positionAt(positionOffset + 1e3),
  };
  let str = document.getText(searchRange);
  for (let i = 0; i < regexes.length; i++) {
    try {
      let [containerRegexString, classRegexString] = Array.isArray(regexes[i])
        ? regexes[i]
        : [regexes[i]];
      let containerRegex = new Regex(containerRegexString, "g");
      let containerMatch;
      while ((containerMatch = containerRegex.exec(str)) !== null) {
        const searchStart = document.offsetAt(searchRange.start);
        const matchStart = searchStart + containerMatch.index[1];
        const matchEnd = matchStart + containerMatch[1].length;
        const cursor = document.offsetAt(position2);
        if (cursor >= matchStart && cursor <= matchEnd) {
          let classList;
          if (classRegexString) {
            let classRegex = new Regex(classRegexString, "g");
            let classMatch;
            while ((classMatch = classRegex.exec(containerMatch[1])) !== null) {
              const classMatchStart = matchStart + classMatch.index[1];
              const classMatchEnd = classMatchStart + classMatch[1].length;
              if (cursor >= classMatchStart && cursor <= classMatchEnd) {
                classList = classMatch[1].substr(0, cursor - classMatchStart);
              }
            }
            if (typeof classList === "undefined") {
              throw Error();
            }
          } else {
            classList = containerMatch[1].substr(0, cursor - matchStart);
          }
          return completionsFromClassList(
            state,
            classList,
            {
              start: {
                line: position2.line,
                character: position2.character - classList.length,
              },
              end: position2,
            },
            void 0,
            context
          );
        }
      }
    } catch (_) {}
  }
  return null;
}
function provideAtApplyCompletions(state, document, position2, context) {
  let str = document.getText({
    start: {
      line: Math.max(position2.line - 30, 0),
      character: 0,
    },
    end: position2,
  });
  const match = findLast(/@apply\s+(?<classList>[^;}]*)$/gi, str);
  if (match === null) {
    return null;
  }
  const classList = match.groups.classList;
  return completionsFromClassList(
    state,
    classList,
    {
      start: {
        line: position2.line,
        character: position2.character - classList.length,
      },
      end: position2,
    },
    (item) => {
      var _item$data$variants, _item$data, _item$data$className, _item$data2;
      if (item.kind === 9) {
        return (
          gte(state.version, "2.0.0-alpha.1") ||
          flagEnabled2(state, "applyComplexClasses")
        );
      }
      let variants =
        (_item$data$variants =
          (_item$data = item.data) == null ? void 0 : _item$data.variants) !=
        null
          ? _item$data$variants
          : [];
      let className =
        (_item$data$className =
          (_item$data2 = item.data) == null ? void 0 : _item$data2.className) !=
        null
          ? _item$data$className
          : item.label;
      let validated = validateApply(state, [...variants, className]);
      return validated !== null && validated.isApplyable === true;
    },
    context
  );
}
var NUMBER_REGEX = /^(\d+\.?|\d*\.\d+)$/;
function isNumber(str) {
  return NUMBER_REGEX.test(str);
}
async function provideClassNameCompletions(
  state,
  document,
  position2,
  context
) {
  if (isCssContext(state, document, position2)) {
    return provideAtApplyCompletions(state, document, position2, context);
  }
  if (
    isHtmlContext(state, document, position2) ||
    isJsxContext(state, document, position2)
  ) {
    return provideClassAttributeCompletions(
      state,
      document,
      position2,
      context
    );
  }
  return null;
}
function provideCssHelperCompletions(state, document, position2) {
  var _state$completionItem6;
  if (!isCssContext(state, document, position2)) {
    return null;
  }
  let text2 = document.getText({
    start: {
      line: position2.line,
      character: 0,
    },
    // read one extra character so we can see if it's a ] later
    end: {
      line: position2.line,
      character: position2.character + 1,
    },
  });
  const match = text2
    .substr(0, text2.length - 1)
    .match(/[\s:;/*(){}](?<helper>config|theme)\(\s*['"]?(?<path>[^)'"]*)$/);
  if (match === null) {
    return null;
  }
  let alpha;
  let path = match.groups.path.replace(/^['"]+/g, "");
  let matches = path.match(/^([^\s]+)(?![^\[]*\])(?:\s*\/\s*([^\/\s]*))$/);
  if (matches) {
    path = matches[1];
    alpha = matches[2];
  }
  if (alpha !== void 0) {
    return null;
  }
  let base =
    match.groups.helper === "config"
      ? state.config
      : dlv3(state.config, "theme", {});
  let parts = path.split(/([\[\].]+)/);
  let keys = parts.filter((_, i) => i % 2 === 0);
  let separators = parts.filter((_, i) => i % 2 !== 0);
  function totalLength(arr) {
    return arr.reduce((acc, cur) => acc + cur.length, 0);
  }
  let obj;
  let offset = keys[keys.length - 1].length;
  let separator = separators.length ? separators[separators.length - 1] : null;
  if (keys.length === 1) {
    obj = base;
  } else {
    for (let i = keys.length - 1; i > 0; i--) {
      let o = dlv3(base, keys.slice(0, i));
      if (isObject2(o)) {
        obj = o;
        offset = totalLength(parts.slice(i * 2));
        separator = separators[i - 1];
        break;
      }
    }
  }
  if (!obj) return null;
  let editRange = {
    start: {
      line: position2.line,
      character: position2.character - offset,
    },
    end: position2,
  };
  return withDefaults(
    {
      isIncomplete: false,
      items: Object.keys(obj)
        .sort((a, z) => {
          let aIsNumber = isNumber(a);
          let zIsNumber = isNumber(z);
          if (aIsNumber && !zIsNumber) {
            return -1;
          }
          if (!aIsNumber && zIsNumber) {
            return 1;
          }
          if (aIsNumber && zIsNumber) {
            return parseFloat(a) - parseFloat(z);
          }
          return 0;
        })
        .map((item, index, items) => {
          var _color$alpha4;
          let color2 = getColorFromValue(obj[item]);
          const replaceDot =
            item.indexOf(".") !== -1 && separator && separator.endsWith(".");
          const insertClosingBrace =
            text2.charAt(text2.length - 1) !== "]" &&
            (replaceDot || (separator && separator.endsWith("[")));
          const detail = stringifyConfigValue(obj[item]);
          return {
            label: item,
            sortText: naturalExpand(index, items.length),
            commitCharacters: [
              !item.includes(".") && ".",
              !item.includes("[") && "[",
            ].filter(Boolean),
            kind: color2 ? 16 : isObject2(obj[item]) ? 9 : 10,
            // VS Code bug causes some values to not display in some cases
            detail:
              detail === "0" || detail === "transparent"
                ? `${detail} `
                : detail,
            ...(color2 &&
            typeof color2 !== "string" &&
            ((_color$alpha4 = color2.alpha) != null ? _color$alpha4 : 1) !== 0
              ? {
                  documentation: formatRgb(color2),
                }
              : {}),
            ...(insertClosingBrace
              ? {
                  textEditText: `${item}]`,
                }
              : {}),
            additionalTextEdits: replaceDot
              ? [
                  {
                    newText: "[",
                    range: {
                      start: {
                        ...editRange.start,
                        character: editRange.start.character - 1,
                      },
                      end: editRange.start,
                    },
                  },
                ]
              : [],
          };
        }),
    },
    {
      range: editRange,
      data: {
        ...((_state$completionItem6 = state.completionItemData) != null
          ? _state$completionItem6
          : {}),
        _type: "helper",
      },
    },
    state.editor.capabilities.itemDefaults
  );
}
function provideTailwindDirectiveCompletions(state, document, position2) {
  var _state$completionItem7;
  if (!isCssContext(state, document, position2)) {
    return null;
  }
  let text2 = document.getText({
    start: {
      line: position2.line,
      character: 0,
    },
    end: position2,
  });
  const match = text2.match(/^\s*@tailwind\s+(?<partial>[^\s]*)$/i);
  if (match === null) return null;
  let items = [
    gte(state.version, "1.0.0-beta.1")
      ? {
          label: "base",
          documentation: {
            kind: "markdown",
            value: `This injects Tailwind\u2019s base styles and any base styles registered by plugins.

[Tailwind CSS Documentation](${docsUrl(
              state.version,
              "functions-and-directives/#tailwind"
            )})`,
          },
        }
      : {
          label: "preflight",
          documentation: {
            kind: "markdown",
            value: `This injects Tailwind\u2019s base styles, which is a combination of Normalize.css and some additional base styles.

[Tailwind CSS Documentation](${docsUrl(
              state.version,
              "functions-and-directives/#tailwind"
            )})`,
          },
        },
    {
      label: "components",
      documentation: {
        kind: "markdown",
        value: `This injects Tailwind\u2019s component classes and any component classes registered by plugins.

[Tailwind CSS Documentation](${docsUrl(
          state.version,
          "functions-and-directives/#tailwind"
        )})`,
      },
    },
    {
      label: "utilities",
      documentation: {
        kind: "markdown",
        value: `This injects Tailwind\u2019s utility classes and any utility classes registered by plugins.

[Tailwind CSS Documentation](${docsUrl(
          state.version,
          "functions-and-directives/#tailwind"
        )})`,
      },
    },
    state.jit && gte(state.version, "2.1.99")
      ? {
          label: "variants",
          documentation: {
            kind: "markdown",
            value: `Use this directive to control where Tailwind injects the utility variants.

This directive is considered an advanced escape hatch and it is recommended to omit it whenever possible. If omitted, Tailwind will append these classes to the very end of your stylesheet by default.

[Tailwind CSS Documentation](${docsUrl(
              state.version,
              "just-in-time-mode#variants-are-inserted-at-tailwind-variants"
            )})`,
          },
        }
      : {
          label: "screens",
          documentation: {
            kind: "markdown",
            value: `Use this directive to control where Tailwind injects the responsive variations of each utility.

If omitted, Tailwind will append these classes to the very end of your stylesheet by default.

[Tailwind CSS Documentation](${docsUrl(
              state.version,
              "functions-and-directives/#tailwind"
            )})`,
          },
        },
  ];
  return withDefaults(
    {
      isIncomplete: false,
      items: items.map((item) => ({
        ...item,
        kind: 21,
      })),
    },
    {
      data: {
        ...((_state$completionItem7 = state.completionItemData) != null
          ? _state$completionItem7
          : {}),
        _type: "@tailwind",
      },
      range: {
        start: {
          line: position2.line,
          character: position2.character - match.groups.partial.length,
        },
        end: position2,
      },
    },
    state.editor.capabilities.itemDefaults
  );
}
function provideVariantsDirectiveCompletions(state, document, position2) {
  var _state$completionItem8;
  if (!isCssContext(state, document, position2)) {
    return null;
  }
  if (gte(state.version, "2.99.0")) {
    return null;
  }
  let text2 = document.getText({
    start: {
      line: position2.line,
      character: 0,
    },
    end: position2,
  });
  const match = text2.match(/^\s*@variants\s+(?<partial>[^}]*)$/i);
  if (match === null) return null;
  const parts = match.groups.partial.split(/\s*,\s*/);
  if (/\s+/.test(parts[parts.length - 1])) return null;
  let possibleVariants = state.variants.flatMap((variant) => {
    if (variant.values.length) {
      return variant.values.map((value2) =>
        value2 === "DEFAULT"
          ? variant.name
          : `${variant.name}${variant.hasDash ? "-" : ""}${value2}`
      );
    }
    return [variant.name];
  });
  const existingVariants = parts.slice(0, parts.length - 1);
  if (state.jit) {
    possibleVariants.unshift("responsive");
    possibleVariants = possibleVariants.filter(
      (v) => !state.screens.includes(v)
    );
  }
  return withDefaults(
    {
      isIncomplete: false,
      items: possibleVariants
        .filter((v) => existingVariants.indexOf(v) === -1)
        .map((variant, index, variants) => ({
          // TODO: detail
          label: variant,
          kind: 21,
          sortText: naturalExpand(index, variants.length),
        })),
    },
    {
      data: {
        ...((_state$completionItem8 = state.completionItemData) != null
          ? _state$completionItem8
          : {}),
        _type: "variant",
      },
      range: {
        start: {
          line: position2.line,
          character: position2.character - parts[parts.length - 1].length,
        },
        end: position2,
      },
    },
    state.editor.capabilities.itemDefaults
  );
}
function provideLayerDirectiveCompletions(state, document, position2) {
  var _state$completionItem9;
  if (!isCssContext(state, document, position2)) {
    return null;
  }
  let text2 = document.getText({
    start: {
      line: position2.line,
      character: 0,
    },
    end: position2,
  });
  const match = text2.match(/^\s*@layer\s+(?<partial>[^\s]*)$/i);
  if (match === null) return null;
  return withDefaults(
    {
      isIncomplete: false,
      items: ["base", "components", "utilities"].map(
        (layer, index, layers) => ({
          label: layer,
          kind: 21,
          sortText: naturalExpand(index, layers.length),
        })
      ),
    },
    {
      data: {
        ...((_state$completionItem9 = state.completionItemData) != null
          ? _state$completionItem9
          : {}),
        _type: "layer",
      },
      range: {
        start: {
          line: position2.line,
          character: position2.character - match.groups.partial.length,
        },
        end: position2,
      },
    },
    state.editor.capabilities.itemDefaults
  );
}
function withDefaults(completionList, defaults3, supportedDefaults) {
  let defaultData = supportedDefaults.includes("data");
  let defaultRange = supportedDefaults.includes("editRange");
  return {
    ...completionList,
    ...(defaultData || defaultRange
      ? {
          itemDefaults: {
            ...(defaultData && defaults3.data
              ? {
                  data: defaults3.data,
                }
              : {}),
            ...(defaultRange && defaults3.range
              ? {
                  editRange: defaults3.range,
                }
              : {}),
          },
        }
      : {}),
    items:
      defaultData && defaultRange
        ? completionList.items
        : completionList.items.map((_ref3) => {
            let { textEditText, ...item } = _ref3;
            return {
              ...item,
              ...(defaultData || !defaults3.data || item.data
                ? {}
                : {
                    data: defaults3.data,
                  }),
              ...(defaultRange || !defaults3.range
                ? textEditText
                  ? {
                      textEditText,
                    }
                  : {}
                : {
                    textEdit: {
                      newText: textEditText != null ? textEditText : item.label,
                      range: defaults3.range,
                    },
                  }),
            };
          }),
  };
}
function provideScreenDirectiveCompletions(state, document, position2) {
  var _state$completionItem10;
  if (!isCssContext(state, document, position2)) {
    return null;
  }
  let text2 = document.getText({
    start: {
      line: position2.line,
      character: 0,
    },
    end: position2,
  });
  const match = text2.match(/^\s*@screen\s+(?<partial>[^\s]*)$/i);
  if (match === null) return null;
  const screens = dlv3(
    state.config,
    ["screens"],
    dlv3(state.config, ["theme", "screens"], {})
  );
  if (!isObject2(screens)) return null;
  return withDefaults(
    {
      isIncomplete: false,
      items: Object.keys(screens).map((screen, index) => ({
        label: screen,
        kind: 21,
        sortText: naturalExpand(index),
      })),
    },
    {
      data: {
        ...((_state$completionItem10 = state.completionItemData) != null
          ? _state$completionItem10
          : {}),
        _type: "screen",
      },
      range: {
        start: {
          line: position2.line,
          character: position2.character - match.groups.partial.length,
        },
        end: position2,
      },
    },
    state.editor.capabilities.itemDefaults
  );
}
function provideCssDirectiveCompletions(state, document, position2) {
  var _state$completionItem11;
  if (!isCssContext(state, document, position2)) {
    return null;
  }
  let text2 = document.getText({
    start: {
      line: position2.line,
      character: 0,
    },
    end: position2,
  });
  const match = text2.match(/^\s*@(?<partial>[a-z]*)$/i);
  if (match === null) return null;
  const items = [
    {
      label: "@tailwind",
      documentation: {
        kind: "markdown",
        value: `Use the \`@tailwind\` directive to insert Tailwind\u2019s \`base\`, \`components\`, \`utilities\` and \`${
          state.jit && gte(state.version, "2.1.99") ? "variants" : "screens"
        }\` styles into your CSS.

[Tailwind CSS Documentation](${docsUrl(
          state.version,
          "functions-and-directives/#tailwind"
        )})`,
      },
    },
    {
      label: "@screen",
      documentation: {
        kind: "markdown",
        value: `The \`@screen\` directive allows you to create media queries that reference your breakpoints by name instead of duplicating their values in your own CSS.

[Tailwind CSS Documentation](${docsUrl(
          state.version,
          "functions-and-directives/#screen"
        )})`,
      },
    },
    {
      label: "@apply",
      documentation: {
        kind: "markdown",
        value: `Use \`@apply\` to inline any existing utility classes into your own custom CSS.

[Tailwind CSS Documentation](${docsUrl(
          state.version,
          "functions-and-directives/#apply"
        )})`,
      },
    },
    ...(gte(state.version, "1.8.0")
      ? [
          {
            label: "@layer",
            documentation: {
              kind: "markdown",
              value: `Use the \`@layer\` directive to tell Tailwind which "bucket" a set of custom styles belong to. Valid layers are \`base\`, \`components\`, and \`utilities\`.

[Tailwind CSS Documentation](${docsUrl(
                state.version,
                "functions-and-directives/#layer"
              )})`,
            },
          },
        ]
      : []),
    ...(gte(state.version, "2.99.0")
      ? []
      : [
          {
            label: "@variants",
            documentation: {
              kind: "markdown",
              value: `You can generate \`responsive\`, \`hover\`, \`focus\`, \`active\`, and other variants of your own utilities by wrapping their definitions in the \`@variants\` directive.

[Tailwind CSS Documentation](${docsUrl(
                state.version,
                "functions-and-directives/#variants"
              )})`,
            },
          },
          {
            label: "@responsive",
            documentation: {
              kind: "markdown",
              value: `You can generate responsive variants of your own classes by wrapping their definitions in the \`@responsive\` directive.

[Tailwind CSS Documentation](${docsUrl(
                state.version,
                "functions-and-directives/#responsive"
              )})`,
            },
          },
        ]),
    ...(gte(state.version, "3.2.0")
      ? [
          {
            label: "@config",
            documentation: {
              kind: "markdown",
              value: `Use the \`@config\` directive to specify which config file Tailwind should use when compiling that CSS file.

[Tailwind CSS Documentation](${docsUrl(
                state.version,
                "functions-and-directives/#config"
              )})`,
            },
          },
        ]
      : []),
  ];
  return withDefaults(
    {
      isIncomplete: false,
      items: items.map((item) => ({
        ...item,
        kind: 14,
      })),
    },
    {
      data: {
        ...((_state$completionItem11 = state.completionItemData) != null
          ? _state$completionItem11
          : {}),
        _type: "directive",
      },
      range: {
        start: {
          line: position2.line,
          character: position2.character - match.groups.partial.length - 1,
        },
        end: position2,
      },
    },
    state.editor.capabilities.itemDefaults
  );
}
async function provideConfigDirectiveCompletions(state, document, position2) {
  var _state$completionItem12;
  if (!isCssContext(state, document, position2)) {
    return null;
  }
  if (!gte(state.version, "3.2.0")) {
    return null;
  }
  let text2 = document.getText({
    start: {
      line: position2.line,
      character: 0,
    },
    end: position2,
  });
  let match = text2.match(/@config\s*(?<partial>'[^']*|"[^"]*)$/);
  if (!match) {
    return null;
  }
  let partial = match.groups.partial.slice(1);
  let valueBeforeLastSlash = partial.substring(0, partial.lastIndexOf("/"));
  let valueAfterLastSlash = partial.substring(partial.lastIndexOf("/") + 1);
  return withDefaults(
    {
      isIncomplete: false,
      items: (
        await state.editor.readDirectory(document, valueBeforeLastSlash || ".")
      )
        .filter((_ref4) => {
          let [name, type] = _ref4;
          return type.isDirectory || /\.c?js$/.test(name);
        })
        .map((_ref5) => {
          let [name, type] = _ref5;
          return {
            label: type.isDirectory ? name + "/" : name,
            kind: type.isDirectory ? 19 : 17,
            command: type.isDirectory
              ? {
                  command: "editor.action.triggerSuggest",
                  title: "",
                }
              : void 0,
          };
        }),
    },
    {
      data: {
        ...((_state$completionItem12 = state.completionItemData) != null
          ? _state$completionItem12
          : {}),
        _type: "filesystem",
      },
      range: {
        start: {
          line: position2.line,
          character: position2.character - valueAfterLastSlash.length,
        },
        end: position2,
      },
    },
    state.editor.capabilities.itemDefaults
  );
}
async function provideEmmetCompletions(state, document, position2) {
  let settings = await state.editor.getConfiguration(document.uri);
  if (settings.tailwindCSS.emmetCompletions !== true) return null;
  const isHtml =
    !isJsDoc(state, document) && isHtmlContext(state, document, position2);
  const isJs =
    isJsDoc(state, document) || isJsxContext(state, document, position2);
  const syntax = isHtml ? "html" : isJs ? "jsx" : null;
  if (syntax === null) {
    return null;
  }
  const extractAbbreviationResults = extractAbbreviation(
    document,
    position2,
    true
  );
  if (
    !extractAbbreviationResults ||
    !isAbbreviationValid(syntax, extractAbbreviationResults.abbreviation)
  ) {
    return null;
  }
  if (
    !isValidLocationForEmmetAbbreviation(
      document,
      extractAbbreviationResults.abbreviationRange
    )
  ) {
    return null;
  }
  if (isJs) {
    const abbreviation = extractAbbreviationResults.abbreviation;
    if (abbreviation.startsWith("this.")) {
      return null;
    }
    const symbols = await state.editor.getDocumentSymbols(document.uri);
    if (
      symbols &&
      symbols.find(
        (symbol) =>
          abbreviation === symbol.name ||
          (abbreviation.startsWith(symbol.name + ".") &&
            !/>|\*|\+/.test(abbreviation))
      )
    ) {
      return null;
    }
  }
  const emmetItems = doComplete(document, position2, syntax, {});
  if (!emmetItems || !emmetItems.items || emmetItems.items.length !== 1) {
    return null;
  }
  if (emmetItems.items[0].label === "widows: ;") {
    return null;
  }
  const parts = emmetItems.items[0].label.split(".");
  if (parts.length < 2) return null;
  return completionsFromClassList(state, parts[parts.length - 1], {
    start: {
      line: position2.line,
      character: position2.character - parts[parts.length - 1].length,
    },
    end: position2,
  });
}
async function doComplete2(state, document, position2, context) {
  if (state === null)
    return {
      items: [],
      isIncomplete: false,
    };
  const result =
    (await provideClassNameCompletions(state, document, position2, context)) ||
    provideCssHelperCompletions(state, document, position2) ||
    provideCssDirectiveCompletions(state, document, position2) ||
    provideScreenDirectiveCompletions(state, document, position2) ||
    provideVariantsDirectiveCompletions(state, document, position2) ||
    provideTailwindDirectiveCompletions(state, document, position2) ||
    provideLayerDirectiveCompletions(state, document, position2) ||
    (await provideConfigDirectiveCompletions(state, document, position2)) ||
    (await provideCustomClassNameCompletions(
      state,
      document,
      position2,
      context
    ));
  if (result) return result;
  return provideEmmetCompletions(state, document, position2);
}
async function resolveCompletionItem(state, item) {
  var _item$data3,
    _item$data4,
    _item$data$className2,
    _item$data5,
    _item$data6,
    _item$data$variants2,
    _item$data7;
  if (
    [
      "helper",
      "directive",
      "variant",
      "layer",
      "@tailwind",
      "filesystem",
    ].includes((_item$data3 = item.data) == null ? void 0 : _item$data3._type)
  ) {
    return item;
  }
  if (
    ((_item$data4 = item.data) == null ? void 0 : _item$data4._type) ===
    "screen"
  ) {
    let screens = dlv3(
      state.config,
      ["theme", "screens"],
      dlv3(state.config, ["screens"], {})
    );
    if (!isObject2(screens)) screens = {};
    item.detail = stringifyScreen(screens[item.label]);
    return item;
  }
  let className =
    (_item$data$className2 =
      (_item$data5 = item.data) == null ? void 0 : _item$data5.className) !=
    null
      ? _item$data$className2
      : item.label;
  if ((_item$data6 = item.data) != null && _item$data6.important) {
    className = `!${className}`;
  }
  let variants =
    (_item$data$variants2 =
      (_item$data7 = item.data) == null ? void 0 : _item$data7.variants) != null
      ? _item$data$variants2
      : [];
  if (state.jit) {
    if (item.kind === 9) return item;
    if (item.detail && item.documentation) return item;
    let { root, rules: rules2 } = generateRules2(state, [
      [...variants, className].join(state.separator),
    ]);
    if (rules2.length === 0) return item;
    if (!item.detail) {
      if (rules2.length === 1) {
        item.detail = await stringifyDecls(state, rules2[0]);
      } else {
        item.detail = `${rules2.length} rules`;
      }
    }
    if (!item.documentation) {
      item.documentation = {
        kind: "markdown",
        value: ["```css", await stringifyRoot(state, root), "```"].join("\n"),
      };
    }
    return item;
  }
  const rules = dlv3(state.classNames.classNames, [
    ...variants,
    className,
    "__info",
  ]);
  if (item.kind === 9) {
    item.detail = state.classNames.context[className].join(", ");
  } else {
    item.detail = await getCssDetail(state, rules);
    if (!item.documentation) {
      const settings = await state.editor.getConfiguration();
      const css = stringifyCss(
        [...variants, className].join(":"),
        rules,
        settings
      );
      if (css) {
        item.documentation = {
          kind: "markdown",
          value: ["```css", css, "```"].join("\n"),
        };
      }
    }
  }
  return item;
}
function isContextItem(state, keys) {
  const item = dlv3(state.classNames.classNames, [keys]);
  if (!isObject2(item)) {
    return false;
  }
  if (!state.classNames.context[keys[keys.length - 1]]) {
    return false;
  }
  if (Object.keys(item).filter((x) => x !== "__info").length > 0) {
    return true;
  }
  return isObject2(item.__info) && !item.__info.__rule;
}
function stringifyDecls$1(obj, settings) {
  let props = Object.keys(obj);
  let nonCustomProps = props.filter((prop) => !prop.startsWith("--"));
  if (props.length !== nonCustomProps.length && nonCustomProps.length !== 0) {
    props = nonCustomProps;
  }
  return props
    .map((prop) =>
      ensureArray(obj[prop])
        .map((value2) => {
          const px = settings.tailwindCSS.showPixelEquivalents
            ? remToPx(value2, settings.tailwindCSS.rootFontSize)
            : void 0;
          return `${prop}: ${value2}${px ? `/* ${px} */` : ""};`;
        })
        .join(" ")
    )
    .join(" ");
}
async function getCssDetail(state, className) {
  if (Array.isArray(className)) {
    return `${className.length} rules`;
  }
  if (className.__rule === true) {
    const settings = await state.editor.getConfiguration();
    return stringifyDecls$1(removeMeta(className), settings);
  }
  return null;
}
var DiagnosticKind;
(function (DiagnosticKind2) {
  DiagnosticKind2["CssConflict"] = "cssConflict";
  DiagnosticKind2["InvalidApply"] = "invalidApply";
  DiagnosticKind2["InvalidScreen"] = "invalidScreen";
  DiagnosticKind2["InvalidVariant"] = "invalidVariant";
  DiagnosticKind2["InvalidConfigPath"] = "invalidConfigPath";
  DiagnosticKind2["InvalidTailwindDirective"] = "invalidTailwindDirective";
  DiagnosticKind2["RecommendedVariantOrder"] = "recommendedVariantOrder";
})(DiagnosticKind || (DiagnosticKind = {}));
function joinWithAnd(strings) {
  return strings.reduce((acc, cur, i) => {
    if (i === 0) {
      return cur;
    }
    if (strings.length > 1 && i === strings.length - 1) {
      return `${acc} and ${cur}`;
    }
    return `${acc}, ${cur}`;
  }, "");
}
function getClassNameDecls(state, className) {
  const parts = getClassNameParts(state, className);
  if (!parts) return null;
  const info = dlv3(state.classNames.classNames, [...parts, "__info"]);
  if (Array.isArray(info)) {
    return info.map(removeMeta);
  }
  return removeMeta(info);
}
async function getCssConflictDiagnostics(state, document, settings) {
  let severity = settings.tailwindCSS.lint.cssConflict;
  if (severity === "ignore") return [];
  let diagnostics = [];
  const classLists = await findClassListsInDocument(state, document);
  classLists.forEach((classList) => {
    const classNames = getClassNamesInClassList(classList);
    classNames.forEach((className, index) => {
      if (state.jit) {
        let { rules } = generateRules2(state, [className.className]);
        if (rules.length === 0) {
          return;
        }
        let info = rules.map((rule) => {
          let properties2 = [];
          rule.walkDecls((_ref) => {
            let { prop } = _ref;
            properties2.push(prop);
          });
          let context = getRuleContext(state, rule, className.className);
          return {
            context,
            properties: properties2,
          };
        });
        let otherClassNames2 = classNames.filter(
          (_className, i) => i !== index
        );
        let conflictingClassNames2 = otherClassNames2.filter(
          (otherClassName) => {
            let { rules: otherRules } = generateRules2(state, [
              otherClassName.className,
            ]);
            if (otherRules.length !== rules.length) {
              return false;
            }
            for (let i = 0; i < otherRules.length; i++) {
              let rule = otherRules[i];
              let properties2 = [];
              rule.walkDecls((_ref2) => {
                let { prop } = _ref2;
                properties2.push(prop);
              });
              if (!equal(info[i].properties, properties2)) {
                return false;
              }
              let context = getRuleContext(
                state,
                rule,
                otherClassName.className
              );
              if (!equal(info[i].context, context)) {
                return false;
              }
            }
            return true;
          }
        );
        if (conflictingClassNames2.length === 0) return;
        diagnostics.push({
          code: DiagnosticKind.CssConflict,
          className,
          otherClassNames: conflictingClassNames2,
          range: className.range,
          severity: severity === "error" ? 1 : 2,
          message: `'${
            className.className
          }' applies the same CSS properties as ${joinWithAnd(
            conflictingClassNames2.map(
              (conflictingClassName) => `'${conflictingClassName.className}'`
            )
          )}.`,
          relatedInformation: conflictingClassNames2.map(
            (conflictingClassName) => {
              return {
                message: conflictingClassName.className,
                location: {
                  uri: document.uri,
                  range: conflictingClassName.range,
                },
              };
            }
          ),
        });
        return;
      }
      let decls = getClassNameDecls(state, className.className);
      if (!decls) return;
      let properties = Object.keys(decls);
      let meta = getClassNameMeta(state, className.className);
      let otherClassNames = classNames.filter((_className, i) => i !== index);
      let conflictingClassNames = otherClassNames.filter((otherClassName) => {
        let otherDecls = getClassNameDecls(state, otherClassName.className);
        if (!otherDecls) return false;
        let otherMeta = getClassNameMeta(state, otherClassName.className);
        return (
          equal(properties, Object.keys(otherDecls)) &&
          !Array.isArray(meta) &&
          !Array.isArray(otherMeta) &&
          equal(meta.context, otherMeta.context) &&
          equal(meta.pseudo, otherMeta.pseudo) &&
          meta.scope === otherMeta.scope
        );
      });
      if (conflictingClassNames.length === 0) return;
      diagnostics.push({
        code: DiagnosticKind.CssConflict,
        className,
        otherClassNames: conflictingClassNames,
        range: className.range,
        severity: severity === "error" ? 1 : 2,
        message: `'${className.className}' applies the same CSS ${
          properties.length === 1 ? "property" : "properties"
        } as ${joinWithAnd(
          conflictingClassNames.map(
            (conflictingClassName) => `'${conflictingClassName.className}'`
          )
        )}.`,
        relatedInformation: conflictingClassNames.map(
          (conflictingClassName) => {
            return {
              message: conflictingClassName.className,
              location: {
                uri: document.uri,
                range: conflictingClassName.range,
              },
            };
          }
        ),
      });
    });
  });
  return diagnostics;
}
async function getInvalidApplyDiagnostics(state, document, settings) {
  let severity = settings.tailwindCSS.lint.invalidApply;
  if (severity === "ignore") return [];
  const classNames = await findClassNamesInRange(
    state,
    document,
    void 0,
    "css",
    false
  );
  let diagnostics = classNames.map((className) => {
    let result = validateApply(state, className.className);
    if (result === null || result.isApplyable === true) {
      return null;
    }
    return {
      code: DiagnosticKind.InvalidApply,
      severity: severity === "error" ? 1 : 2,
      range: className.range,
      message: result.reason,
      className,
    };
  });
  return diagnostics.filter(Boolean);
}
function closest(input, options) {
  return options.concat([]).sort((a, b) => sift(input, a) - sift(input, b))[0];
}
function absoluteRange(range, reference) {
  return {
    start: {
      line:
        ((reference == null ? void 0 : reference.start.line) || 0) +
        range.start.line,
      character:
        (range.end.line === 0
          ? (reference == null ? void 0 : reference.start.character) || 0
          : 0) + range.start.character,
    },
    end: {
      line:
        ((reference == null ? void 0 : reference.start.line) || 0) +
        range.end.line,
      character:
        (range.end.line === 0
          ? (reference == null ? void 0 : reference.start.character) || 0
          : 0) + range.end.character,
    },
  };
}
function getInvalidScreenDiagnostics(state, document, settings) {
  let severity = settings.tailwindCSS.lint.invalidScreen;
  if (severity === "ignore") return [];
  let diagnostics = [];
  let ranges = [];
  if (isCssDoc(state, document)) {
    ranges.push(void 0);
  } else {
    let boundaries = getLanguageBoundaries(state, document);
    if (!boundaries) return [];
    ranges.push(
      ...boundaries
        .filter((b) => b.type === "css")
        .map((_ref) => {
          let { range } = _ref;
          return range;
        })
    );
  }
  ranges.forEach((range) => {
    let text2 = getTextWithoutComments(document, "css", range);
    let matches = findAll(/(?:\s|^)@screen\s+(?<screen>[^\s{]+)/g, text2);
    matches.forEach((match) => {
      if (state.screens.includes(match.groups.screen)) {
        return null;
      }
      let message = `The screen '${match.groups.screen}' does not exist in your theme config.`;
      let suggestions = [];
      let suggestion = closest(match.groups.screen, state.screens);
      if (suggestion) {
        suggestions.push(suggestion);
        message += ` Did you mean '${suggestion}'?`;
      }
      diagnostics.push({
        code: DiagnosticKind.InvalidScreen,
        range: absoluteRange(
          {
            start: indexToPosition(
              text2,
              match.index + match[0].length - match.groups.screen.length
            ),
            end: indexToPosition(text2, match.index + match[0].length),
          },
          range
        ),
        severity: severity === "error" ? 1 : 2,
        message,
        suggestions,
      });
    });
  });
  return diagnostics;
}
function getInvalidVariantDiagnostics(state, document, settings) {
  let severity = settings.tailwindCSS.lint.invalidVariant;
  if (severity === "ignore") return [];
  if (gte(state.version, "2.99.0")) {
    return [];
  }
  let diagnostics = [];
  let ranges = [];
  if (isCssDoc(state, document)) {
    ranges.push(void 0);
  } else {
    let boundaries = getLanguageBoundaries(state, document);
    if (!boundaries) return [];
    ranges.push(
      ...boundaries
        .filter((b) => b.type === "css")
        .map((_ref) => {
          let { range } = _ref;
          return range;
        })
    );
  }
  let possibleVariants = state.variants.flatMap((variant) => {
    if (variant.values.length) {
      return variant.values.map((value2) =>
        value2 === "DEFAULT"
          ? variant.name
          : `${variant.name}${variant.hasDash ? "-" : ""}${value2}`
      );
    }
    return [variant.name];
  });
  if (state.jit) {
    possibleVariants.unshift("responsive");
    possibleVariants = possibleVariants.filter(
      (v) => !state.screens.includes(v)
    );
  }
  ranges.forEach((range) => {
    let text2 = getTextWithoutComments(document, "css", range);
    let matches = findAll(/(?:\s|^)@variants\s+(?<variants>[^{]+)/g, text2);
    matches.forEach((match) => {
      let variants = match.groups.variants.split(/(\s*,\s*)/);
      let listStartIndex =
        match.index + match[0].length - match.groups.variants.length;
      for (let i = 0; i < variants.length; i += 2) {
        let variant = variants[i].trim();
        if (possibleVariants.includes(variant)) {
          continue;
        }
        let message = `The variant '${variant}' does not exist.`;
        let suggestions = [];
        let suggestion = closest(variant, possibleVariants);
        if (suggestion) {
          suggestions.push(suggestion);
          message += ` Did you mean '${suggestion}'?`;
        }
        let variantStartIndex =
          listStartIndex + variants.slice(0, i).join("").length;
        diagnostics.push({
          code: DiagnosticKind.InvalidVariant,
          range: absoluteRange(
            {
              start: indexToPosition(text2, variantStartIndex),
              end: indexToPosition(text2, variantStartIndex + variant.length),
            },
            range
          ),
          severity: severity === "error" ? 1 : 2,
          message,
          suggestions,
        });
      }
    });
  });
  return diagnostics;
}
var rePropName =
  /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
function stringToPath(string) {
  let result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName, (match, number2, quote, subString) => {
    result.push(
      quote ? subString.replace(reEscapeChar, "$1") : number2 || match
    );
  });
  return result;
}
function pathToString2(path) {
  if (typeof path === "string") return path;
  return path.reduce((acc, cur, i) => {
    if (i === 0) return cur;
    if (cur.includes(".")) return `${acc}[${cur}]`;
    return `${acc}.${cur}`;
  }, "");
}
function validateConfigPath(state, path, base) {
  if (base === void 0) {
    base = [];
  }
  let keys = Array.isArray(path) ? path : stringToPath(path);
  let value2 = dlv3(state.config, [...base, ...keys]);
  let suggestions = [];
  function findAlternativePath() {
    let points = combinations("123456789".substr(0, keys.length - 1)).map((x) =>
      x.split("").map((x2) => parseInt(x2, 10))
    );
    let possibilities = points
      .map((p2) => {
        let result = [];
        let i = 0;
        p2.forEach((x) => {
          result.push(keys.slice(i, x).join("."));
          i = x;
        });
        result.push(keys.slice(i).join("."));
        return result;
      })
      .slice(1);
    return possibilities.find(
      (possibility) => validateConfigPath(state, possibility, base).isValid
    );
  }
  if (typeof value2 === "undefined") {
    let reason = `'${pathToString2(
      path
    )}' does not exist in your theme config.`;
    let parentPath = [...base, ...keys.slice(0, keys.length - 1)];
    let parentValue = dlv3(state.config, parentPath);
    if (isObject2(parentValue)) {
      let closestValidKey = closest(
        keys[keys.length - 1],
        Object.keys(parentValue).filter(
          (key) => validateConfigPath(state, [...parentPath, key]).isValid
        )
      );
      if (closestValidKey) {
        suggestions.push(
          pathToString2([...keys.slice(0, keys.length - 1), closestValidKey])
        );
        reason += ` Did you mean '${suggestions[0]}'?`;
      }
    } else {
      let altPath = findAlternativePath();
      if (altPath) {
        return {
          isValid: false,
          reason: `${reason} Did you mean '${pathToString2(altPath)}'?`,
          suggestions: [pathToString2(altPath)],
        };
      }
    }
    return {
      isValid: false,
      reason,
      suggestions,
    };
  }
  if (
    !(
      typeof value2 === "string" ||
      typeof value2 === "number" ||
      value2 instanceof String ||
      value2 instanceof Number ||
      Array.isArray(value2) ||
      typeof value2 === "function"
    )
  ) {
    let reason = `'${pathToString2(
      path
    )}' was found but does not resolve to a valid theme value.`;
    if (isObject2(value2)) {
      let validKeys = Object.keys(value2).filter(
        (key) => validateConfigPath(state, [...keys, key], base).isValid
      );
      if (validKeys.length) {
        suggestions.push(
          ...validKeys.map((validKey) => pathToString2([...keys, validKey]))
        );
        reason += ` Did you mean something like '${suggestions[0]}'?`;
      }
    }
    return {
      isValid: false,
      reason,
      suggestions,
    };
  }
  let isValid = true;
  for (let i = keys.length - 1; i >= 0; i--) {
    let key = keys[i];
    let parentValue = dlv3(state.config, [...base, ...keys.slice(0, i)]);
    if (/^[0-9]+$/.test(key)) {
      if (!isObject2(parentValue) && !Array.isArray(parentValue)) {
        isValid = false;
        break;
      }
    } else if (!isObject2(parentValue)) {
      isValid = false;
      break;
    }
  }
  if (!isValid) {
    let reason = `'${pathToString2(
      path
    )}' does not exist in your theme config.`;
    let altPath = findAlternativePath();
    if (altPath) {
      return {
        isValid: false,
        reason: `${reason} Did you mean '${pathToString2(altPath)}'?`,
        suggestions: [pathToString2(altPath)],
      };
    }
    return {
      isValid: false,
      reason,
      suggestions: [],
    };
  }
  return {
    isValid: true,
    value: value2,
  };
}
function getInvalidConfigPathDiagnostics(state, document, settings) {
  let severity = settings.tailwindCSS.lint.invalidConfigPath;
  if (severity === "ignore") return [];
  let diagnostics = [];
  findHelperFunctionsInDocument(state, document).forEach((helperFn) => {
    let base = helperFn.helper === "theme" ? ["theme"] : [];
    let result = validateConfigPath(state, helperFn.path, base);
    if (result.isValid === true) {
      return;
    }
    diagnostics.push({
      code: DiagnosticKind.InvalidConfigPath,
      range: helperFn.ranges.path,
      severity: severity === "error" ? 1 : 2,
      message: result.reason,
      suggestions: result.suggestions,
    });
  });
  return diagnostics;
}
function getInvalidTailwindDirectiveDiagnostics(state, document, settings) {
  let severity = settings.tailwindCSS.lint.invalidTailwindDirective;
  if (severity === "ignore") return [];
  let diagnostics = [];
  let ranges = [];
  if (isCssDoc(state, document)) {
    ranges.push(void 0);
  } else {
    let boundaries = getLanguageBoundaries(state, document);
    if (!boundaries) return [];
    ranges.push(
      ...boundaries
        .filter((b) => b.type === "css")
        .map((_ref) => {
          let { range } = _ref;
          return range;
        })
    );
  }
  let notSemicolonLanguages = ["sass", "sugarss", "stylus"];
  let regex;
  if (
    notSemicolonLanguages.includes(document.languageId) ||
    (state.editor &&
      notSemicolonLanguages.includes(
        state.editor.userLanguages[document.languageId]
      ))
  ) {
    regex = /(?:\s|^)@tailwind\s+(?<value>[^\r\n]+)/g;
  } else {
    regex = /(?:\s|^)@tailwind\s+(?<value>[^;]+)/g;
  }
  let hasVariantsDirective = state.jit && gte(state.version, "2.1.99");
  ranges.forEach((range) => {
    let text2 = getTextWithoutComments(document, "css", range);
    let matches = findAll(regex, text2);
    let valid = [
      "utilities",
      "components",
      "screens",
      gte(state.version, "1.0.0-beta.1") ? "base" : "preflight",
      hasVariantsDirective && "variants",
    ].filter(Boolean);
    let suggestable = valid;
    if (hasVariantsDirective) {
      suggestable = suggestable.filter((value2) => value2 !== "screens");
    }
    matches.forEach((match) => {
      if (valid.includes(match.groups.value)) {
        return null;
      }
      let message = `'${match.groups.value}' is not a valid value.`;
      let suggestions = [];
      if (match.groups.value === "preflight") {
        suggestions.push("base");
        message += ` Did you mean 'base'?`;
      } else {
        let suggestion = closest(match.groups.value, suggestable);
        if (suggestion) {
          suggestions.push(suggestion);
          message += ` Did you mean '${suggestion}'?`;
        }
      }
      diagnostics.push({
        code: DiagnosticKind.InvalidTailwindDirective,
        range: absoluteRange(
          {
            start: indexToPosition(
              text2,
              match.index + match[0].length - match.groups.value.length
            ),
            end: indexToPosition(text2, match.index + match[0].length),
          },
          range
        ),
        severity: severity === "error" ? 1 : 2,
        message,
        suggestions,
      });
    });
  });
  return diagnostics;
}
async function getRecommendedVariantOrderDiagnostics(
  state,
  document,
  settings
) {
  if (!state.jit) return [];
  if (gte(state.version, "2.99.0")) return [];
  let severity = settings.tailwindCSS.lint.recommendedVariantOrder;
  if (severity === "ignore") return [];
  let diagnostics = [];
  const classLists = await findClassListsInDocument(state, document);
  classLists.forEach((classList) => {
    const classNames = getClassNamesInClassList(classList);
    classNames.forEach((className) => {
      let { rules } = generateRules2(state, [className.className]);
      if (rules.length === 0) {
        return;
      }
      let { variants, offset } = getVariantsFromClassName(
        state,
        className.className
      );
      let sortedVariants = [...variants].sort((a, b) =>
        bigSign2(
          state.jitContext.variantOrder.get(b) -
            state.jitContext.variantOrder.get(a)
        )
      );
      if (!equalExact(variants, sortedVariants)) {
        diagnostics.push({
          code: DiagnosticKind.RecommendedVariantOrder,
          suggestions: [
            [...sortedVariants, className.className.substr(offset)].join(
              state.separator
            ),
          ],
          range: className.range,
          severity: severity === "error" ? 1 : 2,
          message:
            "Variants are not in the recommended order, which may cause unexpected CSS output.",
        });
      }
    });
  });
  return diagnostics;
}
async function doValidate(state, document, only) {
  if (only === void 0) {
    only = [
      DiagnosticKind.CssConflict,
      DiagnosticKind.InvalidApply,
      DiagnosticKind.InvalidScreen,
      DiagnosticKind.InvalidVariant,
      DiagnosticKind.InvalidConfigPath,
      DiagnosticKind.InvalidTailwindDirective,
      DiagnosticKind.RecommendedVariantOrder,
    ];
  }
  const settings = await state.editor.getConfiguration(document.uri);
  return settings.tailwindCSS.validate
    ? [
        ...(only.includes(DiagnosticKind.CssConflict)
          ? await getCssConflictDiagnostics(state, document, settings)
          : []),
        ...(only.includes(DiagnosticKind.InvalidApply)
          ? await getInvalidApplyDiagnostics(state, document, settings)
          : []),
        ...(only.includes(DiagnosticKind.InvalidScreen)
          ? getInvalidScreenDiagnostics(state, document, settings)
          : []),
        ...(only.includes(DiagnosticKind.InvalidVariant)
          ? getInvalidVariantDiagnostics(state, document, settings)
          : []),
        ...(only.includes(DiagnosticKind.InvalidConfigPath)
          ? getInvalidConfigPathDiagnostics(state, document, settings)
          : []),
        ...(only.includes(DiagnosticKind.InvalidTailwindDirective)
          ? getInvalidTailwindDirectiveDiagnostics(state, document, settings)
          : []),
        ...(only.includes(DiagnosticKind.RecommendedVariantOrder)
          ? await getRecommendedVariantOrderDiagnostics(
              state,
              document,
              settings
            )
          : []),
      ]
    : [];
}
async function doHover(state, document, position2) {
  return (
    (await provideClassNameHover(state, document, position2)) ||
    provideCssHelperHover(state, document, position2)
  );
}
function provideCssHelperHover(state, document, position2) {
  if (!isCssContext(state, document, position2)) {
    return null;
  }
  let helperFns = findHelperFunctionsInRange(document, {
    start: {
      line: position2.line,
      character: 0,
    },
    end: {
      line: position2.line + 1,
      character: 0,
    },
  });
  for (let helperFn of helperFns) {
    if (isWithinRange(position2, helperFn.ranges.path)) {
      let validated = validateConfigPath(
        state,
        helperFn.path,
        helperFn.helper === "theme" ? ["theme"] : []
      );
      let value2 = validated.isValid
        ? stringifyConfigValue(validated.value)
        : null;
      if (value2 === null) {
        return null;
      }
      return {
        contents: {
          kind: "markdown",
          value: ["```plaintext", value2, "```"].join("\n"),
        },
        range: helperFn.ranges.path,
      };
    }
  }
  return null;
}
async function provideClassNameHover(state, document, position2) {
  let className = await findClassNameAtPosition(state, document, position2);
  if (className === null) return null;
  if (state.jit) {
    let { root, rules } = generateRules2(state, [className.className]);
    if (rules.length === 0) {
      return null;
    }
    return {
      contents: {
        language: "css",
        value: await stringifyRoot(state, root, document.uri),
      },
      range: className.range,
    };
  }
  const parts = getClassNameParts(state, className.className);
  if (!parts) return null;
  if (isCssContext(state, document, position2)) {
    let validated = validateApply(state, parts);
    if (validated === null || validated.isApplyable === false) {
      return null;
    }
  }
  const settings = await state.editor.getConfiguration(document.uri);
  const css = stringifyCss(
    className.className,
    dlv3(state.classNames.classNames, [...parts, "__info"]),
    settings
  );
  if (!css) return null;
  return {
    contents: {
      language: "css",
      value: css,
    },
    range: className.range,
  };
}
async function getDocumentColors(state, document) {
  let colors = [];
  if (!state.enabled) return colors;
  let settings = await state.editor.getConfiguration(document.uri);
  if (settings.tailwindCSS.colorDecorators === false) return colors;
  let classLists = await findClassListsInDocument(state, document);
  classLists.forEach((classList) => {
    let classNames = getClassNamesInClassList(classList);
    classNames.forEach((className) => {
      var _color$alpha;
      let color2 = getColor(state, className.className);
      if (
        color2 === null ||
        typeof color2 === "string" ||
        ((_color$alpha = color2.alpha) != null ? _color$alpha : 1) === 0
      ) {
        return;
      }
      colors.push({
        range: className.range,
        color: culoriColorToVscodeColor(color2),
      });
    });
  });
  let helperFns = findHelperFunctionsInDocument(state, document);
  helperFns.forEach((fn2) => {
    var _color$alpha2;
    let keys = stringToPath(fn2.path);
    let base = fn2.helper === "theme" ? ["theme"] : [];
    let value2 = dlv3(state.config, [...base, ...keys]);
    let color2 = getColorFromValue(value2);
    if (
      color2 &&
      typeof color2 !== "string" &&
      ((_color$alpha2 = color2.alpha) != null ? _color$alpha2 : 1) !== 0
    ) {
      colors.push({
        range: fn2.ranges.path,
        color: culoriColorToVscodeColor(color2),
      });
    }
  });
  return dedupeByRange(colors);
}

// src/tailwindcss.worker.ts
import { TextDocument } from "vscode-languageserver-textdocument";
async function stateFromConfig(configPromise) {
  const preparedTailwindConfig = await configPromise;
  const config = resolveConfig2(preparedTailwindConfig);
  const jitContext = createContext(config);
  const state = {
    version: "3.0.0",
    config,
    enabled: true,
    modules: {
      postcss: {
        // @ts-expect-error https://github.com/postcss/postcss/pull/1815
        module: postcss8,
        version: "",
      },
      postcssSelectorParser: { module: postcssSelectorParser },
      jit: {
        createContext: { module: createContext },
        expandApplyAtRules: { module: expandApplyAtRules },
        generateRules: { module: generateRules },
      },
    },
    classNames: {
      classNames: {},
      context: {},
    },
    jit: true,
    jitContext,
    separator: config.separator,
    screens: config.theme?.screens ? Object.keys(config.theme.screens) : [],
    variants: jitContext.getVariants(),
    editor: {
      userLanguages: {},
      capabilities: {
        configuration: true,
        diagnosticRelatedInformation: true,
        itemDefaults: [],
      },
      // eslint-disable-next-line require-await
      async getConfiguration() {
        return {
          editor: { tabSize: 2 },
          // Default values are based on
          // https://github.com/tailwindlabs/tailwindcss-intellisense/blob/v0.9.1/packages/tailwindcss-language-server/src/server.ts#L259-L287
          tailwindCSS: {
            emmetCompletions: false,
            classAttributes: ["class", "className", "ngClass"],
            codeActions: true,
            hovers: true,
            suggestions: true,
            validate: true,
            colorDecorators: true,
            rootFontSize: 16,
            lint: {
              cssConflict: "warning",
              invalidApply: "error",
              invalidScreen: "error",
              invalidVariant: "error",
              invalidConfigPath: "error",
              invalidTailwindDirective: "error",
              recommendedVariantOrder: "warning",
            },
            showPixelEquivalents: true,
            includeLanguages: {},
            files: {
              // Upstream defines these values, but we don’t need them.
              exclude: [],
            },
            experimental: {
              classRegex: [],
              // Upstream types are wrong
              configFile: {},
            },
          },
        };
      },
      // This option takes some properties that we don’t have nor need.
    },
  };
  state.classList = jitContext
    .getClassList()
    .filter((className) => className !== "*")
    .map((className) => [className, { color: getColor(state, className) }]);
  return state;
}
function initialize(tailwindWorkerOptions) {
  initializeWorker((ctx, options) => {
    const preparedTailwindConfig =
      tailwindWorkerOptions?.prepareTailwindConfig?.(options.tailwindConfig) ??
      options.tailwindConfig ??
      {};
    if (typeof preparedTailwindConfig !== "object") {
      throw new TypeError(
        `Expected tailwindConfig to resolve to an object, but got: ${JSON.stringify(
          preparedTailwindConfig
        )}`
      );
    }
    const statePromise = stateFromConfig(preparedTailwindConfig);
    const getTextDocument = (uri, languageId) => {
      const models = ctx.getMirrorModels();
      for (const model of models) {
        if (String(model.uri) === uri) {
          return TextDocument.create(
            uri,
            languageId,
            model.version,
            model.getValue()
          );
        }
      }
    };
    return {
      async doComplete(uri, languageId, position2, context) {
        const textDocument = getTextDocument(uri, languageId);
        if (!textDocument) {
          return;
        }
        return doComplete2(
          await statePromise,
          textDocument,
          position2,
          context
        );
      },
      async doHover(uri, languageId, position2) {
        const textDocument = getTextDocument(uri, languageId);
        if (!textDocument) {
          return;
        }
        return doHover(await statePromise, textDocument, position2);
      },
      async doValidate(uri, languageId) {
        const textDocument = getTextDocument(uri, languageId);
        if (!textDocument) {
          return [];
        }
        return doValidate(await statePromise, textDocument);
      },
      async generateStylesFromContent(css, content) {
        const { config } = await statePromise;
        const tailwind = processTailwindFeatures(
          (processOptions) => () =>
            processOptions.createContext(config, content)
        );
        const processor = postcss8([tailwind]);
        const result = await processor.process(css);
        return result.css;
      },
      async getDocumentColors(uri, languageId) {
        const textDocument = getTextDocument(uri, languageId);
        if (!textDocument) {
          return [];
        }
        return getDocumentColors(await statePromise, textDocument);
      },
      async resolveCompletionItem(item) {
        return resolveCompletionItem(await statePromise, item);
      },
    };
  });
}
initialize();
export { initialize };
//# sourceMappingURL=tailwindcss.worker.js.map
