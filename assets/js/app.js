/**
 * Murshd Theme - مرشد ثيم
 * Digital Products Store Theme for Salla
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initCartCount();
    initSallaEvents();
    initHeaderScroll();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        const icon = toggle.querySelector('i');
        if (nav.classList.contains('open')) {
            icon.className = 'ri-close-line';
        } else {
            icon.className = 'ri-menu-line';
        }
    });

    // Close menu on link click
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.querySelector('i').className = 'ri-menu-line';
        });
    });
}

/**
 * Header scroll effect
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = 'var(--shadow-sm)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

/**
 * Cart count updater
 */
function initCartCount() {
    const countEl = document.getElementById('cartCount');
    if (!countEl) return;

    if (typeof salla !== 'undefined') {
        salla.cart.event.onUpdated((res) => {
            countEl.textContent = res.data.count || 0;
        });
    }
}

/**
 * Salla SDK Events
 */
function initSallaEvents() {
    if (typeof salla === 'undefined') return;

    // Cart events
    salla.cart.event.onItemAdded((res) => {
        showToast('تمت الإضافة إلى السلة بنجاح', 'success');
    });

    salla.cart.event.onItemAddedFailed((err) => {
        showToast('حدث خطأ أثناء الإضافة', 'error');
    });

    salla.cart.event.onItemDeleted((res) => {
        const el = document.getElementById('cart-item-' + res.data.id);
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateX(20px)';
            setTimeout(() => el.remove(), 300);
        }
    });

    // Wishlist events
    salla.wishlist.event.onAdded(() => {
        showToast('تمت الإضافة إلى المفضلة', 'success');
    });
}

/**
 * Toast notification
 */
function showToast(message, type = 'success') {
    const existing = document.querySelector('.murshd-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'murshd-toast';

    const icon = type === 'success' ? 'ri-check-line' : 'ri-error-warning-line';
    const bg = type === 'success' ? 'var(--accent)' : '#E74C3C';

    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: ${bg};
        color: #fff;
        padding: 14px 28px;
        border-radius: var(--radius-md);
        font-family: var(--font);
        font-size: 0.9rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 8px;
        z-index: 9999;
        box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    toast.innerHTML = `<i class="${icon}"></i> ${message}`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Filter buttons (categories)
 */
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});
