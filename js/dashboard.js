// ==================== DASHBOARD PAGE ====================

function updateDashboard(waterLevel, moisture, rain) {
    if (waterLevel !== null) {
        document.getElementById('water-level-value').textContent = waterLevel;
        document.getElementById('water-level-bar').style.width = `${Math.min((waterLevel / 50) * 100, 100)}%`;
        document.getElementById('water-status').textContent = `Status: ${waterLevel < 15 ? '🔴 CRITICAL' : waterLevel < 30 ? '🟡 WARNING' : '🟢 SAFE'}`;
    }

    if (moisture !== null) {
        document.getElementById('soil-moisture-value').textContent = moisture;
        document.getElementById('soil-moisture-bar').style.width = `${moisture}%`;
        document.getElementById('soil-status').textContent = `Status: ${moisture > 70 ? '💧 Very Wet' : '✓ Normal'}`;
    }

    if (rain !== null) {
        document.getElementById('rainfall-value').textContent = rain;
        document.getElementById('rainfall-bar').style.width = `${Math.min((rain / 10) * 100, 100)}%`;
        document.getElementById('rain-status').textContent = `Status: ${rain > 3 ? '⚡ Heavy Rain' : '✓ Light Rain'}`;
    }

    document.getElementById('last-update-time').textContent = new Date().toLocaleTimeString();
}

function resetData() {
    dataHistory = [];
    alertHistory = [];
    showToast('🔄 Data reset successfully');
}

function exportData() {
    let csv = 'Timestamp,Water Level (cm),Soil Moisture (%),Rainfall (mm)\n';
    dataHistory.forEach(record => {
        csv += `"${record.timestamp}",${record.waterLevel},${record.soilMoisture},${record.rainfall}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flood-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast('📥 Data exported as CSV');
}

function manualTest() {
    const testData = {
        waterLevel: Math.floor(Math.random() * 50),
        soilMoisture: Math.floor(Math.random() * 100),
        rainfall: (Math.random() * 5).toFixed(1),
        timestamp: new Date().toLocaleString()
    };

    updateDashboard(testData.waterLevel, testData.soilMoisture, parseFloat(testData.rainfall));
    dataHistory.unshift(testData);
    showToast('🧪 Test data injected');
}

// Update on page load
window.addEventListener('load', () => {
    updateDashboard(sensorData.waterLevel, sensorData.soilMoisture, sensorData.rainfall);
});