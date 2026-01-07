import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  @MinLength(3, { message: 'Title must be at least 3 characters' })
  @MaxLength(50, { message: 'Title can not be longer than 50 characters' })
  title?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Content is required' })
  @IsString({ message: 'Content must be a string' })
  @MinLength(5, { message: 'Content must be at least 5 characters' })
  @MaxLength(1000, {
    message: 'Content can not be longer than 1000 characters',
  })
  content?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Author Name is required' })
  @IsString({ message: 'Author Name must be string' })
  @MinLength(2, { message: 'Author Name must be at least 2 characters' })
  @MaxLength(25, {
    message: 'Author Name can not be longer than 25 characters',
  })
  authorName?: string;
}
