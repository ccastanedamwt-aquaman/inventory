// Inventory.jsx — Standalone Inventory Tracker
// McMillan Water Treatment · AquaField Suite
// Works on Android Chrome — no ?. or ?? operators

import { useState } from "react";

var FONT_URL = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap";
var MIKE_PHONE = "+19093290873";
var MIKE_EMAIL = "david.campbell@mcmillanwater.com";

var INV_UNITS = ["gal", "lbs", "qt", "oz", "each", "case"];
var INV_CATEGORIES = ["Chemical", "Fittings", "Part", "Equipment"];
var INV_LOCATIONS = ["Shop", "Truck"];

var INV_DEFAULT_ITEMS = [
  { id:"inv1",  name:"CT-200",          category:"Chemical",   location:"Truck", unit:"gal",  qty:5,  lowAt:2 },
  { id:"inv2",  name:"MultiChlor",      category:"Chemical",   location:"Truck", unit:"case", qty:3,  lowAt:1, galPerCase:4, jugsPerCase:4 },
  { id:"inv3",  name:"CT200-D",         category:"Chemical",   location:"Truck", unit:"case", qty:7,  lowAt:2, galPerCase:5, jugsPerCase:2 },
  { id:"inv4",  name:'3/4" Brass Float Valve', category:"Part",location:"Truck", unit:"each", qty:4,  lowAt:1 },
  { id:"inv10", name:"Union",           category:"Fittings",    location:"Truck", unit:"each", qty:6,  lowAt:2, size:'3/4"', schedule:"Sch 80" },
  { id:"inv11", name:"Coupling",        category:"Fittings",    location:"Truck", unit:"each", qty:8,  lowAt:2, size:'3/4"', schedule:"Sch 80" },
  { id:"inv12", name:"Tee",             category:"Fittings",    location:"Truck", unit:"each", qty:4,  lowAt:2, size:'3/4"', schedule:"Sch 80" },
  { id:"inv13", name:"Male Adapter",    category:"Fittings",    location:"Truck", unit:"each", qty:6,  lowAt:2, size:'3/4"', schedule:"Sch 80" },
  { id:"inv14", name:"Female Adapter",  category:"Fittings",    location:"Truck", unit:"each", qty:4,  lowAt:2, size:'3/4"', schedule:"Sch 80" },
  { id:"inv15", name:'Elbow 90"',       category:"Fittings",    location:"Truck", unit:"each", qty:4,  lowAt:2, size:'3/4"', schedule:"Sch 80" },
  { id:"inv16", name:"Ball Valve",      category:"Fittings",    location:"Truck", unit:"each", qty:3,  lowAt:1, size:'3/4"', schedule:"Sch 80" },
  { id:"inv17", name:"Rubber Coupling", category:"Fittings",    location:"Truck", unit:"each", qty:4,  lowAt:2, size:'2"' },
  { id:"inv18", name:"Union",           category:"Fittings",    location:"Truck", unit:"each", qty:2,  lowAt:1, size:'2.5"', schedule:"Sch 80" },
  { id:"inv19", name:"Check Valve",     category:"Fittings",    location:"Truck", unit:"each", qty:2,  lowAt:1, size:'2"' },
  { id:"inv20", name:"Union",           category:"Fittings",    location:"Shop",  unit:"each", qty:20, lowAt:5, size:'3/4"', schedule:"Sch 80" },
  { id:"inv21", name:"Coupling",        category:"Fittings",    location:"Shop",  unit:"each", qty:20, lowAt:5, size:'3/4"', schedule:"Sch 80" },
  { id:"inv22", name:"Tee",             category:"Fittings",    location:"Shop",  unit:"each", qty:15, lowAt:5, size:'3/4"', schedule:"Sch 80" },
  { id:"inv23", name:"Male Adapter",    category:"Fittings",    location:"Shop",  unit:"each", qty:20, lowAt:5, size:'3/4"', schedule:"Sch 80" },
  { id:"inv24", name:"Female Adapter",  category:"Fittings",    location:"Shop",  unit:"each", qty:15, lowAt:5, size:'3/4"', schedule:"Sch 80" },
  { id:"inv25", name:'Elbow 90"',       category:"Fittings",    location:"Shop",  unit:"each", qty:15, lowAt:5, size:'3/4"', schedule:"Sch 80" },
  { id:"inv26", name:"Ball Valve",      category:"Fittings",    location:"Shop",  unit:"each", qty:10, lowAt:3, size:'3/4"', schedule:"Sch 80" },
  { id:"inv27", name:"Rubber Coupling", category:"Fittings",    location:"Shop",  unit:"each", qty:10, lowAt:3, size:'2"' },
  { id:"inv28", name:"Union",           category:"Fittings",    location:"Shop",  unit:"each", qty:8,  lowAt:3, size:'2.5"', schedule:"Sch 80" },
  { id:"inv29", name:"Check Valve",     category:"Fittings",    location:"Shop",  unit:"each", qty:6,  lowAt:2, size:'2"' },
  { id:"inv40", name:"Chemical Pump",   category:"Equipment",  location:"Truck", unit:"each", qty:2,  lowAt:1, brand:"LMI", feedType:"Inhibitor", condition:"New" },
  { id:"inv41", name:"Chemical Pump",   category:"Equipment",  location:"Truck", unit:"each", qty:2,  lowAt:1, brand:"LMI", feedType:"Biocide",   condition:"New" },
  { id:"inv42", name:"Barrel",          category:"Equipment",  location:"Truck", unit:"each", qty:2,  lowAt:1, spec:"15 gal", condition:"Good" },
  { id:"inv43", name:"Barrel",          category:"Equipment",  location:"Truck", unit:"each", qty:1,  lowAt:1, spec:"30 gal", condition:"Good" },
  { id:"inv44", name:"Chemical Pump",   category:"Equipment",  location:"Shop",  unit:"each", qty:4,  lowAt:2, brand:"LMI", feedType:"Inhibitor", condition:"New" },
  { id:"inv45", name:"Chemical Pump",   category:"Equipment",  location:"Shop",  unit:"each", qty:4,  lowAt:2, brand:"LMI", feedType:"Biocide",   condition:"New" },
  { id:"inv46", name:"Barrel",          category:"Equipment",  location:"Shop",  unit:"each", qty:6,  lowAt:2, spec:"15 gal", condition:"New" },
  { id:"inv47", name:"Barrel",          category:"Equipment",  location:"Shop",  unit:"each", qty:4,  lowAt:2, spec:"30 gal", condition:"New" },
  { id:"inv48", name:"Walchem Controller", category:"Equipment",location:"Shop", unit:"each", qty:2,  lowAt:1, brand:"Walchem", condition:"New" },
  { id:"inv49", name:"Float Valve",     category:"Equipment",  location:"Truck", unit:"each", qty:3,  lowAt:1, spec:'3/4"', condition:"New" },
  { id:"inv5",  name:"CT200-D",         category:"Chemical",   location:"Shop",  unit:"case", qty:20, lowAt:5, galPerCase:5, jugsPerCase:2 },
  { id:"inv6",  name:"MultiChlor",      category:"Chemical",   location:"Shop",  unit:"case", qty:10, lowAt:3, galPerCase:4, jugsPerCase:4 },
  { id:"inv7",  name:"CST3",            category:"Chemical",   location:"Shop",  unit:"gal",  qty:10, lowAt:3 },
  { id:"inv8",  name:"Descale Acid",    category:"Chemical",   location:"Shop",  unit:"gal",  qty:5,  lowAt:2 },
  { id:"inv9",  name:"Antifoam",        category:"Chemical",   location:"Shop",  unit:"gal",  qty:4,  lowAt:1 },
];

