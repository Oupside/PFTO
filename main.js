const sidebarItems = document.querySelectorAll('.sidebar-item');
const contentBoxes = document.querySelectorAll('.content-box');
const indicatorBar = document.getElementById('indicatorBar');
const indicatorLabel = document.getElementById('indicatorLabel');
const topIndicator = document.querySelector('.top-indicator');

const menuOrder = Array.from(sidebarItems).map(item => item.getAttribute('data-content'));
let currentIdx = menuOrder.findIndex(id => document.getElementById(id)?.classList.contains('active'));

const menuNames = {
  main: 'Main',
  about: 'About Me',
  mindset: 'Mindset',
  skills: 'Skills',
  career: 'Career',
  projects: 'Projects',
  archiving: 'Archiving'
};

// 클릭 이벤트
sidebarItems.forEach((item, idx) => {
  item.addEventListener('click', () => {
    activateSection(idx);
  });
});

// 휠 이벤트
let wheelLock = false;
window.addEventListener('wheel', (e) => {
  if (wheelLock) return;
  wheelLock = true;
  setTimeout(() => wheelLock = false, 400);

  if (e.deltaY > 0) {
    currentIdx = (currentIdx + 1) % menuOrder.length;
  } else if (e.deltaY < 0) {
    currentIdx = (currentIdx - 1 + menuOrder.length) % menuOrder.length;
  }
  activateSection(currentIdx);
});

function activateSection(idx) {
  sidebarItems.forEach(i => i.classList.remove('active'));

  // Scale Out 애니메이션 처리
  contentBoxes.forEach(box => {
    if (box.classList.contains('active')) {
      box.classList.remove('box-animate-in');
      box.classList.add('box-animate-out');
      setTimeout(() => {
        box.classList.remove('active', 'box-animate-out');
      }, 250); // scaleOut duration과 동일
    }
  });

  sidebarItems[idx].classList.add('active');
  const target = menuOrder[idx];
  const box = document.getElementById(target);

  // Scale In 애니메이션 처리
  setTimeout(() => {
    box.classList.add('active', 'box-animate-in');
    setTimeout(() => {
      box.classList.remove('box-animate-in');
    }, 350); // scaleIn duration과 동일
  }, 250); // scaleOut duration과 동일

  // 인디케이터 바/텍스트 갱신
  const percent = ((idx + 1) / menuOrder.length) * 100;
  indicatorBar.style.width = percent + 'vw';
  indicatorLabel.textContent = menuNames[target] || '';
  topIndicator.classList.add('active');
  indicatorLabel.style.opacity = 1;
  currentIdx = idx;
}

// 페이지 로드시 현재 active 섹션 인덱스 초기화 및 애니메이션 적용
window.addEventListener('DOMContentLoaded', () => {
  currentIdx = menuOrder.findIndex(id => document.getElementById(id)?.classList.contains('active'));
  if (currentIdx === -1) currentIdx = 0;
  activateSection(currentIdx);
});
