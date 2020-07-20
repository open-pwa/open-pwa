export function install(hostWindow) {
  let lastFileId = 0;
  self.carlo.fileInfo = async(file) => {
    const fileId = ++lastFileId;
    self.carlo.fileInfo.files_.set(fileId, file);
    const result = await hostWindow.fileInfo(`self.carlo.fileInfo.files_.get(${fileId})`);
    self.carlo.fileInfo.files_.delete(fileId);
    return result;
  };

  self.carlo.fileInfo.files_ = new Map();
};
