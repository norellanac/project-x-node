'use strict';

const DEFAULT_COLORS_LIGHT = {
  primary: '#6750A4',
  primaryContainer: '#EADDFF',
  secondary: '#625B71',
  secondaryContainer: '#E8DEF8',
  tertiary: '#7D5260',
  tertiaryContainer: '#FFD8E4',
  error: '#B3261E',
  errorContainer: '#F9DEDC',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  textPrimary: '#000000',
  textSecondary: '#49454F',
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  onTertiary: '#FFFFFF',
};

const DEFAULT_COLORS_DARK = {
  primary: '#D0BCFF',
  primaryContainer: '#25232A',
  secondary: '#CCC2DC',
  secondaryContainer: '#4A4458',
  tertiary: '#EFB8C8',
  tertiaryContainer: '#633B48',
  error: '#F2B8B5',
  errorContainer: '#8C1D18',
  background: '#1C1B1F',
  surface: '#121212',
  textPrimary: '#FFFFFF',
  textSecondary: '#CAC4D0',
  onPrimary: '#000000',
  onSecondary: '#000000',
  onTertiary: '#000000',
};

const DEFAULT_FEATURES = {
  chatEnabled: true,
  tasksEnabled: true,
  newsletterEnabled: true,
  socialAuthEnabled: false,
  darkModeEnabled: true,
  biometricsEnabled: true,
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Brandings', [
      {
        id: 1,
        appName: 'Reco',
        tagline: 'Conectando servicios de calidad',
        legalName: 'Reco Latam',
        logoUrl: null,
        iconUrl: null,
        splashUrl: null,
        faviconUrl: null,
        defaultImageUrl: null,
        sliderImages: JSON.stringify([]),
        colorsLight: JSON.stringify(DEFAULT_COLORS_LIGHT),
        colorsDark: JSON.stringify(DEFAULT_COLORS_DARK),
        fontFamily: 'Roboto',
        buttonBorderRadius: 100,
        termsUrl: 'https://recolatam.com/terms-and-conditions',
        privacyUrl: 'https://recolatam.com/privacy-policy',
        supportUrl: '',
        privacyEmail: 'privacy@recolatam.com',
        legalEmail: 'legal@recolatam.com',
        companyAddress: 'Residenciales San Jose, San José Pinula, Guatemala',
        mailchimpApiUrl: '',
        features: JSON.stringify(DEFAULT_FEATURES),
        copyOverrides: JSON.stringify({}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Brandings', { id: 1 }, {});
  },
};
