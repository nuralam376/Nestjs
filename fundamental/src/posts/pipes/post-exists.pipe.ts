import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { PostsService } from '../posts.service';

@Injectable()
export class PostExistsPipe implements PipeTransform {
  constructor(private readonly postsService: PostsService) {}
  transform(value: any) {
    try {
      this.postsService.findOne(value as number);
    } catch (_) {
      throw new NotFoundException(`Post with ID ${value} was not found`);
    }
    return value as number;
  }
}
