document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('menuToggle')?.addEventListener('click',()=>document.getElementById('nav').classList.toggle('open'));
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('nav').classList.remove('open')));
if ('IntersectionObserver' in window) { const io = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12}); document.querySelectorAll('.reveal').forEach(el=>io.observe(el)); } else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
