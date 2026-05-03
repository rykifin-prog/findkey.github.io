// ─────────────────────────────────────────────────────────────
// Game Telemetry Shim
// Reports play count and time-on-game to parent window via postMessage.
// Parent page aggregates and (optionally) forwards to a backend.
// ─────────────────────────────────────────────────────────────
(function(){
  var GAME_ID = window.__GAME_ID__ || 'unknown';
  var startTime = Date.now();
  var lastBeacon = startTime;
  var totalActiveMs = 0;
  var isVisible = !document.hidden;
  var visibilityStart = isVisible ? Date.now() : null;

  function send(eventType, extra) {
    try {
      var payload = Object.assign({
        type: 'game-telemetry',
        gameId: GAME_ID,
        event: eventType,
        timestamp: Date.now(),
        sessionMs: totalActiveMs
      }, extra || {});
      // Tell parent (the post page) about it
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(payload, '*');
      }
    } catch(e) { /* no-op */ }
  }

  // Track visibility so we don't count idle background tabs
  document.addEventListener('visibilitychange', function(){
    var now = Date.now();
    if (document.hidden) {
      if (visibilityStart) {
        totalActiveMs += now - visibilityStart;
        visibilityStart = null;
      }
    } else {
      visibilityStart = now;
    }
  });

  // Heartbeat every 5s while the game is active
  setInterval(function(){
    var now = Date.now();
    if (visibilityStart) {
      totalActiveMs += now - visibilityStart;
      visibilityStart = now;
    }
    if (totalActiveMs - (lastBeacon - startTime) > 4000) {
      send('heartbeat');
      lastBeacon = now;
    }
  }, 5000);

  // Fire start event
  send('start');

  // Fire end event on unload
  window.addEventListener('pagehide', function(){
    var now = Date.now();
    if (visibilityStart) {
      totalActiveMs += now - visibilityStart;
    }
    send('end', { finalMs: totalActiveMs });
  });
})();
