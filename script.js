// DATA MENU STEAKOLOGY
const menuData = [
    { id: 1, name: 'Ribeye Steak', price: 185000, ImageSrc: 'ribeye.jpg', desc: 'Premium Ribeye 350gr dengan marbling sempurna' },
    { id: 2, name: 'Filet Mignon', price: 225000, ImageSrc: 'filletmignon.jpg', desc: 'Tender Filet Mignon 300gr, tendernya luar biasa' },
    { id: 3, name: 'New York Strip', price: 175000, ImageSrc: 'nystrip.png', desc: 'New York Strip 300gr dengan flavor maksimal' },
    { id: 4, name: 'T-Bone Steak', price: 210000, ImageSrc: 'tbone.jpg', desc: 'T-Bone 400gr kombinasi dua bagian terbaik' },
    { id: 5, name: 'Wagyu A5', price: 350000, ImageSrc: 'wagyua5.jpg', desc: 'Wagyu A5 200gr, premium import dari Jepang' },
    { id: 6, name: 'Porterhouse', price: 195000, ImageSrc: 'porterhouse.jpg', desc: 'Porterhouse 400gr kombinasi steak sempurna' },
    { id: 7, name: 'Iced Lemon Tea', price: 25000, ImageSrc: 'icelemontea.jpg', desc: 'Teh dengan lemon dingin segar pilihan' },
    { id: 8, name: 'Iced Americano', price: 150000, ImageSrc: 'americano.jpeg', desc: 'Ice Americano premium untuk melengkapi steak' },
    { id: 9, name: 'French Fries', price: 35000, ImageSrc: 'ffries.webp', desc: 'French Fries house special' },
    { id: 10, name: 'Chocolate Lava Cake', price: 75000, ImageSrc: 'clc.jpg', desc: 'Chocolate lava cake premium dengan vanila' },
    { id: 11, name: 'Vanilla Panna Cotta', price: 65000, ImageSrc: 'pannacotta.jpg', desc: 'Panna cotta lembut dengan strawberry' },
    { id: 12, name: 'Espresso Coffee', price: 45000, ImageSrc: 'espresso.jpg', desc: 'Espresso premium untuk menutup hidangan' }
];

let cart = [];

// FORMAT RUPIAH
function formatRp(num) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(num);
}

// NAVIGASI HALAMAN
function changePage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');

    if (page === 'menu') {
        renderMenu();
    }

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === page);
    });

    // Close mobile menu
    document.getElementById('mobileNav').classList.remove('active');
    document.getElementById('menuToggle').textContent = '☰';

    window.scrollTo(0, 0);
}

// RENDER MENU
function renderMenu() {
    const container = document.getElementById('menuContainer');
    container.innerHTML = '';

    menuData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
            <div class="menu-item-img">
            <img src="${item.ImageSrc}" alt="${item.name}">
            </div>
            <div class="menu-item-content">
                <div class="menu-item-name">${item.name}</div>
                <div class="menu-item-desc">${item.desc}</div>
                <div class="menu-item-footer">
                    <span class="menu-item-price">${formatRp(item.price)}</span>
                    <button class="add-btn" onclick="addToCart(${item.id})">+ ADD</button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// ADD TO CART
function addToCart(id) {
    const item = menuData.find(x => x.id === id);
    const existing = cart.find(x => x.id === id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...item, qty: 1 });
    }

    updateCart();
}

// UPDATE CART
function updateCart() {
    updateCartCount();
    renderCartList();
}

// HITUNG UPDATE CART 
function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cartCount').textContent = total;
}

// RENDER CART LIST
function renderCartList() {
    const container = document.getElementById('cartList');

    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-message">Your cart is empty</div>';
        document.getElementById('totalHarga').textContent = 'Rp 0';
        return;
    }

    container.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.qty;
        total += subtotal;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${formatRp(item.price)}</div>
            <div class="cart-item-qty">
                <button class="qty-btn" onclick="decreaseQty(${item.id})">−</button>
                <span class="qty-display">${item.qty}</span>
                <button class="qty-btn" onclick="increaseQty(${item.id})">+</button>
                <span style="margin-left: auto; color: #d4af37; font-weight: bold;">${formatRp(subtotal)}</span>
            </div>
            <button class="cart-item-delete" onclick="deleteCart(${item.id})">REMOVE</button>
        `;
        container.appendChild(div);
    });

    document.getElementById('totalHarga').textContent = formatRp(total);
}

// QUANTITY CONTROL
function increaseQty(id) {
    const item = cart.find(x => x.id === id);
    if (item) {
        item.qty++;
        updateCart();
    }
}

function decreaseQty(id) {
    const item = cart.find(x => x.id === id);
    if (item && item.qty > 1) {
        item.qty--;
        updateCart();
    }
}

function deleteCart(id) {
    cart = cart.filter(x => x.id !== id);
    updateCart();
}

// CART SIDEBAR CONTROL
document.getElementById('cartBtn').addEventListener('click', function() {
    document.getElementById('cartSidebar').classList.toggle('active');
});

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('active');
}

// MOBILE MENU TOGGLE/HAMBURGER BAR
document.getElementById('menuToggle').addEventListener('click', function() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
    this.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';
});

// NAV BUTTON CLICK HANDLER
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        changePage(btn.dataset.page);
    });
});

// CLOSE CART KETIKA KLIK BAGIAN LUAR
document.addEventListener('click', function(e) {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartBtn = document.getElementById('cartBtn');
    
    if (!cartSidebar.contains(e.target) && !cartBtn.contains(e.target)) {
        cartSidebar.classList.remove('active');
    }
});