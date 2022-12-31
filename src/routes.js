import {
  addBookHandler,
  getBookHandler,
  showBookHandler,
  editBookHandler,
  deleteBookHandler,
  invalidMethodHandler,
  invalidURLHandler,
} from './handler.js'

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getBookHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: showBookHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookHandler,
  },
  {
    method: '*',
    path: '/books',
    handler: invalidMethodHandler,
  },
  {
    method: '*',
    path: '/{any*}',
    handler: invalidURLHandler,
  },
]

export default routes
