export function pdfWorker() {
  self.onmessage = function (e) {
    try {
      importScripts(
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.4.456/pdf.min.js"
      );
      pdfjsLib.GlobalWorkerOptions.workerSrc = importScripts(
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.4.456/pdf.worker.min.js"
      );
      let f = e.data;
      let fs = new FileReader();
      fs.readAsDataURL(f);
      let str = "";
      fs.onloadend = async function (en) {
        const num = await pdfjsLib.getDocument(fs.result).promise;
        for (let i = 1; i <= num.numPages; i++) {
          const page = await num.getPage(i);
          const po = await page.getTextContent();
          for (let j = 0; j < po.items.length; j++) {
            str += po.items[j].str;
          }
        }
        postMessage(str);
      };
    } catch (error) {
      postMessage("Error Occured");
    }
  };
}

export function csvReader() {
  try {
    self.onmessage = (mssg) => {
      const csvFile = mssg.data;
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(csvFile);
      let fileObject = [],
        csvFileHeaders = [];
      fileReader.onload = function (ev) {
        const rows = ev.target.result.split("/r/n");
        for (let row = 0; row < rows.length; row++) {
          let presentRow = rows[row].split(",");
          let rowObject = {};
          for (let pr = 0; pr < presentRow.length; pr++) {
            if (row === 0) {
              csvFileHeaders.push(presentRow[pr]);
            } else {
              rowObject[csvFileHeaders[pr]] = presentRow[pr];
            }
          }
          fileObject.push(rowObject);
        }
        postMessage(JSON.stringify(fileObject));
      };
    };
  } catch (error) {
    postMessage("Error Occured");
  }
}




