// ==================== GLOBAL CONFIGURATION ====================
let sensorData = {
    waterLevel: null,
    soilMoisture: null,
    rainfall: null,
    timestamp: null
};

let alertHistory = [];
let dataHistory = [];

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const bgColor = type === 'error' ? 'bg-red-500' : type === 'warning' ? 'bg-yellow-500' : 'bg-green-500';
    toast.className = `fixed bottom-4 right-4 px-4 py-3 rounded-xl shadow-lg z-50 ${bgColor} text-white font-medium`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function updateConnectionStatus(connected) {
    const status = document.getElementById('connection-status');
    const statusText = document.getElementById('status-text');

    if (connected) {
        status.className = 'pulse-indicator w-2 h-2 bg-green-500 rounded-full';
        statusText.textContent = 'Connected';
    } else {
        status.className = 'w-2 h-2 bg-red-500 rounded-full';
        statusText.textContent = 'Offline';
    }
}

// Simulate data updates (replace with real Firebase later)
setInterval(() => {
    sensorData.waterLevel = Math.floor(Math.random() * 50);
    sensorData.soilMoisture = Math.floor(Math.random() * 100);
    sensorData.rainfall = (Math.random() * 5).toFixed(1);
    sensorData.timestamp = new Date().toISOString();
    updateConnectionStatus(true);
}, 10000);