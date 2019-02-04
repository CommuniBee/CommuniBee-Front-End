import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'browseContent' })
export class BrowseContentPipe implements PipeTransform {
    transform(contentToFilter: any, content_name: any): any {
        if (content_name == null) {
            return contentToFilter;
        }
        return contentToFilter;
    }
}
