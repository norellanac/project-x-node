import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

export interface BrandingColors {
  primary: string;
  primaryContainer: string;
  secondary: string;
  secondaryContainer: string;
  tertiary: string;
  tertiaryContainer: string;
  error: string;
  errorContainer: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  onPrimary: string;
  onSecondary: string;
  onTertiary: string;
}

export interface BrandingFeatures {
  chatEnabled: boolean;
  tasksEnabled: boolean;
  newsletterEnabled: boolean;
  socialAuthEnabled: boolean;
  darkModeEnabled: boolean;
  biometricsEnabled: boolean;
}

const DEFAULT_COLORS_LIGHT: BrandingColors = {
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

const DEFAULT_COLORS_DARK: BrandingColors = {
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

const DEFAULT_FEATURES: BrandingFeatures = {
  chatEnabled: true,
  tasksEnabled: true,
  newsletterEnabled: true,
  socialAuthEnabled: false,
  darkModeEnabled: true,
  biometricsEnabled: true,
};

class Branding extends Model<InferAttributes<Branding>, InferCreationAttributes<Branding>> {
  declare id: CreationOptional<number>;
  declare appName: string;
  declare tagline: CreationOptional<string>;
  declare legalName: CreationOptional<string>;
  declare logoUrl: CreationOptional<string>;
  declare iconUrl: CreationOptional<string>;
  declare splashUrl: CreationOptional<string>;
  declare faviconUrl: CreationOptional<string>;
  declare defaultImageUrl: CreationOptional<string>;
  declare sliderImages: CreationOptional<string[]>;
  declare colorsLight: BrandingColors;
  declare colorsDark: BrandingColors;
  declare fontFamily: CreationOptional<string>;
  declare buttonBorderRadius: CreationOptional<number>;
  declare termsUrl: CreationOptional<string>;
  declare privacyUrl: CreationOptional<string>;
  declare supportUrl: CreationOptional<string>;
  declare privacyEmail: CreationOptional<string>;
  declare legalEmail: CreationOptional<string>;
  declare companyAddress: CreationOptional<string>;
  declare mailchimpApiUrl: CreationOptional<string>;
  declare features: BrandingFeatures;
  declare copyOverrides: CreationOptional<Record<string, Record<string, string>>>;
}

export function initializeBranding(sequelize: Sequelize): typeof Branding {
  Branding.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      appName: { type: DataTypes.STRING, allowNull: false, defaultValue: 'My App' },
      tagline: { type: DataTypes.STRING, defaultValue: '' },
      legalName: { type: DataTypes.STRING, defaultValue: '' },
      logoUrl: DataTypes.STRING,
      iconUrl: DataTypes.STRING,
      splashUrl: DataTypes.STRING,
      faviconUrl: DataTypes.STRING,
      defaultImageUrl: DataTypes.STRING,
      sliderImages: DataTypes.JSON,
      colorsLight: { type: DataTypes.JSON, allowNull: false, defaultValue: DEFAULT_COLORS_LIGHT },
      colorsDark: { type: DataTypes.JSON, allowNull: false, defaultValue: DEFAULT_COLORS_DARK },
      fontFamily: { type: DataTypes.STRING, defaultValue: 'Roboto' },
      buttonBorderRadius: { type: DataTypes.INTEGER, defaultValue: 100 },
      termsUrl: { type: DataTypes.STRING, defaultValue: '' },
      privacyUrl: { type: DataTypes.STRING, defaultValue: '' },
      supportUrl: { type: DataTypes.STRING, defaultValue: '' },
      privacyEmail: { type: DataTypes.STRING, defaultValue: '' },
      legalEmail: { type: DataTypes.STRING, defaultValue: '' },
      companyAddress: { type: DataTypes.STRING, defaultValue: '' },
      mailchimpApiUrl: { type: DataTypes.STRING, defaultValue: '' },
      features: { type: DataTypes.JSON, allowNull: false, defaultValue: DEFAULT_FEATURES },
      copyOverrides: { type: DataTypes.JSON, defaultValue: {} },
    },
    {
      sequelize,
      modelName: 'Branding',
    }
  );

  return Branding;
}

export default Branding;
