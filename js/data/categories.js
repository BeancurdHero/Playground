// ============================================
// Frontend Effect Playground - Categories Data
// ============================================

const CATEGORIES = [
    { id: 'mouse-effects', name: 'Mouse Effects', nameZh: '鼠标效果', icon: '🖱️', count: 12 },
    { id: 'design-style', name: 'Design Style', nameZh: '设计风格', icon: '🎨', count: 34 },
    { id: 'text-effects', name: 'Text Effects', nameZh: '文字效果', icon: '✍️', count: 12 },
    { id: 'transitions', name: 'Transitions', nameZh: '过渡动画', icon: '🔄', count: 10 },
    { id: 'page-transitions', name: 'Page Transitions', nameZh: '页面转场', icon: '📄', count: 8 },
    { id: 'backgrounds', name: 'Backgrounds', nameZh: '背景', icon: '🌄', count: 10 },
    { id: 'background-effects', name: 'Background Effects', nameZh: '背景特效', icon: '✨', count: 10 },
    { id: '3d-effects', name: '3D Effects', nameZh: '3D效果', icon: '🧊', count: 10 },
    { id: '3d-transforms', name: '3D Transforms', nameZh: '3D变换', icon: '🔷', count: 10 },
    { id: 'data-viz', name: 'Data Visualization', nameZh: '数据可视化', icon: '📊', count: 8 },
    { id: 'charts-counters', name: 'Charts & Counters', nameZh: '图表计数', icon: '📈', count: 8 },
    { id: 'image-effects', name: 'Image Effects', nameZh: '图像效果', icon: '🖼️', count: 10 },
    { id: 'scroll-effects', name: 'Scrolling Effects', nameZh: '滚动效果', icon: '📜', count: 10 },
    { id: 'loading-states', name: 'Loading States', nameZh: '加载状态', icon: '⏳', count: 12 },
    { id: 'svg-animation', name: 'SVG Animation', nameZh: 'SVG动画', icon: '🔶', count: 10 },
    { id: 'micro-interactions', name: 'Micro Interactions', nameZh: '微交互', icon: '👆', count: 12 },
    { id: 'layout-patterns', name: 'Layout Patterns', nameZh: '布局模式', icon: '📐', count: 8 },
    { id: 'filter-effects', name: 'Filter Effects', nameZh: '滤镜效果', icon: '🔮', count: 8 },
    { id: 'button-animations', name: 'Button Animations', nameZh: '按钮动画', icon: '🔘', count: 12 },
    { id: 'card-effects', name: 'Card Effects', nameZh: '卡片效果', icon: '🃏', count: 10 },
    { id: 'parallax', name: 'Parallax', nameZh: '视差效果', icon: '👁️', count: 8 },
    { id: 'form-effects', name: 'Form Effects', nameZh: '表单效果', icon: '📝', count: 10 },
    { id: 'glitch-effects', name: 'Glitch Effects', nameZh: '故障效果', icon: '📺', count: 8 },
    { id: 'particle-effects', name: 'Particle Effects', nameZh: '粒子效果', icon: '💫', count: 8 },
    { id: 'all-effects', name: 'All Effects', nameZh: '全部效果', icon: '🌟', count: 240 }
];

// Make available globally
if (typeof window !== 'undefined') {
    window.CATEGORIES = CATEGORIES;
}
