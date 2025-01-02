const nodes = [
    { index: 1, nama: "Lia", next: 0 },
    { index: 2, nama: "Budi", next: 1 },
    { index: 3, nama: "", next: 6 },
    { index: 4, nama: "", next: 0 },
    { index: 5, nama: "Deni", next: 7 },
    { index: 6, nama: "", next: 4 },
    { index: 7, nama: "Ari", next: 2 },
];

let avail = 3; // Initial avail index
let start = 5; // Starting node index

const tableBody = document.getElementById('table-body');
const linkedList = document.getElementById('linked-list');
const availList = document.getElementById('avail-list');

// Populate the table
function renderTable() {
    tableBody.innerHTML = '';
    nodes.forEach(node => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${node.index}</td>
            <td>${node.nama}</td>
            <td>${node.next}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Create the linked list visualization
function renderLinkedList() {
    linkedList.innerHTML = '';
    let current = start;
    while (current !== 0) {
        const node = nodes.find(n => n.index === current);

        // Create a node element
        const nodeElement = document.createElement('div');
        nodeElement.className = 'node';
        nodeElement.innerHTML = `
            <div>${node.nama}</div>
            <div>${node.index}</div>
        `;
        linkedList.appendChild(nodeElement);

        // Add an arrow if there's a next node
        if (node.next !== 0) {
            const arrow = document.createElement('div');
            arrow.className = 'arrow';
            arrow.textContent = '→';
            linkedList.appendChild(arrow);
        }

        current = node.next;
    }
}

// Render the avail list
function renderAvailList() {
    availList.innerHTML = '';
    let current = avail;
    while (current !== 0) {
        const node = nodes.find(n => n.index === current);

        // Create a node element
        const nodeElement = document.createElement('div');
        nodeElement.className = 'node';
        nodeElement.innerHTML = `
            <div>${node.index}</div>
        `;
        availList.appendChild(nodeElement);

        // Add an arrow if there's a next node
        if (node.next !== 0) {
            const arrow = document.createElement('div');
            arrow.className = 'arrow';
            arrow.textContent = '→';
            availList.appendChild(arrow);
        }

        current = node.next;
    }
}

// Insert a new node
function insertNode() {
    const inputName = document.getElementById('input-name').value;
    if (inputName.trim() === '') {
        alert('Nama tidak boleh kosong!');
        return;
    }

    if (avail === 0) {
        alert('Tidak ada ruang kosong untuk penyisipan!');
        return;
    }

    // Get the avail node
    const newNode = nodes.find(n => n.index === avail);
    newNode.nama = inputName;

    // Update avail and next pointers
    avail = newNode.next;
    newNode.next = start;
    start = newNode.index;

    // Re-render table, linked list, and avail list
    renderTable();
    renderLinkedList();
    renderAvailList();

    // Clear input
    document.getElementById('input-name').value = '';
}

// Initial render
renderTable();
renderLinkedList();
renderAvailList();