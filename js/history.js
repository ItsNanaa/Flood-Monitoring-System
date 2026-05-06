// ==================== HISTORY PAGE ====================

function updateHistoryTable() {
    const table = document.getElementById('history-table');

    if (dataHistory.length === 0) {
        table.innerHTML = '<tr class="border-b border-gray-50"><td colspan="5" class="py-8 px-4 text-center text-gray-500">No historical data</td></tr>';
        return;
    }

    table.innerHTML = dataHistory.slice(0, 50).map(record => {
        const status = record.waterLevel <= 15 ? 'CRITICAL' :
                      record.waterLevel <= 30 ? 'WARNING' : 'SAFE';
        const statusColor = record.waterLevel <= 15 ? 'red' :
                           record.waterLevel <= 30 ? 'yellow' : 'green';
        return `
            <tr class="border-b border-gray-50 hover:bg-gray-50">
                <td class="py-3 px-4">${record.timestamp}</td>
                <td class="py-3 px-4">${record.waterLevel} cm</td>
                <td class="py-3 px-4">${record.soilMoisture}%</td>
                <td class="py-3 px-4">${record.rainfall} mm</td>
                <td class="py-3 px-4"><span class="bg-${statusColor}-100 text-${statusColor}-700 px-2 py-1 rounded-full text-xs">${status}</span></td>
            </tr>
        `;
    }).join('');
}

// Update on page load
window.addEventListener('load', () => {
    updateHistoryTable();
});