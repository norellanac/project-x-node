import { Request, Response } from 'express';
import { Branding } from '../models';
import { sendApiResponse } from '../../../utils/responseHandler';
import fileStorage from '../middlewares/fileStorage';

const ASSET_FOLDERS: Record<string, string> = {
  logo: 'branding',
  icon: 'branding',
  splash: 'branding',
  favicon: 'branding',
  defaultImage: 'branding',
  slider: 'branding',
  introSlide: 'branding',
};

const getOrCreateBranding = async () => {
  const [branding] = await Branding.findOrCreate({
    where: { id: 1 },
    defaults: {
      appName: 'My App',
      tagline: '',
      legalName: '',
      colorsLight: {
        primary: '#6750A4', primaryContainer: '#EADDFF',
        secondary: '#625B71', secondaryContainer: '#E8DEF8',
        tertiary: '#7D5260', tertiaryContainer: '#FFD8E4',
        error: '#B3261E', errorContainer: '#F9DEDC',
        background: '#FFFFFF', surface: '#FFFFFF',
        textPrimary: '#000000', textSecondary: '#49454F',
        onPrimary: '#FFFFFF', onSecondary: '#FFFFFF', onTertiary: '#FFFFFF',
      },
      colorsDark: {
        primary: '#D0BCFF', primaryContainer: '#25232A',
        secondary: '#CCC2DC', secondaryContainer: '#4A4458',
        tertiary: '#EFB8C8', tertiaryContainer: '#633B48',
        error: '#F2B8B5', errorContainer: '#8C1D18',
        background: '#1C1B1F', surface: '#121212',
        textPrimary: '#FFFFFF', textSecondary: '#CAC4D0',
        onPrimary: '#000000', onSecondary: '#000000', onTertiary: '#000000',
      },
      features: {
        chatEnabled: true, tasksEnabled: true, newsletterEnabled: true,
        socialAuthEnabled: false, darkModeEnabled: true, biometricsEnabled: true,
      },
      copyOverrides: {},
    },
  });
  return branding;
};

export const getBranding = async (_req: Request, res: Response) => {
  try {
    const branding = await getOrCreateBranding();
    sendApiResponse(res, true, 200, branding);
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

export const updateBranding = async (req: Request, res: Response) => {
  try {
    const branding = await getOrCreateBranding();
    const allowed = [
      'appName', 'tagline', 'legalName',
      'colorsLight', 'colorsDark',
      'fontFamily', 'buttonBorderRadius',
      'termsUrl', 'privacyUrl', 'supportUrl',
      'privacyEmail', 'legalEmail', 'companyAddress',
      'mailchimpApiUrl', 'features', 'copyOverrides',
      'sliderImages', 'introSlides', 'appStoreUrl', 'playStoreUrl',
    ];
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) {
        (branding as any)[key] = req.body[key];
      }
    });
    await branding.save();
    sendApiResponse(res, true, 200, branding);
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

export const uploadBrandingAsset = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    if (!ASSET_FOLDERS[type]) {
      return sendApiResponse(res, false, 400, null, 'Invalid asset type');
    }

    const branding = await getOrCreateBranding();
    const customName = (type === 'slider' || type === 'introSlide')
      ? `${type}-${Date.now()}`
      : type;

    const imageUrl = await fileStorage.saveFile(ASSET_FOLDERS[type], customName, req, res);
    if (!imageUrl) {
      return sendApiResponse(res, false, 400, null, 'Failed to upload asset');
    }

    if (type === 'slider') {
      const current = (branding.sliderImages as string[]) || [];
      branding.sliderImages = [...current, imageUrl];
    } else if (type === 'introSlide') {
      const { title = '', subtitle = '' } = req.body;
      const current = (branding.introSlides as any[]) || [];
      branding.introSlides = [...current, { imageUrl, title, subtitle }];
    } else {
      const fieldMap: Record<string, keyof typeof branding> = {
        logo: 'logoUrl',
        icon: 'iconUrl',
        splash: 'splashUrl',
        favicon: 'faviconUrl',
        defaultImage: 'defaultImageUrl',
      };
      (branding as any)[fieldMap[type]] = imageUrl;
    }

    await branding.save();
    sendApiResponse(res, true, 200, branding, 'Asset uploaded successfully');
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

export const removeIntroSlide = async (req: Request, res: Response) => {
  try {
    const { index } = req.params;
    const branding = await getOrCreateBranding();
    const current = (branding.introSlides as any[]) || [];
    const idx = parseInt(index, 10);
    if (idx < 0 || idx >= current.length) {
      return sendApiResponse(res, false, 400, null, 'Invalid intro slide index');
    }
    const removed = current[idx];
    if (removed?.imageUrl) fileStorage.deleteFile(`.${removed.imageUrl}`);
    branding.introSlides = current.filter((_, i) => i !== idx);
    await branding.save();
    sendApiResponse(res, true, 200, branding);
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

export const removeSliderImage = async (req: Request, res: Response) => {
  try {
    const { index } = req.params;
    const branding = await getOrCreateBranding();
    const current = (branding.sliderImages as string[]) || [];
    const idx = parseInt(index, 10);
    if (idx < 0 || idx >= current.length) {
      return sendApiResponse(res, false, 400, null, 'Invalid slider index');
    }
    fileStorage.deleteFile(`.${current[idx]}`);
    branding.sliderImages = current.filter((_, i) => i !== idx);
    await branding.save();
    sendApiResponse(res, true, 200, branding);
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};
