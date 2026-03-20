from sqlalchemy import Column, Integer, String, Float, Date
from database import Base
import datetime
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Medicine(Base):
    __tablename__ = "medicines"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, index=True)
    generic_name = Column(String)
    category = Column(String)
    batch_no = Column(String)

    expiry_date = Column(Date)
    quantity = Column(Integer)

    cost_price = Column(Float)
    mrp = Column(Float)

    supplier = Column(String)

    status = Column(String, default="Active")

class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    invoice_no = Column(String, unique=True)
    customer_name = Column(String)
    total_amount = Column(Float)
    payment_method = Column(String)
    status = Column(String, default="Completed")
    created_at = Column(Date, default=datetime.date.today)

    items = relationship("SaleItem", back_populates="sale")


class SaleItem(Base):
    __tablename__ = "sale_items"

    id = Column(Integer, primary_key=True, index=True)
    sale_id = Column(Integer, ForeignKey("sales.id"))
    medicine_id = Column(Integer, ForeignKey("medicines.id"))

    quantity = Column(Integer)
    price = Column(Float)

    sale = relationship("Sale", back_populates="items")


# 📦 PURCHASE TABLE
class Purchase(Base):
    __tablename__ = "purchases"

    id = Column(Integer, primary_key=True, index=True)
    supplier = Column(String)
    total_amount = Column(Float)
    created_at = Column(Date, default=datetime.date.today)