// ==================== ALERTS PAGE ====================

function updateAlertsList() {
    const list = document.getElementById('active-alerts-list');

    if (alertHistory.length === 0) {
        list.innerHTML = '<p class="text-gray-500 text-center py-8">No active alerts</p>';
        return;
    }

    const colorMap = {
        danger: { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-900' },
        warning: { bg: 'bg-yellow-50', border: 'border-yellow-500', text: 'text-yellow-900' }
    };

    list.innerHTML = alertHistory.slice(0, 5).map(alert => {
        const colors = colorMap[alert.severity] || colorMap.warning;
        return `
            <div class="p-4 ${colors.bg} rounded-xl border-l-4 ${colors.border}">
                <div class="flex items-start justify-between">
                    <div>
                        <p class="font-medium ${colors.text}">⚠️ ${alert.type}</p>
                        <p class="text-sm ${colors.text} mt-1">${alert.message}</p>
                        <p class="text-xs text-gray-500 mt-2">${alert.timestamp}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function updateAlertHistoryTable() {
    const table = document.getElementById('alert-history-table');

    if (alertHistory.length === 0) {
        table.innerHTML = '<tr class="border-b border-gray-50"><td colspan="4" class="py-8 px-4 text-center text-gray-500">No alert history</td></tr>';
        return;
    }

    table.innerHTML = alertHistory.slice(0, 20).map(alert => `
        <tr class="border-b border-gray-50 hover:bg-gray-50">
            <td class="py-3 px-4">${alert.timestamp}</td>
            <td class="py-3 px-4">${alert.type}</td>
            <td class="py-3 px-4">${alert.message}</td>
            <td class="py-3 px-4"><span class="bg-${alert.severity === 'danger' ? 'red' : 'yellow'}-100 text-${alert.severity === 'danger' ? 'red' : 'yellow'}-700 px-2 py-1 rounded-full text-xs">Active</span></td>
        </tr>
    `).join('');
}

function addAlert(type, message, timestamp, severity) {
    const alert = { type, message, timestamp, severity };
    alertHistory.unshift(alert);
    if (alertHistory.length > 50) alertHistory.pop();
    updateAlertsList();
    updateAlertHistoryTable();
    showToast(`🚨 ${type}: ${message}`, 'warning');
}

// Update on page load
window.addEventListener('load', () => {
    updateAlertsList();
    updateAlertHistoryTable();
});