export  class WorkerHelper {
  constructor(){

  }
  createWorker(workerFile) {
    const code = workerFile.toString();
    const blob = new Blob([`(${code})()`]);
    let worker = new Worker(URL.createObjectURL(blob));

    return worker;
  }
}

// export  function fun(workerFile){

//     const code = workerFile.toString();
//         const blob = new Blob([`(${code})()`]);
//         let worker = new Worker(URL.createObjectURL(blob));
    
//         return worker;


// }