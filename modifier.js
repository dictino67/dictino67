const form = document.querySelector('#edit-contact-form');
const message = document.querySelector('#form-message');
const submitButton = form.querySelector('button[type="submit"]');
const contactId = new URLSearchParams(window.location.search).get('id');

function showMessage(text, type = '') {
  message.textContent = text;
  message.className = `message${type ? ` ${type}` : ''}`;
}

async function loadContact() {
  if (!contactId || !/^\d+$/.test(contactId)) {
    throw new Error('Identifiant de contact invalide.');
  }

  const response = await fetch(`/api/contacts/${encodeURIComponent(contactId)}`);
  const contact = await response.json();
  if (!response.ok) {
    throw new Error(contact.error || 'Impossible de charger le contact.');
  }

  for (const field of ['nom', 'prenom', 'email', 'gsm']) {
    form.elements[field].value = contact[field] ?? '';
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  showMessage('');
  submitButton.disabled = true;

  const contact = Object.fromEntries(new FormData(form).entries());

  try {
    const response = await fetch(`/api/contacts/${encodeURIComponent(contactId)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact)
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Une erreur est survenue.');
    }

    showMessage(result.message, 'success');
  } catch (error) {
    showMessage(error.message, 'error');
  } finally {
    submitButton.disabled = false;
  }
});

loadContact().catch((error) => {
  showMessage(error.message, 'error');
  submitButton.disabled = true;
});
