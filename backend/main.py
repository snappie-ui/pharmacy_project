from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, crud
from database import SessionLocal, engine
from fastapi import Query
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (for dev)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🧩 INVENTORY APIs

@app.post("/medicine", response_model=schemas.MedicineResponse)
def add_medicine(med: schemas.MedicineCreate, db: Session = Depends(get_db)):
    return crud.create_medicine(db, med)


@app.get("/inventory", response_model=list[schemas.MedicineResponse])
def list_medicines(db: Session = Depends(get_db)):
    return crud.get_medicines(db)

@app.get("/inventory/search", response_model=list[schemas.MedicineSearchResponse])
def search_medicine(search: str, db: Session = Depends(get_db)):
    return crud.search_medicines(db, search)


@app.put("/medicine/{med_id}", response_model=schemas.MedicineResponse)
def update_medicine(med_id: int, med: schemas.MedicineCreate, db: Session = Depends(get_db)):
    updated = crud.update_medicine(db, med_id, med)
    if not updated:
        raise HTTPException(status_code=404, detail="Medicine not found")
    return updated


# 🧩 DASHBOARD APIs

@app.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):
    meds = crud.get_medicines(db)

    total_items = sum(m.quantity for m in meds)
    low_stock = [m for m in meds if m.status == "Low Stock"]

    return {
        "total_items": total_items,
        "low_stock_count": len(low_stock),
        "total_medicines": len(meds)
    }

# 🧾 Create Sale
@app.post("/sales", response_model=schemas.SaleResponse)
def create_sale(sale: schemas.SaleCreate, db: Session = Depends(get_db)):
    return crud.create_sale(db, sale)


# 📊 Get Sales
@app.get("/sales", response_model=list[schemas.SaleResponse])
def list_sales(db: Session = Depends(get_db)):
    return crud.get_sales(db)

# 📦 Create Purchase
@app.post("/purchase", response_model=schemas.PurchaseResponse)
def create_purchase(purchase: schemas.PurchaseCreate, db: Session = Depends(get_db)):
    return crud.create_purchase(db, purchase)


# 📦 Get Purchases
@app.get("/purchase", response_model=list[schemas.PurchaseResponse])
def list_purchases(db: Session = Depends(get_db)):
    return crud.get_purchases(db)

@app.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):
    return crud.get_dashboard_data(db)

@app.get("/inventory/overview", response_model=schemas.InventoryOverviewResponse)
def inventory_overview(db: Session = Depends(get_db)):
    return crud.get_inventory_overview(db)