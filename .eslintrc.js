module.exports = {
  parser: 'babel-eslint',
  plugins: ['flowtype'],
  env: {
    jest: true,
  },
  extends: [
    'airbnb',
    'eslint-config-uber-universal-stage-3',
    'plugin:flowtype/recommended',
  ],
  rules: {
    'react/jsx-filename-extension': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'no-unused-vars': [
      'error',
      {vars: 'all', args: 'none', ignoreRestSiblings: false},
    ],
    'react/require-default-props': 0,
    'react/sort-comp': [
      'error',
      {
        order: [
          'props',
          'state',
          'type-annotations',
          'static-methods',
          'lifecycle',
          '/^on.+$/',
          '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
          'everything-else',
          '/^render.+$/',
          'render',
        ],
      },
    ],
    'jsx-a11y/mouse-events-have-key-events': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
  },
};
