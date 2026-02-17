/** 
 * SurvStake Gallery Controller - Final Video Recovery Version
 * Fixes: HEVC/MOV "Audio Only" issues by using a more conservative loading strategy.
 */

const GALLERY_DATA = {
    videos: ["GJWZ5701.MP4", "IMG_E0415.MOV", "IMG_E0613.MOV", "IMG_E0734.MOV", "IMG_E0802.MOV", "IMG_E0821.MOV", "IMG_E0933.MOV", "IMG_E0938.MOV", "IMG_E1045.MOV", "IMG_E1248.MOV", "WNNS0343.MP4"],
    photos: ["1.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "BECI8391.JPG", "BECIE8391.JPG", "FXWK0934.JPG", "FZQX0865.JPG", "IMG_0016.JPG", "IMG_0074.JPG", "IMG_0124.JPG", "IMG_0208.JPG", "IMG_0244.JPG", "IMG_0246.JPG", "IMG_0249.JPG", "IMG_0255.JPG", "IMG_0291.JPG", "IMG_0420.JPG", "IMG_0421.JPG", "IMG_0427.JPG", "IMG_0537.JPG", "IMG_0634.JPG", "IMG_0674.JPG", "IMG_0743.JPG", "IMG_0745.JPG", "IMG_1010.JPG", "IMG_1012.JPG", "IMG_1013.JPG", "IMG_1021.JPG", "IMG_1025.JPG", "IMG_1026.JPG", "IMG_1290.JPG", "IMG_1293.JPG", "IMG_1299.JPG", "IMG_1304.JPG", "IMG_1311.JPG", "IMG_1320.JPG", "IMG_1334.JPG", "IMG_1335.JPG", "IMG_1336.JPG", "IMG_1370.JPG", "IMG_1425.JPG", "IMG_1715.JPG", "IMG_1883.JPG", "IMG_1885.JPG", "IMG_1886.JPG", "IMG_1890.JPG", "IMG_1971.JPG", "IMG_2007.JPG", "IMG_2009.JPG", "IMG_2015.JPG", "IMG_2032.JPG", "IMG_2033.JPG", "IMG_2034.JPG", "IMG_2080.JPG", "IMG_2081.JPG", "IMG_2082.JPG", "IMG_2099.JPG", "IMG_2107.JPG", "IMG_2135.JPG", "IMG_2137.JPG", "IMG_2138.JPG", "IMG_2188.JPG", "IMG_2189.JPG", "IMG_2197.JPG", "IMG_2198.JPG", "IMG_2297.JPG", "IMG_2968.JPG", "IMG_2969.JPG", "IMG_2980.JPG", "IMG_4217.JPG", "IMG_4487.JPG", "IMG_5614.JPG", "IMG_5622.JPG", "IMG_5623.JPG", "IMG_5624.JPG", "IMG_5625.JPG", "IMG_5626.JPG", "IMG_5627.JPG", "IMG_5628.JPG", "IMG_5630.JPG", "IMG_5632.JPG", "IMG_5633.JPG", "IMG_5634.JPG", "IMG_5637.JPG", "IMG_5638.JPG", "IMG_5639.JPG", "IMG_5640.JPG", "IMG_5641.JPG", "IMG_5642.JPG", "IMG_5643.JPG", "IMG_5644.JPG", "IMG_5672.JPG", "IMG_5673.JPG", "IMG_5674.JPG", "IMG_5680.JPG", "IMG_5681.JPG", "IMG_5682.JPG", "IMG_5685.JPG", "IMG_5686.JPG", "IMG_5687.JPG", "IMG_5690.JPG", "IMG_5697.JPG", "IMG_5698.JPG", "IMG_5706.JPG", "IMG_5707.JPG", "IMG_5709.JPG", "IMG_5710.JPG", "IMG_5711.JPG", "IMG_5716.JPG", "IMG_5718.JPG", "IMG_5726.JPG", "IMG_5733.JPG", "IMG_5764.JPG", "IMG_5775.JPG", "IMG_5777.JPG", "IMG_5778.JPG", "IMG_5789.JPG", "IMG_5790.JPG", "IMG_5804.JPG", "IMG_5867.JPG", "IMG_5912.JPG", "IMG_5915.JPG", "IMG_5916.JPG", "IMG_5925.JPG", "IMG_5928.JPG", "IMG_5937.PNG", "IMG_5957.JPG", "IMG_5959.JPG", "IMG_5960.JPG", "IMG_5961.JPG", "IMG_5969.JPG", "IMG_5971.JPG", "IMG_5972.JPG", "IMG_5973.JPG", "IMG_5983.JPG", "IMG_5984.JPG", "IMG_5985.JPG", "IMG_5986.JPG", "IMG_5988.JPG", "IMG_5989.JPG", "IMG_5990.JPG", "IMG_7211.JPG", "IMG_7337.JPG", "IMG_7347.JPG", "IMG_7353.JPG", "IMG_7397.JPG", "IMG_7465.JPG", "IMG_7784.JPG", "IMG_8361.JPG", "IMG_8558.JPG", "IMG_8583.JPG", "IMG_8585.JPG", "IMG_8615.JPG", "IMG_8617.JPG", "IMG_8635.JPG", "IMG_8637.JPG", "IMG_8670.JPG", "IMG_8711.JPG", "IMG_8712.JPG", "IMG_8713.JPG", "IMG_8716.JPG", "IMG_8717.JPG", "IMG_8718.JPG", "IMG_8719.JPG", "IMG_8741.JPG", "IMG_8742.JPG", "IMG_8757.JPG", "IMG_8762.JPG", "IMG_8766.JPG", "IMG_8773.JPG", "IMG_8774.JPG", "IMG_8777.JPG", "IMG_8784.JPG", "IMG_8787.JPG", "IMG_8792.JPG", "IMG_8797.JPG", "IMG_8809.JPG", "IMG_8810.JPG", "IMG_8811.JPG", "IMG_8812.JPG", "IMG_8813.JPG", "IMG_8814.JPG", "IMG_8816.JPG", "IMG_8820.JPG", "IMG_8830.JPG", "IMG_8832.JPG", "IMG_8853.JPG", "IMG_8856.JPG", "IMG_8860.JPG", "IMG_8862.JPG", "IMG_8868.JPG", "IMG_8869.JPG", "IMG_8876.JPG", "IMG_8878.JPG", "IMG_8893.JPG", "IMG_8894.JPG", "IMG_8898.JPG", "IMG_9435.JPG", "IMG_9687.JPG", "IMG_9910.JPG", "IMG_E0063.JPG", "IMG_E0064.JPG", "IMG_E0065.JPG", "IMG_E0066.JPG", "IMG_E5614.JPG", "IMG_E5620.JPG", "IMG_E5631.JPG", "IMG_E5671.JPG", "IMG_E5681.JPG", "IMG_E5946.JPG", "IMG_E5947.JPG", "IMG_E5957.JPG", "IMG_E5993.JPG", "IMG_E7139.JPG", "IMG_E7142.JPG", "IMG_E7145.JPG", "IMG_E7182.JPG", "IMG_E7189.JPG", "IMG_E7215.JPG", "IMG_E7340.JPG", "IMG_E7353.JPG", "IMG_E7361.JPG", "IMG_E7375.JPG", "IMG_E7377.JPG", "IMG_E7540.JPG", "IMG_E7991.JPG", "IMG_E8092.JPG", "IMG_E8120.JPG", "IMG_E8124.JPG", "IMG_E8125.JPG", "IMG_E8126.JPG", "IMG_E8128.JPG", "IMG_E8129.JPG", "IMG_E8130.JPG", "IMG_E8131.JPG", "IMG_E8178.JPG", "IMG_E8206.JPG", "IMG_E8249.JPG", "IMG_E8250.JPG", "IMG_E8359.JPG", "IMG_E8374.JPG", "IMG_E8430.JPG", "IMG_E8431.JPG", "IMG_E8432.JPG", "IMG_E8433.JPG", "IMG_E8434.JPG", "IMG_E8435.JPG", "IMG_E8550.JPG", "IMG_E8693.JPG", "IMG_E8718.JPG", "IMG_E8737.JPG", "IMG_E8777.JPG", "IMG_E9013.JPG", "IMG_E9204.JPG", "IMG_E9414.JPG", "IMG_E9417.JPG", "IMG_E9418.JPG", "IMG_E9594.JPG", "IMG_E9694.JPG", "OSWE1579.JPG", "precio-de-un-levantamiento-topografico.jpg"]
};

let currentPhotoIndex = 0;
let lightboxIndex = 0;
const PHOTOS_PER_PAGE = 32;

function createLightbox() {
    const lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.98); display: none; z-index: 5000;
        justify-content: center; align-items: center; 
        backdrop-filter: blur(20px);
    `;

    lb.innerHTML = `
        <div id="lb-close" style="position: absolute; top: 30px; right: 30px; color: #fff; font-size: 3rem; cursor: pointer; z-index: 10;">&times;</div>
        <div id="lb-prev" style="position: absolute; left: 30px; top: 50%; transform: translateY(-50%); color: var(--primary); font-size: 4rem; cursor: pointer; z-index: 10; padding: 20px;">
            <i class="fas fa-chevron-left"></i>
        </div>
        <div id="lb-next" style="position: absolute; right: 30px; top: 50%; transform: translateY(-50%); color: var(--primary); font-size: 4rem; cursor: pointer; z-index: 10; padding: 20px;">
            <i class="fas fa-chevron-right"></i>
        </div>
        <div style="width: 85%; height: 85%; display: flex; justify-content: center; align-items: center;">
            <img id="lb-img" src="" style="max-width: 100%; max-height: 100%; border-radius: 8px; box-shadow: 0 0 80px rgba(255,193,7,0.3); border: 2px solid rgba(255,193,7,0.5); object-fit: contain;">
        </div>
        <div id="lb-counter" style="position: absolute; bottom: 30px; color: #888; letter-spacing: 2px; font-weight: bold;">0 / 0</div>
    `;

    document.body.appendChild(lb);
    document.getElementById('lb-close').onclick = () => lb.style.display = 'none';
    document.getElementById('lb-prev').onclick = (e) => { e.stopPropagation(); navigateLightbox(-1); };
    document.getElementById('lb-next').onclick = (e) => { e.stopPropagation(); navigateLightbox(1); };
    lb.onclick = () => lb.style.display = 'none';
    document.getElementById('lb-img').onclick = (e) => e.stopPropagation();

    document.addEventListener('keydown', (e) => {
        if (lb.style.display === 'flex') {
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
            if (e.key === 'Escape') lb.style.display = 'none';
        }
    });
}

function openLightbox(index) {
    lightboxIndex = index;
    updateLightboxContent();
    document.getElementById('lightbox').style.display = 'flex';
}

function navigateLightbox(step) {
    lightboxIndex += step;
    if (lightboxIndex < 0) lightboxIndex = GALLERY_DATA.photos.length - 1;
    if (lightboxIndex >= GALLERY_DATA.photos.length) lightboxIndex = 0;
    updateLightboxContent();
}

function updateLightboxContent() {
    const img = document.getElementById('lb-img');
    const counter = document.getElementById('lb-counter');
    const photo = GALLERY_DATA.photos[lightboxIndex];
    img.src = `assets/${photo}`;
    counter.innerText = `${lightboxIndex + 1} / ${GALLERY_DATA.photos.length}`;
}

function loadPhotos() {
    const photoGrid = document.getElementById('full-photo-grid');
    if (!photoGrid) return;
    const end = Math.min(currentPhotoIndex + PHOTOS_PER_PAGE, GALLERY_DATA.photos.length);
    for (let i = currentPhotoIndex; i < end; i++) {
        const photo = GALLERY_DATA.photos[i];
        const photoItem = document.createElement('div');
        photoItem.className = 'portfolio-item';
        photoItem.innerHTML = `
            <img src="assets/${photo}" alt="SurvStake Topografía" loading="lazy">
            <div class="portfolio-overlay"><i class="fas fa-expand" style="color: var(--primary); font-size: 2rem;"></i></div>
        `;
        const idx = i;
        photoItem.onclick = () => openLightbox(idx);
        photoGrid.appendChild(photoItem);
    }
    currentPhotoIndex = end;
    let btnManager = document.getElementById('load-more-btn-container');
    if (!btnManager) {
        btnManager = document.createElement('div');
        btnManager.id = 'load-more-btn-container';
        btnManager.style.textAlign = 'center';
        btnManager.style.padding = '60px 0';
        photoGrid.parentElement.appendChild(btnManager);
    }
    if (currentPhotoIndex >= GALLERY_DATA.photos.length) {
        btnManager.innerHTML = '<p style="color: var(--primary); font-weight: 700; letter-spacing: 2px;">ARCHIVO COMPLETO CARGADO</p>';
    } else {
        if (!document.getElementById('load-more-btn')) {
            const btn = document.createElement('button');
            btn.id = 'load-more-btn';
            btn.className = 'btn-outline';
            btn.style.cssText = 'background: transparent; border: 2px solid var(--primary); color: #fff; padding: 18px 50px; cursor: pointer; font-weight: 800; letter-spacing: 3px; border-radius: 50px;';
            btn.innerText = 'CARGAR MÁS';
            btn.onclick = loadPhotos;
            btnManager.appendChild(btn);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createLightbox();
    const videoGrid = document.getElementById('video-grid');
    if (videoGrid) {
        GALLERY_DATA.videos.forEach((video) => {
            const videoItem = document.createElement('div');
            videoItem.className = 'video-item';

            videoItem.innerHTML = `
                <div style="position: relative; overflow: hidden; border-radius: 20px; background: #000; height: 300px;">
                    <video muted playsinline preload="metadata" poster="assets/logo.png" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                        <source src="assets/${video}" type="video/mp4">
                    </video>
                    <!-- Overlay de Play para asegurar respuesta visual -->
                    <div class="video-play-btn" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: var(--primary); font-size: 3rem; pointer-events: none; text-shadow: 0 0 20px #000;">
                        <i class="fas fa-play-circle"></i>
                    </div>
                </div>
            `;

            const v = videoItem.querySelector('video');
            const playBtn = videoItem.querySelector('.video-play-btn');

            // Forzar carga de video en hover y ocultar botón
            videoItem.onmouseenter = () => {
                v.setAttribute('preload', 'auto');
                v.play().then(() => { playBtn.style.display = 'none'; }).catch(() => { });
            };

            videoItem.onmouseleave = () => {
                v.pause();
                v.currentTime = 0;
                playBtn.style.display = 'block';
            };

            videoItem.onclick = () => {
                v.muted = false;
                v.controls = true;
                if (v.requestFullscreen) v.requestFullscreen();
                v.play();
            };

            videoGrid.appendChild(videoItem);
        });
    }
    loadPhotos();
});
