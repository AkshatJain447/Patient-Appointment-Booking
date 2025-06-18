import { db } from "./firebaseConfig.js";
import {
  doc,
  updateDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// ✅ Update quantity
async function updateInventory(itemName, newQuantity) {
  const itemRef = doc(db, "inventory", itemName);
  await updateDoc(itemRef, { quantity: newQuantity });
}

// ✅ Sync from Firestore to UI
function syncInventory(itemName, spanEl) {
  const itemRef = doc(db, "inventory", itemName);
  onSnapshot(itemRef, (docSnap) => {
    if (docSnap.exists()) {
      spanEl.textContent = docSnap.data().quantity;
    }
  });
}

// ✅ Main logic
document.addEventListener("DOMContentLoaded", async () => {
  // await uploadInventoryIfNotPresent();

  const itemBlocks = document.querySelectorAll(".mainE");

  itemBlocks.forEach((block) => {
    // ✅ Extract item name safely
    let itemLabel = [...block.childNodes]
      .filter(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
      )
      .map((node) => node.textContent.trim())[0];

    if (!itemLabel) return; // skip if label extraction fails

    const valueSpan = block.querySelector(".value");
    const plusBtn = block.querySelector(".plus");
    const minusBtn = block.querySelector(".minus");

    syncInventory(itemLabel, valueSpan);

    plusBtn.addEventListener("click", async () => {
      let currentValue = parseInt(valueSpan.textContent);
      const newValue = currentValue + 1;
      valueSpan.textContent = newValue;
      await updateInventory(itemLabel, newValue);
    });

    minusBtn.addEventListener("click", async () => {
      let currentValue = parseInt(valueSpan.textContent);
      if (currentValue > 0) {
        const newValue = currentValue - 1;
        valueSpan.textContent = newValue;
        await updateInventory(itemLabel, newValue);
      }
    });
  });
});
