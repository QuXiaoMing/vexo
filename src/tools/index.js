export const loadFile = (type = 'themes', _path) => {
  if (!_path) {
    throw new Error(`loadFile [${type}] error : 路径错误`)
  }
  switch (type) {
    case 'themes':
      return r => require.ensure([], () =>
        r(require(`../../themes/${_path}`)),
        'themes')
    case 'resource':
      return r => require.ensure([], () =>
        r(require(`../../resource/${_path}`)),
        'resource')
    default:
      throw new Error(`loadFile [${type}] error is not surpoted`)
      break;
  }
}
