const mongoose = require('mongoose');
function checkId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  } else {
    return true;
  }
}
module.exports = checkId;
