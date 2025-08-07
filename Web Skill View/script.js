const boxes = document.querySelectorAll('.color-box:not(.text)');

boxes.forEach(box => {
    box.addEventListener('click', () => {
    const color = box.getAttribute('data-color');
    document.body.style.backgroundColor = color;
    });
});
