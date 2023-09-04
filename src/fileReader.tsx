interface FileReaderProps{
    success:Function;
}

function fileReader(props:FileReaderProps){

    const fileWorker = new Worker('./workers/fileReaderWorker.js');
    fileWorker.onmessage((e)=>{
        
          


    })


    fileWorker.postMessage(props);

}
function Apicall(){

}
function fileUpload(){

}

export const workers = {
    fileReader,
    Apicall,
    fileUpload
}