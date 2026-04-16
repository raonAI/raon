const revealItems = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.12 });
revealItems.forEach((el) => io.observe(el));

const colorData = {
  white: { earbud: 'assets/white_earbud.png', case: 'assets/white_case.png', name: 'WHITE', desc: '깨끗하고 클래식한 프리미엄 화이트' },
  pink: { earbud: 'assets/pink_earbud.png', case: 'assets/pink_case.png', name: 'VIP PINK', desc: '부드럽고 고급스러운 시그니처 핑크' },
  sky: { earbud: 'assets/sky_earbud.png', case: 'assets/sky_case.png', name: 'SKY BLUE', desc: '시원하고 감각적인 라이트 블루' },
  black: { earbud: 'assets/black_earbud.png', case: 'assets/black_case.png', name: 'BLACK', desc: '절제된 무드가 돋보이는 프리미엄 블랙' }
};

const earbudEl = document.getElementById('colorEarbud');
const caseEl = document.getElementById('colorCase');
const nameEl = document.getElementById('colorName');
const descEl = document.getElementById('colorDesc');
const tabs = document.querySelectorAll('.color-tab');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('is-active'));
    tab.classList.add('is-active');
    const data = colorData[tab.dataset.color];
    if (!data || !earbudEl || !caseEl) return;
    earbudEl.style.opacity = '0';
    caseEl.style.opacity = '0';
    setTimeout(() => {
      earbudEl.src = data.earbud;
      caseEl.src = data.case;
      nameEl.textContent = data.name;
      descEl.textContent = data.desc;
      earbudEl.style.opacity = '1';
      caseEl.style.opacity = '1';
    }, 180);
  });
});

document.querySelectorAll('[data-tilt]').forEach((card) => {
  let rafId = null;
  const update = (x, y, rect) => {
    const px = (x - rect.left) / rect.width;
    const py = (y - rect.top) / rect.height;
    const rx = (0.5 - py) * 10;
    const ry = (px - 0.5) * 12;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => update(e.clientX, e.clientY, rect));
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
});
