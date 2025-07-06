# 💉 **VACCINE CATEGORIES & LIST**

## **Seeded Vaccine Database**

The migration system now includes a comprehensive vaccine database with **35 vaccines** across **5 categories**:

### **🦠 Live Vaccines (6 vaccines)**
- Mukteswar (NDV)
- Komarov (NDV)
- LaSota (NDV)
- Gumbo Vac. (IBD)
- Gumbo Vac. Forte (Hot)
- ND + IB + Fowl Pox + IB

### **💀 Killed Vaccines (11 vaccines)**
- ND + Hydro Vaccine
- Hydro Clear (Angara)
- AI Plain (Aqua Base)
- AI Oil Emulsion
- ND + AI Oil Emulsion
- ND Oil Emulsion
- IBD Oil Emulsion
- ND + IBD Oil Emulsion
- ND + IB Oil Emulsion
- ND + IB + IBD Oil Emulsion
- ND + IB + H9 Oil Emulsion

### **🐄 Livestock Vaccines (6 vaccines)**
- HS Vaccine (Aqua Base & Oil Base)
- ET Vaccine
- Mastitis Vaccine
- CCPP Vaccine
- Lumpy Vaccine
- PPR Vaccine

### **🧪 Bactrin (1 vaccine)**
- E. coli Vaccine (Aqua Base)

### **🧽 Biologics (8 items)**
- Sterile Diluent
- Normal Saline
- Distilled Water
- Floor Cleaner
- Surface Cleaner
- Glass Cleaner
- Hand Wash Liquid
- Hand Sanitizer

## **💾 Database Structure**

Each vaccine record includes:
```json
{
  "_id": "ObjectId",
  "name": "Vaccine Name",
  "type": "Live|Killed|Livestock|Bactrin|Biologics",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## **🔍 Database Indexes**

The following indexes are created for optimal performance:
- `vaccines.type` - For filtering by vaccine type
- `vaccines.name` - For vaccine name searches
- `vaccines.name (text)` - For text search capabilities

## **🚀 Usage in Application**

### **Frontend Vaccine Selection**
```typescript
// Available vaccine types
enum VaccineTypes {
  LIVE = "Live",
  KILLED = "Killed", 
  LIVESTOCK = "Livestock",
  BACTRIN = "Bactrin",
  BIOLOGICS = "Biologics",
}
```

### **API Filtering**
```bash
# Get all live vaccines
GET /vaccines?type=Live

# Search vaccines by name
GET /vaccines?search=ND

# Get vaccines for livestock
GET /vaccines?type=Livestock
```

## **✅ Migration Status**

After running migrations, you'll have:
- ✅ 35 vaccines seeded across 5 categories
- ✅ Proper indexing for fast searches
- ✅ Type-safe enum values
- ✅ Consistent data structure

---

**📊 Total: 35 vaccines ready for health record management!**
