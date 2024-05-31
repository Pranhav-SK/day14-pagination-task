let currentPage = 1;
const itemsPerPage = 5;

function loadData(direction) {
    fetch(`https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json`)
        .then(response => response.json())
        .then(data => {
            const totalPages = Math.ceil(data.length / itemsPerPage);

            if (direction === 'next' && currentPage < totalPages) {
                currentPage++;
            } else if (direction === 'prev' && currentPage > 1) {
                currentPage--;
            }

            document.getElementById('prevBtn').disabled = (currentPage === 1);
            document.getElementById('nextBtn').disabled = (currentPage === totalPages);

            displayData(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayData(data) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = data.slice(startIndex, endIndex);

    pageData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Initial load
loadData();
