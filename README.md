# 📌 Technical Explanation

## 🔹 REST API Structure

The backend of this project is built using **FastAPI** following RESTful principles. The APIs are organized into logical modules based on functionality: **Dashboard, Inventory, Sales, and Purchase**.

### 📊 Dashboard APIs

* `GET /dashboard`
  Returns aggregated metrics such as:

  * Today's sales
  * Items sold
  * Low stock items
  * Total purchase value

* `GET /inventory/overview`
  Provides inventory-level summaries:

  * Total items
  * Active stock
  * Low stock
  * Total inventory value

These endpoints are designed as **aggregated APIs** to reduce multiple client calls and improve performance.

---

### 💊 Inventory APIs

* `GET /inventory`
  Fetch all medicines in inventory

* `GET /inventory/search?search=query`
  Search medicines based on name, generic name, category, or supplier

* `POST /medicine`
  Add a new medicine

* `PUT /medicine/{id}`
  Update medicine details

These APIs follow standard CRUD operations and support filtering and searching.

---

### 🧾 Sales APIs

* `POST /sales`
  Create a new sale with multiple items

* `GET /sales`
  Retrieve all sales records

Each sale contains:

* Invoice number
* Customer details
* Items purchased
* Total amount
* Payment method

---

### 📦 Purchase APIs

* `POST /purchase`
  Add purchase details

* `GET /purchase`
  Retrieve purchase records

---

## 🔹 Data Consistency & Business Logic

To ensure data integrity and consistency, the backend uses a **centralized CRUD layer** where all business logic is handled.

### ✅ Status Management

Medicine status is dynamically calculated using a helper function:

* **Out of Stock** → quantity = 0
* **Low Stock** → quantity < threshold
* **Expired** → expiry date passed
* **Active** → otherwise

This ensures that status is always accurate and not manually controlled.

---

### ✅ Inventory Updates on Sales

When a sale is created:

* The system fetches each medicine
* Reduces its quantity based on sale items
* Updates stock automatically

This guarantees that inventory always reflects real-time stock levels.

---

### ✅ Controlled Data Flow

The application follows a layered architecture:

* **Schemas (Pydantic)** → Validate incoming data
* **CRUD Layer** → Apply business logic
* **Models (SQLAlchemy)** → Interact with database

This separation ensures:

* Clean code structure
* Reusability
* Easy debugging and scaling

---

### ✅ Error Handling & Validation

* Input data is validated using Pydantic schemas
* Invalid requests return appropriate HTTP errors
* Missing records are handled gracefully

---

## 🔹 Summary

The backend is designed with:

* RESTful architecture
* Clear separation of concerns
* Efficient aggregated APIs
* Strong data consistency mechanisms

This ensures the system is scalable, maintainable, and production-ready.
