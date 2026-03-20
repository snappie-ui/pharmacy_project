from sqlalchemy.orm import Session
import models
import datetime
import random
import string
from sqlalchemy import or_

def get_status(medicine):
    if medicine.quantity == 0:
        return "Out of Stock"
    elif medicine.expiry_date < datetime.date.today():
        return "Expired"
    elif medicine.quantity < 10:
        return "Low Stock"
    return "Active"


def create_medicine(db: Session, med):
    db_med = models.Medicine(**med.dict())
    db_med.status = get_status(db_med)

    db.add(db_med)
    db.commit()
    db.refresh(db_med)
    return db_med


def get_medicines(db: Session):
    meds = db.query(models.Medicine).all()
    for med in meds:
        med.status = get_status(med)
    return meds


def update_medicine(db: Session, med_id: int, updated_data):
    med = db.query(models.Medicine).filter(models.Medicine.id == med_id).first()
    if not med:
        return None

    for key, value in updated_data.dict().items():
        setattr(med, key, value)

    med.status = get_status(med)

    db.commit()
    db.refresh(med)
    return med

def generate_invoice():
    return "INV-" + str(random.randint(1000, 9999))


def create_sale(db: Session, sale_data):
    total = 0

    # Create sale
    sale = models.Sale(
        invoice_no=generate_invoice(),
        customer_name=sale_data.customer_name,
        payment_method=sale_data.payment_method
    )

    db.add(sale)
    db.commit()
    db.refresh(sale)

    # Add items
    for item in sale_data.items:
        medicine = db.query(models.Medicine).filter(models.Medicine.id == item.medicine_id).first()

        if not medicine:
            continue

        # Reduce stock
        medicine.quantity -= item.quantity

        total += item.quantity * item.price

        sale_item = models.SaleItem(
            sale_id=sale.id,
            medicine_id=item.medicine_id,
            quantity=item.quantity,
            price=item.price
        )

        db.add(sale_item)

    sale.total_amount = total

    db.commit()
    db.refresh(sale)

    return sale


def get_sales(db: Session):
    return db.query(models.Sale).all()

def create_purchase(db: Session, purchase):
    db_purchase = models.Purchase(
        supplier=purchase.supplier,
        total_amount=purchase.total_amount
    )

    db.add(db_purchase)
    db.commit()
    db.refresh(db_purchase)

    return db_purchase


def get_purchases(db: Session):
    return db.query(models.Purchase).all()


def get_dashboard_data(db: Session):
    today = datetime.date.today()

    medicines = db.query(models.Medicine).all()
    sales = db.query(models.Sale).all()
    purchases = db.query(models.Purchase).all()

    # 🔹 Today's sales
    today_sales = sum(s.total_amount for s in sales if s.created_at == today)

    # 🔹 Items sold today
    items_sold = sum(
        item.quantity
        for sale in sales if sale.created_at == today
        for item in sale.items
    )

    # 🔹 Low stock
    low_stock = len([m for m in medicines if m.quantity < 10])

    # 🔹 Purchase total
    total_purchase = sum(p.total_amount for p in purchases)

    return {
        "today_sales": today_sales,
        "items_sold": items_sold,
        "low_stock": low_stock,
        "total_purchase": total_purchase
    }

def search_medicines(db: Session, search: str):
    meds = db.query(models.Medicine).filter(
        or_(
            models.Medicine.name.ilike(f"%{search}%"),
            models.Medicine.generic_name.ilike(f"%{search}%")
        )
    ).all()

    result = []

    for med in meds:
        result.append({
            "id": med.id,
            "name": med.name,
            "generic_name": med.generic_name or "",
            "batch_no": med.batch_no,
            "expiry_date": med.expiry_date,
            "price": med.mrp,  # ✅ correct field
            "supplier": med.supplier
        })

    return result


def get_inventory_overview(db: Session):
    meds = db.query(models.Medicine).all()

    total_items = len(meds)

    active_stock = 0
    low_stock = 0
    total_value = 0

    for med in meds:
        status = get_status(med)

        if status == "Active":
            active_stock += 1

        if status == "Low Stock":
            low_stock += 1

        total_value += med.quantity * med.mrp

    return {
        "total_items": total_items,
        "active_stock": active_stock,
        "low_stock": low_stock,
        "total_value": total_value
    }