const fs = require('fs');

exports.SANDBOX_FILES = [
  {
    path: 'src/models',
    file: 'belongs-to-model.model.ts',
    content: fs.readFileSync(
      require.resolve('./belongs-to-model.model.ts.txt'),
    ),
  },
  {
    path: 'src/models',
    file: 'has-many-model.model.ts',
    content: fs.readFileSync(require.resolve('./has-many-model.model.ts.txt')),
  },
  {
    path: 'src/models',
    file: 'has-one-model.model.ts',
    content: fs.readFileSync(require.resolve('./has-one-model.model.ts.txt')),
  },
];
