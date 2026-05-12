/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "John"
 *         lastname:
 *           type: string
 *           example: "Doe"
 *         email:
 *           type: string
 *           example: "john.doe@example.com"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     Token:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         token:
 *           type: string
 *           example: "some-token"
 *         userId:
 *           type: integer
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Category Name"
 *         description:
 *           type: string
 *           example: "Description of the category"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     Country:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Country Name"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     State:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "State Name"
 *         countryId:
 *           type: integer
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     City:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "City Name"
 *         stateId:
 *           type: integer
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     ProductService:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Product Service Name"
 *         description:
 *           type: string
 *           example: "Description of the product service"
 *         type:
 *           type: integer
 *           example: 1
 *         price:
 *           type: number
 *           format: float
 *           example: 100.0
 *         specialPrice:
 *           type: number
 *           format: float
 *           example: 80.0
 *         location:
 *           type: string
 *           example: "Location of the service"
 *         latitude:
 *           type: number
 *           format: float
 *           example: 40.7128
 *         longitude:
 *           type: number
 *           format: float
 *           example: -74.0060
 *         userId:
 *           type: integer
 *           example: 1
 *         averageRating:
 *           type: number
 *           format: float
 *           example: 4.5
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 *         details:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductDetail'
 *         locations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductLocation'
 *         reviews:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductReview'
 *         user:
 *           $ref: '#/components/schemas/User'
 *     ProductDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         description:
 *           type: string
 *           example: "Detail description"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     ProductLocation:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         address:
 *           type: string
 *           example: "Location address"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     ProductReview:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         comment:
 *           type: string
 *           example: "Review comment"
 *         rating:
 *           type: number
 *           format: float
 *           example: 4.5
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         userId:
 *           type: integer
 *           example: 1
 *         totalAmount:
 *           type: number
 *           format: float
 *           example: 150.00
 *         status:
 *           type: integer
 *           example: 1
 *         comment:
 *           type: string
 *           example: "This is a test order"
 *         startDate:
 *           type: string
 *           format: date-time
 *           example: "2025-02-15T00:00:00.000Z"
 *         endDate:
 *           type: string
 *           format: date-time
 *           example: "2025-02-20T00:00:00.000Z"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         details:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderDetail'
 *         user:
 *           $ref: '#/components/schemas/User'
 *     OrderDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         orderId:
 *           type: integer
 *           example: 1
 *         productServiceId:
 *           type: integer
 *           example: 1
 *         quantity:
 *           type: integer
 *           example: 2
 *         price:
 *           type: number
 *           format: float
 *           example: 50.00
 *         discount:
 *           type: number
 *           format: float
 *           example: 5.00
 *         charge:
 *           type: number
 *           format: float
 *           example: 0.00
 *         comment:
 *           type: string
 *           example: "First item"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     UserReview:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         userId:
 *           type: integer
 *           example: 1
 *         review:
 *           type: string
 *           example: "This is a user review"
 *         rating:
 *           type: number
 *           format: float
 *           example: 4.5
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Admin"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     Permission:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Read"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     UserRole:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         userId:
 *           type: integer
 *           example: 1
 *         roleId:
 *           type: integer
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     RolePermission:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         roleId:
 *           type: integer
 *           example: 1
 *         permissionId:
 *           type: integer
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     Conversation:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user1Id:
 *           type: integer
 *           example: 1
 *         user2Id:
 *           type: integer
 *           example: 2
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     Message:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         conversationId:
 *           type: integer
 *           example: 1
 *         senderId:
 *           type: integer
 *           example: 1
 *         content:
 *           type: string
 *           example: "Hello, how are you?"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     Reaction:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         userId:
 *           type: integer
 *           example: 1
 *         reactableType:
 *           type: string
 *           example: "message"
 *         reactableId:
 *           type: integer
 *           example: 1
 *         type:
 *           type: string
 *           example: "like"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     Branding:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         appName:
 *           type: string
 *           example: "My App"
 *         tagline:
 *           type: string
 *           example: "Best app ever"
 *         legalName:
 *           type: string
 *           example: "My Company Inc."
 *         logoUrl:
 *           type: string
 *           example: "/uploads/branding/logo.png"
 *         iconUrl:
 *           type: string
 *           example: "/uploads/branding/icon.png"
 *         splashUrl:
 *           type: string
 *           example: "/uploads/branding/splash.png"
 *         faviconUrl:
 *           type: string
 *           example: "/uploads/branding/favicon.ico"
 *         defaultImageUrl:
 *           type: string
 *           example: "/uploads/branding/default.png"
 *         sliderImages:
 *           type: array
 *           items:
 *             type: string
 *           example: ["/uploads/branding/slider-1.png"]
 *         colorsLight:
 *           $ref: '#/components/schemas/BrandingColors'
 *         colorsDark:
 *           $ref: '#/components/schemas/BrandingColors'
 *         fontFamily:
 *           type: string
 *           example: "Roboto"
 *         buttonBorderRadius:
 *           type: integer
 *           example: 4
 *         termsUrl:
 *           type: string
 *         privacyUrl:
 *           type: string
 *         supportUrl:
 *           type: string
 *         privacyEmail:
 *           type: string
 *         legalEmail:
 *           type: string
 *         companyAddress:
 *           type: string
 *         mailchimpApiUrl:
 *           type: string
 *         features:
 *           $ref: '#/components/schemas/BrandingFeatures'
 *         copyOverrides:
 *           type: object
 *           additionalProperties:
 *             type: object
 *             additionalProperties:
 *               type: string
 *     BrandingColors:
 *       type: object
 *       properties:
 *         primary:
 *           type: string
 *           example: "#6750A4"
 *         primaryContainer:
 *           type: string
 *         secondary:
 *           type: string
 *         secondaryContainer:
 *           type: string
 *         tertiary:
 *           type: string
 *         tertiaryContainer:
 *           type: string
 *         error:
 *           type: string
 *         errorContainer:
 *           type: string
 *         background:
 *           type: string
 *         surface:
 *           type: string
 *         textPrimary:
 *           type: string
 *         textSecondary:
 *           type: string
 *         onPrimary:
 *           type: string
 *         onSecondary:
 *           type: string
 *         onTertiary:
 *           type: string
 *     BrandingFeatures:
 *       type: object
 *       properties:
 *         chatEnabled:
 *           type: boolean
 *         tasksEnabled:
 *           type: boolean
 *         newsletterEnabled:
 *           type: boolean
 *         socialAuthEnabled:
 *           type: boolean
 *         darkModeEnabled:
 *           type: boolean
 *         biometricsEnabled:
 *           type: boolean
 */
