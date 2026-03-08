import { Module } from '@nestjs/common';
import { LibraryController } from './library.controller';
import { LibraryService } from './library.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { Library, LibrarySchema } from './schemas/library.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
      {
        name: Library.name,
        schema: LibrarySchema,
      },
    ]),
  ],
  controllers: [LibraryController],
  providers: [LibraryService],
})
export class LibraryModule {}
