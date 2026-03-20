from pydantic import BaseModel
import datetime
from typing import List

class MedicineCreate(BaseModel):
    name: str
    generic_name: str
    category: str
    batch_no: str
    expiry_date: datetime.date
    quantity: int
    cost_price: float
    mrp: float
    supplier: str


class MedicineResponse(MedicineCreate):
    id: int
    status: str

    class Config:
        from_attributes = True

class SaleItemCreate(BaseModel):
    medicine_id: int
    quantity: int
    price: float


# 🔹 Sale input
class SaleCreate(BaseModel):
    customer_name: str
    payment_method: str
    items: List[SaleItemCreate]


# 🔹 Sale response
class SaleResponse(BaseModel):
    invoice_no: str
    customer_name: str
    total_amount: float
    payment_method: str
    status: str

    class Config:
        from_attributes = True

class PurchaseCreate(BaseModel):
    supplier: str
    total_amount: float


class PurchaseResponse(BaseModel):
    id: int
    supplier: str
    total_amount: float

    class Config:
        from_attributes = True

class MedicineSearchResponse(BaseModel):
    id: int
    name: str
    generic_name: str
    batch_no: str
    expiry_date: datetime.date
    price: float
    supplier: str

    class Config:
        from_attributes = True

class InventoryOverviewResponse(BaseModel):
    total_items: int
    active_stock: int
    low_stock: int
    total_value: float