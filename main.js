const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
const mobileNavLinks = document.querySelectorAll('.mobile-nav-item-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 550) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// реализация листьев
document.addEventListener('DOMContentLoaded', function() {
    const products = document.querySelector('.tea-canvas-all');
    const canvas = document.getElementById('teaLeavesCanvas');
    const ctx = canvas.getContext('2d');
    
    const leafImg = new Image();
    leafImg.src = 'img/tea-particle.webp';
    
    function resizeCanvas() {
        const rect = products.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const leaves = [];
    let leafCount;
    const isMobile = window.innerWidth < 550;
    
    if (isMobile) {
        leafCount = 85; // Меньше листьев на мобильных
    } else {
        leafCount = 150; // Больше листьев на десктопах
    }
    
    function initLeaves() {
        for (let i = 0; i < leafCount; i++) {
            leaves.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: 15 + Math.random() * 40,
                rotation: Math.random() * 360,
                speed: 0.25 + Math.random() * 0.45,
                rotationSpeed: (Math.random() - 0.5) * 0.5,
                opacity: 0.3 + Math.random() * 0.2
            });
        }
    }
    
    function drawStaticLeaves() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        leaves.forEach(leaf => {
            ctx.save();
            ctx.translate(leaf.x, leaf.y);
            ctx.rotate(leaf.rotation * Math.PI / 180);
            ctx.globalAlpha = leaf.opacity;
            
            if (leafImg.complete) {
                ctx.drawImage(
                    leafImg, 
                    -leaf.size/2, -leaf.size/2, 
                    leaf.size, leaf.size
                );
            }
            
            ctx.restore();
        });
    }
    
    function animateLeaves() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        leaves.forEach(leaf => {
            ctx.save();
            ctx.translate(leaf.x, leaf.y);
            ctx.rotate(leaf.rotation * Math.PI / 180);
            ctx.globalAlpha = leaf.opacity;
            
            if (leafImg.complete) {
                ctx.drawImage(
                    leafImg, 
                    -leaf.size/2, -leaf.size/2, 
                    leaf.size, leaf.size
                );
            }
            
            ctx.restore();
            
            leaf.y += leaf.speed;
            leaf.rotation += leaf.rotationSpeed;
            
            if (leaf.y > canvas.height + 50) {
                leaf.y = -50;
                leaf.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(animateLeaves);
    }
    
    leafImg.onload = function() {
        initLeaves();
        
        if (isMobile) {
            // Статичные листья для мобильных
            drawStaticLeaves();
            // Перерисовываем при изменении размера
            window.addEventListener('resize', drawStaticLeaves);
        } else {
            // Анимация для десктопов
            animateLeaves();
        }
    };
});

document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tea-tab');
    const teaInfos = document.querySelectorAll('.tea-info');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            teaInfos.forEach(info => info.classList.remove('active'));
            
            const teaId = this.getAttribute('data-tea');
            document.getElementById(`${teaId}-info`).classList.add('active');
        
        });
    });
});

// Обработка кликов по карточкам чая
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
        const teaId = this.getAttribute('data-tea');
        
        // Находим соответствующую вкладку и активируем ее
        const tab = document.querySelector(`.tea-tab[data-tea="${teaId}"]`);
        if (tab) {
            // Активируем вкладку
            document.querySelectorAll('.tea-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Активируем соответствующий контент
            document.querySelectorAll('.tea-info').forEach(info => info.classList.remove('active'));
            document.getElementById(`${teaId}-info`).classList.add('active');
            
            // Плавно прокручиваем к блоку tea-info
            document.getElementById('tea-info').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
});