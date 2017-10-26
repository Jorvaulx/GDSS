import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {CoolLocalStorage} from "angular2-cool-storage";

@Injectable()
export class KeywordService {
  private keywordUrl: string = 'assets/testexport.txt';

  constructor(private http: Http,
              private localStorage: CoolLocalStorage) {
  }

  retrieveKeywordsFile(): Promise<any> {
    var self = this;
    console.log('this.keywordUrl', this.keywordUrl);
    return this.http.get(this.keywordUrl)
      .toPromise()
      .then(res => {

        console.log('getKeywordsFile():', res);
        var xmlDOM = new DOMParser().parseFromString(res["_body"], 'text/xml');
        var initialObj = self.xmlToJson(xmlDOM); // Convert XML to JSON
        console.log("jsonObj", initialObj);

        this.localStorage.setObject('keywords', initialObj || {});
        return initialObj;
      });
  }

  getKeywordFile():any {
    return this.localStorage.getObject('keywords') || this.retrieveKeywordsFile();
  }


  ///////////////
  /// Private ///
  ///////////////
  private handleYear(value): string {
    let year: string = "";
    if (value.dates) {
      year = value.dates.year
    }
    return year;
  }

  private handleTitle(value): string {
    let title: string = "";
    if (value.titles) {
      title += value.titles["title"];
      if (value.titles["secondary-title"]) {
        title += " - " + value.titles["secondary-title"];
      }
    }
    return title;
  }

  private handleAuthors(value): string {
    let authorName: string = "";
    if (value.contributors) {
      var authorsList = value.contributors.authors.author;
      if (Array.isArray(authorsList)) {
        switch (authorsList.length) {
          case 0:
            break;
          case 1:
            authorName = authorsList[0].Author;
            break;
          case 2:
            if (authorsList[0].Author) {
              authorName = authorsList[0].Author.split(",")[0] + " and " + authorsList[1].Author.split(",")[0]
            } else {
              authorName = authorsList[0].split(",")[0] + " and " + authorsList[1].split(",")[0]
            }
            break;
          default:
            authorName = authorsList[0] + " et. al.";
        }
      } else {
        authorName = authorsList;
      }
    }
    return authorName;
  }


  private handleAbstract(value) {
    let abstractText: string = value.abstract;
    if (abstractText.substring(0, 8) == "Abstract") {
      abstractText = abstractText.substring(9, abstractText.length);
    }
    return abstractText;
  }

  private handleKeywords(value) {
    let keywords: string = "";
    var keywordList = value.keywords.keyword;
    if (Array.isArray(keywordList)) {
      keywords = keywordList.join(", ");
      console.log("keyword join", keywords);
    } else if (keywordList) {
      keywords = keywordList;
    }
    return keywords;
  }


  private handleAuthorTitle(year, title, value): string {
    let authorTitle: string = this.getAuthorList(value) + ", " + year + ". " + title;
    return authorTitle;
  }


  private getAuthorList(value): string {
    let result: string = "";
    if (value.contributors) {
      var authorsList = value.contributors.authors.author;
      if (Array.isArray(authorsList)) {
        $.each(authorsList, function (index, value) {
          if (index == 0) {
            result = value;
          } else if (index != authorsList.length - 1) {
            result += ", " + value;
          } else {
            result += " & " + value;
          }
        });

      } else if (authorsList) {
        result = authorsList;
      }
      return result;
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private xmlToJson(xml) {

    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }

    // do children
    // If just one text node inside
    if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
      obj = xml.childNodes[0].nodeValue;
    }
    else if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return obj;
  }
}
