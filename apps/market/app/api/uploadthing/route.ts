import { createRouteHandler } from 'uploadthing/next';
import { ourFileRouter } from '@pkm/libs/uploadthing/market/server';

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
