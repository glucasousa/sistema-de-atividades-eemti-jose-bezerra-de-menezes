// script01.js — leitor e downloader de .docx
// Depende de: mammoth.js (carregado via CDN no HTML)

function iniciarLeitor(config) {
    const { arquivos, containerId, listaId } = config;

    const lista     = document.getElementById(listaId);
    const container = document.getElementById(containerId);

    // Renderiza lista de atividades
    arquivos.forEach((arq, i) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="atv-nome">${arq.nome}</span>
            <div class="atv-acoes">
                <button onclick="visualizar(${i})" class="btn-ver">👁 Ver</button>
                <a href="${arq.caminho}" download class="btn-dl">⬇ Baixar</a>
            </div>
        `;
        lista.appendChild(li);
    });

    // Visualizar docx na página
    window.visualizar = async function(index) {
        const arq = arquivos[index];
        container.innerHTML = `<p class="carregando">⏳ Carregando ${arq.nome}...</p>`;
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });

        try {
            const resp   = await fetch(arq.caminho);
            const buffer = await resp.arrayBuffer();
            const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
            container.innerHTML = `
                <div class="doc-header">
                    <span class="doc-titulo">${arq.nome}</span>
                    <button onclick="fecharDoc()" class="btn-fechar">✕ Fechar</button>
                </div>
                <div class="doc-conteudo">${result.value}</div>
            `;
        } catch (e) {
            container.innerHTML = `<p class="erro">❌ Não foi possível carregar o arquivo. Verifique o caminho.</p>`;
        }
    };

    window.fecharDoc = function() {
        container.innerHTML = '';
    };

    // Toggle dark/light
    const toggle = document.getElementById('themeToggle');
    const icon   = document.getElementById('themeIcon');
    const html   = document.documentElement;

    const saved = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', saved);
    if (icon) icon.textContent = saved === 'dark' ? '☀️' : '🌙';

    if (toggle) {
        toggle.addEventListener('click', () => {
            const cur  = html.getAttribute('data-theme');
            const next = cur === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            if (icon) icon.textContent = next === 'dark' ? '☀️' : '🌙';
        });
    }
}