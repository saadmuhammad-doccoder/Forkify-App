import View from './View';
import Preview from './previewView';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');

  _generateMarkUp() {
    return this._data.map(results => Preview.render(results, false)).join('');
  }
}

export default new ResultsView();
