import React, { useState, useEffect } from 'react';
import '../App.css';

export default function FileUpload({ name, value, handleFile }) {
  const [dragging, setDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const [fileList, setFileList] = useState([]);

  const dropRef = React.createRef();

  useEffect(() => {
    let refDiv = dropRef.current;
    refDiv.addEventListener('dragenter', handleDragIn);
    refDiv.addEventListener('dragleave', handleDragOut);
    refDiv.addEventListener('dragover', handleDrag);
    refDiv.addEventListener('drop', handleDrop);

    return refDiv => {
      refDiv.removeEventListener('dragenter', handleDragIn);
      refDiv.removeEventListener('dragleave', handleDragOut);
      refDiv.removeEventListener('dragover', handleDrag);
      refDiv.removeEventListener('drop', handleDrop);
    };
  }, []);

  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragIn = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(dragCounter + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };
  const handleDragOut = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(dragCounter - 1);
    if (dragCounter > 0) return;
    setDragging(false);
  };
  const handleDrop = async e => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    let files = [...fileList];
    if (!files.includes(e.dataTransfer.files)) {
      files = [...files, ...e.dataTransfer.files];
      await setFileList(files);
    }
    console.log('handleDrop in FileUpload.js files: ', files);
    console.log('handleDrop in FileUpload.js fileList: ', fileList);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await handleFile(e.dataTransfer.files);
      e.dataTransfer.clearData();
      setDragCounter(0);
    }
    console.log(`FileUpload value after upload:`, value);
    // this.props.handleChange(e);
  };
  // return <div ref={this.dropRef}>{this.props.children}</div>;

  return (
    <div className="fileUploadWrapper">
      <p className="fileUploadInner">
        008. UPLOAD OR DRAG YOUR DECK OR PITCH MATERIALS SIZE LIMIT:10MB*
      </p>
      <div
        ref={dropRef}
        className="fileUploadField"
        name={name}
        // value={this.props.value}
        // onChange={this.props.onChange}
        // required={true}
        // style={{ resize: 'none' }}
      >
        {value.map((file, index) => {
          return (
            <div className="uploadedFileList" key={index}>
              {file.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
