import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileTransfer = () => {
    const [file, setFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    const fetchFiles = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/files');
            setUploadedFiles(res.data);
        } catch (err) {
            console.error('Failed to fetch files', err);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleUpload = async () => {
        if (!file) return alert('Please choose a file!');
        const formData = new FormData();
        formData.append('file', file);
        try {
            setUploading(true);
            await axios.post('http://localhost:4000/api/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFile(null);
            fetchFiles(); // Refresh list
        } catch (err) {
            console.error('Upload failed', err);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (filename) => {
        try {
            await axios.delete(`http://localhost:4000/api/files/${filename}`);
            const updatedList = uploadedFiles.filter(f => f !== filename);
            setUploadedFiles(updatedList);
        } catch (err) {
            console.error('Failed to delete file', err);
        }
    };

    return (
        <div className='p-8'>
            <h1 className='text-3xl font-bold mb-4'>Product Suggestions</h1>
            <p className='text-gray-700 mb-6 max-w-2xl'>
                This blog allows you to share product ideas and suggestions by uploading files (including large ones like videos or PDFs).
                You can also see what others have suggested by browsing and downloading their uploaded files below.
            </p>

            <h2 className='text-2xl font-bold mb-4'>Upload a Large File</h2>
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="block mb-2"
            />
            <button
                onClick={handleUpload}
                disabled={uploading}
                className='bg-blue-600 text-white px-4 py-2 rounded'
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </button>

            <h3 className='mt-8 text-xl font-semibold'>Uploaded Suggestions</h3>
            <ul className='mt-2 space-y-2'>
                {uploadedFiles.map((name, idx) => (
                    <li key={idx} className='flex justify-between items-center border p-2 rounded'>
                        <span className='truncate max-w-xs'>{name}</span>
                        <div className='flex gap-4'>
                            <a
                                href={`http://localhost:4000/api/files/${name}`}
                                className='text-blue-600 underline'
                                download
                            >
                                Download
                            </a>
                            <button
                                onClick={() => handleDelete(name)}
                                className='text-red-600 underline'
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default FileTransfer;
