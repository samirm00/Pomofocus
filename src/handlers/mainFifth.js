'use strict';

import { logger } from '../../lib/logger.js';

export function deleteCheck(event){
    
  const item = event.target ;

  // delete todo

  if(item.classList[0] === 'delete-btn'){
     const todo =item.parentElement; 
     todo.classList.add('fall');
     todo.addEventListener('transitioned', () =>{
         todo.remove();
     });
      
  }

  // check 

  if(item.classList[0] === 'complete-btn'){
      item.parentElement.classList.toggle('completed') ;

  }

  logger.push({
    userAction: 'delete button', 
    item,   
        
  });
}



