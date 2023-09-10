async function fileReader(props) {
  const { fileType, success, file } = props;
  const { worker } = await import("./workers/fileReaderWorker.js");
  const code = worker.toString();
  const blob = new Blob([`(${code})()`]);
  let wor = new Worker(URL.createObjectURL(blob));
  wor.onmessage = (e) => {
    success(e.data);
    wor.terminate();
  };

  wor.postMessage(file);
}

function readMultipleFiles(props) {}

function Apicall() {
  console.log("HI");
}
function fileUpload() {}

export const workers = {
  fileReader,
  Apicall,
  fileUpload,
};
