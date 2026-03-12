# Backend API Requirements Checklist

The following endpoints and enhancements are required by the frontend to move from "mocked" logic to a fully data-driven system.

## 1. Catalog & Category Management
*Currently, the frontend manually derives categories from product data. Dedicated endpoints are needed for efficient management.*

- **[GET] `/api/v1/merchant/catalog/categories`**
  - Should return a list of all categories created by the merchant.
- **[POST] `/api/v1/merchant/catalog/categories`**
  - Payload: `{ "name": "string", "description": "string" }`
- **[DELETE] `/api/v1/merchant/catalog/categories/{category_id}`**
- **[POST] `/api/v1/merchant/catalog/categories/{category_id}/products/{product_id}`** (High Priority)
  - Explicitly assign a product to a specific category via their IDs.
- **[DELETE] `/api/v1/merchant/catalog/categories/{category_id}/products/{product_id}`**
  - Remove a product from a category.

## 2. Customer Permissions & "Catalog Scoping"
*The Permissions module allows merchants to restrict which parts of the catalog a customer can see. This is referred to as "Catalog Selection" in the UI.*

- **[GET] `/api/v1/permissions/`** (or `/api/v1/merchant/permissions`)
  - Should return a list of all granted permissions (Customer Email/Name, Expiration, Type).
- **[POST] `/api/v1/permissions/grant-by-email`**
  - Payload should support scoping by category OR specific products:
  ```json
  {
    "email": "string",
    "permission_type": "string",
    "expires_at": "date",
    "catalog_scope": "all | category_ids | product_ids",
    "selected_category_ids": ["uuid", "uuid"],
    "selected_product_ids": ["uuid", "uuid"]
  }
  ```
- **[PUT/DELETE] `/api/v1/permissions/customers/{customer_id}/permissions`**
  - Edit or Revoke specific access levels, including updating the scoped product list.

## 3. Merchant Settings & Branding
*Profiles and branding settings are currently stored in a `metadata` JSON field. The backend needs to ensure these are correctly processed.*

- **[GET] `/api/v1/merchant/settings/marketplace-visibility`**
- **[PUT] `/api/v1/auth/profile`** (Enhancement)
  - Ensure the backend correctly persists the nested `metadata` object (containing `colors`, `presets`, `tagline`, `store_url`, etc.).

## 4. Authentication (Detailed Signup)
- **[POST] `/api/v1/auth/signup`** (Alignment)
  - Ensure the signup payload supports: `company_name`, `business_type`, `phone`, `address`, `city`, [state](file:///e:/Lan_Production/TFourthGitHub/Nimora/src/store/product.js#5-13), `country`, `postal_code`, and `tax_id`.

---
> [!NOTE]
> All endpoints should be scoped to the authenticated merchant's tenant.
