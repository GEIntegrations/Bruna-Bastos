const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(opened));
    menuButton.textContent = opened ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  }));
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const dateInput = document.getElementById('data');
if (dateInput) {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  dateInput.min = localDate;
}

const phoneInput = document.getElementById('telefone');
if (phoneInput) {
  phoneInput.addEventListener('input', () => {
    let digits = phoneInput.value.replace(/\D/g, '').slice(0, 11);
    if (digits.length > 10) digits = digits.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
    else if (digits.length > 6) digits = digits.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    else if (digits.length > 2) digits = digits.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    phoneInput.value = digits;
  });
}

const form = document.getElementById('bookingForm');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const dateParts = String(data.get('data')).split('-');
    const dateBR = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : data.get('data');
    const message = [
      'Olá, Bruna! Gostaria de solicitar um agendamento.',
      '',
      `Nome: ${data.get('nome')}`,
      `Contato: ${data.get('telefone')}`,
      `Data desejada: ${dateBR}`,
      `Horário desejado: ${data.get('hora')}`,
      `Serviço: ${data.get('servico')}`,
      '',
      'Fico no aguardo da confirmação. Obrigada!'
    ].join('\n');
    const url = `https://wa.me/5551991477585?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    const feedback = document.getElementById('formFeedback');
    feedback.textContent = 'Sua mensagem foi preparada no WhatsApp. Confirme o envio por lá!';
  });
}
