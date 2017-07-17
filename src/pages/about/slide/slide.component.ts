import { Component, ViewChild, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Entry } from '../entry.interace';

let itemId = -1;
let dataId = -1;

const colors = ['#23d5ff', 'orange'];
const colorsMap = {};

function manageColor(day: number): string {
    if (colorsMap[day]) {
        
    } else {
        const color = colors.pop();
        colorsMap[day] = color || '#ccc';
    }
    return colorsMap[day];
}

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
        this.printData();
    }

    printData() {
        this.itemlist.forEach(element => {
            console.log(new Date(element.date), element.title)
        });
    }

    renderFirstItem() {
        setTimeout(() => this.render(0, 0));
    }

    generateHtmlData(): string[] {
        return this.itemlist.map((elem: Entry, i: number) => {
            let contentText;
            if (elem.description.indexOf('<b>') > -1) {
                contentText = elem.description
            } else {
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

    render(id2, id) {
        Array.from(document.querySelectorAll(`.tension-id-${id}`)).forEach(elem => {
            elem['innerHTML'] = this.htmlData[id2];
            const day = new Date(this.itemlist[id2].date).getDate();
            elem['style']['background'] = manageColor(day);
        });
    }

    ionSlideDidChange() {
        const id = this.getPrevDataId();
        this.render(id, getPrevItemId());
    }

    ionSlideNextStart(event) {
        itemId = getNextItemId();
        dataId = this.getNextDataId();
        this.currentData = this.itemlist[dataId];
        const nextId = this.getNextDataId();

        this.render(nextId, getNextItemId());
    }

    ionSlidePrevStart() {
        itemId = getPrevItemId();
        dataId = this.getPrevDataId();
    }

    onPaneClick() {
        this.itemPress.emit(this.currentData);
    }

    getNextDataId() {
        return (dataId + 1) === this.htmlData.length ? 0 : dataId + 1;
    }

    getPrevDataId() {
        return (dataId - 1) === -1 ? this.htmlData.length - 1 : dataId - 1;
    }
}

function getNextItemId() {
    return (itemId + 1) === 3 ? 0 : itemId + 1;
}
function getPrevItemId() {
    return (itemId - 1) === -1 ? 2 : itemId - 1;
}