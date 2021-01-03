import S3 from 'aws-sdk/clients/s3';
import { CID } from 'multiformats';
import { Readable } from 'stream';
import { StorageProvider } from './provider';

// S3Provider is the aws S3 provider where all parameters are assumed specified by standard aws methods
// AWS_API_KEY AWS_SECRET_KEY environment variables ore the .aws_credentials file see aws sdk for details
export class S3Provider implements StorageProvider {

    s3!: S3
    bucketName!: string
    constructor(bucketName: string) {
        this.s3 = new S3()
        this.bucketName = bucketName
    }
    async get(cid: CID): Promise<Readable> {
        const params = {
            Bucket: this.bucketName,
            Key: cid.toString()
        }
        return this.s3.getObject(params).createReadStream()
    }

    // TODO make more efficient don't write to store if data already exists
    put(cid: CID, data: Uint8Array): Promise<any> {
        const params = {
            Bucket: this.bucketName,
            Key: cid.toString(),
            Body: data
        }
        return new Promise((resolve, error) => {
            this.s3.putObject(params, (err, _data) => {
                if (err)
                    error(err)
                else
                    resolve()
            })
        })
    }
}