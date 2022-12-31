import books from './books.js'
import { nanoid } from 'nanoid'
import response from './response.js'

// add book
const addBookHandler = (request, h) => {
  // 1. if name empty, return fail
  // 2. if read page higher than page count, return fail
  if (request.payload.name == null || request.payload.name == '')
    return response(
      h,
      'fail',
      'Gagal menambahkan buku. Mohon isi nama buku',
      400
    )
  else if (request.payload.readPage > request.payload.pageCount)
    return response(
      h,
      'fail',
      'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      400
    )

  // initiate variable
  const { pageCount, readPage } = request.payload
  const id = nanoid(16)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt
  const finished = pageCount === readPage ? true : false

  // push to books array
  books.push({
    ...request.payload,
    id,
    finished,
    insertedAt,
    updatedAt,
  })

  // check if push success
  const isSuccess = books.filter((book) => book.id === id).length > 0
  if (isSuccess) {
    return response(h, 'success', 'Buku berhasil ditambahkan', 201, id)
  } else {
    return response(h, 'error', 'Buku gagal ditambahkan', 500)
  }
}

// get all books
const getBookHandler = (request, h) => {
  const { name, reading, finished } = request.query
  let filtered = books

  // filter by query :
  // 1. by name (case insensitive)
  // 2. by reading
  // 3. by finished
  // otherwhise, just print all books
  if (name) {
    filtered = books.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    )
  } else if (reading) {
    filtered = books.filter((book) => book.reading == reading)
  } else if (finished) {
    filtered = books.filter((book) => book.finished == finished)
  }

  const data = filtered.map(({ id, name, publisher }) => ({
    id,
    name,
    publisher,
  }))

  return response(h, 'success', null, 200, null, data)
}

// show a book
const showBookHandler = (request, h) => {
  const { id } = request.params
  const book = books.filter((book) => book.id === id)[0]

  if (book !== undefined) {
    return response(h, 'success', null, 200, null, book)
  } else {
    return response(h, 'fail', 'Buku tidak ditemukan', 404)
  }
}

// edit a book
const editBookHandler = (request, h) => {
  // 1. if name empty, return fail
  // 2. if read page higher than page count, return fail
  if (request.payload.name == null || request.payload.name == '')
    return response(
      h,
      'fail',
      'Gagal memperbarui buku. Mohon isi nama buku',
      400
    )
  else if (request.payload.readPage > request.payload.pageCount)
    return response(
      h,
      'fail',
      'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      400
    )

  const { id } = request.params
  const updatedAt = new Date().toISOString()

  const index = books.findIndex((book) => book.id === id)

  if (index !== -1) {
    books[index] = {
      ...books[index],
      ...request.payload,
      updatedAt,
    }

    return response(h, 'success', 'Buku berhasil diperbarui', 200)
  } else {
    return response(
      h,
      'fail',
      'Gagal memperbarui buku. Id tidak ditemukan',
      404
    )
  }
}

// delete a book
const deleteBookHandler = (request, h) => {
  const { id } = request.params
  const index = books.findIndex((book) => book.id === id)

  if (index !== -1) {
    books.splice(index, 1)
    return response(h, 'success', 'Buku berhasil dihapus', 200)
  } else {
    return response(h, 'fail', 'Buku gagal dihapus. Id tidak ditemukan', 404)
  }
}

// invalid method
const invalidMethodHandler = (request, h) => {
  return response(
    h,
    'fail',
    'halaman tidak dapat diakses dengan method tersebut',
    400
  )
}

// invalid URL
const invalidURLHandler = (request, h) => {
  return response(h, 'fail', 'halaman tidak ditemukan', 404)
}

export {
  addBookHandler,
  getBookHandler,
  showBookHandler,
  editBookHandler,
  deleteBookHandler,
  invalidMethodHandler,
  invalidURLHandler,
}
