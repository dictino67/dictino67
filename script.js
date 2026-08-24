const form = document.querySelector('#contact-form');
const message = document.querySelector('#form-message');
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  message.textContent = '';
  message.className = 'message';
  submitButton.disabled = true;

  const formData = new FormData(form);
  const contact = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact)
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Une erreur est survenue.');
    }

    message.textContent = result.message;
    message.classList.add('success');
    form.reset();
  } catch (error) {
    message.textContent = error.message;
    message.classList.add('error');
  } finally {
    submitButton.disabled = false;
  }
});
