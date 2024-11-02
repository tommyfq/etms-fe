// LoadingScreen.tsx
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface LoadingScreenProps {
    loading: boolean;
    message?: string;
}

const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
        position: 'fixed' as 'fixed', // Explicitly cast to the correct type
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // Ensure it appears above other content
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#fff',
    },
    message: {
        marginTop: '10px',
        fontSize: '18px',
    },
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ loading, message }) => {
    if (!loading) return null; // Do not render anything if not loading

    return (
        <div style={styles.overlay}>
            <div style={styles.container}>
                <ClipLoader loading={loading} size={50} color="#36D7B7" />
                <p style={styles.message}>{message || 'Uploading...'}</p>
            </div>
        </div>
    );
};



export default LoadingScreen;
