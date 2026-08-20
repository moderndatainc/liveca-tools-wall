// Assembles index.html from every card in cards/.
// No dependencies — plain Node, so there is nothing to install.

const fs = require('fs');
const path = require('path');

const OUT = '_site';

const cards = fs
  .readdirSync('cards')
  .filter((f) => f.endsWith('.html') && !f.startsWith('_'))
  .sort();

const fragments = cards.map((f) => {
  const body = fs.readFileSync(path.join('cards', f), 'utf8').trim();
  return `  <!-- cards/${f} -->\n  ${body.split('\n').join('\n  ')}`;
});

const wall = fragments.length
  ? fragments.join('\n\n')
  : '  <p class="empty">No cards yet. Add the first one.</p>';

const page = fs
  .readFileSync('index.template.html', 'utf8')
  .replace('<!-- CARDS -->', wall)
  .replace('<!-- COUNT -->', String(cards.length));

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'index.html'), page);
fs.copyFileSync('style.css', path.join(OUT, 'style.css'));

console.log(`built ${OUT}/index.html with ${cards.length} card(s): ${cards.join(', ')}`);
