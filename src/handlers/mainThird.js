'use strict';

import { logger } from '../../lib/logger.js';

import { instance } from './mainOne.js'; 
 
  
export function notification(){

  let respond = '';
  if ('Notification' in window) {
      if (
        Notification.permission !== 'granted' &&
        Notification.permission !== 'denied'
      ) {
        Notification.requestPermission().then(function(permission) {
          if (permission === 'granted') {
            respond = 'the user accept the notification';
              new Notification(
              'Awesome! You will be notified at the start of each session'
            );
          }
        });
      }
     
}
instance.switchMode('pomodoro');

logger.push({
  action: ' notification', 
  respond,  
});

}



