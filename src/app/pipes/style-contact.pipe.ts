import { Pipe, PipeTransform } from '@angular/core';

interface Contact {
  name: string;
  phone?: string;
  email?: string;
}

@Pipe({
  name: 'styleContact'
})
export class StyleContactPipe implements PipeTransform {

  transform(contact: Contact, args?: any): any {
    let text = contact.name;
    let textInParentheses = '';

    if (contact.phone && contact.email) {
      textInParentheses = `${contact.phone}, ${contact.email}`;
    } else if (contact.phone) {
      textInParentheses = `${contact.phone}`;
    } else if (contact.email) {
      textInParentheses = `${contact.email}`;
    }

    if (textInParentheses) {
      text = `${text} (${textInParentheses})`;
    }
    return text;
  }

}
