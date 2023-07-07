import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentService } from 'src/app/services/comment-api.service';
import { Comment } from 'src/app/shared/interfaces/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  @Input()
  comment!: Comment;

  @Input()
  categorySlug! : string;

  @Output()
  commentDeleted = new EventEmitter<Boolean>();

  constructor(private commentService: CommentService) {}

  deleteComment(comment: Comment): void {
    this.commentService.deleteComment(comment.id).subscribe(() => {
      this.commentDeleted.emit(true);
    });
  }
}