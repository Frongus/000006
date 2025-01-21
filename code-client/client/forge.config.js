module.exports = {
    packagerConfig: {},
    makers: [
      {
        name: '@electron-forge/maker-squirrel',
        config: {
          name: 'AI_Translator',
        },
      },
      {
        name: '@electron-forge/maker-zip',
        platforms: ['win32'],
      },
    ],
  };
  