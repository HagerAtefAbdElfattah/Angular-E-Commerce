import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'details/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [{ id: '' }, { id: '' }]; 
    }
  },
  {
    path: 'orderDetails/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [{ id: '' }, { id: '' }]; 
    }
  },
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [{ id: '' }, { id: '' }]; 
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender 
  }
];

