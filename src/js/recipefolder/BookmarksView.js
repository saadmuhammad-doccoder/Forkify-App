import Preview from './previewView';
import View from './View';

class BookMarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No Bookmarks yet. Find a nice recipe and bookmark it';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkUp() {
    return this._data.map(bookmark => Preview.render(bookmark, false)).join('');
  }
}

export default new BookMarksView();
