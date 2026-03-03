// ====== ดึงข้อมูลจาก localStorage ======
function getOrders() {
  return JSON.parse(localStorage.getItem("pingjudy_orders")) || [];
}

function saveOrders(data) {
  localStorage.setItem("pingjudy_orders", JSON.stringify(data));
}

// ====== สร้างเลขออเดอร์อัตโนมัติ ======
function generateOrderId() {
  let lastId = localStorage.getItem("pingjudy_last_id");
  if (!lastId) {
    lastId = 1000;
  } else {
    lastId = Number(lastId) + 1;
  }
  localStorage.setItem("pingjudy_last_id", lastId);
  return "ORD" + lastId;
}

// ====== เพิ่มคิวใหม่ ======
function addOrder() {
  const name = document.getElementById("customerName").value.trim();
  const job = document.getElementById("jobName").value.trim();
  const status = document.getElementById("status").value;
  const progress = document.getElementById("progressDetail").value.trim();

  if (!name || !job) {
    alert("กรอกข้อมูลให้ครบ");
    return;
  }

  const orders = getOrders();

  const newOrder = {
    id: generateOrderId(),
    name: name,
    job: job,
    status: status,
    progress: progress,
    createdAt: new Date().getTime()
  };

  orders.push(newOrder);
  saveOrders(orders);

  document.getElementById("customerName").value = "";
  document.getElementById("jobName").value = "";
  document.getElementById("progressDetail").value = "";

  renderOrders();
}

// ====== แปลงสถานะเป็นข้อความไทย ======
function translateStatus(status) {
  switch (status) {
    case "waiting": return "🟡 รอคิว";
    case "doing": return "🔵 กำลังทำ";
    case "review": return "🟣 รอตรวจงาน";
    case "done": return "🟢 เสร็จแล้ว";
    default: return status;
  }
}

// ====== แสดงรายการคิว ======
function renderOrders() {
  const list = document.getElementById("orderList");
  if (!list) return;

  const orders = getOrders();
  list.innerHTML = "";

  orders.forEach((order, index) => {
    const div = document.createElement("div");
    div.className = "order-item";

    div.innerHTML = `
      <strong>${order.id}</strong> - ${order.name}<br>
      งาน: ${order.job}<br>
      <span class="status">${translateStatus(order.status)}</span><br>
      <small>${order.progress || ""}</small><br>
      <button onclick="deleteOrder(${index})" class="danger">ลบ</button>
    `;

    list.appendChild(div);
  });
}

// ====== ลบออเดอร์ ======
function deleteOrder(index) {
  const orders = getOrders();
  orders.splice(index, 1);
  saveOrders(orders);
  renderOrders();
}

// ====== ล้างคิวทั้งหมด ======
function clearAll() {
  if (confirm("ล้างคิวทั้งหมดจริงไหม?")) {
    localStorage.removeItem("pingjudy_orders");
    localStorage.removeItem("pingjudy_last_id");
    renderOrders();
  }
}

// ====== โหลดหน้า ======
window.onload = function() {
  renderOrders();
};
// ====== แสดงหน้าเว็บลูกค้า ======
function renderPublicPage() {
  const orders = getOrders();

  const currentDiv = document.getElementById("currentWork");
  const publicQueue = document.getElementById("publicQueue");

  if (!publicQueue) return;

  publicQueue.innerHTML = "";

  // หาอันที่กำลังทำ
  const doingOrder = orders.find(o => o.status === "doing");

  if (currentDiv) {
    if (doingOrder) {
      currentDiv.innerHTML = `
        <strong>${doingOrder.id}</strong> - ${doingOrder.name}<br>
        งาน: ${doingOrder.job}<br>
        <small>${doingOrder.progress || ""}</small>
      `;
    } else {
      currentDiv.innerText = "ยังไม่มีงานกำลังทำ";
    }
  }

  // แสดงคิวทั้งหมด
  orders.forEach(order => {
    const div = document.createElement("div");
    div.className = "order-item";
    div.innerHTML = `
      <strong>${order.id}</strong> - ${order.name}<br>
      ${translateStatus(order.status)}<br>
      <small>${order.progress || ""}</small>
    `;
    publicQueue.appendChild(div);
  });
}

// ====== ค้นหาออเดอร์ ======
function searchOrder() {
  const input = document.getElementById("searchInput").value.trim();
  const resultDiv = document.getElementById("searchResult");

  const orders = getOrders();
  const found = orders.find(o => o.id === input);

  if (!found) {
    resultDiv.innerHTML = "ไม่พบหมายเลขนี้";
    return;
  }

  resultDiv.innerHTML = `
    <div class="order-item">
      <strong>${found.id}</strong><br>
      ชื่อ: ${found.name}<br>
      งาน: ${found.job}<br>
      ${translateStatus(found.status)}<br>
      <small>${found.progress || ""}</small>
    </div>
  `;
}

// โหลดหน้า public ด้วย
window.addEventListener("load", function() {
  renderPublicPage();
});
// ====== ระบบ Login ======
const ADMIN_PASSWORD = "pingjudy123"; // เปลี่ยนรหัสได้ตรงนี้

function checkLogin() {
  const input = document.getElementById("adminPassword").value;
  const errorText = document.getElementById("loginError");

  if (input === ADMIN_PASSWORD) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    renderOrders();
  } else {
    errorText.innerText = "รหัสผ่านไม่ถูกต้อง";
  }
}
