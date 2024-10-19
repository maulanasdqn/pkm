import { createRouteHandler } from 'uploadthing/next';
import { tourismFileRouter } from '@pkm/libs/uploadthing/tourism/server';

export const { GET, POST } = createRouteHandler({
  router: tourismFileRouter,
});
