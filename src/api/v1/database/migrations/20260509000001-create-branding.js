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
    await queryInterface.createTable('Brandings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      appName: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'My App',
      },
      tagline: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      legalName: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      logoUrl: { type: Sequelize.STRING },
      iconUrl: { type: Sequelize.STRING },
      splashUrl: { type: Sequelize.STRING },
      faviconUrl: { type: Sequelize.STRING },
      defaultImageUrl: { type: Sequelize.STRING },
      sliderImages: { type: Sequelize.JSON },
      colorsLight: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: DEFAULT_COLORS_LIGHT,
      },
      colorsDark: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: DEFAULT_COLORS_DARK,
      },
      fontFamily: {
        type: Sequelize.STRING,
        defaultValue: 'Roboto',
      },
      buttonBorderRadius: {
        type: Sequelize.INTEGER,
        defaultValue: 100,
      },
      termsUrl: { type: Sequelize.STRING, defaultValue: '' },
      privacyUrl: { type: Sequelize.STRING, defaultValue: '' },
      supportUrl: { type: Sequelize.STRING, defaultValue: '' },
      privacyEmail: { type: Sequelize.STRING, defaultValue: '' },
      legalEmail: { type: Sequelize.STRING, defaultValue: '' },
      companyAddress: { type: Sequelize.STRING, defaultValue: '' },
      mailchimpApiUrl: { type: Sequelize.STRING, defaultValue: '' },
      features: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: DEFAULT_FEATURES,
      },
      copyOverrides: {
        type: Sequelize.JSON,
        defaultValue: {},
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Brandings');
  },
};
