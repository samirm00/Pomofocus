'use strict';

import { logger } from '../../lib/logger.js';

export function addTodo(event){
  // prevent form from submitting 
  event.preventDefault();

  // create a new div for todos

  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  const newTodo = document.createElement('li');
  newTodo.innerHTML = document.querySelector('.todo-input').value;
  newTodo.classList.add('todo-item');

  todoDiv.appendChild(newTodo);

  // completed  button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton) ;

  // delete button 

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteButton.classList.add('delete-btn');
  todoDiv.appendChild(deleteButton) ;

  // append to list 

  document.querySelector('.todo-list').appendChild(todoDiv);
  document.querySelector('.todo-input').value = '' ;  

  logger.push({
    userAction: 'add todo', 
    event,
        
  });

}


