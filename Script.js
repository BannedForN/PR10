class SpaceMarine {
    constructor(name, rank, order, status, imageUrl) {
      this.name = name;
      this.rank = rank;
      this.order = order;
      this.status = status;
      this.imageUrl = imageUrl;
    }
  }
  
  const spacemarines = [];
  
  const form = document.getElementById('add-form');
  const table = document.getElementById('table');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const rank = document.getElementById('rank').value;
    const order = document.getElementById('order').value;
    const status = document.querySelector('input[name="status"]:checked').value;
    const image = document.getElementById('image').files[0];
  
    const reader = new FileReader();
    reader.onload = (e) => {
      const spacemarine = new SpaceMarine(name, rank, order, status, e.target.result);
      spacemarines.push(spacemarine);
      updateTable();
    };
    reader.readAsDataURL(image);
  });
  
  table.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('delete-btn')) {
      const name = target.closest('tr').querySelector('td:nth-child(2)').textContent;
      deleteSpaceMarine(name);
    } else if (target.classList.contains('edit-btn')) {
      const name = target.closest('tr').querySelector('td:nth-child(2)').textContent;
      editSpaceMarine(name);
    }
  });
  
  function deleteSpaceMarine(name) {
    const index = spacemarines.findIndex(spacemarine => spacemarine.name === name);
    if (index !== -1) {
      spacemarines.splice(index, 1);
      updateTable();
    };
  };
  
  function editSpaceMarine(name) {
    const spacemarine = spacemarines.find(spacemarine => spacemarine.name === name);
    if (spacemarine) {
      alert('Измените данные в полях на исправленные и нажмите Добавить')
      
      document.getElementById('name').value = spacemarine.name;
      document.getElementById('rank').value = spacemarine.rank;
      document.getElementById('order').value = spacemarine.order;
      document.querySelector(`input[name="status"][value="${spacemarine.status}"]`).checked = true;
  
      deleteSpaceMarine(name);
    };
  };
  
  const updateTable = () => {
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';
  
    spacemarines.forEach((spacemarine) => {
      const row = document.createElement('tr');
  
      const imageCell = document.createElement('td');
      const img = document.createElement('img');
      img.src = spacemarine.imageUrl;
      img.width = 200;
      img.width = 200;
      imageCell.appendChild(img);
  
      const nameCell = document.createElement('td');
      nameCell.textContent = spacemarine.name;
  
      const rankCell = document.createElement('td');
      rankCell.textContent = spacemarine.rank;
  
      const orderCell = document.createElement('td');
      orderCell.textContent = spacemarine.order;
  
      const statusCell = document.createElement('td');
      statusCell.textContent = spacemarine.status;
  
      row.appendChild(imageCell);
      row.appendChild(nameCell);
      row.appendChild(rankCell);
      row.appendChild(orderCell);
      row.appendChild(statusCell);
  
      const actionsCell = document.createElement('td');
  
      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-btn', 'btn', 'btn-danger');
      deleteBtn.textContent = 'Удалить';
      actionsCell.appendChild(deleteBtn);
  
      const editBtn = document.createElement('button');
      editBtn.classList.add('edit-btn', 'btn', 'btn-primary');
      editBtn.textContent = 'Изменить';
      actionsCell.appendChild(editBtn);
  
      row.appendChild(actionsCell);
  
      tbody.appendChild(row);
    });
  };