export function goToMovie(id: string) {
  const path = `/movie/${id}`;
  window.history.pushState({ view: 'movie', id }, '', path);
  window.dispatchEvent(new CustomEvent('app:navigate', { detail: { view: 'movie', id } }));
}

export function goHome() {
  window.history.pushState({ view: 'dashboard' }, '/', '/');
  window.dispatchEvent(new CustomEvent('app:navigate', { detail: { view: 'dashboard' } }));
}

export function goToWatchlist() {
  const path = '/watchlist';
  window.history.pushState({ view: 'watchlist' }, path, path);
  window.dispatchEvent(new CustomEvent('app:navigate', { detail: { view: 'watchlist' } }));
}
