 const toggle = document.getElementById('themeToggle');
        const icon   = document.getElementById('themeIcon');
        const html   = document.documentElement;

        const saved = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-theme', saved);
        icon.textContent = saved === 'dark' ? '☀️' : '🌙';

        toggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            icon.textContent = next === 'dark' ? '🟢' : '⚪';
        });