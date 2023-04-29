const presets = [
  [
    '@babel/preset-env',
    {
      targets: { electron: 21 }
    }
  ],
  ['@babel/preset-react']
];

module.exports = { presets };
