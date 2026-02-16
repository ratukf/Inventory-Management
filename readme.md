# Inventory Management API

RESTful API for managing products and orders with stock validation to demonstrate data relation between products, orders, and ordered item. Built with Node.js, Express, Prisma, and PostgreSQL.

## Features

- Product CRUD
- Create order with stock validation
- Automatic stock deduction
- Relational database design (Order & OrderItem)
- Transaction handling for data consistency
- Global error handling
- Proper HTTP status codes

## API Endpoints

Base URL:

```bash
/api/v1
```

### Products

```bash
POST /products
GET /products
GET /products/:id
PATCH /products/:id
DELETE /products/:id
```

### Orders

```bash
POST /orders
GET /orders
GET /orders/:id
PATCH /orders/:id/status
```

## Constrains

- Order cannot be created if product stock is insufficient
- Stock is automatically reduced after successful order creation
- OrderItem stores product price at transaction time
- Database transaction is used to prevent partial updates

---

## Setup

1. Clone repository

   ```bash
   git clone https://github.com/ratukf/Inventory-Management
   ```

2. Install dependencies
   ```bash
   npm install
   ```
3. Copy `.env.example` file into `.env` and change the user & password
4. Make sure you have the database and run migrates
   ```bash
   npx prisma migrate dev
   ```
5. Run project (will be running at `http://localhost:5000`)
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm run start
   ```

## License

MIT.
