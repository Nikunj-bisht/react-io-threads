interface FileReaderProps {
  fileType: String;
  success: Function;
  file: File;
}

interface MultiFilereader {
  files: Array<File>;
  success: Function;
}

interface CreatePdfProps {
  pdfData: Array<String>;
}

async function fileReader(props: FileReaderProps) {
  const { fileType, success, file } = props;
  const { pdfWorker } = await import("./workers/fileReaderWorker");
  const { WorkerHelper } = await import("./workers/createWorkerHelper");

  const worker = new WorkerHelper().createWorker(pdfWorker);

  worker.onmessage = (e) => {
    success(e.data);
    worker.terminate();
  };

  worker.postMessage(file);
}

function readMultipleFiles(props: MultiFilereader) {
  const { files, success } = props;
  for (let file = 0; file < files.length; file++) {}
}

function Apicall() {
  console.log("HI");
}
function fileUpload() {}

export const workers = {
  fileReader,
  Apicall,
  fileUpload,
  readMultipleFiles,
};
