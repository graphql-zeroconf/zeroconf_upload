const task = () => async (file) => {
  const {
    createReadStream, filename, mimetype, encoding,
  } = await file;
  const stream = await createReadStream();

  // todo your custom(like aws upload & save to database)

  return {
    filename,
    mimetype,
    encoding,
  };
};

module.exports = {
  type: 'Mutation',
  field: 'upload',
  returnType: '[File]',
  args: {
    files: '[Upload!]!',
  },
  resolver: async (parent, args, context, info) => {
    const { files } = args;

    const result = await Promise.all(files.map(task()));

    return result;
  },
};
