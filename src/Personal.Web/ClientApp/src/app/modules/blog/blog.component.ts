import { Component, OnInit } from '@angular/core';
import { BlogService } from "./blog.service";
import { Post } from "./post";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts: Post[];

  constructor(private blogService: BlogService) {
    this.posts = this.blogService.getPosts();
  }

  ngOnInit(): void {
    // Intentionally left empty
  }

}
