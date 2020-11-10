const banners = document.querySelectorAll('.banner');
const locks = document.querySelectorAll('.lock');
const pickers = document.querySelectorAll('#picker');
const texts = document.querySelectorAll('.hex-value');
const generateBtn = document.getElementById('generate');

const localStr = JSON.parse(localStorage.getItem('colors'));

if (localStr) {
  banners.forEach((banner, i) => {
    banner.style.backgroundColor = localStr[i];
    texts[i].innerText = localStr[i];
    pickers[i].value = localStr[i];
  });
}

locks.forEach((lock, i) => {
  lock.addEventListener('click', () => {
    banners[i].classList.toggle('locked');
    pickers[i].toggleAttribute('disabled');
    lock.classList.toggle('locked');
  });
});

pickers.forEach((picker, i) => {
  picker.addEventListener('input', () => {
    banners[i].style.backgroundColor = `${picker.value}`;
    texts[i].innerHTML = `${picker.value}`;
    updateLS();
  });
  /*picker.addEventListener('change', () => {
    updateLS();
  });*/
});

texts.forEach((text) => {
  text.addEventListener('click', () => {
    let textarea = document.createElement('textarea');
    textarea.innerText = text.innerText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  });
});

function generateRGB() {
  let rgb = '';
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  rgb = `rgb(${r}, ${g}, ${b})`;
  return rgb;
}

function rgb2hex(rgb) {
  rgb = rgb.match(
    /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
  );
  return rgb && rgb.length === 4
    ? '#' +
        ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2)
    : '';
}

generateBtn.addEventListener('click', () => {
  banners.forEach((banner, i) => {
    if (banner.classList.contains('locked') === false) {
      color = rgb2hex(generateRGB());
      banner.style.backgroundColor = `${color}`;
      texts[i].innerText = `${color}`;
      pickers[i].value = `${color}`;
    }
  });
  updateLS();
});

function updateLS() {
  colorsArray = [];
  banners.forEach((banner) => {
    colorsArray.push(rgb2hex(banner.style.backgroundColor));
  });
  localStorage.setItem('colors', JSON.stringify(colorsArray));
}
