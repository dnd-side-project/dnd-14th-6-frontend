const path = require("node:path");

module.exports = function indexTemplate(filePaths) {
  const exports = filePaths.map(({ path: filePath }) => {
    const basename = path.basename(filePath, path.extname(filePath));
    return `export { default as ${basename} } from './${basename}';`;
  });

  return `${exports.join("\n")}\n`;
};
