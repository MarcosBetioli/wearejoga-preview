/**
 * We Are Joga - Authentic Master Application Logic
 * Pure ES6 JavaScript - Zero External Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initFaqAccordionAndFilters();
  initWhatsAppSimulator();
  initRoiCalculator();
  initLeadModal();
  initMobileMenu();
  initInteractiveShowcaseTabs();
});

/* ==========================================================================
   1. EXPANDED FAQ ACCORDION & CATEGORY FILTER
   ========================================================================== */
function initFaqAccordionAndFilters() {
  const faqItems = document.querySelectorAll('.faq-item');
  const catButtons = document.querySelectorAll('.faq-tab-btn');

  // Accordion toggle
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close other items
        faqItems.forEach(i => i.classList.remove('active'));

        // Toggle current item
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });

  // Category filter
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCat = btn.getAttribute('data-faq-cat');

      faqItems.forEach(item => {
        const itemCat = item.getAttribute('data-cat');
        if (selectedCat === 'todas' || itemCat === selectedCat) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   2. WHATSAPP & CLICKSIGN SIMULATOR
   ========================================================================== */
function initWhatsAppSimulator() {
  const simStep1 = document.getElementById('sim-step-1');
  const simStep2 = document.getElementById('sim-step-2');
  const simStep3 = document.getElementById('sim-step-3');

  const btnSimPay = document.getElementById('btn-sim-pay');
  const btnSimSign = document.getElementById('btn-sim-sign');
  const btnSimReset = document.getElementById('btn-sim-reset');

  if (btnSimPay) {
    btnSimPay.addEventListener('click', () => {
      if (simStep1) simStep1.style.display = 'none';
      if (simStep2) simStep2.style.display = 'block';
    });
  }

  if (btnSimSign) {
    btnSimSign.addEventListener('click', () => {
      if (simStep2) simStep2.style.display = 'none';
      if (simStep3) simStep3.style.display = 'block';
    });
  }

  if (btnSimReset) {
    btnSimReset.addEventListener('click', () => {
      if (simStep3) simStep3.style.display = 'none';
      if (simStep2) simStep2.style.display = 'none';
      if (simStep1) simStep1.style.display = 'block';
    });
  }
}

/* ==========================================================================
   3. ROI CALCULATOR
   ========================================================================== */
function initRoiCalculator() {
  const sliderStudents = document.getElementById('slider-students');
  const sliderCourts = document.getElementById('slider-courts');
  const sliderTournaments = document.getElementById('slider-tournaments');

  const valStudents = document.getElementById('val-students');
  const valCourts = document.getElementById('val-courts');
  const valTournaments = document.getElementById('val-tournaments');

  const resRevenue = document.getElementById('res-revenue');
  const resHours = document.getElementById('res-hours');

  function updateCalculator() {
    const students = parseInt(sliderStudents?.value || 150);
    const courts = parseInt(sliderCourts?.value || 2);
    const tournaments = parseInt(sliderTournaments?.value || 2);

    if (valStudents) valStudents.innerText = `${students} alunos`;
    if (valCourts) valCourts.innerText = `${courts} ${courts > 1 ? 'quadras' : 'quadra'}`;
    if (valTournaments) valTournaments.innerText = `${tournaments} copas/ano`;

    // Escolas avg R$ 180/aluno + Quadras avg R$ 4.800/quadra + Torneios avg R$ 6.500/ano
    const monthlyRevenue = (students * 180) + (courts * 4800) + ((tournaments * 6500) / 12);
    const hoursSaved = Math.round((students * 0.15) + (courts * 8) + (tournaments * 1.5));

    if (resRevenue) {
      resRevenue.innerText = Math.round(monthlyRevenue).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0
      });
    }

    if (resHours) {
      resHours.innerText = `${hoursSaved} h/mês`;
    }
  }

  if (sliderStudents) sliderStudents.addEventListener('input', updateCalculator);
  if (sliderCourts) sliderCourts.addEventListener('input', updateCalculator);
  if (sliderTournaments) sliderTournaments.addEventListener('input', updateCalculator);

  updateCalculator();
}

/* ==========================================================================
   4. LEAD CAPTURE MODAL
   ========================================================================== */
function initLeadModal() {
  const modal = document.getElementById('lead-modal');
  const openButtons = document.querySelectorAll('[data-open-lead-modal]');
  const closeBtn = document.getElementById('modal-close-btn');
  const leadForm = document.getElementById('lead-form');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('lead-name')?.value || '';
      const phone = document.getElementById('lead-phone')?.value || '';
      const businessType = document.getElementById('lead-type')?.value || 'Escola de Futebol';

      const text = encodeURIComponent(
        `Olá! Vim pelo site wearejoga.com e gostaria de solicitar uma demonstração do Joga.\n\n` +
        `👤 Nome: ${name}\n` +
        `📱 WhatsApp: ${phone}\n` +
        `⚽ Foco: ${businessType}`
      );
      window.open(`https://wa.me/5548988358482?text=${text}`, '_blank');
      closeModal();
    });
  }
}

/* ==========================================================================
   5. MOBILE MENU
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isShown = navLinks.style.display === 'flex';
      navLinks.style.display = isShown ? 'none' : 'flex';
      if (!isShown) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '76px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#FFFFFF';
        navLinks.style.padding = '24px';
        navLinks.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
        navLinks.style.borderBottom = '1px solid #E8E6F5';
      }
    });
  }

  // Mobile / touch dropdown toggle
  const dropdownToggles = document.querySelectorAll('.nav-dropdown > a');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = toggle.closest('.nav-dropdown');
      if (parent) {
        parent.classList.toggle('active');
      }
    });
  });
}

/* ==========================================================================
   6. SHOWCASE TABS (QUADRAS, TORNEIOS & PLATFORM ECOSYSTEM)
   ========================================================================== */
function initInteractiveShowcaseTabs() {
  const tabs = document.querySelectorAll('.court-filter-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const parent = tab.closest('.court-filter-tabs');
      if (parent) {
        parent.querySelectorAll('.court-filter-btn').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      }
    });
  });
}

// Global switcher for Platform Showcase Tabs
window.switchPlatformTab = function(tabId, btn) {
  document.querySelectorAll('.platform-tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.platform-tab-pane').forEach(pane => pane.classList.remove('active'));
  const targetPane = document.getElementById('ptab-' + tabId);
  if (targetPane) targetPane.classList.add('active');
};

