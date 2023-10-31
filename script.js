document.addEventListener('DOMContentLoaded', function() {

    const storageSelect = document.getElementById('storage');

    function getStorageType() {
        return storageSelect.value === 'local_storage' ? 'localStorage' : 'sessionStorage';
    }

    let storageType = getStorageType();

    const saveButton = document.querySelector('.input_button');
    const clearAllButton = document.querySelector('.button_clear');
    const keyInput = document.querySelector('.input_key');
    const valueInput = document.querySelector('.input_text');

    function updateTable() {
        const tableBody = document.querySelector('table tbody');
        tableBody.innerHTML = '';

        const data = JSON.parse(window[storageType].getItem('data')) || [];
        
        if (data.length === 0) {
            const emptyRow = tableBody.insertRow();
            const emptyCell = emptyRow.insertCell();
            emptyCell.colSpan = "4";
            emptyCell.textContent = 'No Data';
            
        }
        
        else {
            data.forEach((record, index) => {
                const row = tableBody.insertRow();
                const numberCell = row.insertCell();
                numberCell.textContent = index + 1;
                const keyCell = row.insertCell();
                keyCell.textContent = record.key;
                const valueCell = row.insertCell();
                valueCell.textContent = record.value;
                const deleteCell = row.insertCell();
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'X';
                deleteButton.onclick = function() { deleteItem(index); };
                deleteCell.appendChild(deleteButton);
            });
        }
    }

    function getStorage() {
        storageType = getStorageType();
        updateTable();
    }

    function saveItem() {
        const key = keyInput.value.trim();
        const value = valueInput.value.trim();

        if (key && value) {

            const data = JSON.parse(window[storageType].getItem('data')) || [];
            data.push({ key: key, value: value });
            window[storageType].setItem('data', JSON.stringify(data));
            updateTable();
            keyInput.value = '';
            valueInput.value = '';
        }
    }
    
    function deleteItem(index) {

        if (confirm("Вы уверены, что хотите удалить эту запись?")) {

            const data = JSON.parse(window[storageType].getItem('data')) || [];
            data.splice(index, 1);
            window[storageType].setItem('data', JSON.stringify(data));
            updateTable();
        }
    }

    function clearStorage() {

        if (confirm("Вы уверены, что хотите полностью очистить хранилище?")) {
            window[storageType].clear();
            updateTable();
        }
    }

    storageSelect.addEventListener('change', getStorage);
    saveButton.addEventListener('click', saveItem);
    clearAllButton.addEventListener('click', clearStorage);

    updateTable();

});
