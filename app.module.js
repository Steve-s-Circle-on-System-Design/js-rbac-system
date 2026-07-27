import { UploadModule } from './upload/upload.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UploadModule,
  ],
})
export class AppModule {}