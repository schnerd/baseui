// @flow
<<<<<<< Updated upstream
import {document} from 'global';
=======
import document from 'global/document';
>>>>>>> Stashed changes

export default typeof document !== 'undefined' &&
  Boolean(document.createElement);
