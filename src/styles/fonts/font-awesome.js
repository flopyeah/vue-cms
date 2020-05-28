
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUser,
  faFile,
  faFileInvoice,
  faImages,
  faCog,
  faTrashAlt,
  faUnlockAlt,
  faKey,
  faUsers,
  faUserCircle,
  faSave,
  faPlus,
  faPlusCircle,
  faBars,
  faFolderOpen,
  faColumns,
  faSignOutAlt,
  faTrash,
  faFolderPlus,
  faImage,
  faFolder,
  faUpload,
  faFileAlt,
  faParagraph,
  faQuoteRight,
  faThLarge,
  faSort,
  faTag,
  faTags, faHashtag, faPager, faWindowClose, faTimes, faTimesCircle, faPen
} from '@fortawesome/free-solid-svg-icons'

import {fab, faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Vue from 'vue'

library.add(faUser, faFile, faFileInvoice, faImages, faCog, faTrashAlt, faTrash, faUnlockAlt, faKey, faUsers,
  faUserCircle, faSave, faPlus, faPlusCircle, faBars, faFolderOpen, faColumns,
  faSignOutAlt, faFolderPlus, faImage, faFolder, faFolderOpen, faUpload, faFile, faFileAlt, faParagraph,
  faQuoteRight, fab, faInstagram, faYoutube, faThLarge, faSort, faTag, faTags, faHashtag, faPager, faWindowClose, faTimes, faTimesCircle, faPen)

Vue.component('fa-icon', FontAwesomeIcon)
