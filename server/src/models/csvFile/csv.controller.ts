import {
  Controller, Get, Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CsvService } from './csv.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) { }


  @Get('ok')
  async getCsvOk() {
    return 'csv ok!'
  }

  @Post('upload-csv')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const fileName = `${Date.now()}-${file.originalname}`;
          callback(null, fileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.csv$/)) {
          return callback(
            new HttpException('Only CSV files are allowed!', HttpStatus.BAD_REQUEST),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadCSV(@UploadedFile() file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }

    const result = await this.csvService.processCSV(file.path);
    return `File uploaded and processed successfully`;
  }
}
