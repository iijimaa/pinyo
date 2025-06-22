document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('heroCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 400;
    canvas.height = 300;
    
    let animationFrame;
    let time = 0;
    
    function drawSummerScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(0.7, '#FFE4B5');
        gradient.addColorStop(1, '#F4A460');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(320, 60, 30, 0, Math.PI * 2);
        ctx.fill();
        
        for(let i = 0; i < 8; i++) {
            ctx.beginPath();
            ctx.moveTo(320, 60);
            const angle = (i * Math.PI / 4) + time * 0.01;
            const x = 320 + Math.cos(angle) * 40;
            const y = 60 + Math.sin(angle) * 40;
            ctx.lineTo(x, y);
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        
        for(let i = 0; i < 5; i++) {
            const x = 50 + i * 80 + Math.sin(time * 0.02 + i) * 10;
            const y = 40 + Math.sin(time * 0.03 + i * 2) * 5;
            
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.ellipse(x, y, 25, 15, 0, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#F0F0F0';
            ctx.beginPath();
            ctx.ellipse(x + 10, y, 15, 8, 0, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.fillStyle = '#0066CC';
        ctx.beginPath();
        for(let x = 0; x <= canvas.width; x += 2) {
            const y = 200 + Math.sin((x + time) * 0.02) * 8;
            if(x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = '#FFFF00';
        ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
        
        for(let i = 0; i < 10; i++) {
            const x = i * 40 + 20;
            const y = canvas.height - 30;
            
            ctx.fillStyle = '#FF69B4';
            ctx.fillRect(x - 8, y - 8, 16, 16);
            
            ctx.fillStyle = '#FF1493';
            ctx.fillRect(x - 6, y - 6, 12, 12);
            
            ctx.fillStyle = '#DC143C';
            ctx.fillRect(x - 4, y - 4, 8, 8);
        }
        
        for(let i = 0; i < 15; i++) {
            const x = Math.random() * canvas.width;
            const y = 150 + Math.random() * 50;
            const size = 2 + Math.random() * 3;
            
            ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.random() * 0.4})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        time += 1;
        animationFrame = requestAnimationFrame(drawSummerScene);
    }
    
    drawSummerScene();
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.overview-item, .prize-card, .judge-card, .form-group');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    const shareButtons = document.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('真夏の水着祭2025 撮影会＆写真コンテスト開催！ #真夏の水着祭2025');
            
            let shareUrl = '';
            
            if (this.classList.contains('twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            } else if (this.classList.contains('instagram')) {
                navigator.clipboard.writeText(`真夏の水着祭2025 撮影会＆写真コンテスト開催！ #真夏の水着祭2025 ${window.location.href}`);
                alert('テキストをクリップボードにコピーしました！Instagramアプリでペーストしてください。');
                return;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.style.transform = `translateY(${rate}px)`;
            }
        }, 10);
    });
    
    const formButtons = document.querySelectorAll('.form-button');
    formButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            console.log('フォームボタンがクリックされました:', this.textContent);
        });
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('beforeunload', function() {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
    });
});