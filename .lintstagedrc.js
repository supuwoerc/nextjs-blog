module.exports = {
  '**/*.(ts|tsx|js)': (filenames) => [
    `pnpm eslint ${filenames.join(' ')}`,
    `pnpm prettier --write ${filenames.join(' ')}`,
  ],
  '**/*.(md|json)': (filenames) =>
    `pnpm prettier --write ${filenames.join(' ')}`,
};
