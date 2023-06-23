module.exports = {
  presets: [
    '@babel/typescript',
    ['@babel/env', { loose: true }],
    '@babel/react',
  ],
  plugins: [
    ['@babel/proposal-class-properties', { loose: true }],
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
  ],
};
