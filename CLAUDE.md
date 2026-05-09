# projectx-be-node — Agent Context

## Role
This is the **REST API backend** for the ProjectX white-label platform. It is the single source of truth for all data, including branding/customization config. When working here you are the data owner — frontend apps only read what this API exposes.

## Tech Stack
| | |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express |
| ORM | Sequelize v6 |
| DB | MariaDB |
| Auth | JWT (Bearer) — tokens stored in `Token` table |
| File uploads | multer → `uploads/` folder, served at `/api/v1/uploads/` |
| Docs | Swagger at `/api-docs` |

## Source Layout
```
src/
├── app.ts                          # Express app config, route registration
├── server.ts                       # HTTP listen entry
├── api/v1/
│   ├── controllers/                # Business logic, one file per resource
│   ├── routes/                     # Express routers (index.ts re-exports all)
│   ├── models/                     # Sequelize models + index.ts (registers all)
│   ├── middlewares/
│   │   ├── authenticateToken.ts    # Validates Bearer JWT against DB
│   │   ├── authorizeRole.ts        # RBAC — authorizeRole(['admin'])
│   │   ├── fileStorage.ts          # multer wrapper (saveFile, deleteFile)
│   │   └── paginationMiddleware.ts
│   └── database/
│       ├── migrations/             # Sequelize migrations (JS files, timestamped)
│       └── seeders/
├── config/db/                      # Sequelize connection
└── utils/
    ├── responseHandler.ts          # sendApiResponse(res, success, status, data, msg)
    └── logger.ts
```

## Key Conventions
- **Response shape**: always use `sendApiResponse(res, success, statusCode, data, message?)` from `utils/responseHandler.ts`.
- **Model pattern**: every model has `initializeXxx(sequelize)` factory, registered in `models/index.ts`, no auto-associations — all defined explicitly in `index.ts`.
- **Route registration**: add router to `routes/index.ts` export AND wire it in `app.ts`.
- **Auth guard**: public GET routes go in `app.ts` without `authenticateToken`; protected routes pass `authenticateToken` and optionally `authorizeRole(['admin'])`.
- **Migrations**: filename format `YYYYMMDDHHMMSS-description.js`, CommonJS `module.exports = { up, down }`.
- **File uploads**: call `fileStorage.saveFile(folder, customName, req, res)` — returns the URL path or null.
- **Static files**: uploaded files served at `/api/v1/uploads/<folder>/<filename>`.

## Scripts
```bash
yarn dev            # ts-node-dev hot reload
yarn start          # nodemon
yarn build          # tsc → dist/
yarn db-migrate     # run all migrations + seeders
yarn db-migrate-reset       # undo all
yarn db-migrate-refresh     # undo + redo
```

## Environment Variables
```
DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, DB_SYNC, DB_LOGGING
PORT
JWT_SECRET
GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
FACEBOOK_APP_ID, FACEBOOK_APP_SECRET
```

---

## Customization / Branding Module

### Status: partially implemented
The following files already exist and should NOT be recreated:

| File | Status |
|---|---|
| `src/api/v1/database/migrations/20260509000001-create-branding.js` | ✅ done |
| `src/api/v1/models/branding.ts` | ✅ done |
| `src/api/v1/models/index.ts` | ✅ updated (Branding registered) |
| `src/api/v1/controllers/brandingController.ts` | ✅ done |
| `src/api/v1/routes/brandingRoutes.ts` | ✅ done |
| `src/api/v1/routes/index.ts` | ✅ updated (brandingRouter exported) |
| `src/app.ts` | ✅ updated (route registered) |
| `src/api/v1/database/seeders/20260509000001-default-branding.js` | ✅ done |

### API Endpoints
| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/api/v1/branding` | public | Fetch config (creates default if first run) |
| PUT | `/api/v1/branding` | admin JWT | Update text/color/flag fields |
| POST | `/api/v1/branding/assets/:type` | admin JWT | Upload image asset (`logo\|icon\|splash\|favicon\|defaultImage\|slider`) |
| DELETE | `/api/v1/branding/slider/:index` | admin JWT | Remove a slider image by array index |

### Branding Model Fields
```typescript
// Identity
appName: string
tagline: string
legalName: string

// Image URLs (stored as /uploads/branding/xxx paths)
logoUrl, iconUrl, splashUrl, faviconUrl, defaultImageUrl: string | null
sliderImages: string[]   // array of URL paths

// Colors (JSON)
colorsLight: BrandingColors   // primary, primaryContainer, secondary, secondaryContainer,
colorsDark: BrandingColors    // tertiary, tertiaryContainer, error, errorContainer,
                              // background, surface, textPrimary, textSecondary,
                              // onPrimary, onSecondary, onTertiary

// Typography & UI tokens
fontFamily: string            // default 'Roboto'
buttonBorderRadius: number    // default 100 (pill buttons)

// Links
termsUrl, privacyUrl, supportUrl: string

// Contact / Legal
privacyEmail, legalEmail, companyAddress: string

// Third-party
mailchimpApiUrl: string

// Feature flags (JSON)
features: {
  chatEnabled, tasksEnabled, newsletterEnabled,
  socialAuthEnabled, darkModeEnabled, biometricsEnabled: boolean
}

// i18n overrides (JSON) — { en: { key: value }, es: { key: value } }
copyOverrides: Record<string, Record<string, string>>
```

### What an agent should do next here
- Run `yarn db-migrate` after pulling to create the `Brandings` table
- Test `GET /api/v1/branding` — it auto-creates a default row if none exists
- The `PUT /api/v1/branding` body accepts any subset of the updatable fields (controller has an allowlist)
- Image uploads use the `file` field in multipart form (consistent with other routes)
