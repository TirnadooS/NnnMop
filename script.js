* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: #1a1a2e;
    color: #e5e5e5;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow-y: auto;
}

.container {
    text-align: center;
    padding: 20px;
    max-width: 500px;
    width: 100%;
}

h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
}

.categories {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.category {
    padding: 15px;
    background: #16213e;
    border-radius: 8px;
    cursor: pointer;
    flex: 1;
    transition: background 0.3s;
}

.category:hover {
    background: #0f3460;
}

.tracks {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}

.track {
    display: flex;
    align-items: center;
    background: #16213e;
    padding: 10px;
    border-radius: 8px;
    justify-content: space-between;
}

.track-name {
    font-size: 1rem;
}

.wave {
    width: 100px;
    height: 20px;
    background: repeating-linear-gradient(90deg, #4ecca3 0, #4ecca3 10px, transparent 10px, transparent 20px);
    animation: wave 2s infinite linear;
}

@keyframes wave {
    0% { background-position: 0 0; }
    100% { background-position: -20px 0; }
}

.volume-slider {
    width: 100px;
}

.control-btn {
    padding: 10px 20px;
    background: #4ecca3;
    border: none;
    border-radius: 8px;
    color: #1a1a2e;
    cursor: pointer;
    transition: background 0.3s;
}

.control-btn:hover {
    background: #45b897;
}

input[type="range"] {
    width: 200px;
}

@media (max-width: 600px) {
    h1 { font-size: 1.5rem; }
    .category { padding: 10px; }
    .track { flex-direction: column; gap: 10px; }
    .wave { width: 80px; }
    input[type="range"] { width: 150px; }
}
