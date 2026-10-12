/*
  إدارة المحتوى بدون Backend:
  1) ضع فيديو الدرس داخل مجلد videos المناسب.
  2) غيّر title وdescription وvideo في بيانات الدرس أدناه.
  مثال: videos/unit-1/lesson-1.mp4
  يمكن وضع أكثر من فيديو للدرس بإضافة عناصر إلى videos: [{title:'الجزء الأول', src:'videos/unit-1/lesson-1-part-1.mp4'}]
*/
const unitNames=['الوحدة الأولى','الوحدة الثانية','الوحدة الثالثة','الوحدة الرابعة','الوحدة الخامسة','الوحدة السادسة'];
const unitCounts=[5,4,5,3,4,2];
const unitSubtitles=['مدخل إلى التاريخ والحضارة','الأحداث والشخصيات','تحولات تاريخية','المجتمع والحضارة','محطات من التاريخ','مراجعة وتطبيق'];
const courseContent={};
unitCounts.forEach((count,u)=>{courseContent[u+1]=[];for(let l=1;l<=count;l++){courseContent[u+1].push({title:`الدرس ${l}`,description:'أضف وصف الدرس في ملف lessons.js، ثم ضع ملف الفيديو في مجلد videos.',videos:[]})}});
// أمثلة لتوصيل ملفات الفيديو: فك التعليق عن السطر المناسب وعدّل اسم الملف حسب فيديوهاتك.
courseContent[1][0] = {
  title: 'الدرس الأول - الوحدة الأولى',
  description: 'شرح كيف بدأت الحضاره المصريه القديمه ومتي بدأت',
  videos: [
    {
      title: 'شرح الدرس الأول',
      src: 'videos/unit-1/lesson-1.mp4'
    }
  ]
};
courseContent[2][1] = {
  title: 'الدرس الأول - الوحدة الأولى',
  description: 'شرح الدرس الأول من الوحدة الأولى.',
  videos: [
    {
      title: 'شرح الدرس الأول',
      src: 'videos/unit-1/lesson-1.mp4'
    }
  ]
};


let selectedUnit=1, selectedLesson=null;
const unitNav=document.getElementById('unitNav'), lessonCards=document.getElementById('lessonCards'), search=document.getElementById('lessonSearch');
function renderUnitNav(){unitNav.innerHTML='';unitNames.forEach((name,i)=>{const b=document.createElement('button');b.className='unit-nav-item'+(selectedUnit===i+1?' active':'');b.innerHTML=`<span class="nav-unit-number">${String(i+1).padStart(2,'0')}</span><span class="nav-unit-copy"><b>${name}</b><small>${unitCounts[i]} دروس</small></span><span class="nav-chevron">‹</span>`;b.addEventListener('click',()=>{selectedUnit=i+1;selectedLesson=null;renderUnitNav();renderLessons();document.getElementById('selectedUnitLabel').textContent=name;document.getElementById('selectedUnitTitle').textContent=unitSubtitles[i];document.getElementById('playerTitle').textContent='اختار درس من القائمة';document.getElementById('playerDescription').textContent='بعد اختيار الدرس سيظهر فيديو الشرح هنا.';document.getElementById('videoStage').innerHTML='<div class="video-empty"><span class="big-play">▶</span><b>فيديو الشرح هيظهر هنا</b><small>اختار درس من البطاقات بالأعلى</small></div>';document.getElementById('videoStatus').textContent='اختار درس للبدء'});unitNav.appendChild(b)})}
function renderLessons(){const q=search.value.trim().toLowerCase();lessonCards.innerHTML='';const lessons=courseContent[selectedUnit]||[];let found=0;lessons.forEach((d,i)=>{if(q&&!(`${d.title} ${d.description}`.toLowerCase().includes(q)))return;found++;const b=document.createElement('button');b.className='lesson-card'+(selectedLesson===i?' selected':'');const hasVideo=(d.videos||[]).length>0;b.innerHTML=`<span class="lesson-card-number">${String(i+1).padStart(2,'0')}</span><span class="lesson-card-main"><b></b><small>${hasVideo?'فيديو متاح':'جاهز لإضافة الفيديو'}</small></span><span class="lesson-card-play">▶</span>`;b.querySelector('.lesson-card-main b').textContent=d.title;b.addEventListener('click',()=>selectLesson(i));lessonCards.appendChild(b)});if(!found)lessonCards.innerHTML='<div class="no-results">مفيش درس مطابق لبحثك. جرّب كلمة تانية.</div>';}
function selectLesson(i){selectedLesson=i;const d=courseContent[selectedUnit][i];document.getElementById('playerTitle').textContent=d.title;document.getElementById('playerDescription').textContent=d.description||'فيديو شرح الدرس';document.getElementById('playerUnit').textContent=`${unitNames[selectedUnit-1]} · الدرس ${i+1}`;const stage=document.getElementById('videoStage');stage.innerHTML='';const videos=d.videos||[];if(!videos.length){stage.innerHTML='<div class="video-empty"><span class="big-play">▶</span><b>الفيديو لسه مش مضاف</b><small>ضع ملف الفيديو في مجلد videos واربطه بهذا الدرس في lessons.js</small></div>';document.getElementById('videoStatus').textContent='بانتظار إضافة الفيديو'}else{videos.forEach((item,j)=>{const wrap=document.createElement('div');wrap.className='video-part';if(videos.length>1){const h=document.createElement('h3');h.textContent=item.title||`الجزء ${j+1}`;wrap.appendChild(h)}const v=document.createElement('video');v.controls=true;v.preload='metadata';v.playsInline=true;v.src=item.src;v.addEventListener('error',()=>{document.getElementById('videoStatus').textContent=`لم يتم العثور على الملف: ${item.src}`});wrap.appendChild(v);stage.appendChild(wrap)});document.getElementById('videoStatus').textContent=`${videos.length} فيديو${videos.length>1?'هات':''}`;}renderLessons();document.getElementById('playerSection').scrollIntoView({behavior:'smooth',block:'start'});}
search.addEventListener('input',renderLessons);document.getElementById('year').textContent=new Date().getFullYear();document.getElementById('menuToggle')?.addEventListener('click',()=>document.getElementById('nav').classList.toggle('open'));document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('nav').classList.remove('open')));document.getElementById('backTop').addEventListener('click',e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})});renderUnitNav();renderLessons();document.getElementById('selectedUnitTitle').textContent=unitSubtitles[0];
