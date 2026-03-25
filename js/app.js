// ============================================
// Frontend Effect Playground - Main App
// ============================================

(function() {
    'use strict';

    // App State
    const state = {
        currentCategory: null,
        searchQuery: '',
        sidebarOpen: false
    };

    // DOM Elements
    const elements = {
        sidebarList: null,
        effectsGrid: null,
        categoryTitle: null,
        categorySubtitle: null,
        searchInput: null,
        menuToggle: null,
        sidebar: null
    };

    // Capitalize first letter
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Generate preview placeholder HTML
    function generatePreviewPlaceholder(index) {
        const colors = ['#6750A4', '#9381FF', '#B794F6', '#EADDFF'];
        const color = colors[index % colors.length];
        return `
            <div class="preview-placeholder" style="background: linear-gradient(135deg, ${color}33, ${color}11);">
                <span class="preview-placeholder-icon" style="color: ${color};">✨</span>
                <span class="preview-placeholder-text">Preview Coming Soon</span>
            </div>
        `;
    }

    // Generate placeholder effects for a category
    function generatePlaceholderEffects(prefix, count) {
        const effects = [];
        for (let i = 1; i <= count; i++) {
            effects.push({
                id: `${prefix}-${i}`,
                name: `${capitalize(prefix)} Effect ${i}`,
                nameZh: `${capitalize(prefix)}效果 ${i}`,
                preview: generatePreviewPlaceholder(i)
            });
        }
        return effects;
    }

    // Category configs for generating placeholder effects
    const categoryConfigs = {
        'design-style': { prefix: 'design', count: 30 },
        'text-effects': { prefix: 'text', count: 12 },
        'transitions': { prefix: 'transition', count: 10 },
        'page-transitions': { prefix: 'page', count: 8 },
        'backgrounds': { prefix: 'background', count: 10 },
        'background-effects': { prefix: 'bg-effect', count: 10 },
        '3d-effects': { prefix: '3d', count: 10 },
        '3d-transforms': { prefix: '3d-transform', count: 10 },
        'data-viz': { prefix: 'chart', count: 8 },
        'charts-counters': { prefix: 'counter', count: 8 },
        'image-effects': { prefix: 'image', count: 10 },
        'scroll-effects': { prefix: 'scroll', count: 10 },
        'loading-states': { prefix: 'loading', count: 12 },
        'svg-animation': { prefix: 'svg', count: 10 },
        'micro-interactions': { prefix: 'micro', count: 12 },
        'layout-patterns': { prefix: 'layout', count: 8 },
        'filter-effects': { prefix: 'filter', count: 8 },
        'button-animations': { prefix: 'button', count: 12 },
        'card-effects': { prefix: 'card', count: 10 },
        'parallax': { prefix: 'parallax', count: 8 },
        'form-effects': { prefix: 'form', count: 10 },
        'glitch-effects': { prefix: 'glitch', count: 8 },
        'particle-effects': { prefix: 'particle', count: 8 }
    };

    // Placeholder Effects Data - initialized on demand
    const placeholderEffects = {};

    // Get or generate effects for a category
    function getEffects(categoryId) {
        if (placeholderEffects[categoryId]) {
            return placeholderEffects[categoryId];
        }

        // Check for real mouse effects data
        if (categoryId === 'mouse-effects' && typeof MOUSE_EFFECTS !== 'undefined') {
            placeholderEffects[categoryId] = MOUSE_EFFECTS;
            return MOUSE_EFFECTS;
        }

        // Check for real design style effects data
        if (categoryId === 'design-style' && typeof DESIGN_STYLE_EFFECTS !== 'undefined') {
            placeholderEffects[categoryId] = DESIGN_STYLE_EFFECTS;
            return DESIGN_STYLE_EFFECTS;
        }

        // Check for real text effects data
        if (categoryId === 'text-effects' && typeof TEXT_EFFECTS !== 'undefined') {
            placeholderEffects[categoryId] = TEXT_EFFECTS;
            return TEXT_EFFECTS;
        }

        // Check for real transitions effects data
        if (categoryId === 'transitions' && typeof TRANSITIONS !== 'undefined') {
            placeholderEffects[categoryId] = TRANSITIONS;
            return TRANSITIONS;
        }

        // Check for real page transitions effects data
        if (categoryId === 'page-transitions' && typeof PAGE_TRANSITIONS !== 'undefined') {
            placeholderEffects[categoryId] = PAGE_TRANSITIONS;
            return PAGE_TRANSITIONS;
        }

        // Check for real backgrounds effects data
        if (categoryId === 'backgrounds' && typeof BACKGROUNDS !== 'undefined') {
            placeholderEffects[categoryId] = BACKGROUNDS;
            return BACKGROUNDS;
        }

        // Check for real background effects data
        if (categoryId === 'background-effects' && typeof BACKGROUND_EFFECTS !== 'undefined') {
            placeholderEffects[categoryId] = BACKGROUND_EFFECTS;
            return BACKGROUND_EFFECTS;
        }

        // Check for real 3D effects data
        if (categoryId === '3d-effects' && typeof THREE_D_EFFECTS !== 'undefined') {
            placeholderEffects[categoryId] = THREE_D_EFFECTS;
            return THREE_D_EFFECTS;
        }

        // Check for real 3D transforms data
        if (categoryId === '3d-transforms' && typeof THREE_D_TRANSFORMS !== 'undefined') {
            placeholderEffects[categoryId] = THREE_D_TRANSFORMS;
            return THREE_D_TRANSFORMS;
        }

        // Check for real data visualization effects data
        if (categoryId === 'data-viz' && typeof DATA_VIZ !== 'undefined') {
            placeholderEffects[categoryId] = DATA_VIZ;
            return DATA_VIZ;
        }

        // Check for real charts & counters effects data
        if (categoryId === 'charts-counters' && typeof CHARTS_COUNTERS !== 'undefined') {
            placeholderEffects[categoryId] = CHARTS_COUNTERS;
            return CHARTS_COUNTERS;
        }

        // Check for real image effects data
        if (categoryId === 'image-effects' && typeof IMAGE_EFFECTS !== 'undefined') {
            placeholderEffects[categoryId] = IMAGE_EFFECTS;
            return IMAGE_EFFECTS;
        }

        // Check for real scroll effects data
        if (categoryId === 'scroll-effects' && typeof SCROLL_EFFECTS !== 'undefined') {
            placeholderEffects[categoryId] = SCROLL_EFFECTS;
            return SCROLL_EFFECTS;
        }

        // Check for real loading states effects data
        if (categoryId === 'loading-states' && typeof LOADING_STATES !== 'undefined') {
            placeholderEffects[categoryId] = LOADING_STATES;
            return LOADING_STATES;
        }

        // Check for real SVG animation effects data
        if (categoryId === 'svg-animation' && typeof SVG_ANIMATION !== 'undefined') {
            placeholderEffects[categoryId] = SVG_ANIMATION;
            return SVG_ANIMATION;
        }

        // Check for real micro interactions effects data
        if (categoryId === 'micro-interactions' && typeof MICRO_INTERACTIONS !== 'undefined') {
            placeholderEffects[categoryId] = MICRO_INTERACTIONS;
            return MICRO_INTERACTIONS;
        }

        // Check for real layout patterns effects data
        if (categoryId === 'layout-patterns' && typeof LAYOUT_PATTERNS !== 'undefined') {
            placeholderEffects[categoryId] = LAYOUT_PATTERNS;
            return LAYOUT_PATTERNS;
        }

        // Check for real filter effects data
        if (categoryId === 'filter-effects' && typeof FILTER_EFFECTS !== 'undefined') {
            placeholderEffects[categoryId] = FILTER_EFFECTS;
            return FILTER_EFFECTS;
        }

        // Check for real button animations effects data
        if (categoryId === 'button-animations' && typeof BUTTON_ANIMATIONS !== 'undefined') {
            placeholderEffects[categoryId] = BUTTON_ANIMATIONS;
            return BUTTON_ANIMATIONS;
        }

        // Check for real card effects data
        if (categoryId === 'card-effects' && typeof CARD_EFFECTS !== 'undefined') {
            placeholderEffects[categoryId] = CARD_EFFECTS;
            return CARD_EFFECTS;
        }

        // Check for real parallax effects data
        if (categoryId === 'parallax' && typeof PARALLAX_EFFECTS !== 'undefined') {
            placeholderEffects[categoryId] = PARALLAX_EFFECTS;
            return PARALLAX_EFFECTS;
        }

        // Check for real form effects data
        if (categoryId === 'form-effects' && typeof FORM_EFFECTS !== 'undefined') {
            placeholderEffects[categoryId] = FORM_EFFECTS;
            return FORM_EFFECTS;
        }

        // Check for real glitch effects data
        if (categoryId === 'glitch-effects' && typeof GLITCH_EFFECTS !== 'undefined') {
            placeholderEffects[categoryId] = GLITCH_EFFECTS;
            return GLITCH_EFFECTS;
        }

        // Check for real particle effects data
        if (categoryId === 'particle-effects' && typeof PARTICLE_EFFECTS !== 'undefined') {
            placeholderEffects[categoryId] = PARTICLE_EFFECTS;
            return PARTICLE_EFFECTS;
        }

        if (categoryId === 'all-effects') {
            // Display ALL effects from all categories
            const allEffects = [];

            // Add ALL real effects from each category (not just a few)
            const effectCategories = [
                'MOUSE_EFFECTS', 'DESIGN_STYLE_EFFECTS', 'TEXT_EFFECTS', 'TRANSITIONS',
                'PAGE_TRANSITIONS', 'BACKGROUNDS', 'BACKGROUND_EFFECTS', 'THREE_D_EFFECTS',
                'THREE_D_TRANSFORMS', 'DATA_VIZ', 'CHARTS_COUNTERS', 'IMAGE_EFFECTS',
                'SCROLL_EFFECTS', 'LOADING_STATES', 'SVG_ANIMATION', 'MICRO_INTERACTIONS',
                'LAYOUT_PATTERNS', 'FILTER_EFFECTS', 'BUTTON_ANIMATIONS', 'CARD_EFFECTS',
                'PARALLAX_EFFECTS', 'FORM_EFFECTS', 'GLITCH_EFFECTS', 'PARTICLE_EFFECTS'
            ];

            effectCategories.forEach(categoryName => {
                if (typeof window[categoryName] !== 'undefined') {
                    allEffects.push(...window[categoryName]);
                }
            });

            placeholderEffects[categoryId] = allEffects;
            return placeholderEffects[categoryId];
        }

        const config = categoryConfigs[categoryId];
        if (config) {
            placeholderEffects[categoryId] = generatePlaceholderEffects(config.prefix, config.count);
            return placeholderEffects[categoryId];
        }

        return [];
    }

    // Initialize the app
    function init() {
        // Cache DOM elements
        elements.sidebarList = document.getElementById('sidebarList');
        elements.effectsGrid = document.getElementById('effectsGrid');
        elements.categoryTitle = document.getElementById('categoryTitle');
        elements.categorySubtitle = document.getElementById('categorySubtitle');
        elements.searchInput = document.getElementById('searchInput');
        elements.menuToggle = document.getElementById('menuToggle');
        elements.sidebar = document.getElementById('sidebar');

        // Check if categories loaded
        if (typeof CATEGORIES === 'undefined') {
            console.error('Categories data not loaded');
            showError('Failed to load categories data');
            return;
        }

        // Render sidebar
        renderSidebar();

        // Setup event listeners
        setupEventListeners();

        // Initialize mesh background
        if (typeof MeshBackground !== 'undefined') {
            MeshBackground.init('meshCanvas');
        }

        // Load default category
        loadCategory(CATEGORIES[0].id);
    }

    // Render sidebar categories
    function renderSidebar() {
        if (!elements.sidebarList) return;

        elements.sidebarList.innerHTML = CATEGORIES.map(category => `
            <div class="category-item" data-category-id="${category.id}">
                <div class="category-icon">${category.icon}</div>
                <div class="category-info">
                    <span class="category-name">${category.name}</span>
                    <span class="category-name-zh">${category.nameZh}</span>
                </div>
                <span class="category-count">${category.count}</span>
            </div>
        `).join('');

        // Add click handlers
        elements.sidebarList.querySelectorAll('.category-item').forEach(item => {
            item.addEventListener('click', () => {
                const categoryId = item.dataset.categoryId;
                loadCategory(categoryId);
                closeSidebarOnMobile();
            });
        });
    }

    // Load a category
    function loadCategory(categoryId) {
        const category = CATEGORIES.find(c => c.id === categoryId);
        if (!category) return;

        state.currentCategory = categoryId;

        // Update active state in sidebar
        elements.sidebarList.querySelectorAll('.category-item').forEach(item => {
            item.classList.toggle('active', item.dataset.categoryId === categoryId);
        });

        // Update header
        elements.categoryTitle.textContent = category.name;
        elements.categorySubtitle.textContent = `${category.nameZh} · ${category.count} effects`;

        // Render effects
        renderEffects(categoryId);
    }

    // Render effects grid
    function renderEffects(categoryId) {
        const effects = getEffects(categoryId);
        const filteredEffects = filterEffects(effects, state.searchQuery);

        if (filteredEffects.length === 0) {
            elements.effectsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-2);">
                    <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
                    <h3 style="font-size: 18px; margin-bottom: 8px;">No effects found</h3>
                    <p style="font-size: 14px;">Try a different search term</p>
                </div>
            `;
            return;
        }

        elements.effectsGrid.innerHTML = filteredEffects.map((effect, index) => `
            <div class="effect-card fade-in" data-effect-id="${effect.id}" style="animation-delay: ${index * 50}ms">
                <div class="effect-preview" id="preview-${effect.id}">
                    ${effect.preview || generatePreviewPlaceholder(index)}
                </div>
                <div class="effect-content">
                    <span class="effect-name">${effect.name}</span>
                    <span class="effect-name-zh">${effect.nameZh}</span>
                    ${effect.description ? `<p class="effect-description">${effect.description}</p>` : ''}
                    <div class="effect-actions">
                        <button class="action-btn" data-action="prompt" data-effect-id="${effect.id}">
                            <span>▾</span> Prompt <span class="arrow">▼</span>
                        </button>
                        <button class="action-btn" data-action="code" data-effect-id="${effect.id}">
                            <span>▾</span> Code <span class="arrow">▼</span>
                        </button>
                    </div>
                </div>
                <div class="effect-panel" id="panel-${effect.id}">
                    <div class="panel-content">
                        <span class="panel-label">AI Prompt</span>
                        <p class="panel-text">${effect.prompt || 'Create an interactive ' + effect.name.toLowerCase() + ' effect for web applications. Focus on smooth animations and visual appeal.'}</p>
                        <button class="copy-btn" data-copy="prompt">📋 Copy Prompt</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Initialize live previews
        initLivePreviews(filteredEffects);

        // Setup action button handlers
        setupActionButtons(filteredEffects);
    }

    // Initialize live previews for effects
    function initLivePreviews(effects) {
        if (typeof PREVIEW_INITERS === 'undefined') return;

        effects.forEach(effect => {
            if (effect.previewId && PREVIEW_INITERS[effect.previewId]) {
                const previewEl = document.getElementById(`preview-${effect.id}`);
                if (previewEl) {
                    // Clear placeholder content
                    previewEl.innerHTML = '';
                    // Initialize the live preview
                    try {
                        PREVIEW_INITERS[effect.previewId](previewEl);
                    } catch (error) {
                        console.error('Failed to initialize preview:', effect.id, error);
                        previewEl.innerHTML = `<span style="color: #ef4444; font-size: 12px;">Preview error</span>`;
                    }
                }
            }
        });
    }

    // Filter effects by search query
    function filterEffects(effects, query) {
        if (!query.trim()) return effects;
        const q = query.toLowerCase();
        return effects.filter(effect =>
            effect.name.toLowerCase().includes(q) ||
            effect.nameZh.toLowerCase().includes(q)
        );
    }

    // Setup action button handlers
    function setupActionButtons(effects) {
        // Create a map of effects for quick lookup
        const effectsMap = {};
        effects.forEach(e => effectsMap[e.id] = e);

        elements.effectsGrid.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                const effectId = btn.dataset.effectId;
                const panel = document.getElementById(`panel-${effectId}`);
                const effect = effectsMap[effectId];
                const isExpanded = btn.classList.contains('expanded');

                // Close all panels first
                elements.effectsGrid.querySelectorAll('.effect-panel').forEach(p => p.classList.remove('open'));
                elements.effectsGrid.querySelectorAll('.action-btn').forEach(b => b.classList.remove('expanded'));

                // Toggle current panel
                if (!isExpanded) {
                    btn.classList.add('expanded');
                    panel.classList.add('open');

                    // Update panel content based on action
                    const content = panel.querySelector('.panel-content');
                    if (action === 'prompt') {
                        const promptText = effect?.prompt || `Create an interactive ${effectId.replace(/-/g, ' ')} effect for web applications. Focus on smooth animations, visual appeal, and user experience.`;
                        content.innerHTML = `
                            <span class="panel-label">AI Prompt</span>
                            <p class="panel-text">${promptText}</p>
                            <button class="copy-btn" data-copy="prompt">📋 Copy Prompt</button>
                        `;
                    } else if (action === 'code') {
                        const codeText = effect?.code || `// ${effectId} effect code\nfunction init${effectId.replace(/-/g, '').toUpperCase()}(element) {\n    // Initialize effect here\n    console.log('${effectId} initialized');\n}`;
                        content.innerHTML = `
                            <span class="panel-label">Code</span>
                            <pre class="panel-text" style="background: var(--code-bg); color: #f4f4f5; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 12px; white-space: pre-wrap;">${escapeHtml(codeText)}</pre>
                            <button class="copy-btn" data-copy="code">📋 Copy Code</button>
                        `;
                    }

                    // Setup copy button
                    const copyBtn = content.querySelector('.copy-btn');
                    copyBtn.addEventListener('click', () => {
                        const textToCopy = action === 'prompt'
                            ? content.querySelector('.panel-text').textContent
                            : effect?.code || content.querySelector('pre').textContent;
                        copyToClipboard(textToCopy, copyBtn);
                    });
                }
            });
        });
    }

    // Escape HTML for safe rendering
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Copy to clipboard
    function copyToClipboard(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            button.textContent = '✓ Copied!';
            button.classList.add('copied');
            setTimeout(() => {
                button.textContent = '📋 Copy ' + (button.dataset.copy === 'prompt' ? 'Prompt' : 'Code');
                button.classList.remove('copied');
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        // Search input with debouncing
        let searchTimeout;
        elements.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                state.searchQuery = e.target.value;
                if (state.currentCategory) {
                    renderEffects(state.currentCategory);
                }
            }, 300);
        });

        // Mobile menu toggle
        elements.menuToggle.addEventListener('click', toggleSidebar);

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!elements.sidebar.contains(e.target) && !elements.menuToggle.contains(e.target)) {
                    closeSidebarOnMobile();
                }
            }
        });
    }

    // Toggle sidebar on mobile
    function toggleSidebar() {
        state.sidebarOpen = !state.sidebarOpen;
        elements.sidebar.classList.toggle('open', state.sidebarOpen);
    }

    // Close sidebar on mobile
    function closeSidebarOnMobile() {
        if (window.innerWidth <= 768) {
            state.sidebarOpen = false;
            elements.sidebar.classList.remove('open');
        }
    }

    // Show error message
    function showError(message) {
        if (elements.effectsGrid) {
            elements.effectsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #ef4444;">
                    <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
                    <h3 style="font-size: 18px; margin-bottom: 8px;">Error</h3>
                    <p style="font-size: 14px;">${message}</p>
                </div>
            `;
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