var CSS = "\n@import url('" + FONT_URL + "');\n*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}\nbody{background:#080808;color:#f0f0f0;font-family:'IBM Plex Sans',sans-serif;font-size:14px;}\n::-webkit-scrollbar{width:3px;} ::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:4px;}\n@keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}\n.fade{animation:fadeUp .2s ease both;}\n\n.hdr{background:#0d0d0d;border-bottom:1px solid #1a1a1a;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;}\n.hdr-title{font-family:'IBM Plex Mono',monospace;font-weight:700;font-size:13px;color:#0ea5e9;letter-spacing:1px;text-transform:uppercase;}\n.hdr-sub{font-size:10px;color:#444;margin-top:2px;}\n\n.tabs{display:flex;border-bottom:1px solid #1a1a1a;background:#0d0d0d;}\n.tab{flex:1;padding:13px 6px;background:none;border:none;color:#888;font-family:'IBM Plex Mono',monospace;font-size:13px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;cursor:pointer;-webkit-tap-highlight-color:transparent;border-bottom:2px solid transparent;}\n.tab.active{color:#0ea5e9;border-bottom-color:#0ea5e9;}\n\n.body{padding:0 0 120px;}\n.sec-label{font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#555;padding:16px 14px 8px;}\n\n.item{border-bottom:1px solid #1a1a1a;background:#0e0e0e;overflow:hidden;}\n.item:last-child{border-bottom:none;}\n.item.low{background:#130303;}\n.item-main{display:flex;align-items:center;padding:12px 14px;gap:10px;}\n.item-info{flex:1;min-width:0;}\n.item-name{font-size:15px;font-weight:600;color:#f0f0f0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}\n.item-meta{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#666;margin-top:3px;}\n.item-qty{font-family:'IBM Plex Mono',monospace;font-size:22px;font-weight:700;text-align:right;flex-shrink:0;}\n.item-qty.ok{color:#4ade80;}\n.item-qty.low{color:#f87171;}\n.item-unit{font-family:'IBM Plex Mono',monospace;font-size:10px;color:#555;text-align:right;margin-top:1px;}\n.item-actions{display:flex;gap:6px;padding:0 14px 12px;}\n.ibtn{flex:1;padding:8px 0;border-radius:8px;border:none;font-family:'IBM Plex Sans',sans-serif;font-size:12px;font-weight:700;cursor:pointer;-webkit-tap-highlight-color:transparent;text-align:center;}\n.ibtn-use{background:#1e3a5f;color:#60a5fa;}\n.ibtn-add{background:#061a0e;color:#4ade80;}\n.ibtn-edit{background:#111;color:#666;border:1px solid #1e1e1e !important;}\n\n.fab{position:fixed;bottom:24px;right:20px;width:54px;height:54px;border-radius:50%;background:#0ea5e9;border:none;color:#fff;font-size:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:50;box-shadow:0 4px 20px #0ea5e940;-webkit-tap-highlight-color:transparent;line-height:1;}\n\n.send-bar{position:fixed;bottom:24px;left:16px;right:84px;background:#0e0e0e;border:1px solid #1e1e1e;border-radius:14px;padding:10px 14px;display:flex;align-items:center;gap:10px;z-index:49;}\n.send-btn{flex:1;padding:10px 8px;border-radius:10px;border:none;font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:13px;cursor:pointer;-webkit-tap-highlight-color:transparent;text-align:center;}\n.send-btn-text{background:#1e3a5f;color:#60a5fa;}\n.send-btn-email{background:#1a1a06;color:#fbbf24;}\n\n.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:200;display:flex;align-items:flex-end;}\n.modal{width:100%;background:#111;border-radius:16px 16px 0 0;padding:24px 16px 40px;max-height:90vh;overflow-y:auto;}\n.modal-title{font-family:'IBM Plex Mono',monospace;font-size:13px;font-weight:700;color:#f0f0f0;letter-spacing:1px;text-transform:uppercase;margin-bottom:18px;}\n.field{margin-bottom:14px;}\n.field label{display:block;font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#666;margin-bottom:6px;}\n.finput{width:100%;background:#0e0e0e;border:1px solid #2a2a2a;border-radius:10px;padding:12px 14px;font-size:16px;color:#f0f0f0;font-family:'IBM Plex Sans',sans-serif;outline:none;-webkit-appearance:none;}\n.seg{display:flex;gap:6px;flex-wrap:wrap;}\n.seg-btn{padding:10px 10px;border-radius:8px;border:1px solid #2a2a2a;background:#0e0e0e;color:#666;font-family:'IBM Plex Mono',monospace;font-size:12px;font-weight:700;cursor:pointer;-webkit-tap-highlight-color:transparent;}\n.seg-btn.active{background:#1e3a5f;border-color:#60a5fa44;color:#60a5fa;}\n.save-btn{width:100%;padding:15px;border-radius:12px;border:none;background:#0ea5e9;color:#fff;font-family:'IBM Plex Sans',sans-serif;font-size:16px;font-weight:700;cursor:pointer;margin-top:6px;}\n\n.low-bar{margin:10px 12px 0;padding:10px 14px;background:#13030344;border:1px solid #b91c1c44;border-radius:10px;display:flex;align-items:center;gap:8px;}\n\n.toast{position:fixed;bottom:110px;left:50%;transform:translateX(-50%);background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:10px 20px;font-family:'IBM Plex Mono',monospace;font-size:14px;color:#e8e8e8;white-space:nowrap;z-index:999;}\n";

