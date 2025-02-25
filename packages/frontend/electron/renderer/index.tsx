import './polyfill/dispose';
// Side effect import, "declare global"
import '@affine/env/constant';

import { setup } from '@affine/core/bootstrap/setup';
import { performanceLogger } from '@affine/core/shared';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';

const performanceMainLogger = performanceLogger.namespace('main');
function main() {
  performanceMainLogger.info('start');

  // skip bootstrap setup for desktop onboarding
  if (window.appInfo?.windowName === 'onboarding') {
    performanceMainLogger.info('skip setup');
  } else {
    performanceMainLogger.info('setup start');
    setup();
    performanceMainLogger.info('setup done');
  }

  mountApp();
}

function mountApp() {
  performanceMainLogger.info('import app');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const root = document.getElementById('app')!;
  performanceMainLogger.info('render app');
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

try {
  main();
} catch (err) {
  console.error('Failed to bootstrap app', err);
}
