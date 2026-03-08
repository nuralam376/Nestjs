import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';
import { Library } from './schemas/library.schema';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectModel(Library.name) private libraryModel: Model<Library>,
  ) {}

  async createLibrary(): Promise<Library> {
    const book1 = await this.bookModel.create({
      title: 'Book 1',
      author: 'Author 1',
    });

    const book2 = await this.bookModel.create({
      title: 'Book 2',
      author: 'Author 2',
    });

    const library = new this.libraryModel({
      title: 'Library 1',
      books: [book1._id, book2._id],
    });

    return library.save();
  }

  async getLibraries(): Promise<Library[]> {
    return this.libraryModel.find().populate('books').exec();
  }
}
