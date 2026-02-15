// https://github.com/drizzle-team/drizzle-orm/issues/3248#issuecomment-3761674168

"use strict";

function readPackage(pkg, context) {
  if (pkg.name === "drizzle-kit" && pkg.version === "0.31.9") {
    pkg.peerDependencies = {
      ...pkg.peerDependencies,
      "drizzle-orm": "0.45.1",
      postgres: "3.4.8",
      // pg: "8.16.3", // appliable only if u use pg driver. the same import error
    };
    context.log("Adjusted drizzle-kit@0.31.8 peerDependencies (added drizzle-orm@0.45.1, postgres@3.4.8)");
  }

  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
