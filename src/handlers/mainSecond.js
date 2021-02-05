'use strict';

import { logger } from '../../lib/logger.js';

import { instance } from './mainOne.js'; 
  

export function handleMode(event) {
  const { mode } = event.target.dataset;

  if (!mode) return;

  instance.switchMode(mode);
  instance.stopTimer();


  logger.push({
    action: 'mode ', 
    mode,  
  });
  
}
 

