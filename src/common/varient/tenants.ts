import { SetMetadata } from '@nestjs/common';

export const SWAGGER_VARIANTS_KEY = 'swagger_variants';
export type SwaggerVariant = 'ramand' | 'elegant' | 'common';

// Custom decorator to mark endpoints for specific tenants
export const ApiVariants = (...variants: SwaggerVariant[]) =>
  SetMetadata(SWAGGER_VARIANTS_KEY, variants);
