import { BaseThemeOptions } from "./BaseTheme";
/* eslint-disable  @typescript-eslint/no-explicit-any */

/*
	Merge two options, with newThemeOptions having precedence.
	If no parent is selected the BaseThemeOptions is used
	Doesn't affect either options passed in.
 */
function mergeThemeOptions(
  newThemeOptions: object,
  parentThemeOptions: object = BaseThemeOptions,
) {
  const parentThemeOptionsCopy = deepCopyObject(parentThemeOptions);
  return mergeObjects(parentThemeOptionsCopy, newThemeOptions);
}

function mergeObjects(
  mainThemeOptions: any,
  parentThemeOptions: any,
  visited = new Map<any, any>(),
) {
  //This Deep Merge algorithm is based on https://www.geeksforgeeks.org/how-to-deep-merge-two-objects-in-typescript/
  if (isObject(mainThemeOptions) && isObject(parentThemeOptions)) {
    for (const key in parentThemeOptions) {
      if (isObject(parentThemeOptions[key])) {
        if (!mainThemeOptions[key]) {
          mainThemeOptions[key] = {};
        }
        // Check if the parentThemeOptions object has already been visited
        if (!visited.has(parentThemeOptions[key])) {
          visited.set(parentThemeOptions[key], {});
          mergeObjects(mainThemeOptions[key], parentThemeOptions[key], visited);
        } else {
          mainThemeOptions[key] = visited.get(parentThemeOptions[key]);
        }
      } else {
        mainThemeOptions[key] = parentThemeOptions[key];
      }
    }
  }
  return mainThemeOptions;
}

function isObject(item: any): boolean {
  return item !== null && typeof item === "object" && !Array.isArray(item);
}

function deepCopyObject(themeOptions: object) {
  return mergeObjects({}, themeOptions);
}

export { mergeThemeOptions };
