import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('add')
  async addComment(@Body() body: { email: string; courseId: string; text: string; rating: number }) {
    await this.commentsService.addComment(body.email, body.courseId, body.text, body.rating);
    return { message: 'Comentario agregado exitosamente' };
  }

  @Get('user/:email')
  async getUserComments(@Param('email') email: string) {
    return this.commentsService.getUserComments(email);
  }
}