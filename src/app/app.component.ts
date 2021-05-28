import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { PostDialogComponent } from './components/post-dialog/post-dialog.component';
import { HttpService } from './shared/service/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, OnChanges {
  public title = 'TG-TEST';
  public redditData: {};
  public topic = "golf";

  constructor(
    private httpService: HttpService,
    private dialogService: NbDialogService) {}
  
  ngOnInit(): void {
    this.download();
    window.addEventListener('scroll', this.scrolling, true)
  }

  ngOnChanges(): void {
    console.log(this.topic);
  }

  public download(): void {
    this.httpService.getRedditPost(this.topic, 10).subscribe((result) => {
      this.redditData = result;
    });
  }

  public openThread(post: any) {
    this.dialogService.open(PostDialogComponent, {
      context: post
    })
  }

  public getDate(timeStamp): Date {
    return new Date(timeStamp);
  }

  public copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  public scrolling=(s)=>{
    if (s.target.scrollingElement) {
      let sc = s.target.scrollingElement.scrollTop;
      if (sc + window.innerHeight === s.target.scrollingElement.scrollHeight) {
        this.httpService.getRedditPost(this.topic, 10, this.redditData['data']['after']).subscribe((result) => {
          this.redditData['data']['children'].push(...result['data']['children']);
          this.redditData['data']['after'] = result['data']['after'];
        });
      }
    }
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrolling, true)
  }
}
