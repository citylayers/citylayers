
import { Storage } from '@google-cloud/storage';
import path from 'path';
import { Environment, EnvironmentKey } from '../config/Environment';

/**
 * Google Cloud Storage upload utility
 */
export class GCSUpload {
    private static storage: Storage;
    private static bucketName: string;
    private static initialized = false;

    /**
     * Initialize GCS with credentials
     */
    public static initialize(): void {
        if (this.initialized) return;

        const env = Environment.getInstance();
        const keyFile = env.get(EnvironmentKey.GCS_KEY_FILE, './gcs-key.json'); // has to come from the GCS Module that gets created
        this.bucketName = env.get(EnvironmentKey.GCS_BUCKET_NAME, 'citylayers-uploads'); // This is what I called it when I set up my GCS Module

        this.storage = new Storage({
            keyFilename: keyFile,
        });

        this.initialized = true;
        console.log(`✅ GCS initialized with bucket: ${this.bucketName}`);
    }

    /**
     * Upload file buffer to GCS
     * @param file - Multer file object
     * @returns Public URL of uploaded file
     */
    public static async uploadFile(file: Express.Multer.File): Promise<string> {
        if (!this.initialized) {
            this.initialize();
        }

        return new Promise((resolve, reject) => {
            // Generate unique filename
            const timestamp = Date.now();
            const fileExtension = path.extname(file.originalname);
            const filename = `${timestamp}${fileExtension}`;

            const bucket = this.storage.bucket(this.bucketName);
            const blob = bucket.file(filename);

            const blobStream = blob.createWriteStream({
                resumable: false,
                metadata: {
                    contentType: file.mimetype,
                },
            });

            blobStream.on('error', (err) => {
                console.error('GCS upload error:', err);
                reject(err);
            });

            blobStream.on('finish', () => {
                const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${filename}`;
                console.log('File uploaded to:', publicUrl);
                resolve(publicUrl);
            });

            // Write file buffer to stream
            blobStream.end(file.buffer);
        });
    }

    /**
     * Delete file from GCS
     * @param filename - Name of file to delete (or full URL)
     */
    public static async deleteFile(filename: string): Promise<void> {
        if (!this.initialized) {
            this.initialize();
        }

        // Extract filename if full URL provided
        if (filename.includes('storage.googleapis.com')) {
            filename = filename.split('/').pop() || filename;
        }

        const bucket = this.storage.bucket(this.bucketName);
        await bucket.file(filename).delete();
        console.log(`✅ File ${filename} deleted from GCS`);
    }
}