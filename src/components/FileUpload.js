import React, { useState, useEffect } from 'react';
import '../App.css';

export default function FileUpload({ name, value, handleFile }) {
  const [dragging, setDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

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
  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    // console.log('handleDrop event dataTransfer:', e.dataTransfer);
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files);
      e.dataTransfer.clearData();
      setDragCounter(0);
    }
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
      ></div>
    </div>
  );
}
