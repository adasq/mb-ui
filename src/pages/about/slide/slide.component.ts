import { Component, ViewChild, ChangeDetectorRef, Input, Output, OnInit, EventEmitter  } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, Slides, ActionSheetController, ViewController, ModalController } from 'ionic-angular';
import {Deploy} from '@ionic/cloud-angular';
import { EnvConfigurationProvider } from "gl-ionic2-env-configuration";

let itemId = -1;
let dataId = -1;

let TENSION = '';

@Component({
  selector: 'slide-component',
  templateUrl: 'slide.component.html'
})
export class SlideComponent implements OnInit {

	@Input() itemlist: any[];
	@Output() itemPress = new EventEmitter();
  @ViewChild(Slides) slidesElem: Slides;

  public items: any[] = [1, 2, 3];
  public data: any[] = null;
  public pureData: any[] = null;
  public currentData;

  constructor(
    private deploy: Deploy,
    public navCtrl: NavController,
    private http: Http,
    private config: EnvConfigurationProvider<any>,
    private actionSheetController: ActionSheetController,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  	          this.pureData = this.itemlist;

            const response2 = this.itemlist.map((elem, i) => {
              let contentText = '';
              if(elem.description.indexOf('<b>') > -1) {
                contentText =  elem.description
              }else {
                contentText=  elem.title
              }
              return `
                <div class="content-wrap">
                  <div class="content">
                    <p>${contentText}</p>
                  </div>
                  <div class="pagination">
                    ${i + 1}/${this.itemlist.length}
                  </div>
                </div>
              `;
            });

            this.items[0] = ':D';
            this.data = response2;
  }

  ionSlideDidChange() {
    const prevValue =  this.data[this.getPrevDataId()];
    Array.from(document.querySelectorAll(`.tension-id-${getPrevItemId()}`)).forEach(elem => {
      elem['innerHTML'] = prevValue;
    });
  }

  ionSlideNextStart(event) {
    itemId = getNextItemId();
    dataId = this.getNextDataId();
    this.currentData = this.pureData[dataId];
    const nextId = this.getNextDataId();
    const nextVal = this.data[nextId];
    const nextItem = this.pureData[nextId];
    
    Array.from(document.querySelectorAll(`.tension-id-${getNextItemId()}`)).forEach(elem => {

      const color = {
        'feasible': 'orange',
        'chilling': 'red'
      }[nextItem.type];

      elem['style']['backgroundColor'] = color || '#ccc';
      elem['innerHTML'] = nextVal;
    });
  }

  ionSlidePrevStart() {
    itemId = getPrevItemId();
    dataId = this.getPrevDataId();
  }


  onPaneClick() {
    this.itemPress.emit(this.currentData);
  }


  getNextDataId(){
    return (dataId + 1) === this.data.length ? 0 : dataId + 1;
  }
  
  getPrevDataId(){
    return  (dataId - 1) === -1 ? this.data.length -1 : dataId - 1;
  }
}

function getNextItemId(){
  return (itemId + 1) === 3 ? 0 : itemId + 1;
}
function getPrevItemId(){
  return (itemId - 1) === -1 ? 2 : itemId - 1;
}

const colors = ['orange', 'red', 'aqua'];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}