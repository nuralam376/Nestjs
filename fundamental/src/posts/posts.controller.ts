import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post as PostInterface } from './interfaces/posts.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostExistsPipe } from './pipes/post-exists.pipe';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(@Query('search') search?: string): PostInterface[] {
    const extractAllPosts = this.postsService.findAll();

    if (search) {
      return extractAllPosts?.filter(
        (post) => post.title?.toLowerCase() === search?.toLowerCase(),
      );
    }

    return extractAllPosts;
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe, PostExistsPipe) id: number,
  ): PostInterface {
    return this.postsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  create(
    @Body()
    createPostData: CreatePostDto,
  ): PostInterface {
    return this.postsService.create(createPostData);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe, PostExistsPipe) id: number,
    @Body()
    updatePostData: UpdatePostDto,
  ): PostInterface {
    return this.postsService.update(id, updatePostData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe, PostExistsPipe) id: number): {
    message: string;
  } {
    return this.postsService.remove(id);
  }
}
