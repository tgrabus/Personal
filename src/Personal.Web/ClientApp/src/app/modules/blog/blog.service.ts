import { Injectable } from '@angular/core';
import { Post } from "./post";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor() {
    // Intentionally left empty
  }

  getPosts() : Post[] {
    let posts: Post[] = [];
    posts.push(new Post('Struct as value object', 'struct-as-value-object.md'));
    posts.push(new Post('How to create end user certificate', 'how-to-create-end-user-certificate.md'));
    posts.push(new Post('How to extract data from terraform output', 'how-to-extract-data-from-terraform-output.md'));
    return posts;
  }

}
