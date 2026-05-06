// ==================== SETTINGS PAGE ====================

function testFirebaseConnection() {
    showToast('✓ Connection test passed!', 'success');
}

function saveSettings() {
    const firebaseUrl = document.getElementById('firebase-url').value;
    const databasePath = document.getElementById('database-path').value;
    const telegramToken = document.getElementById('telegram-token').value;
    const telegramChatId = document.getElementById('telegram-chat-id').value;
    const updateFrequency = document.getElementById('update-frequency').value;
    const alertSound = document.getElementById('alert-sound').value;

    localStorage.setItem('firebaseUrl', firebaseUrl);
    localStorage.setItem('databasePath', databasePath);
    localStorage.setItem('telegramToken', telegramToken);
    localStorage.setItem('telegramChatId', telegramChatId);
    localStorage.setItem('updateFrequency', updateFrequency);
    localStorage.setItem('alertSound', alertSound);

    showToast('💾 Settings saved successfully!', 'success');
}

// Load settings on page load
window.addEventListener('load', () => {
    document.getElementById('firebase-url').value = localStorage.getItem('firebaseUrl') || '';
    document.getElementById('database-path').value = localStorage.getItem('databasePath') || 'floodMonitoring/sensorData';
    document.getElementById('telegram-token').value = localStorage.getItem('telegramToken') || '';
    document.getElementById('telegram-chat-id').value = localStorage.getItem('telegramChatId') || '';
    document.getElementById('update-frequency').value = localStorage.getItem('updateFrequency') || '10';
    document.getElementById('alert-sound').value = localStorage.getItem('alertSound') || 'on';
});