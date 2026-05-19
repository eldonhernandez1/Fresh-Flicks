// SECURITY: Only the literal strings 'light' or 'dark' are ever written to the DOM.
// Do NOT change this to pass the raw localStorage value — localStorage is
// attacker-controlled for any same-origin script.
try {
  var t = localStorage.getItem('theme');
  document.documentElement.setAttribute('data-theme', t === 'light' ? 'light' : 'dark');
} catch (e) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
