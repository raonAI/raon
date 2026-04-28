const floatBtn = document.getElementById('insta-float');

let isDragging = false;
let dragMoved = false;
let offsetX = 0;
let offsetY = 0;

function startDrag(clientX, clientY) {
  const rect = floatBtn.getBoundingClientRect();
  isDragging = true;
  dragMoved = false;
  offsetX = clientX - rect.left;
  offsetY = clientY - rect.top;
  floatBtn.classList.add('dragging');
  floatBtn.style.left = rect.left + 'px';
  floatBtn.style.top = rect.top + 'px';
  floatBtn.style.right = 'auto';
  floatBtn.style.bottom = 'auto';
}

function moveDrag(clientX, clientY) {
  if (!isDragging) return;
  dragMoved = true;
  const x = Math.max(8, Math.min(window.innerWidth - floatBtn.offsetWidth - 8, clientX - offsetX));
  const y = Math.max(8, Math.min(window.innerHeight - floatBtn.offsetHeight - 8, clientY - offsetY));
  floatBtn.style.left = x + 'px';
  floatBtn.style.top = y + 'px';
}

function endDrag() {
  isDragging = false;
  floatBtn.classList.remove('dragging');
}

floatBtn.addEventListener('mousedown', (e) => {
  startDrag(e.clientX, e.clientY);
});

document.addEventListener('mousemove', (e) => {
  moveDrag(e.clientX, e.clientY);
});

document.addEventListener('mouseup', endDrag);

floatBtn.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  startDrag(touch.clientX, touch.clientY);
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const touch = e.touches[0];
  moveDrag(touch.clientX, touch.clientY);
}, { passive: true });

document.addEventListener('touchend', endDrag);

floatBtn.addEventListener('click', (e) => {
  if (dragMoved) {
    e.preventDefault();
    dragMoved = false;
  }
});
