import { Component, ViewChild, Input, Output, OnInit, EventEmitter  } from '@angular/core';
import { Slides} from 'ionic-angular';
import { Entry } from '../entry.interace';

let itemId = -1;
let dataId = -1;

@Component({
  selector: 'slide-component',
  templateUrl: 'slide.component.html'
})
export class SlideComponent implements OnInit {

	@Input() itemlist: Entry[];
	@Output() itemPress = new EventEmitter<Entry>();
  @ViewChild(Slides) slidesElem: Slides;

  public htmlData: string[] = null;
  public currentData: Entry;

  constructor() { }

  ngOnInit() {
    itemId = -1;
    dataId = -1;
    this.htmlData = this.generateHtmlData();
    this.renderFirstItem();
  }

  renderFirstItem() {
    setTimeout(() => this.render(this.htmlData[0], 0));
  }

  generateHtmlData(): string[] {
            return this.itemlist.map((elem: Entry, i: number) => {
                let contentText;
                if(elem.description.indexOf('<b>') > -1) {
                  contentText = elem.description
                }else {
                  contentText = elem.title
                }
                return `
                  <div class="content-wrap">
                    <div class="content">
                      <p>${contentText}</p>
                    </div>
                    <div class="pagination">
                      ${i + 1}/${this.itemlist.length} ${new Date(elem.date)}
                    </div>
                  </div>
                `;
            });
  }

  render(html, id) {
    Array.from(document.querySelectorAll(`.tension-id-${id}`)).forEach(elem => {
      elem['innerHTML'] = html;
    });
  }

  ionSlideDidChange() {
    const prevValue =  this.htmlData[this.getPrevDataId()];
    this.render(prevValue, getPrevItemId());
  }

  ionSlideNextStart(event) {
    itemId = getNextItemId();
    dataId = this.getNextDataId();
    this.currentData = this.itemlist[dataId];
    const nextId = this.getNextDataId();
    const nextVal = this.htmlData[nextId];
    
    this.render(nextVal, getNextItemId());
  }

  ionSlidePrevStart() {
    itemId = getPrevItemId();
    dataId = this.getPrevDataId();
  }

  onPaneClick() {
    this.itemPress.emit(this.currentData);
  }

  getNextDataId(){
    return (dataId + 1) === this.htmlData.length ? 0 : dataId + 1;
  }
  
  getPrevDataId(){
    return  (dataId - 1) === -1 ? this.htmlData.length -1 : dataId - 1;
  }
}

function getNextItemId(){
  return (itemId + 1) === 3 ? 0 : itemId + 1;
}
function getPrevItemId(){
  return (itemId - 1) === -1 ? 2 : itemId - 1;
}