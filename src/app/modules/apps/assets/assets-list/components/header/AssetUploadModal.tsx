import { useCallback, useEffect, useState } from 'react'
import {Modal} from 'react-bootstrap'
import {KTIcon } from '../../../../../../../_metronic/helpers'
import { useDropzone } from 'react-dropzone';
import { uploadFile } from '../../core/_requests' 
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {useQueryResponse} from '../../core/QueryResponseProvider'

type Props = {
    show: boolean
    handleClose: () => void
}

const MySwal = withReactContent(Swal);

const AssetUploadModal = ({show, handleClose}: Props) => {
    const [file, setFile] = useState<any>(null);
    const {refetch} = useQueryResponse()

    const onDrop = useCallback((acceptedFiles:any) => {
        const selectedFile = acceptedFiles[0];
        setFile(Object.assign(selectedFile, {
            preview: URL.createObjectURL(selectedFile),
          }));

        // Handle the dropped files
        acceptedFiles.forEach((file:any) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            const fileAsBinaryString = reader.result;
            console.log(fileAsBinaryString);
          };
    
          reader.onabort = () => console.log('File reading was aborted');
          reader.onerror = () => console.log('File reading has failed');
    
          reader.readAsBinaryString(file);
        });
      }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
        onDrop,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
        },
        multiple: false 
    });


    useEffect(() => {
        // Revoke the data uri after component unmount
        return () => {
          if (file) {
            URL.revokeObjectURL(file.preview);
          }
          // No need to return anything, or you can return void explicitly
        };
      }, [file]);
    

      const handleAlert = (response:{is_ok:boolean, message:string, data:any[]}) => {
        let title = "Error!";
        const buttonText = 'Close'
        if(response.is_ok){
          title = "Success!"
        }
    
        const details = response.data
        .map((item) => 
            `<span class="${item.is_ok ? 'text-success' : 'text-danger'}">${item.message}</span>`
        )
        .join('<br>');

        MySwal.fire({
          title: title,
          text: response.message,
          icon: 'info',
          html: details,
          confirmButtonText: buttonText,
        }).then((result) => {
          if (result.isConfirmed) {
            refetch()
            handleClose()
          }
        })
      };

      const deleteFile = () => {
        URL.revokeObjectURL(file.preview); // Clean up preview URL
        setFile(null); // Clear the file from state
      };
      

      const handleDownload = () => {
        // The file is located inside the "public" folder in Vite
        const fileUrl = `/templates/Template_Upload_Asset.xlsx`; // No need for process.env.PUBLIC_URL in Vite
    
        // Create a temporary anchor tag to download the file
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', 'Template_Upload_Asset.xlsx'); // Set the filename for download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      const handleUpload = async () => {
        if (!file) {
            console.log('No file selected');
            return;
          }
      
          const formData = new FormData();
          formData.append('file', file); // Append the selected file to FormData
      
          try {
            const response = await uploadFile(formData)
            console.log('File uploaded successfully:', response.data);
            handleAlert(response)
            // Clear the selected file after upload if desired
            //setSelectedFile(null);
          } catch (error) {
            console.error('Error uploading file:', error);
          }
      };

      return (
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Upload DC
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{
                margin:'0px 0px 10px 0px'
            }}>
            <button
                    onClick={handleDownload}
                    type="button"
                    className="btn btn-sm btn-light"
                >
                Download Template
            </button>
            </div>
          <div
            {...getRootProps()}
            style={{
                border: '2px dashed #007BFF',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
            }}
            >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here...</p>
            ) : (
                <p>Drag & drop some files here, or click to select files</p>
            )}
            {file ? (
                <div style={{ marginTop: '20px' }}>
                <h4>File Selected:</h4>
                <p>
                    <strong>{file.name}</strong> - {Math.round(file.size / 1024)} KB
                </p>
                <button onClick={deleteFile} style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}>
                    Delete File
                </button>
                </div>
            ) : (
                <div style={{ marginTop: '20px' }}>
                <p>No file selected</p>
                </div>
            )}
            </div>
          </Modal.Body>
          <Modal.Footer>
          <button
                    type='button'
                    className='btn btn-lg btn-light'
                    data-kt-stepper-action='next'
                    onClick={handleClose}
                  >
                    Close <KTIcon iconName='arrow-right' className='fs-3 ms-1 me-0' />
            </button>
            <button
                    type='button'
                    className='btn btn-lg btn-primary'
                    data-kt-stepper-action='next'
                    onClick={handleUpload}
                    disabled={!file}
                  >
                    Upload <KTIcon iconName='arrow-right' className='fs-3 ms-1 me-0' />
            </button>
          </Modal.Footer>
        </Modal>
      );
  }

  export {AssetUploadModal}