import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { CloudinaryClientProvider } from './providers/cloudinary.provider';
import { CloudinaryStorageProvider } from './providers/cloudinary-storage.provider';
import { FILE_STORAGE_PROVIDER } from './constants';

@Module({
  imports: [
    ConfigModule,
    MulterModule.register({
      storage: memoryStorage(), // disk-less, in-memory buffers only
    }),
  ],
  controllers: [UploadController],
  providers: [
    CloudinaryClientProvider,
    CloudinaryStorageProvider,
    {
      // Swap the storage vendor by changing ONLY this binding
      // (e.g. useExisting: S3StorageProvider) — nothing else in the
      // module needs to change.
      provide: FILE_STORAGE_PROVIDER,
      useExisting: CloudinaryStorageProvider,
    },
  ],
  exports: [FILE_STORAGE_PROVIDER],
})
export class UploadModule {}