export const handleFileChange = (params = {}) => {
    const { event = undefined, setUploadedFile = () => null, onFileUpload = undefined } = params;

    if (!event) return null;

    const file = event.target.files[0];

    if (file && onFileUpload) {
      setUploadedFile(URL.createObjectURL(file));
      onFileUpload({file})
      event.target.value = null; 
    }
  };

  export const handleFileDelete = (params = {}) => {
    const { setUploadedFile = () => null, onFileDelete = undefined} = params;
    if(onFileDelete) {
        onFileDelete()
        setUploadedFile(null)
    }
  }