function loadItems() {
  try {
    var raw = localStorage.getItem("inventory_items");
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return INV_DEFAULT_ITEMS;
}

function saveItems(items) {
  try { localStorage.setItem("inventory_items", JSON.stringify(items)); } catch(e) {}
}

function buildShopList(items) {
  var shopItems = items.filter(function(i) { return i.location === "Shop"; });
  var now = new Date();
  var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var dateStr = months[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();

  var lines = ["Shop Inventory — " + dateStr, "McMillan Water Treatment", ""];

  var cats = ["Chemical", "Fittings", "Part", "Equipment"];
  cats.forEach(function(cat) {
    var group = shopItems.filter(function(i) { return i.category === cat; });
    if (group.length === 0) return;
    lines.push("— " + cat.toUpperCase() + " —");
    group.forEach(function(item) {
      var isLow = item.lowAt > 0 && item.qty <= item.lowAt;
      var meta = "";
      if (item.category === "Fittings" && (item.size || item.schedule)) {
        meta = " (" + [item.size, item.schedule].filter(Boolean).join(" ") + ")";
      }
      if (item.category === "Equipment") {
        var parts = [item.brand, item.spec, item.feedType ? item.feedType + " feed" : null].filter(Boolean);
        if (parts.length) meta = " (" + parts.join(", ") + ")";
      }
      if (item.unit === "case" && item.galPerCase) {
        meta += " · " + (item.qty * item.galPerCase).toFixed(0) + " gal total";
      }
      var flag = isLow ? " *** LOW" : "";
      lines.push(item.qty + " " + item.unit + "  " + item.name + meta + flag);
    });
    lines.push("");
  });

  var lowItems = shopItems.filter(function(i) { return i.lowAt > 0 && i.qty <= i.lowAt; });
  if (lowItems.length > 0) {
    lines.push("— NEEDS RESTOCKING —");
    lowItems.forEach(function(item) {
      lines.push(item.name + ": " + item.qty + " " + item.unit + " (low at " + item.lowAt + ")");
    });
  }

  return lines.join("\n");
}

export default function Inventory() {
  var [items, setItems] = useState(function() { return loadItems(); });
  var [location, setLocation] = useState("Shop");
  var [modal, setModal] = useState(null);
  var [editItem, setEditItem] = useState(null);
  var [toast, setToast] = useState("");

  // Form state
  var [fName, setFName] = useState("");
  var [fCat, setFCat] = useState("Chemical");
  var [fUnit, setFUnit] = useState("gal");
  var [fQty, setFQty] = useState("");
  var [fLowAt, setFLowAt] = useState("");
  var [fAmount, setFAmount] = useState("");
  var [fGalPerCase, setFGalPerCase] = useState("");
  var [fJugsPerCase, setFJugsPerCase] = useState("");
  var [fSize, setFSize] = useState("");
  var [fSchedule, setFSchedule] = useState("");
  var [fBrand, setFBrand] = useState("");
  var [fSpec, setFSpec] = useState("");
  var [fFeedType, setFFeedType] = useState("");
  var [fCondition, setFCondition] = useState("");
  var [fLoc, setFLoc] = useState("Shop");

  function save(updated) {
    setItems(updated);
    saveItems(updated);
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(function() { setToast(""); }, 2000);
  }

  function openAdd() {
    setFName(""); setFCat("Chemical"); setFUnit("gal"); setFQty(""); setFLowAt("");
    setFGalPerCase(""); setFJugsPerCase(""); setFSize(""); setFSchedule("");
    setFBrand(""); setFSpec(""); setFFeedType(""); setFCondition(""); setFLoc(location);
    setEditItem(null); setModal("add");
  }

  function openEdit(item) {
    setFName(item.name); setFCat(item.category); setFUnit(item.unit);
    setFQty(String(item.qty)); setFLowAt(String(item.lowAt || ""));
    setFGalPerCase(item.galPerCase ? String(item.galPerCase) : "");
    setFJugsPerCase(item.jugsPerCase ? String(item.jugsPerCase) : "");
    setFSize(item.size || ""); setFSchedule(item.schedule || "");
    setFBrand(item.brand || ""); setFSpec(item.spec || "");
    setFFeedType(item.feedType || ""); setFCondition(item.condition || "");
    setFLoc(item.location);
    setEditItem(item); setModal("edit");
  }

  function saveItem() {
    var qty = parseFloat(fQty) || 0;
    var lowAt = parseFloat(fLowAt) || 0;
    if (!fName.trim()) return;
    var base = { name:fName.trim(), category:fCat, unit:fUnit, qty:qty, lowAt:lowAt, location:fLoc };
    if (fUnit === "case" && fGalPerCase) base.galPerCase = parseFloat(fGalPerCase) || 0;
    if (fUnit === "case" && fJugsPerCase) base.jugsPerCase = parseInt(fJugsPerCase) || 0;
    if (fCat === "Fittings") { if (fSize) base.size = fSize; if (fSchedule) base.schedule = fSchedule; }
    if (fCat === "Equipment") { if (fBrand) base.brand = fBrand; if (fSpec) base.spec = fSpec; if (fFeedType) base.feedType = fFeedType; if (fCondition) base.condition = fCondition; }
    if (editItem) {
      save(items.map(function(i) { return i.id === editItem.id ? Object.assign({}, i, base) : i; }));
      showToast("Updated");
    } else {
      save(items.concat([Object.assign({ id:"inv" + Date.now() }, base)]));
      showToast("Added");
    }
    setModal(null);
  }

  function deleteItem(id) {
    save(items.filter(function(i) { return i.id !== id; }));
    setModal(null); showToast("Deleted");
  }

  function openUse(item) { setEditItem(item); setFAmount(""); setModal("use"); }
  function openRestock(item) { setEditItem(item); setFAmount(""); setModal("restock"); }

  function confirmUse() {
    var amt = parseFloat(fAmount);
    if (isNaN(amt) || amt <= 0) return;
    save(items.map(function(i) {
      if (i.id !== editItem.id) return i;
      var deduct = (i.unit === "case" && i.galPerCase) ? amt / i.galPerCase : amt;
      return Object.assign({}, i, { qty: Math.max(0, Math.round((i.qty - deduct) * 100) / 100) });
    }));
    showToast("Used " + amt + " " + (editItem.unit === "case" && editItem.galPerCase ? "gal" : editItem.unit));
    setModal(null);
  }

  function confirmRestock() {
    var amt = parseFloat(fAmount);
    if (isNaN(amt) || amt <= 0) return;
    save(items.map(function(i) {
      return i.id === editItem.id ? Object.assign({}, i, { qty: i.qty + amt }) : i;
    }));
    showToast("Restocked +" + amt + " " + editItem.unit);
    setModal(null);
  }

  var [actionsOpen, setActionsOpen] = useState(false);

  function exportData() {
    var data = { items: items, categories: categories };
    var json = JSON.stringify(data, null, 2);
    var blob = new Blob([json], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "inventory-backup.json";
    a.click();
    URL.revokeObjectURL(url);
    setActionsOpen(false);
    showToast("Exported!");
  }

  function importData(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) {
      try {
        var data = JSON.parse(ev.target.result);
        if (data.items) { save(data.items); }
        if (data.categories) { saveCategories(data.categories); }
        showToast("Imported!");
      } catch(err) {
        showToast("Import failed — invalid file");
      }
    };
    reader.readAsText(file);
    setActionsOpen(false);
  }

  function sendToCambellText() {
    var body = buildShopList(items);
    window.location.href = "sms:" + MIKE_PHONE + "?body=" + encodeURIComponent(body);
  }

  function sendToCambellEmail() {
    var body = buildShopList(items);
    var subject = "Shop Inventory — McMillan Water Treatment";
    window.location.href = "mailto:" + MIKE_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  var locItems = items.filter(function(i) { return i.location === location; });
  var chemicals  = locItems.filter(function(i) { return i.category === "Chemical"; });
  var fittings   = locItems.filter(function(i) { return i.category === "Fittings"; });
  var parts      = locItems.filter(function(i) { return i.category === "Part"; });
  var equipment  = locItems.filter(function(i) { return i.category === "Equipment"; });
  var allLowCount = items.filter(function(i) { return i.lowAt > 0 && i.qty <= i.lowAt; }).length;
  var locLowCount = locItems.filter(function(i) { return i.lowAt > 0 && i.qty <= i.lowAt; }).length;

  var [categories, setCategories] = useState(function() {
    try {
      var raw = localStorage.getItem("inventory_categories");
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return ["Chemical", "Fittings", "Parts", "Equipment"];
  });
  var [newCat, setNewCat] = useState("");
  var [showNewCat, setShowNewCat] = useState(false);
  var [catEditModal, setCatEditModal] = useState(false);
  var [editCatOld, setEditCatOld] = useState("");
  var [editCatNew, setEditCatNew] = useState("");

  function saveCategories(cats) {
    setCategories(cats);
    try { localStorage.setItem("inventory_categories", JSON.stringify(cats)); } catch(e) {}
  }

  function addCategory() {
    var trimmed = newCat.trim();
    if (!trimmed) return;
    if (categories.indexOf(trimmed) !== -1) return;
    saveCategories(categories.concat([trimmed]));
    setFCat(trimmed);
    setNewCat("");
    setShowNewCat(false);
  }

  function openEditCat(cat) {
    setEditCatOld(cat);
    setEditCatNew(cat);
    setCatEditModal(true);
  }

  function saveEditCat() {
    var trimmed = editCatNew.trim();
    if (!trimmed || trimmed === editCatOld) { setCatEditModal(false); return; }
    // rename in categories list
    saveCategories(categories.map(function(c) { return c === editCatOld ? trimmed : c; }));
    // rename in all items
    save(items.map(function(i) {
      return i.category === editCatOld ? Object.assign({}, i, { category: trimmed }) : i;
    }));
    setCatEditModal(false);
  }

  function deleteEditCat() {
    var hasItems = items.some(function(i) { return i.category === editCatOld; });
    if (hasItems) {
      alert("Cannot delete — move or delete items in this category first.");
      return;
    }
    saveCategories(categories.filter(function(c) { return c !== editCatOld; }));
    setCatEditModal(false);
  }

  var [collapsed, setCollapsed] = useState({ Chemical:true, Fitting:true, Part:true, Equipment:true });

  function toggleCat(cat) {
    setCollapsed(function(prev) {
      var isCurrentlyCollapsed = prev[cat] !== false ? true : false;
      var next = {};
      categories.forEach(function(c) { next[c] = true; });
      if (isCurrentlyCollapsed) {
        next[cat] = false; // expand this one, all others stay collapsed
      }
      // if it was already open, next keeps it collapsed (accordion close)
      return next;
    });
  }

  function CategoryCard(props) {
    var cat = props.cat;
    var color = props.color;
    var catItems = props.items;
    var isCollapsed = collapsed[cat] !== false;
    var catLow = catItems.filter(function(i) { return i.lowAt > 0 && i.qty <= i.lowAt; }).length;
    if (catItems.length === 0) return null;
    return (
      <div style={{margin: props.first ? "12px 12px 8px" : "0 12px 8px", background:"#0e0e0e", border:"1px solid #1a1a1a", borderRadius:14, overflow:"hidden"}}>
        <div
          onClick={function() { toggleCat(cat); }}
          style={{padding:"12px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom: isCollapsed ? "none" : "1px solid #1a1a1a", cursor:"pointer", WebkitTapHighlightColor:"transparent"}}>
          <div style={{display:"flex", alignItems:"center", gap:8}}>
            <span style={{fontFamily:"'IBM Plex Sans',sans-serif", fontSize:15, fontWeight:600, color:"#e8e8e8"}}>{cat}</span>
            {catLow > 0 && <span style={{fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"#f87171", fontWeight:700}}>{catLow} low</span>}
          </div>
          <div style={{display:"flex", alignItems:"center", gap:10}}>
            <span style={{fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"#444"}}>{catItems.length}</span>
            <button
              onClick={function(e) { e.stopPropagation(); openEditCat(cat); }}
              style={{background:"none", border:"none", cursor:"pointer", padding:"2px 4px", color:"#444", fontFamily:"'IBM Plex Mono',monospace", fontSize:11, WebkitTapHighlightColor:"transparent"}}>
              edit
            </button>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)", transition:"transform .2s"}}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>
        {!isCollapsed && catItems.map(function(item) { return <ItemCard key={item.id} item={item} />; })}
      </div>
    );
  }

  function ItemCard(props) {
    var item = props.item;
    var isLow = item.lowAt > 0 && item.qty <= item.lowAt;
    return (
      <div className={"item fade" + (isLow ? " low" : "")}>
        <div className="item-main">
          <div className="item-info">
            <div className="item-name">{item.name}</div>
            <div className="item-meta">
              {item.category}
              {item.category === "Fittings" && (item.size || item.schedule) && (
                <span style={{color:"#a78bfa", marginLeft:6}}>{[item.size, item.schedule].filter(Boolean).join(" · ")}</span>
              )}
              {item.category === "Equipment" && (
                <span style={{color:"#fb923c", marginLeft:6}}>
                  {[item.brand, item.spec, item.feedType ? item.feedType + " feed" : null].filter(Boolean).join(" · ")}
                </span>
              )}
              {item.category === "Equipment" && item.condition && (
                <span style={{marginLeft:6, color: item.condition === "New" ? "#4ade80" : item.condition === "Good" ? "#60a5fa" : item.condition === "Fair" ? "#fbbf24" : "#f87171"}}>
                  {item.condition}
                </span>
              )}
              {item.unit === "case" && item.galPerCase ? <span style={{color:"#60a5fa", marginLeft:6}}>{(item.qty * item.galPerCase).toFixed(0)} gal</span> : null}
              {isLow && <span style={{color:"#f87171", marginLeft:6, fontWeight:700}}>LOW</span>}
            </div>
          </div>
          <div>
            <div className={"item-qty " + (isLow ? "low" : "ok")}>{item.qty}</div>
            <div className="item-unit">{item.unit}</div>
          </div>
        </div>
        <div className="item-actions">
          <button className="ibtn ibtn-use" onClick={function() { openUse(item); }}>- Use</button>
          <button className="ibtn ibtn-add" onClick={function() { openRestock(item); }}>+ Restock</button>
          <button className="ibtn ibtn-edit" onClick={function() { openEdit(item); }}>Edit</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <div style={{minHeight:"100vh", background:"#080808"}}>

        {/* HEADER */}
        <div className="hdr">
          <div>
            <div className="hdr-title">Inventory</div>
            <div className="hdr-sub">McMillan Water Treatment</div>
          </div>
          <div style={{display:"flex", alignItems:"center", gap:10}}>
            {allLowCount > 0 && (
              <div style={{fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"#f87171", fontWeight:700}}>
                {allLowCount} low
              </div>
            )}
            <button onClick={function() { setActionsOpen(true); }}
              style={{background:"#1a1a1a", border:"1px solid #2a2a2a", borderRadius:8, padding:"7px 12px", color:"#888", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, cursor:"pointer", WebkitTapHighlightColor:"transparent"}}>
              ···
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="tabs">
          {INV_LOCATIONS.map(function(loc) {
            var lc = items.filter(function(i) { return i.location === loc && i.lowAt > 0 && i.qty <= i.lowAt; }).length;
            return (
              <button key={loc} className={"tab" + (location === loc ? " active" : "")} onClick={function() { setLocation(loc); }}>
                {loc}{lc > 0 && <span style={{color:"#f87171", marginLeft:4}}>({lc})</span>}
              </button>
            );
          })}
        </div>

        <div className="body">

          {/* LOW STOCK ALERT */}
          {locLowCount > 0 && (
            <div className="low-bar">
              <span style={{fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"#f87171"}}>
                {locLowCount} item{locLowCount !== 1 ? "s" : ""} low or out of stock
              </span>
            </div>
          )}

          {categories.map(function(cat, idx) {
            var catItems = locItems.filter(function(i) { return i.category === cat; });
            var color = cat === "Chemical" ? "#0ea5e9" : cat === "Fittings" ? "#a78bfa" : cat === "Part" ? "#fb923c" : cat === "Equipment" ? "#4ade80" : "#fbbf24";
            return <CategoryCard key={cat} cat={cat} color={color} items={catItems} first={idx === 0} />;
          })}

          {locItems.length === 0 && (
            <div style={{textAlign:"center", padding:"60px 20px", color:"#333", fontFamily:"'IBM Plex Mono',monospace", fontSize:13, lineHeight:2}}>
              No items in {location}<br/>Tap + to add one
            </div>
          )}
        </div>

        {/* FAB */}
        <button className="fab" onClick={openAdd}>+</button>

        {/* ACTIONS BOTTOM SHEET */}
        {actionsOpen && (
          <div className="modal-bg" onClick={function() { setActionsOpen(false); }}>
            <div className="modal" onClick={function(e) { e.stopPropagation(); }}>
              <div className="modal-title">Actions</div>

              <div style={{fontSize:10, color:"#555", fontFamily:"'IBM Plex Mono',monospace", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:8}}>Send Shop Inventory to Cambell</div>
              <div style={{display:"flex", gap:8, marginBottom:20}}>
                <button className="send-btn send-btn-text" style={{flex:1, padding:"13px"}} onClick={function() { sendToCambellText(); setActionsOpen(false); }}>Text</button>
                <button className="send-btn send-btn-email" style={{flex:1, padding:"13px"}} onClick={function() { sendToCambellEmail(); setActionsOpen(false); }}>Email</button>
              </div>

              <div style={{fontSize:10, color:"#555", fontFamily:"'IBM Plex Mono',monospace", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:8}}>Backup & Restore</div>
              <button onClick={exportData}
                style={{width:"100%", padding:"14px", borderRadius:12, border:"1px solid #2a2a2a", background:"#0e0e0e", color:"#4ade80", fontFamily:"'IBM Plex Sans',sans-serif", fontWeight:700, fontSize:15, cursor:"pointer", marginBottom:8, WebkitTapHighlightColor:"transparent"}}>
                Export Backup
              </button>
              <label style={{display:"block", width:"100%"}}>
                <div style={{width:"100%", padding:"14px", borderRadius:12, border:"1px solid #2a2a2a", background:"#0e0e0e", color:"#60a5fa", fontFamily:"'IBM Plex Sans',sans-serif", fontWeight:700, fontSize:15, cursor:"pointer", textAlign:"center", WebkitTapHighlightColor:"transparent"}}>
                  Import Backup
                </div>
                <input type="file" accept=".json" onChange={importData} style={{display:"none"}} />
              </label>

              <button onClick={function() { setActionsOpen(false); }}
                style={{width:"100%", padding:"12px", background:"none", border:"none", color:"#555", fontFamily:"'IBM Plex Sans',sans-serif", fontSize:14, cursor:"pointer", marginTop:12}}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* USE MODAL */}
        {modal === "use" && editItem && (
          <div className="modal-bg" onClick={function() { setModal(null); }}>
            <div className="modal" onClick={function(e) { e.stopPropagation(); }}>
              <div className="modal-title">Log Usage — {editItem.name}</div>
              <div style={{fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"#666", marginBottom:14}}>
                Current: {editItem.qty} {editItem.unit}
                {editItem.unit === "case" && editItem.galPerCase ? " (" + (editItem.qty * editItem.galPerCase).toFixed(0) + " gal)" : ""}
              </div>

              {editItem.unit === "case" && editItem.galPerCase ? (
                <div>
                  <div style={{fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"#666", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:10}}>Tap jugs used per tower</div>
                  <div style={{background:"#0a0a0a", border:"1px solid #2a2a2a", borderRadius:10, padding:"12px 14px", marginBottom:14, textAlign:"center"}}>
                    <div style={{fontFamily:"'IBM Plex Mono',monospace", fontSize:28, fontWeight:700, color: parseFloat(fAmount) > 0 ? "#60a5fa" : "#333"}}>
                      {parseFloat(fAmount) > 0 ? parseFloat(fAmount).toFixed(1) + " gal" : "0 gal"}
                    </div>
                    <div style={{fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"#555", marginTop:3}}>
                      {parseFloat(fAmount) > 0 ? "= " + (parseFloat(fAmount) / editItem.galPerCase).toFixed(2) + " cases" : "tap below to add"}
                    </div>
                  </div>
                  {(function() {
                    var jugsPerCase = editItem.jugsPerCase || 2;
                    var galPerJug = editItem.galPerCase / jugsPerCase;
                    var buttons = [];
                    for (var j = 0; j <= jugsPerCase; j++) { buttons.push(j); }
                    return (
                      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:14}}>
                        {buttons.map(function(jugs) {
                          var gal = jugs * galPerJug;
                          var label = jugs === 0 ? "0 jugs" : jugs === 1 ? "1 jug" : jugs + " jugs";
                          var galLabel = gal === 0 ? "0 gal" : gal % 1 === 0 ? gal + " gal" : gal.toFixed(1) + " gal";
                          var capturedGal = gal;
                          return (
                            <button key={jugs}
                              onClick={function() { setFAmount(String(fAmount ? Math.round((parseFloat(fAmount) + capturedGal) * 100) / 100 : capturedGal)); }}
                              style={{padding:"12px 6px", borderRadius:10, border:"1px solid #2a2a2a", background:"#0e0e0e", color:"#f0f0f0", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, fontWeight:700, cursor:"pointer", WebkitTapHighlightColor:"transparent", textAlign:"center", lineHeight:1.5}}>
                              {label}<br/><span style={{fontSize:10, color:"#666"}}>{galLabel}</span>
                            </button>
                          );
                        })}
                        <button onClick={function() { setFAmount(""); }}
                          style={{padding:"12px 6px", borderRadius:10, border:"1px solid #7f1d1d", background:"#1a0606", color:"#f87171", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, fontWeight:700, cursor:"pointer", WebkitTapHighlightColor:"transparent", textAlign:"center"}}>
                          Reset
                        </button>
                      </div>
                    );
                  })()}
                  <div style={{fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"#555", textAlign:"center", marginBottom:12}}>
                    1 jug = {(editItem.galPerCase / (editItem.jugsPerCase || 2)).toFixed(1)} gal · 1 case = {editItem.jugsPerCase || 2} jugs = {editItem.galPerCase} gal
                  </div>
                </div>
              ) : (
                <div className="field">
                  <label>Amount Used ({editItem.unit})</label>
                  <input type="text" inputMode="decimal" className="finput" placeholder={"0 " + editItem.unit} value={fAmount} onChange={function(e) { setFAmount(e.target.value); }} />
                </div>
              )}

              <button className="save-btn" style={{background:"#1e3a5f", color:"#60a5fa"}} onClick={confirmUse}>Confirm Usage</button>
              <button onClick={function() { setModal(null); }} style={{width:"100%", padding:"12px", background:"none", border:"none", color:"#666", fontFamily:"'IBM Plex Sans',sans-serif", fontSize:14, cursor:"pointer", marginTop:6}}>Cancel</button>
            </div>
          </div>
        )}

        {/* RESTOCK MODAL */}
        {modal === "restock" && editItem && (
          <div className="modal-bg" onClick={function() { setModal(null); }}>
            <div className="modal" onClick={function(e) { e.stopPropagation(); }}>
              <div className="modal-title">Restock — {editItem.name}</div>
              <div style={{fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"#666", marginBottom:14}}>Current: {editItem.qty} {editItem.unit}</div>
              <div className="field">
                <label>Amount Added ({editItem.unit})</label>
                <input type="text" inputMode="decimal" className="finput" placeholder={"0 " + editItem.unit} value={fAmount} onChange={function(e) { setFAmount(e.target.value); }} />
              </div>
              <button className="save-btn" style={{background:"#16a34a"}} onClick={confirmRestock}>Confirm Restock</button>
              <button onClick={function() { setModal(null); }} style={{width:"100%", padding:"12px", background:"none", border:"none", color:"#666", fontFamily:"'IBM Plex Sans',sans-serif", fontSize:14, cursor:"pointer", marginTop:6}}>Cancel</button>
            </div>
          </div>
        )}

        {/* ADD / EDIT MODAL */}
        {(modal === "add" || modal === "edit") && (
          <div className="modal-bg" onClick={function() { setModal(null); }}>
            <div className="modal" onClick={function(e) { e.stopPropagation(); }}>
              <div className="modal-title">{editItem ? "Edit Item" : "Add Item"}</div>

              <div className="field">
                <label>Name</label>
                <input type="text" className="finput" placeholder="e.g. CT-200, Float Valve..." value={fName} onChange={function(e) { setFName(e.target.value); }} />
              </div>

              <div className="field">
                <label>Category</label>
                <div className="seg" style={{flexWrap:"wrap"}}>
                  {categories.map(function(c) {
                    return <button key={c} className={"seg-btn" + (fCat === c ? " active" : "")} onClick={function() { setFCat(c); setShowNewCat(false); }}>{c}</button>;
                  })}
                  <button className="seg-btn" onClick={function() { setShowNewCat(function(v) { return !v; }); }}
                    style={{color:"#fbbf24", borderColor: showNewCat ? "#fbbf2444" : "#2a2a2a", background: showNewCat ? "#180f00" : "#0e0e0e"}}>
                    + New
                  </button>
                </div>
                {showNewCat && (
                  <div style={{display:"flex", gap:8, marginTop:10}}>
                    <input type="text" className="finput" placeholder="e.g. Tool, Safety..." value={newCat}
                      onChange={function(e) { setNewCat(e.target.value); }}
                      style={{flex:1}} />
                    <button onClick={addCategory}
                      style={{padding:"10px 16px", borderRadius:10, border:"1px solid #fbbf2444", background:"#180f00", color:"#fbbf24", fontFamily:"'IBM Plex Sans',sans-serif", fontWeight:700, fontSize:13, cursor:"pointer", WebkitTapHighlightColor:"transparent"}}>
                      Add
                    </button>
                  </div>
                )}
              </div>

              <div className="field">
                <label>Location</label>
                <div className="seg">
                  {INV_LOCATIONS.map(function(l) {
                    return <button key={l} className={"seg-btn" + (fLoc === l ? " active" : "")} onClick={function() { setFLoc(l); }}>{l}</button>;
                  })}
                </div>
              </div>

              <div style={{display:"flex", gap:10}}>
                <div className="field" style={{flex:1}}>
                  <label>Quantity</label>
                  <input type="text" inputMode="decimal" className="finput" placeholder="0" value={fQty} onChange={function(e) { setFQty(e.target.value); }} />
                </div>
                <div className="field" style={{flex:1}}>
                  <label>Unit</label>
                  <select className="finput" value={fUnit} onChange={function(e) { setFUnit(e.target.value); }} style={{color:"#f0f0f0"}}>
                    {INV_UNITS.map(function(u) { return <option key={u} value={u}>{u}</option>; })}
                  </select>
                </div>
              </div>

              <div className="field">
                <label>Low Stock Alert At</label>
                <input type="text" inputMode="decimal" className="finput" placeholder={"e.g. 2 " + fUnit} value={fLowAt} onChange={function(e) { setFLowAt(e.target.value); }} />
              </div>

              {fCat === "Fittings" && (
                <div style={{display:"flex", gap:10}}>
                  <div className="field" style={{flex:1}}>
                    <label>Size</label>
                    <input type="text" className="finput" placeholder='e.g. 3/4"' value={fSize} onChange={function(e) { setFSize(e.target.value); }} />
                  </div>
                  <div className="field" style={{flex:1}}>
                    <label>Schedule</label>
                    <div className="seg">
                      {["Sch 40","Sch 80"].map(function(s) {
                        return <button key={s} className={"seg-btn" + (fSchedule === s ? " active" : "")} onClick={function() { setFSchedule(s); }}>{s}</button>;
                      })}
                    </div>
                  </div>
                </div>
              )}

              {fCat === "Equipment" && (
                <div>
                  <div style={{display:"flex", gap:10}}>
                    <div className="field" style={{flex:1}}>
                      <label>Brand</label>
                      <input type="text" className="finput" placeholder="e.g. LMI..." value={fBrand} onChange={function(e) { setFBrand(e.target.value); }} />
                    </div>
                    <div className="field" style={{flex:1}}>
                      <label>Spec / Size</label>
                      <input type="text" className="finput" placeholder="e.g. 15 gal..." value={fSpec} onChange={function(e) { setFSpec(e.target.value); }} />
                    </div>
                  </div>
                  <div className="field">
                    <label>Feed Type</label>
                    <div className="seg">
                      {["Inhibitor","Biocide","N/A"].map(function(ft) {
                        return <button key={ft} className={"seg-btn" + (fFeedType === ft ? " active" : "")} onClick={function() { setFFeedType(ft); }}>{ft}</button>;
                      })}
                    </div>
                  </div>
                  <div className="field">
                    <label>Condition</label>
                    <div className="seg">
                      {["New","Good","Fair","Bad"].map(function(cond) {
                        var activeStyle = cond === "New" ? {background:"#061a0e",borderColor:"#16a34a",color:"#4ade80"} : cond === "Good" ? {background:"#0e1a2e",borderColor:"#1e3a5f",color:"#60a5fa"} : cond === "Fair" ? {background:"#180f00",borderColor:"#b45309",color:"#fbbf24"} : {background:"#1a0606",borderColor:"#b91c1c",color:"#f87171"};
                        return <button key={cond} className="seg-btn" style={fCondition === cond ? activeStyle : {}} onClick={function() { setFCondition(cond); }}>{cond}</button>;
                      })}
                    </div>
                  </div>
                </div>
              )}

              {fUnit === "case" && (
                <div style={{display:"flex", gap:10}}>
                  <div className="field" style={{flex:1}}>
                    <label>Jugs Per Case</label>
                    <input type="text" inputMode="numeric" className="finput" placeholder="e.g. 2 or 4" value={fJugsPerCase} onChange={function(e) { setFJugsPerCase(e.target.value); }} />
                  </div>
                  <div className="field" style={{flex:1}}>
                    <label>Gal Per Case</label>
                    <input type="text" inputMode="decimal" className="finput" placeholder="e.g. 5 or 4" value={fGalPerCase} onChange={function(e) { setFGalPerCase(e.target.value); }} />
                  </div>
                </div>
              )}

              <button className="save-btn" onClick={saveItem}>{editItem ? "Save Changes" : "Add Item"}</button>
              {editItem && (
                <button onClick={function() { deleteItem(editItem.id); }} style={{width:"100%", padding:"12px", background:"none", border:"none", color:"#f87171", fontFamily:"'IBM Plex Sans',sans-serif", fontSize:14, cursor:"pointer", marginTop:6}}>Delete Item</button>
              )}
              <button onClick={function() { setModal(null); }} style={{width:"100%", padding:"12px", background:"none", border:"none", color:"#666", fontFamily:"'IBM Plex Sans',sans-serif", fontSize:14, cursor:"pointer"}}>Cancel</button>
            </div>
          </div>
        )}

        {/* CATEGORY EDIT MODAL */}
        {catEditModal && (
          <div className="modal-bg" onClick={function() { setCatEditModal(false); }}>
            <div className="modal" onClick={function(e) { e.stopPropagation(); }}>
              <div className="modal-title">Edit Category</div>
              <div className="field">
                <label>Category Name</label>
                <input type="text" className="finput" value={editCatNew}
                  onChange={function(e) { setEditCatNew(e.target.value); }} />
              </div>
              <button className="save-btn" onClick={saveEditCat}>Save Name</button>
              <button onClick={deleteEditCat}
                style={{width:"100%", padding:"12px", background:"none", border:"none", color:"#f87171", fontFamily:"'IBM Plex Sans',sans-serif", fontSize:14, cursor:"pointer", marginTop:6}}>
                Delete Category
              </button>
              <button onClick={function() { setCatEditModal(false); }}
                style={{width:"100%", padding:"12px", background:"none", border:"none", color:"#666", fontFamily:"'IBM Plex Sans',sans-serif", fontSize:14, cursor:"pointer"}}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  );
}
