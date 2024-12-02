const menuIcon = document.getElementById("menu-icon");
const menuList = document.getElementById("menu-list");

menuIcon.addEventListener("click", () => {
  menuList.classList.toggle("hidden");
});
// Menunggu DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Mengambil referensi form dan elemen hasil
    const bmiForm = document.getElementById('bmiForm');
    const resultCard = document.querySelector('.result-card');
    const bmiResult = document.querySelector('.bmi-result');
    
    // Fungsi untuk menghitung BMI
    function hitungBMI(berat, tinggi) {
        // Konversi tinggi dari cm ke meter
        const tinggiMeter = tinggi / 100;
        // Hitung BMI = berat / (tinggi)²
        const bmi = berat / (tinggiMeter * tinggiMeter);
        return bmi.toFixed(1); // Mengembalikan BMI dengan 1 angka desimal
    }
    
    // Fungsi untuk menentukan status berat badan
    function getStatusBMI(bmi) {
        if (bmi < 18.5) {
            return {
                status: "Berat Badan Kurang",
                description: "Anda kekurangan berat badan",
                explanation: "Anda berada dalam kategori kekurangan berat badan. " +
                           "Hubungi dokter lebih lanjut mengenai pola makan dan gizi yang " +
                           "baik untuk meningkatkan kesehatan.",
                color: "red"
            };
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            return {
                status: "Normal (Ideal)",
                description: "Anda memiliki berat badan ideal",
                explanation: "Anda berada dalam kategori berat badan yang normal. " +
                           "Pertahankan pola makan dan gaya hidup sehat Anda.",
                color: "green"
            };
        } else if (bmi >= 25.0 && bmi <= 29.9) {
            return {
                status: "Kelebihan Berat Badan",
                description: "Anda memiliki berat badan berlebih",
                explanation: "Anda berada dalam kategori kelebihan berat badan. " +
                           "Hubungi dokter untuk mendapatkan saran mengenai pola makan " +
                           "dan gaya hidup yang lebih sehat.",
                color: "red"
            };
        } else {
            return {
                status: "Obesitas",
                description: "Anda berada dalam kategori obesitas",
                explanation: "Anda berada dalam kategori obesitas. Segera konsultasikan " +
                           "dengan dokter mengenai rencana penurunan berat badan yang sehat.",
                color: "red"
            };
        }
    }
    
    // Fungsi untuk memperbarui tampilan hasil
    function updateResult(bmi, statusInfo) {
        bmiResult.innerHTML = `
            <h3>${statusInfo.status}</h3>
            <div class="bmi-score" style="color: ${statusInfo.color};">${bmi}</div>
            <p class="bmi-description">${statusInfo.description}</p>
            <button class="btn btn-download">Download Hasil BMI</button>
        `;
        
        const bmiExplanation = document.querySelector('.bmi-explanation');
        bmiExplanation.innerHTML = `
            <p>Hasil BMI = ${bmi}</p>
            <p>${statusInfo.explanation}</p>
        `;
        
        resultCard.style.display = 'block';
    }
    
    // Event listener untuk form submission
    bmiForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah form melakukan submit default
        
        // Mengambil nilai input
        const berat = parseFloat(document.getElementById('berat').value);
        const tinggi = parseFloat(document.getElementById('tinggi').value);
        
        // Menghitung BMI
        const bmi = hitungBMI(berat, tinggi);
        
        // Mendapatkan status dan deskripsi berdasarkan BMI
        const statusInfo = getStatusBMI(bmi);
        
        // Memperbarui tampilan hasil
        updateResult(bmi, statusInfo);
    });
    
    // Event listener untuk tombol reset
    bmiForm.addEventListener('reset', function() {
        resultCard.style.display = 'none';
    });
    
    // Event listener untuk tombol download
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-download')) {
            // Fungsi untuk mengunduh hasil BMI (bisa disesuaikan)
            alert('Fitur download akan segera tersedia!');
        }
    });
});
