import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/posts.interface';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'First Title',
      content: 'First Content',
      authorName: 'Abc',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  private getNextId(): number {
    return this.posts.length > 0
      ? Math.max(...this.posts.map((post) => post.id)) + 1
      : 1;
  }

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const singlePost = this.posts.find((post) => post.id === id);

    if (!singlePost) {
      throw new NotFoundException(`Post with ID ${id} was not found`);
    }

    return singlePost;
  }

  create(createPostData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Post {
    const newPost: Post = {
      id: this.getNextId(),
      ...createPostData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.posts.push(newPost);
    return newPost;
  }

  update(
    id: number,
    updatePostData: Partial<Omit<Post, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Post {
    const currentPostIndex = this.posts.findIndex((post) => post.id === id);

    if (currentPostIndex === -1) {
      throw new NotFoundException(`Post with ID ${id} was not found`);
    }

    this.posts[currentPostIndex] = {
      ...this.posts[currentPostIndex],
      ...updatePostData,
      updatedAt: new Date(),
    };

    return this.posts[currentPostIndex];
  }

  remove(id: number): { message: string } {
    const currentPostIndex = this.posts.findIndex((post) => post.id === id);

    if (currentPostIndex === -1) {
      throw new NotFoundException(`Post with ID ${id} was not found`);
    }

    this.posts.splice(currentPostIndex, 1);

    return {
      message: `Post with ID ${id} has been deleted`,
    };
  }
}
