import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

import { provideServerRenderingConfig } from '@angular/platform-server';

export const config = {
  providers: [
    provideServerRenderingConfig({
      renderMode: 'no-prerender', // ✅ This disables prerendering for dynamic routes
    }),
  ],
};

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRoutesConfig(serverRoutes)
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
