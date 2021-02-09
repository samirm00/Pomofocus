'use strict';

//import { logger } from '../../lib/logger.js';

import { Timer } from '../classes/list.js';


export const instance = new Timer();  

export function handleMain(){
  const buttonSound = new Audio('https://ghcdn.rawgit.org/samirm00/pomofocus/master/public/assets/click.mp3');
  buttonSound.play();
  const { action } = document.getElementById('js-btn').dataset;
  if (action === 'start') {
    instance.startTimer();
  } else {
    instance.stopTimer();
  }

  logger.push({
    userAction: 'action', 
    action,  
  });
}

