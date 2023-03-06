import css from './panel.scss';
import { cthulhu, HtmlComponent } from "../component";

export class AppPanel extends HtmlComponent{
    constructor(){
        super(cthulhu({
            style:{
                content:css
            },
            div:{
                slot:{
                    attributes:{
                        name:'content'
                    }
                }
            }
        }));
    }
}