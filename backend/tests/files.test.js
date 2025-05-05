import request from 'supertest';
import fs from 'fs';
import path from 'path';
import app from '../server.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testUploadFile = path.join(__dirname, 'test-files', 'test-video.mp4');
const uploadsDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

describe('File Upload and Download API', () => {
    let uploadedFilename = '';

    it('should upload a file successfully', async () => {
        const res = await request(app)
            .post('/api/files/upload')
            .attach('file', testUploadFile);

        expect(res.statusCode).toBe(200);
        expect(res.body.filename).toBeDefined();

        uploadedFilename = res.body.filename;
        const filePath = path.join(uploadsDir, uploadedFilename);
        expect(fs.existsSync(filePath)).toBe(true);
    });

    it('should list uploaded files', async () => {
        const res = await request(app).get('/api/files');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toContain(uploadedFilename);
    });

    it('should download the uploaded file', async () => {
        const res = await request(app).get(`/api/files/${uploadedFilename}`);
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-disposition']).toContain('attachment');
    });

    it('should return 404 for non-existent file download', async () => {
        const res = await request(app).get('/api/files/nonexistent-file.mp4');
        expect(res.statusCode).toBe(404);
    });
});