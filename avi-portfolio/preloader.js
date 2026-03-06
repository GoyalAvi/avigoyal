/* ═══════════════════════════════════════════════════
   Avi Goyal Portfolio — Preloader
   Runs immediately on page load, before main JS.
   Dismisses on window.load or after 2.2s max.
═══════════════════════════════════════════════════ */

(function(){
  var lines = [
    {t:'> python3 avi_goyal.py --init',                                    d:0},
    {t:'Loading modules... <span class="ok">✓ pytorch 2.1</span>',         d:200},
    {t:'Loading modules... <span class="ok">✓ numpy 1.26</span>',          d:380},
    {t:'Connecting to JMU Würzburg... <span class="ok">✓ online</span>',   d:540},
    {t:'Fetching ArXiv papers... <span class="val">2 found</span>',        d:700},
    {t:'Validating architectures... <span class="val">1,900 models</span>',d:860},
    {t:'Medical imaging pipelines... <span class="ok">✓ 90.4% acc</span>', d:1020},
    {t:'Building interface... <span class="ok">✓ done</span>',             d:1160},
    {t:'<span class="ok">✓ avi_goyal.py ready — welcome!</span>',          d:1300}
  ];
  var el = document.getElementById('pre-lines');
  var bar = document.getElementById('pre-bar');
  var pct = document.getElementById('pre-pct');
  var total = lines.length;
  lines.forEach(function(l, i){
    setTimeout(function(){
      var div = document.createElement('div');
      div.className = 'pre-line';
      div.innerHTML = l.t;
      el.appendChild(div);
      requestAnimationFrame(function(){ requestAnimationFrame(function(){ div.classList.add('show'); }); });
      var p = Math.round((i+1)/total*100);
      bar.style.width = p+'%';
      pct.textContent = p+'%';
    }, l.d);
  });
  function dismiss(){
    var pre = document.getElementById('preloader');
    if(pre){ pre.classList.add('hide'); setTimeout(function(){ pre.style.display='none'; }, 520); }
  }
  // Dismiss either when page is loaded OR after max 2.2s — whichever comes first
  window.addEventListener('load', function(){ setTimeout(dismiss, 400); });
  setTimeout(dismiss, 2200);
})();