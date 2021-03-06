import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  redditUrl = "https://www.reddit.com/r/";

  constructor(private httpClient: HttpClient) { }

  getRedditPost(topic: string, limit?: number, after?): Observable<any> {
    if(after) {
     return this.httpClient.get(this.redditUrl+topic+'.json?raw_json=1&limit='+limit+'&after='+after).pipe(catchError(this.handleError));
    }
    return this.httpClient.get(this.redditUrl+topic+'.json?raw_json=1&limit='+limit).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
