export function worker() {
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
