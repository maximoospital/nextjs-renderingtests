// Minimal in-memory faux data source for books

export const books = [
  { id: "1", title: "The Pragmatic Programmer", author: "Andrew Hunt", price: 39.99 },
  { id: "2", title: "Clean Code", author: "Robert C. Martin", price: 34.99 },
  { id: "3", title: "You Don't Know JS Yet", author: "Kyle Simpson", price: 29.99 },
  { id: "4", title: "JavaScript: The Good Parts", author: "Douglas Crockford", price: 24.99 },
  { id: "5", title: "Refactoring", author: "Martin Fowler", price: 44.99 },
  { id: "6", title: "Design Patterns", author: "Gamma et al.", price: 49.99 },
  { id: "7", title: "Introduction to Algorithms", author: "Cormen et al.", price: 79.99 },
  { id: "8", title: "The Clean Coder", author: "Robert C. Martin", price: 29.99 },
];

export function getAllBooks() {
  // Simulate DB latency
  return new Promise((resolve) => setTimeout(() => resolve(books), 120));
}

export function getBookById(id) {
  // Simulate DB latency
  return new Promise((resolve) => setTimeout(() => resolve(books.find((b) => b.id === id) || null), 120));
}

