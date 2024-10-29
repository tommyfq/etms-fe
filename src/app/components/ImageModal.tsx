import {FC,CSSProperties} from 'react';

interface Props {
    imageUrl: string;
    onClose: () => void;
}

const ImageModal: FC<Props> = ({ imageUrl, onClose }) => {
    const styles: {
        modal: CSSProperties;
        modalImage: CSSProperties;
      } = {
        modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 1000,
        },
        modalImage: {
        maxWidth: '90%',
        maxHeight: '90%',
        },
    };

  return (
    <div style={styles.modal} onClick={onClose}>
      <img src={imageUrl} alt="Full-size" style={styles.modalImage} />
    </div>
  );
};

export default ImageModal;