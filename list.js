const tableBody = document.querySelector('#contacts-body');
const pageIndicator = document.querySelector('#page-indicator');
const prevButton = document.querySelector('#prev-page');
const nextButton = document.querySelector('#next-page');
const searchInput = document.querySelector('#search-name');
const searchButton = document.querySelector('#search-button');
const resetButton = document.querySelector('#reset-button');
const resultCount = document.querySelector('#result-count');
const thNom = document.querySelector('#th-nom');

let currentPage = 1;
const pageSize = 10;
let currentSearch = '';
let sortBy = '';
let sortDir = 'desc';

async function fetchContacts(page) {
  const url = new URL('/api/contacts', window.location.origin);
  url.searchParams.set('page', String(page));
  url.searchParams.set('limit', String(pageSize));
  if (currentSearch) {
    url.searchParams.set('search', currentSearch);
  }

  if (sortBy) {
    url.searchParams.set('sortBy', sortBy);
    url.searchParams.set('sortDir', sortDir);
  }

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Impossible de charger les contacts.');
  }

  currentPage = data.page;
  resultCount.textContent = `${data.total} résultat${data.total > 1 ? 's' : ''}`;
  renderContacts(data.items);
  updatePagination(data.page, data.totalPages);
}

function renderContacts(items) {
  if (!items.length) {
    tableBody.innerHTML = '<tr><td colspan="7">Aucun contact trouvé.</td></tr>';
    return;
  }

  tableBody.innerHTML = items.map((contact) => `
    <tr>
      <td>${contact.id}</td>
      <td>${escapeHtml(contact.nom ?? '')}</td>
      <td>${escapeHtml(contact.prenom ?? '')}</td>
      <td>${escapeHtml(contact.email ?? '')}</td>
      <td>${escapeHtml(contact.gsm ?? '')}</td>
      <td>${new Date(contact.created_at).toLocaleString('fr-FR')}</td>
      <td><button data-id="${contact.id}" class="page-btn delete-btn">Supprimer</button></td>
    </tr>
  `).join('');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function updatePagination(page, totalPages) {
  pageIndicator.textContent = `Page ${page} / ${totalPages}`;
  prevButton.disabled = page <= 1;
  nextButton.disabled = page >= totalPages;
}

// handle delete via event delegation
tableBody.addEventListener('click', (event) => {
  const btn = event.target.closest('.delete-btn');
  if (!btn) return;
  const id = btn.getAttribute('data-id');
  if (!id) return;
  if (!confirm('Souhaitez-vous supprimer ce contact ?')) return;

  fetch(`/api/contacts/${encodeURIComponent(id)}`, { method: 'DELETE' }).then((res) => {
    if (res.ok) {
      // If last item on page was removed and page > 1, go back one page
      fetchContacts(currentPage).catch((error) => {
        tableBody.innerHTML = `<tr><td colspan="7">${escapeHtml(error.message)}</td></tr>`;
      });
    } else {
      res.json().then((data) => {
        alert(data.error || 'Erreur lors de la suppression');
      }).catch(() => alert('Erreur lors de la suppression'));
    }
  }).catch((err) => {
    alert(err.message || 'Erreur lors de la suppression');
  });
});

prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    fetchContacts(currentPage - 1).catch((error) => {
      tableBody.innerHTML = `<tr><td colspan="7">${escapeHtml(error.message)}</td></tr>`;
    });
  }
});

nextButton.addEventListener('click', () => {
  if (currentPage < Number.MAX_SAFE_INTEGER) {
    fetchContacts(currentPage + 1).catch((error) => {
      tableBody.innerHTML = `<tr><td colspan="7">${escapeHtml(error.message)}</td></tr>`;
    });
  }
});

searchButton.addEventListener('click', () => {
  currentSearch = searchInput.value.trim();
  currentPage = 1;
  fetchContacts(currentPage).catch((error) => {
    tableBody.innerHTML = `<tr><td colspan="7">${escapeHtml(error.message)}</td></tr>`;
  });
});

resetButton.addEventListener('click', () => {
  currentSearch = '';
  searchInput.value = '';
  currentPage = 1;
  sortBy = '';
  sortDir = 'desc';
  thNom.dataset.sort = 'none';
  fetchContacts(currentPage).catch((error) => {
    tableBody.innerHTML = `<tr><td colspan="7">${escapeHtml(error.message)}</td></tr>`;
  });
});

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchButton.click();
  }
});

// sorting handler for Nom column
thNom.addEventListener('click', () => {
  // cycle none -> asc -> desc -> none
  const state = thNom.dataset.sort || 'none';
  if (state === 'none') {
    thNom.dataset.sort = 'asc';
    sortBy = 'nom';
    sortDir = 'asc';
  } else if (state === 'asc') {
    thNom.dataset.sort = 'desc';
    sortBy = 'nom';
    sortDir = 'desc';
  } else {
    thNom.dataset.sort = 'none';
    sortBy = '';
    sortDir = 'desc';
  }
  currentPage = 1;
  fetchContacts(currentPage).catch((error) => {
    tableBody.innerHTML = `<tr><td colspan="7">${escapeHtml(error.message)}</td></tr>`;
  });
});

fetchContacts(currentPage).catch((error) => {
  tableBody.innerHTML = `<tr><td colspan="6">${escapeHtml(error.message)}</td></tr>`;
});
